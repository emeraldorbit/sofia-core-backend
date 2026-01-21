import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { useAuth } from '../App';
import { ArrowLeft, Settings as SettingsIcon, User, Bell, Shield, Palette } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();

  const settingsSections = [
    { icon: User, title: 'Profile', desc: 'Manage your account details', href: '/profile' },
    { icon: Bell, title: 'Notifications', desc: 'Configure notification preferences', href: '/settings' },
    { icon: Shield, title: 'Security', desc: 'Password and security settings', href: '/settings' },
    { icon: Palette, title: 'Appearance', desc: 'Theme and display options', href: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <SettingsIcon className="w-6 h-6 text-emerald-400" />
              <span className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Settings
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-4">
          {settingsSections.map((section) => (
            <Link key={section.title} to={section.href}>
              <Card className="bg-zinc-900/50 border-zinc-800 hover:border-emerald-500/30 transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                      <p className="text-sm text-zinc-400">{section.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="bg-zinc-900/50 border-zinc-800 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-zinc-400">Email</Label>
              <Input value={user?.email || ''} disabled className="mt-2 bg-zinc-800 border-zinc-700 text-zinc-400" />
            </div>
            <div>
              <Label className="text-zinc-400">Account Type</Label>
              <Input value="Free Plan" disabled className="mt-2 bg-zinc-800 border-zinc-700 text-zinc-400" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
