import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, callsService, presenceService } from '../api/supabaseClient';
import { playRingtone, stopRingtone, playCallEndSound } from '../lib/ringtone';
import { useAuth } from '../App';

const CallContext = createContext(null);

export const useCall = () => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error('useCall must be used within CallProvider');
  }
  return context;
};

export function CallProvider({ children }) {
  const { user } = useAuth();
  const [activeCall, setActiveCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  // Subscribe to incoming calls
  useEffect(() => {
    if (!user?.id || !supabase) return;

    const subscription = callsService.subscribeToIncomingCalls(user.id, (call) => {
      if (call.status === 'ringing' && !activeCall) {
        playRingtone();
        setIncomingCall(call);
        
        // Browser notification
        if (Notification.permission === 'granted') {
          new Notification('Incoming Call', {
            body: `Call from ${call.caller_id}`,
            icon: '/favicon.ico',
            tag: 'incoming-call',
          });
        }
      } else if (call.status === 'active' && incomingCall?.id === call.id) {
        stopRingtone();
        setActiveCall(call);
        setIncomingCall(null);
      } else if (['ended', 'missed', 'failed'].includes(call.status)) {
        stopRingtone();
        if (activeCall?.id === call.id) {
          playCallEndSound();
          setActiveCall(null);
          setCallDuration(0);
        }
        if (incomingCall?.id === call.id) {
          setIncomingCall(null);
        }
      }
    });

    return () => subscription?.unsubscribe?.();
  }, [user?.id, activeCall, incomingCall]);

  // Call duration timer
  useEffect(() => {
    let interval;
    if (activeCall?.status === 'active') {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeCall?.status]);

  // Presence management
  useEffect(() => {
    if (!user?.id) return;

    presenceService.setOnline('web');

    // Idle detection
    let idleTimer;
    const resetIdle = () => {
      clearTimeout(idleTimer);
      presenceService.setOnline('web');
      idleTimer = setTimeout(() => {
        presenceService.updatePresence('idle', 'web');
      }, 60000); // 1 minute idle timeout
    };

    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keydown', resetIdle);

    // Offline on tab close
    const handleUnload = () => {
      presenceService.setOffline();
    };
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('keydown', resetIdle);
      window.removeEventListener('beforeunload', handleUnload);
      presenceService.setOffline();
    };
  }, [user?.id]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const acceptCall = useCallback(async () => {
    if (!incomingCall) return;
    stopRingtone();
    try {
      const call = await callsService.answerCall(incomingCall.id);
      setActiveCall(call);
      setIncomingCall(null);
      return call;
    } catch (error) {
      console.error('Failed to accept call:', error);
    }
  }, [incomingCall]);

  const rejectCall = useCallback(async () => {
    if (!incomingCall) return;
    stopRingtone();
    try {
      await callsService.endCall(incomingCall.id, 'missed');
      setIncomingCall(null);
    } catch (error) {
      console.error('Failed to reject call:', error);
    }
  }, [incomingCall]);

  const endCurrentCall = useCallback(async () => {
    if (!activeCall) return;
    try {
      await callsService.endCall(activeCall.id, 'ended');
      playCallEndSound();
      setActiveCall(null);
      setCallDuration(0);
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  }, [activeCall]);

  const startCall = useCallback(async (targetUserId) => {
    try {
      const call = await callsService.startCall(targetUserId);
      setActiveCall(call);
      return call;
    } catch (error) {
      console.error('Failed to start call:', error);
      throw error;
    }
  }, []);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const value = {
    activeCall,
    setActiveCall,
    incomingCall,
    callDuration,
    formattedDuration: formatDuration(callDuration),
    isMinimized,
    setIsMinimized,
    acceptCall,
    rejectCall,
    endCurrentCall,
    startCall,
  };

  return (
    <CallContext.Provider value={value}>
      {children}
      
      {/* Active Call Bar - shows globally when minimized */}
      {activeCall && isMinimized && (
        <ActiveCallBar 
          call={activeCall} 
          duration={formatDuration(callDuration)}
          onMaximize={() => setIsMinimized(false)}
          onEnd={endCurrentCall}
        />
      )}
    </CallContext.Provider>
  );
}

// Floating call bar component
function ActiveCallBar({ call, duration, onMaximize, onEnd }) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900/95 backdrop-blur-xl border border-emerald-500/30 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 z-50 animate-slide-up">
      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
      <span className="text-sm font-medium">On call</span>
      <span className="text-emerald-400 font-mono">{duration}</span>
      <button 
        onClick={onMaximize}
        className="text-zinc-400 hover:text-white text-sm"
      >
        Expand
      </button>
      <button 
        onClick={onEnd}
        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full text-sm font-medium"
      >
        End
      </button>
    </div>
  );
}

export default CallContext;
