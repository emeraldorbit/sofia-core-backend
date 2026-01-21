import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Slider } from '../components/ui/slider';
import { useAuth } from '../App';
import { authAPI } from '../api/client';
import { ArrowLeft, User, Save, LogOut } from 'lucide-react';
import { toast } from 'sonner';

export default function UserProfile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.full_name || '',
    email: user?.email || '',
    professionalism: 50,
    empathy: 50,
    humor: 50,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await authAPI.updateMe(user?.email, { full_name: profile.name });
      localStorage.setItem('sofiaSettings', JSON.stringify({
        professionalism: profile.professionalism,
        empathy: profile.empathy,
        humor: profile.humor,
      }));
      toast.success('Profile saved successfully!');
    } catch (error) {
      toast.error('Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <User className="w-5 h-5 text-emerald-400" />
              <span className="text-white font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                User Profile
              </span>
            </div>
            <Button onClick={handleSave} disabled={isSaving} className="bg-emerald-500 hover:bg-emerald-600">
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Your name"
                className="mt-2 bg-zinc-800 border-zinc-700"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={profile.email} disabled className="mt-2 bg-zinc-800 border-zinc-700 text-zinc-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Sofia's Personality</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Professionalism</Label>
                <span className="text-emerald-400 text-sm">{profile.professionalism}%</span>
              </div>
              <Slider
                value={[profile.professionalism]}
                onValueChange={(value) => setProfile({ ...profile, professionalism: value[0] })}
                max={100}
                step={1}
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label>Empathy</Label>
                <span className="text-emerald-400 text-sm">{profile.empathy}%</span>
              </div>
              <Slider
                value={[profile.empathy]}
                onValueChange={(value) => setProfile({ ...profile, empathy: value[0] })}
                max={100}
                step={1}
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label>Humor</Label>
                <span className="text-emerald-400 text-sm">{profile.humor}%</span>
              </div>
              <Slider
                value={[profile.humor]}
                onValueChange={(value) => setProfile({ ...profile, humor: value[0] })}
                max={100}
                step={1}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-6">
            <Button
              onClick={() => { if (confirm('Are you sure you want to log out?')) logout(); }}
              variant="outline"
              className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
