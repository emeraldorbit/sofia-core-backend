import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../App';
import { 
  ArrowLeft, Sparkles, Send, Bot, User, 
  Loader2, Settings, Crown, MessageSquare
} from 'lucide-react';

export default function Sofia() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: `Hello${user?.full_name ? `, ${user.full_name}` : ''}! I'm Sofia, your AI assistant. How can I help you today? I can assist with real estate, crypto analysis, scheduling, and much more.`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate AI response (in production, this would call the AI API)
    setTimeout(() => {
      const responses = [
        "I understand your request. Let me help you with that.",
        "That's a great question! Here's what I can tell you...",
        "I'd be happy to assist with that. Based on my analysis...",
        "Interesting! Let me look into that for you.",
        "I can help you with that. Here's my recommendation..."
      ];
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)] + "\n\nIs there anything else you'd like me to help with?"
      };

      setMessages(prev => [...prev, aiMessage]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-white font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Sofia AI
                  </h1>
                  <p className="text-xs text-zinc-400">Your intelligent assistant</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/subscription-plans">
                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                  <Crown className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Upgrade</span>
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-zinc-800 text-zinc-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-zinc-700 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-zinc-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-zinc-800 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                  <span className="text-sm text-zinc-400">Sofia is thinking...</span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-zinc-950 border-t border-zinc-800 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Sofia anything..."
              className="flex-1 bg-zinc-900 border-zinc-700"
              disabled={loading}
              data-testid="sofia-input"
            />
            <Button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-emerald-500 hover:bg-emerald-600"
              data-testid="sofia-send-btn"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-zinc-500 mt-2 text-center">
            Sofia can help with real estate, crypto, scheduling, and more.
          </p>
        </div>
      </div>
    </div>
  );
}
