import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useAuth } from '../App';
import { ArrowLeft, Crown, Check, Sparkles, Building2, Zap } from 'lucide-react';

export default function SubscriptionPlans() {
  const { user } = useAuth();
  const [currentTier, setCurrentTier] = useState('free');

  const plans = [
    {
      name: 'Free',
      tier: 'free',
      price: '$0',
      period: 'forever',
      icon: Sparkles,
      color: 'zinc',
      features: [
        '50 Sofia messages/month',
        '5 image generations/month',
        'Basic features only',
        'Community support'
      ]
    },
    {
      name: 'Premium',
      tier: 'premium',
      price: '$50',
      period: 'per month',
      icon: Crown,
      color: 'yellow',
      popular: true,
      features: [
        'Unlimited Sofia messages',
        '100 image generations/month',
        '50 music generations/month',
        'Advanced code refactoring',
        'Collaborative whiteboard',
        'Priority support'
      ]
    },
    {
      name: 'Enterprise',
      tier: 'enterprise',
      price: '$250',
      period: 'per month',
      icon: Building2,
      color: 'emerald',
      features: [
        'Unlimited everything',
        'Custom persona training',
        'Enhanced security & compliance',
        'Multi-user team collaboration',
        'Dedicated account manager',
        'Priority 24/7 support',
        'API access'
      ]
    },
    {
      name: 'Elite',
      tier: 'elite',
      price: '$500',
      period: 'per month',
      icon: Zap,
      color: 'purple',
      features: [
        'All Enterprise features',
        'Professional music production',
        'Hollywood-level video creation',
        'AI beat generation',
        'Movie production tools',
        'Elite-only features'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <Crown className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Subscription Plans
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Choose Your Plan
          </h2>
          <p className="text-zinc-400 text-lg">
            Unlock Sofia's full potential with advanced features
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isCurrentPlan = currentTier === plan.tier;

            return (
              <motion.div
                key={plan.tier}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-zinc-900/50 border rounded-2xl p-8 ${
                  plan.popular
                    ? 'border-yellow-500 ring-2 ring-yellow-500/20'
                    : 'border-zinc-800'
                } ${isCurrentPlan ? 'ring-2 ring-emerald-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-500 text-black text-sm font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                {isCurrentPlan && (
                  <div className="absolute -top-4 right-4 px-4 py-1 bg-emerald-500 text-white text-sm font-bold rounded-full">
                    CURRENT
                  </div>
                )}

                <div className="text-center mb-6">
                  <Icon className={`w-12 h-12 mx-auto mb-4 ${
                    plan.color === 'yellow' ? 'text-yellow-400' :
                    plan.color === 'emerald' ? 'text-emerald-400' :
                    plan.color === 'purple' ? 'text-purple-400' :
                    'text-zinc-400'
                  }`} />
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-zinc-400">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-zinc-300 text-sm">
                      <Check className={`w-5 h-5 flex-shrink-0 ${
                        plan.color === 'yellow' ? 'text-yellow-400' :
                        plan.color === 'emerald' ? 'text-emerald-400' :
                        plan.color === 'purple' ? 'text-purple-400' :
                        'text-zinc-400'
                      }`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  disabled={isCurrentPlan}
                  className={`w-full ${
                    isCurrentPlan
                      ? 'bg-zinc-700 cursor-not-allowed'
                      : plan.color === 'yellow'
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                      : plan.color === 'emerald'
                      ? 'bg-emerald-500 hover:bg-emerald-600'
                      : plan.color === 'purple'
                      ? 'bg-purple-500 hover:bg-purple-600'
                      : 'bg-zinc-700 hover:bg-zinc-600'
                  }`}
                >
                  {isCurrentPlan ? 'Current Plan' : `Upgrade to ${plan.name}`}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
