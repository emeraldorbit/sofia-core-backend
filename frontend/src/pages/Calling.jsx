import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../App';
import { useCall } from '../context/CallContext';
import { supabase, callsService } from '../api/supabaseClient';
import { usersAPI } from '../api/client';
import { useQuery } from '@tanstack/react-query';
import { getInitials } from '../utils';
import { createSignalingChannel } from '../lib/webrtcSignaling';
import { handleIncomingSignal, createPeerConnection, createOfferForPeer, closePeerConnections } from '../lib/webrtcMesh';
import { playRingtone, stopRingtone, playCallEndSound } from '../lib/ringtone';
import {
  ArrowLeft, Phone, PhoneOff, PhoneIncoming, PhoneOutgoing,
  Video, VideoOff, Mic, MicOff, Volume2, VolumeX, Users,
  Clock, Search, X, Loader2, Maximize2, Minimize2
} from 'lucide-react';

export default function Calling() {
  const { user } = useAuth();
  const { 
    activeCall, setActiveCall, incomingCall, 
    acceptCall, rejectCall, endCurrentCall, 
    callDuration, formattedDuration, isMinimized, setIsMinimized 
  } = useCall();

  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState({});
  const [callHistory, setCallHistory] = useState([]);

  const peersRef = useRef({});
  const signalingChannelRef = useRef(null);
  const localVideoRef = useRef(null);

  // Get users list
  const { data: allUsers = [] } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersAPI.list().then(r => r.data),
  });

  // Load call history from MongoDB
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/call-history?user_id=${user?.id}`);
        if (response.ok) {
          const data = await response.json();
          setCallHistory(data);
        }
      } catch (error) {
        console.error('Failed to load call history:', error);
      }
    };
    if (user?.id) loadHistory();
  }, [user?.id]);

  // Initialize local media
  const initLocalMedia = useCallback(async () => {
    if (localStream) return localStream;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: isVideoOn 
      });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      return stream;
    } catch (error) {
      console.error('Failed to get media devices:', error);
      // Fallback to audio only
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setLocalStream(audioStream);
      return audioStream;
    }
  }, [localStream, isVideoOn]);

  // Add remote stream
  const addRemoteStream = useCallback((userId, stream) => {
    setRemoteStreams(prev => ({ ...prev, [userId]: stream }));
  }, []);

  // Handle connection state change
  const onConnectionStateChange = useCallback((userId, state) => {
    console.log(`Connection with ${userId}: ${state}`);
    if (state === 'disconnected' || state === 'failed') {
      setRemoteStreams(prev => {
        const newStreams = { ...prev };
        delete newStreams[userId];
        return newStreams;
      });
    }
  }, []);

  // Setup WebRTC when call becomes active
  useEffect(() => {
    if (!activeCall || !user?.id) return;

    const setupWebRTC = async () => {
      const stream = await initLocalMedia();
      
      // Create signaling channel
      signalingChannelRef.current = createSignalingChannel(activeCall.id, (signal) => {
        handleIncomingSignal(
          activeCall.id,
          user.id,
          signal,
          peersRef.current,
          stream,
          addRemoteStream,
          onConnectionStateChange
        );
      });

      // If we initiated the call, create offer
      if (activeCall.caller_id === user.id) {
        const pc = createPeerConnection(
          activeCall.id,
          user.id,
          activeCall.callee_id,
          stream,
          addRemoteStream,
          onConnectionStateChange
        );
        peersRef.current[activeCall.callee_id] = pc;
        await createOfferForPeer(activeCall.id, user.id, activeCall.callee_id, pc);
      }
    };

    setupWebRTC();

    return () => {
      if (signalingChannelRef.current) {
        signalingChannelRef.current.unsubscribe();
      }
    };
  }, [activeCall, user?.id, initLocalMedia, addRemoteStream, onConnectionStateChange]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      closePeerConnections(peersRef.current);
    };
  }, [localStream]);

  // Start a call
  const handleStartCall = async (targetUser, withVideo = true) => {
    setIsLoading(true);
    setIsVideoOn(withVideo);
    try {
      await initLocalMedia();
      const call = await callsService.startCall(targetUser.id);
      setActiveCall({ ...call, targetUser });
    } catch (error) {
      console.error('Failed to start call:', error);
      alert('Failed to start call. Make sure Supabase is configured.');
    } finally {
      setIsLoading(false);
    }
  };

  // Accept incoming call
  const handleAcceptCall = async () => {
    setIsLoading(true);
    try {
      await acceptCall();
    } catch (error) {
      console.error('Failed to accept call:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // End the call
  const handleEndCall = async () => {
    setIsLoading(true);
    try {
      // Stop local stream
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        setLocalStream(null);
      }
      
      // Close peer connections
      closePeerConnections(peersRef.current);
      peersRef.current = {};
      setRemoteStreams({});

      // Close signaling channel
      if (signalingChannelRef.current) {
        signalingChannelRef.current.unsubscribe();
        signalingChannelRef.current = null;
      }

      await endCurrentCall();
    } catch (error) {
      console.error('Failed to end call:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = isMuted;
      });
    }
    setIsMuted(!isMuted);
  };

  // Toggle video
  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoOn;
      });
    }
    setIsVideoOn(!isVideoOn);
  };

  const filteredUsers = allUsers.filter(u =>
    u.email !== user?.email &&
    (u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-emerald-400" />
                <span className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Calling
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Active Call Full Screen UI */}
      <AnimatePresence>
        {activeCall && !isMinimized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-950 z-50 flex flex-col"
          >
            {/* Call header */}
            <div className="flex items-center justify-between p-4 bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-white font-medium">
                  {activeCall.status === 'ringing' ? 'Calling...' : 'Connected'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-mono">{formattedDuration}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(true)}
                  className="text-zinc-400 hover:text-white"
                >
                  <Minimize2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Video area */}
            <div className="flex-1 relative bg-zinc-900">
              {/* Remote video(s) */}
              <div className="absolute inset-0 flex items-center justify-center">
                {Object.entries(remoteStreams).length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 w-full h-full p-4">
                    {Object.entries(remoteStreams).map(([userId, stream]) => (
                      <video
                        key={userId}
                        className="w-full h-full object-cover rounded-2xl bg-zinc-800"
                        autoPlay
                        playsInline
                        ref={(el) => el && (el.srcObject = stream)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6 animate-pulse">
                      {getInitials(activeCall.targetUser?.full_name || 'User')}
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {activeCall.targetUser?.full_name || 'Unknown User'}
                    </h2>
                    <p className="text-zinc-400">
                      {activeCall.status === 'ringing' ? 'Ringing...' : 'Connected'}
                    </p>
                  </div>
                )}
              </div>

              {/* Local video (picture-in-picture) */}
              {localStream && isVideoOn && (
                <div className="absolute bottom-24 right-4 w-32 h-48 rounded-xl overflow-hidden shadow-2xl border-2 border-zinc-700">
                  <video
                    ref={localVideoRef}
                    className="w-full h-full object-cover bg-zinc-800"
                    autoPlay
                    playsInline
                    muted
                  />
                </div>
              )}
            </div>

            {/* Call controls */}
            <div className="bg-zinc-900/80 backdrop-blur-xl p-6">
              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={toggleMute}
                  size="lg"
                  variant="outline"
                  className={`w-14 h-14 rounded-full ${isMuted ? 'bg-red-500/20 border-red-500 text-red-400' : 'border-zinc-700'}`}
                >
                  {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </Button>

                <Button
                  onClick={toggleVideo}
                  size="lg"
                  variant="outline"
                  className={`w-14 h-14 rounded-full ${!isVideoOn ? 'bg-red-500/20 border-red-500 text-red-400' : 'border-zinc-700'}`}
                >
                  {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                </Button>

                <Button
                  onClick={handleEndCall}
                  size="lg"
                  className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-7 h-7 animate-spin" />
                  ) : (
                    <PhoneOff className="w-7 h-7" />
                  )}
                </Button>

                <Button
                  onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                  size="lg"
                  variant="outline"
                  className={`w-14 h-14 rounded-full ${!isSpeakerOn ? 'bg-red-500/20 border-red-500 text-red-400' : 'border-zinc-700'}`}
                >
                  {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Incoming Call Modal */}
      <AnimatePresence>
        {incomingCall && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="text-center"
            >
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 animate-pulse ring-4 ring-emerald-500/30 ring-offset-4 ring-offset-zinc-950">
                <PhoneIncoming className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Incoming Call</h3>
              <p className="text-zinc-400 mb-10">Someone is calling you...</p>
              
              <div className="flex gap-6 justify-center">
                <Button
                  onClick={rejectCall}
                  size="lg"
                  className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600"
                >
                  <PhoneOff className="w-7 h-7" />
                </Button>
                <Button
                  onClick={handleAcceptCall}
                  size="lg"
                  className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-7 h-7 animate-spin" />
                  ) : (
                    <Phone className="w-7 h-7" />
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Search Users */}
        <Card className="bg-zinc-900/50 border-zinc-800 mb-8">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Start a Call</h2>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users to call..."
                className="pl-10 bg-zinc-800 border-zinc-700"
              />
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredUsers.length === 0 ? (
                <p className="text-zinc-500 text-center py-4">No users found</p>
              ) : (
                filteredUsers.map(u => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
                        {getInitials(u.full_name || u.email)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{u.full_name || u.email}</p>
                        <p className="text-zinc-400 text-sm">{u.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleStartCall(u, false)}
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-600"
                        disabled={isLoading || !!activeCall}
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Audio
                      </Button>
                      <Button
                        onClick={() => handleStartCall(u, true)}
                        size="sm"
                        variant="outline"
                        className="border-zinc-700"
                        disabled={isLoading || !!activeCall}
                      >
                        <Video className="w-4 h-4 mr-1" />
                        Video
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Call History */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              Recent Calls
            </h2>

            <div className="space-y-3">
              {callHistory.length === 0 ? (
                <p className="text-zinc-500 text-center py-8">No call history yet</p>
              ) : (
                callHistory.slice(0, 10).map(call => (
                  <div
                    key={call.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        call.status === 'missed' ? 'bg-red-500/20' : 'bg-zinc-700'
                      }`}>
                        {call.callerId === user?.id ? (
                          <PhoneOutgoing className={`w-5 h-5 ${call.status === 'missed' ? 'text-red-400' : 'text-blue-400'}`} />
                        ) : (
                          <PhoneIncoming className={`w-5 h-5 ${call.status === 'missed' ? 'text-red-400' : 'text-emerald-400'}`} />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {call.callerId === user?.id ? call.calleeId : call.callerId}
                        </p>
                        <p className="text-zinc-400 text-sm">
                          {call.status === 'missed' ? 'Missed call' : `${Math.floor(call.durationSeconds / 60)}:${String(Math.floor(call.durationSeconds % 60)).padStart(2, '0')}`}
                          {' • '}
                          {new Date(call.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-zinc-400 hover:text-white">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
