import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../App';
import { callsService, presenceService } from '../api/supabaseClient';
import { usersAPI } from '../api/client';
import { useQuery } from '@tanstack/react-query';
import { getInitials } from '../utils';
import {
  ArrowLeft, Phone, PhoneOff, PhoneIncoming, PhoneOutgoing,
  Video, VideoOff, Mic, MicOff, Volume2, VolumeX, Users,
  Clock, Search, X, Loader2
} from 'lucide-react';

export default function Calling() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCall, setCurrentCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Get users list from MongoDB
  const { data: allUsers = [] } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersAPI.list().then(r => r.data),
  });

  // Set presence on mount
  useEffect(() => {
    presenceService.setOnline('web');
    
    // Set offline on unmount
    return () => {
      presenceService.setOffline();
    };
  }, []);

  // Subscribe to incoming calls
  useEffect(() => {
    if (!user?.id) return;

    const subscription = callsService.subscribeToIncomingCalls(user.id, (call) => {
      if (call.status === 'ringing' && !currentCall) {
        setIncomingCall(call);
      } else if (call.status === 'active' && incomingCall?.id === call.id) {
        setCurrentCall(call);
        setIncomingCall(null);
      } else if (['ended', 'missed'].includes(call.status)) {
        if (currentCall?.id === call.id) setCurrentCall(null);
        if (incomingCall?.id === call.id) setIncomingCall(null);
      }
    });

    return () => subscription?.unsubscribe?.();
  }, [user?.id, currentCall, incomingCall]);

  // Call duration timer
  useEffect(() => {
    let interval;
    if (currentCall?.status === 'active') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [currentCall?.status]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = async (targetUser) => {
    setIsLoading(true);
    try {
      const call = await callsService.startCall(targetUser.id);
      setCurrentCall({ ...call, targetUser });
    } catch (error) {
      console.error('Failed to start call:', error);
      alert('Failed to start call. Make sure Supabase is configured.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerCall = async () => {
    if (!incomingCall) return;
    setIsLoading(true);
    try {
      const call = await callsService.answerCall(incomingCall.id);
      setCurrentCall(call);
      setIncomingCall(null);
    } catch (error) {
      console.error('Failed to answer call:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeclineCall = async () => {
    if (!incomingCall) return;
    try {
      await callsService.endCall(incomingCall.id, 'missed');
      setIncomingCall(null);
    } catch (error) {
      console.error('Failed to decline call:', error);
    }
  };

  const handleEndCall = async () => {
    if (!currentCall) return;
    setIsLoading(true);
    try {
      await callsService.endCall(currentCall.id, 'ended');
      setCurrentCall(null);
      setCallDuration(0);
    } catch (error) {
      console.error('Failed to end call:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = allUsers.filter(u =>
    u.email !== user?.email &&
    (u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sample call history (would come from MongoDB in production)
  const callHistory = [
    { id: '1', name: 'John Doe', type: 'outgoing', status: 'ended', duration: 325, time: '2 hours ago' },
    { id: '2', name: 'Jane Smith', type: 'incoming', status: 'missed', duration: 0, time: '5 hours ago' },
    { id: '3', name: 'Mike Johnson', type: 'outgoing', status: 'ended', duration: 180, time: 'Yesterday' },
  ];

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

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Active Call UI */}
        <AnimatePresence>
          {currentCall && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 bg-zinc-950 z-50 flex flex-col items-center justify-center p-8"
            >
              <div className="text-center mb-8">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6">
                  {getInitials(currentCall.targetUser?.full_name || 'User')}
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {currentCall.targetUser?.full_name || 'Unknown User'}
                </h2>
                <p className="text-zinc-400 flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  {currentCall.status === 'ringing' ? 'Calling...' : formatDuration(callDuration)}
                </p>
              </div>

              {/* Call Controls */}
              <div className="flex items-center gap-6">
                <Button
                  onClick={() => setIsMuted(!isMuted)}
                  size="lg"
                  variant={isMuted ? "secondary" : "outline"}
                  className={`w-16 h-16 rounded-full ${isMuted ? 'bg-red-500/20 border-red-500' : 'border-zinc-700'}`}
                >
                  {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </Button>

                <Button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  size="lg"
                  variant={!isVideoOn ? "secondary" : "outline"}
                  className={`w-16 h-16 rounded-full ${!isVideoOn ? 'bg-red-500/20 border-red-500' : 'border-zinc-700'}`}
                >
                  {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                </Button>

                <Button
                  onClick={handleEndCall}
                  size="lg"
                  className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-8 h-8 animate-spin" />
                  ) : (
                    <PhoneOff className="w-8 h-8" />
                  )}
                </Button>

                <Button
                  onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                  size="lg"
                  variant={!isSpeakerOn ? "secondary" : "outline"}
                  className={`w-16 h-16 rounded-full ${!isSpeakerOn ? 'bg-red-500/20 border-red-500' : 'border-zinc-700'}`}
                >
                  {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                </Button>
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
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 text-center max-w-sm w-full"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 animate-pulse">
                  <PhoneIncoming className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Incoming Call</h3>
                <p className="text-zinc-400 mb-8">Someone is calling you...</p>
                
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={handleDeclineCall}
                    size="lg"
                    className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600"
                  >
                    <PhoneOff className="w-6 h-6" />
                  </Button>
                  <Button
                    onClick={handleAnswerCall}
                    size="lg"
                    className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <Phone className="w-6 h-6" />
                    )}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Users to Call */}
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
                    className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800"
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
                        onClick={() => handleStartCall(u)}
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-600"
                        disabled={isLoading}
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                      <Button
                        onClick={() => handleStartCall(u)}
                        size="sm"
                        variant="outline"
                        className="border-zinc-700"
                        disabled={isLoading}
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
              {callHistory.map(call => (
                <div
                  key={call.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      call.status === 'missed' ? 'bg-red-500/20' : 'bg-zinc-700'
                    }`}>
                      {call.type === 'incoming' ? (
                        <PhoneIncoming className={`w-5 h-5 ${call.status === 'missed' ? 'text-red-400' : 'text-emerald-400'}`} />
                      ) : (
                        <PhoneOutgoing className="w-5 h-5 text-blue-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium">{call.name}</p>
                      <p className="text-zinc-400 text-sm">
                        {call.status === 'missed' ? 'Missed call' : formatDuration(call.duration)} • {call.time}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-zinc-400 hover:text-white">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
