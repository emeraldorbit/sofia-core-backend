import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../App';
import { 
  Sparkles, Building2, Bitcoin, Phone, Music, Video, 
  Users, Settings, Bell, MessageSquare, TrendingUp, 
  Home, Shield, Crown, ArrowRight, LogOut
} from 'lucide-react';
import { createPageUrl } from '../utils';

export default function Dashboard() {
  const { user, logout } = useAuth();

  const quickActions = [
    { icon: Sparkles, title: 'Sofia AI', desc: 'Chat with your AI assistant', href: '/sofia', color: 'emerald' },
    { icon: Building2, title: 'Properties', desc: 'Manage real estate', href: '/properties', color: 'blue' },
    { icon: Bitcoin, title: 'Crypto', desc: 'Trading dashboard', href: '/crypto', color: 'orange' },
    { icon: Phone, title: 'Calling', desc: 'Voice & video calls', href: '/calling', color: 'green' },
    { icon: Users, title: 'Contacts', desc: 'Manage contacts', href: '/contacts', color: 'purple' },
    { icon: MessageSquare, title: 'Messages', desc: 'Chat with users', href: '/chat', color: 'pink' },
  ];

  const stats = [
    { label: 'Sofia Messages', value: '0/50', icon: Sparkles },
    { label: 'Properties', value: '0', icon: Building2 },
    { label: 'Contacts', value: '0', icon: Users },
    { label: 'Messages', value: '0', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white hidden sm:block" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  EmeraldOrbit
                </span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/sofia" className="text-zinc-400 hover:text-white transition-colors">Sofia</Link>
              <Link to="/properties" className="text-zinc-400 hover:text-white transition-colors">Properties</Link>
              <Link to="/crypto" className="text-zinc-400 hover:text-white transition-colors">Crypto</Link>
              <Link to="/contacts" className="text-zinc-400 hover:text-white transition-colors">Contacts</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                <Bell className="w-5 h-5" />
              </Button>
              <Link to="/settings">
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/profile">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-semibold cursor-pointer">
                  {user?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'}
                </div>
              </Link>
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-red-400" onClick={logout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Welcome back, {user?.full_name || 'User'}!
          </h1>
          <p className="text-zinc-400">Here's what's happening in your EmeraldOrbit.</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-zinc-400">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Link to={action.href}>
                  <Card className="bg-zinc-900/50 border-zinc-800 hover:border-emerald-500/30 transition-all group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-${action.color}-500/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <action.icon className={`w-6 h-6 text-${action.color}-400`} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-1">{action.title}</h3>
                            <p className="text-sm text-zinc-400">{action.desc}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Sofia AI Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Meet Sofia, Your AI Assistant
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    Sofia can help you with real estate, crypto analysis, scheduling, and much more. 
                    Start a conversation and experience intelligent assistance.
                  </p>
                  <Link to="/sofia">
                    <Button className="bg-emerald-500 hover:bg-emerald-600">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Chat with Sofia
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
