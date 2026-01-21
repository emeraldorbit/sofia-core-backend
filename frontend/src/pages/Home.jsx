import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { 
  Sparkles, Building2, Bitcoin, Phone, Music, Video, 
  Users, Shield, ArrowRight, Star, Zap
} from 'lucide-react';

export default function Home() {
  const features = [
    { icon: Sparkles, title: 'Sofia AI Assistant', desc: 'Your intelligent companion for everything', color: 'emerald' },
    { icon: Building2, title: 'Real Estate Hub', desc: 'Complete property management', color: 'blue' },
    { icon: Bitcoin, title: 'Crypto Trading', desc: 'Advanced cryptocurrency platform', color: 'orange' },
    { icon: Phone, title: 'Communication', desc: 'Calls, messages, contacts', color: 'purple' },
    { icon: Music, title: 'Music Studio', desc: 'Create and share music', color: 'pink' },
    { icon: Video, title: 'Live Streaming', desc: 'Professional streaming tools', color: 'red' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                EmeraldOrbit
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-zinc-400 hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-emerald-500 hover:bg-emerald-600">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <Star className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">Enterprise Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Your Complete
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                Digital Universe
              </span>
            </h1>
            
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
              EmeraldOrbit brings together AI assistance, real estate, crypto trading, 
              communications, and creative tools in one powerful platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-lg px-8">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-zinc-700 text-lg px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Feature Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-2 shadow-2xl">
              <div className="rounded-xl bg-zinc-950 p-6 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Sofia AI</h3>
                  <p className="text-zinc-400">Your intelligent assistant is ready</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-zinc-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Everything You Need
            </h2>
            <p className="text-zinc-400 text-lg">One platform, unlimited possibilities</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:border-emerald-500/30 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 p-12 text-center">
            <Shield className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-zinc-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of professionals using EmeraldOrbit to manage their digital life.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-lg px-10">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold">EmeraldOrbit</span>
            </div>
            <p className="text-zinc-500 text-sm">
              © 2024 EmeraldOrbit. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-zinc-400 hover:text-white text-sm">Privacy</a>
              <a href="#" className="text-zinc-400 hover:text-white text-sm">Terms</a>
              <a href="#" className="text-zinc-400 hover:text-white text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
