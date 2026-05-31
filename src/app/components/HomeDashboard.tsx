import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, Target, Map, User, BookOpen, Trophy, Gift, Flame } from 'lucide-react';

export default function HomeDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <div className="bg-card p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-2xl">
              🦸
            </div>
            <div>
              <p className="text-white font-bold">CoolHero42</p>
              <p className="text-sm text-muted-foreground">Level 7 Scholar</p>
            </div>
          </div>
          <div className="bg-accent text-background px-4 py-2 rounded-full font-black text-sm">
            Level 7
          </div>
        </div>

        {/* XP Bar */}
        <div className="bg-background/50 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '65%' }}
            transition={{ duration: 1, delay: 0.3 }}
            className="bg-gradient-to-r from-primary to-accent h-full rounded-full"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">650 / 1000 XP to Level 8</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6 overflow-auto pb-24">
        {/* Daily Quest Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary to-purple-700 p-6 rounded-3xl shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black text-white">Daily Quest</h2>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <Flame className="w-5 h-5 text-accent" />
              <span className="text-white font-black">Day 12</span>
            </div>
          </div>
          <p className="text-white/90 mb-4">Complete 3 lessons to maintain your streak!</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-white/20 rounded-full h-2">
              <div className="bg-accent rounded-full h-full w-1/3" />
            </div>
            <span className="text-white font-bold text-sm">1/3</span>
          </div>
        </motion.div>

        {/* Featured Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate('/lesson')}
          className="bg-card p-6 rounded-3xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-3xl">
              📚
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-black text-white">Math Adventure</h3>
              <p className="text-sm text-muted-foreground">Master algebra basics</p>
            </div>
            <div className="bg-accent text-background px-3 py-1 rounded-full font-bold text-sm">
              +50 XP
            </div>
          </div>
          <div className="flex gap-2 text-sm text-muted-foreground">
            <span>🎯 10 Challenges</span>
            <span>•</span>
            <span>⏱️ 15 min</span>
          </div>
        </motion.div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-2 gap-4">
          <QuickAccessCard
            icon={<BookOpen className="w-8 h-8" />}
            title="My Courses"
            delay={0.2}
          />
          <QuickAccessCard
            icon={<Target className="w-8 h-8" />}
            title="Challenges"
            delay={0.25}
          />
          <QuickAccessCard
            icon={<Trophy className="w-8 h-8" />}
            title="Ranking"
            onClick={() => navigate('/leaderboard')}
            delay={0.3}
          />
          <QuickAccessCard
            icon={<Gift className="w-8 h-8" />}
            title="Rewards"
            delay={0.35}
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage="home" />
    </div>
  );
}

function QuickAccessCard({ icon, title, delay = 0, onClick }: any) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      onClick={onClick}
      className="bg-card p-6 rounded-2xl shadow-lg flex flex-col items-center gap-3 hover:bg-primary/20 transition-all hover:scale-105 active:scale-95"
    >
      <div className="text-accent">{icon}</div>
      <span className="text-white font-bold text-sm">{title}</span>
    </motion.button>
  );
}

function BottomNav({ currentPage }: { currentPage: string }) {
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/home' },
    { id: 'quests', icon: Target, label: 'Quests', path: '/lesson' },
    { id: 'map', icon: Map, label: 'Map', path: '/leaderboard' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-white/10 px-6 py-4 rounded-t-3xl shadow-2xl">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map(({ id, icon: Icon, label, path }) => (
          <button
            key={id}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentPage === id ? 'text-accent scale-110' : 'text-muted-foreground'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs font-bold">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export { BottomNav };
