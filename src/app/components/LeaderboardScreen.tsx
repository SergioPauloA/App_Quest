import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Crown } from 'lucide-react';
import { BottomNav } from './HomeDashboard';

const leaderboardData = [
  { rank: 1, avatar: '🧙', name: 'MagicMaster99', xp: 15420, isCurrentUser: false },
  { rank: 2, avatar: '👨‍🚀', name: 'SpaceExplorer', xp: 14850, isCurrentUser: false },
  { rank: 3, avatar: '🐱‍👤', name: 'ShadowNinja', xp: 13990, isCurrentUser: false },
  { rank: 4, avatar: '🦸', name: 'CoolHero42', xp: 12650, isCurrentUser: true },
  { rank: 5, avatar: '👩‍🔬', name: 'ScienceQueen', xp: 11230, isCurrentUser: false },
  { rank: 6, avatar: '🧙', name: 'WizardKing', xp: 10890, isCurrentUser: false },
  { rank: 7, avatar: '👨‍🚀', name: 'CosmicGamer', xp: 9420, isCurrentUser: false },
  { rank: 8, avatar: '🥷', name: 'StealthPro', xp: 8765, isCurrentUser: false },
];

const tabs = ['Global', 'Friends', 'School'];

export default function LeaderboardScreen() {
  const [activeTab, setActiveTab] = useState('Global');

  const topThree = leaderboardData.slice(0, 3);
  const restOfList = leaderboardData.slice(3);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black text-white">Leaderboard</h1>
          <div className="bg-primary/20 px-4 py-2 rounded-full">
            <p className="text-accent font-bold text-sm">Resets in 4d 12h</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                activeTab === tab
                  ? 'bg-primary text-white'
                  : 'bg-background/50 text-muted-foreground hover:bg-primary/30'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-24">
        {/* Podium */}
        <div className="p-6">
          <div className="flex items-end justify-center gap-4 mb-8">
            {/* 2nd Place */}
            <PodiumCard player={topThree[1]} rank={2} />

            {/* 1st Place */}
            <PodiumCard player={topThree[0]} rank={1} isFirst />

            {/* 3rd Place */}
            <PodiumCard player={topThree[2]} rank={3} />
          </div>

          {/* Scrollable List */}
          <div className="space-y-3">
            {restOfList.map((player, index) => (
              <motion.div
                key={player.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-2xl ${
                  player.isCurrentUser
                    ? 'bg-gradient-to-r from-primary to-purple-700 ring-2 ring-accent'
                    : 'bg-card'
                }`}
              >
                <div className="w-10 text-center">
                  <span className={`font-black ${player.isCurrentUser ? 'text-accent' : 'text-muted-foreground'}`}>
                    #{player.rank}
                  </span>
                </div>

                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-2xl">
                  {player.avatar}
                </div>

                <div className="flex-1">
                  <p className={`font-bold ${player.isCurrentUser ? 'text-white' : 'text-white'}`}>
                    {player.name}
                  </p>
                  <p className={`text-sm ${player.isCurrentUser ? 'text-accent' : 'text-muted-foreground'}`}>
                    {player.xp.toLocaleString()} XP
                  </p>
                </div>

                {player.isCurrentUser && (
                  <div className="bg-accent text-background px-3 py-1 rounded-full text-xs font-black">
                    YOU
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage="map" />
    </div>
  );
}

function PodiumCard({ player, rank, isFirst = false }: any) {
  const heights = { 1: 'h-32', 2: 'h-24', 3: 'h-20' };
  const crownColors = { 1: 'text-accent', 2: 'text-gray-300', 3: 'text-orange-400' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
      className="flex flex-col items-center"
    >
      <div className="relative mb-2">
        <div className={`w-16 h-16 ${isFirst ? 'w-20 h-20' : ''} bg-primary rounded-full flex items-center justify-center text-3xl ${isFirst ? 'text-4xl' : ''} border-4 ${isFirst ? 'border-accent' : 'border-card'}`}>
          {player.avatar}
        </div>
        <div className={`absolute -top-2 -right-2 ${crownColors[rank as keyof typeof crownColors]}`}>
          <Crown className={`${isFirst ? 'w-8 h-8' : 'w-6 h-6'}`} fill="currentColor" />
        </div>
      </div>

      <p className={`font-bold text-white text-center mb-1 ${isFirst ? 'text-base' : 'text-sm'}`}>
        {player.name}
      </p>

      <p className="text-xs text-accent font-bold mb-3">
        {player.xp.toLocaleString()} XP
      </p>

      <div className={`w-20 ${heights[rank as keyof typeof heights]} bg-gradient-to-t ${
        rank === 1 ? 'from-accent to-yellow-600' :
        rank === 2 ? 'from-gray-400 to-gray-300' :
        'from-orange-600 to-orange-400'
      } rounded-t-2xl flex items-start justify-center pt-3 shadow-lg`}>
        <span className="text-2xl font-black text-background">#{rank}</span>
      </div>
    </motion.div>
  );
}
