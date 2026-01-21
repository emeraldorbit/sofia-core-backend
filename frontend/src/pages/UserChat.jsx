import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../App';
import { usersAPI, messagesAPI, presenceAPI } from '../api/client';
import { getInitials } from '../utils';
import { ArrowLeft, Search, Send, Circle } from 'lucide-react';

export default function UserChat() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: allUsers = [] } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersAPI.list().then(r => r.data),
  });

  const { data: presences = [] } = useQuery({
    queryKey: ['presences'],
    queryFn: () => presenceAPI.list().then(r => r.data),
    refetchInterval: 10000,
  });

  const { data: messages = [] } = useQuery({
    queryKey: ['messages', selectedUser?.email],
    queryFn: () => messagesAPI.list(user?.email, selectedUser?.email).then(r => r.data),
    enabled: !!selectedUser && !!user?.email,
    refetchInterval: 3000,
  });

  const sendMutation = useMutation({
    mutationFn: (msg) => messagesAPI.send({ receiver_email: selectedUser.email, message: msg }, user?.email),
    onSuccess: () => {
      queryClient.invalidateQueries(['messages']);
      setMessage('');
    },
  });

  const handleSend = () => {
    if (!message.trim() || !selectedUser) return;
    sendMutation.mutate(message);
  };

  const getUserPresence = (email) => {
    const presence = presences.find(p => p.user_email === email);
    return presence?.status || 'offline';
  };

  const filteredUsers = allUsers.filter(u =>
    u.email !== user?.email &&
    (u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-white font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Messages
            </h1>
            <div className="w-10" />
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Users List */}
        <div className="w-80 border-r border-zinc-800 bg-zinc-900/50 overflow-y-auto">
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className="pl-10 bg-zinc-800 border-zinc-700"
              />
            </div>
            <div className="space-y-2">
              {filteredUsers.map(u => {
                const status = getUserPresence(u.email);
                return (
                  <button
                    key={u.id}
                    onClick={() => setSelectedUser(u)}
                    className={`w-full p-3 rounded-lg flex items-center gap-3 ${
                      selectedUser?.email === u.email
                        ? 'bg-emerald-500/20 border border-emerald-500/30'
                        : 'bg-zinc-800/50 hover:bg-zinc-800'
                    }`}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
                        {getInitials(u.full_name || u.email)}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-zinc-900 ${
                        status === 'online' ? 'bg-emerald-400' :
                        status === 'away' ? 'bg-yellow-400' : 'bg-zinc-600'
                      }`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-white text-sm font-semibold truncate">{u.full_name || u.email}</p>
                      <p className="text-zinc-400 text-xs truncate">{u.email}</p>
                    </div>
                  </button>
                );
              })}
              {filteredUsers.length === 0 && (
                <p className="text-center text-zinc-500 py-8">No users found</p>
              )}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
                    {getInitials(selectedUser.full_name || selectedUser.email)}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{selectedUser.full_name || selectedUser.email}</p>
                    <p className="text-zinc-400 text-xs">{getUserPresence(selectedUser.email)}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => {
                  const isOwn = msg.sender_email === user?.email;
                  return (
                    <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md px-4 py-2 rounded-2xl ${
                        isOwn ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-white'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(msg.created_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 bg-zinc-800 border-zinc-700"
                  />
                  <Button onClick={handleSend} disabled={!message.trim()} className="bg-emerald-500 hover:bg-emerald-600">
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Send className="w-20 h-20 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400 text-lg">Select a user to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
