import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../App';
import { 
  ArrowLeft, Bitcoin, TrendingUp, TrendingDown, Wallet, 
  ArrowUpRight, ArrowDownRight, RefreshCw, Plus
} from 'lucide-react';

export default function CryptoHub() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('portfolio');

  // Sample crypto data
  const portfolio = [
    { symbol: 'BTC', name: 'Bitcoin', amount: 0.5, price: 67500, change: 2.5 },
    { symbol: 'ETH', name: 'Ethereum', amount: 5.2, price: 3450, change: -1.2 },
    { symbol: 'SOL', name: 'Solana', amount: 50, price: 145, change: 5.8 },
    { symbol: 'DOGE', name: 'Dogecoin', amount: 10000, price: 0.12, change: -3.1 },
  ];

  const totalValue = portfolio.reduce((acc, coin) => acc + (coin.amount * coin.price), 0);

  const recentTransactions = [
    { type: 'buy', symbol: 'BTC', amount: 0.1, price: 67000, date: '2024-01-15' },
    { type: 'sell', symbol: 'ETH', amount: 1.0, price: 3500, date: '2024-01-14' },
    { type: 'buy', symbol: 'SOL', amount: 20, price: 140, date: '2024-01-13' },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
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
                <Bitcoin className="w-6 h-6 text-orange-400" />
                <span className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Crypto Hub
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-zinc-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                <Plus className="w-4 h-4 mr-2" />
                Buy Crypto
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Portfolio Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/30">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="text-zinc-400 mb-2">Total Portfolio Value</p>
                  <p className="text-4xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {formatCurrency(totalValue)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">+$2,450.00 (3.2%)</span>
                    <span className="text-zinc-500">24h</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-zinc-400 text-sm">Assets</p>
                    <p className="text-2xl font-bold text-white">{portfolio.length}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-zinc-400 text-sm">Transactions</p>
                    <p className="text-2xl font-bold text-white">{recentTransactions.length}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-zinc-800/50 border border-zinc-700 mb-6">
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-orange-500">
              <Wallet className="w-4 h-4 mr-2" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-orange-500">
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Transactions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <div className="grid gap-4">
              {portfolio.map((coin, index) => (
                <motion.div
                  key={coin.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-zinc-900/50 border-zinc-800 hover:border-orange-500/30 transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                            <span className="text-orange-400 font-bold">{coin.symbol}</span>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{coin.name}</h3>
                            <p className="text-zinc-400 text-sm">{coin.amount} {coin.symbol}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">{formatCurrency(coin.amount * coin.price)}</p>
                          <div className={`flex items-center justify-end gap-1 text-sm ${
                            coin.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                          }`}>
                            {coin.change >= 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            <span>{coin.change >= 0 ? '+' : ''}{coin.change}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <div className="space-y-4">
              {recentTransactions.map((tx, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.type === 'buy' ? 'bg-emerald-500/10' : 'bg-red-500/10'
                          }`}>
                            {tx.type === 'buy' ? (
                              <ArrowDownRight className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <ArrowUpRight className="w-5 h-5 text-red-400" />
                            )}
                          </div>
                          <div>
                            <p className="text-white font-semibold capitalize">{tx.type} {tx.symbol}</p>
                            <p className="text-zinc-400 text-sm">{tx.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">{tx.amount} {tx.symbol}</p>
                          <p className="text-zinc-400 text-sm">{formatCurrency(tx.amount * tx.price)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
