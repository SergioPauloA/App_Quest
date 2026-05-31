import { motion } from 'motion/react';
import { Settings, Calendar, Target, Trophy, Flame } from 'lucide-react';
import { BottomNav } from './HomeDashboard';

const badges = [
  { id: 1, icon: '🏛️', name: 'History Explorer', unlocked: true },
  { id: 2, icon: '🧮', name: 'Math Wizard', unlocked: true },
  { id: 3, icon: '🔬', name: 'Science Pro', unlocked: true },
  { id: 4, icon: '📚', name: 'Bookworm', unlocked: true },
  { id: 5, icon: '🎨', name: 'Creative Mind', unlocked: true },
  { id: 6, icon: '🌍', name: 'World Traveler', unlocked: false },
  { id: 7, icon: '⚡', name: 'Speed Learner', unlocked: false },
  { id: 8, icon: '🎯', name: 'Perfect Score', unlocked: false },
  { id: 9, icon: '💎', name: 'Diamond League', unlocked: false },
];

export default function ProfileScreen() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card p-6 rounded-b-3xl shadow-lg relative">
        <button className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
          <Settings className="w-5 h-5 text-white" />
        </button>

        {/* Hero Avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="flex flex-col items-center pt-8"
        >
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-purple-700 rounded-full flex items-center justify-center text-6xl border-4 border-accent shadow-2xl shadow-primary/50">
              🦸
            </div>
            <div className="absolute -bottom-2 -right-2 bg-accent text-background px-4 py-2 rounded-full font-black shadow-lg">
              Level 7
            </div>
          </div>

          <h1 className="text-3xl font-black text-white mt-6 mb-2">CoolHero42</h1>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Joined March 2026</span>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-24 p-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            icon={<Target className="w-6 h-6" />}
            value="47"
            label="Missions"
            delay={0.1}
          />
          <StatCard
            icon={<Trophy className="w-6 h-6" />}
            value="5"
            label="Badges"
            delay={0.2}
          />
          <StatCard
            icon={<Flame className="w-6 h-6" />}
            value="13"
            label="Day Streak"
            delay={0.3}
          />
        </div>

        {/* Badge Collection */}
        <div>
          <h2 className="text-2xl font-black text-white mb-4">Badge Collection</h2>

          <div className="grid grid-cols-3 gap-4">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 ${
                  badge.unlocked
                    ? 'bg-gradient-to-br from-primary to-purple-700 shadow-lg shadow-primary/30'
                    : 'bg-card opacity-40'
                }`}
              >
                <span className="text-4xl">{badge.icon}</span>
                <p className="text-xs text-white font-bold text-center px-2">
                  {badge.name}
                </p>
                {!badge.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-background/80 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🔒</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div>
          <h2 className="text-2xl font-black text-white mb-4">Recent Achievements</h2>

          <div className="space-y-3">
            <AchievementCard
              icon="🏆"
              title="First Victory"
              description="Completed your first mission"
              date="2 days ago"
              delay={1.2}
            />
            <AchievementCard
              icon="🔥"
              title="Week Warrior"
              description="Maintained a 7-day streak"
              date="5 days ago"
              delay={1.3}
            />
            <AchievementCard
              icon="⭐"
              title="Rising Star"
              description="Reached Level 5"
              date="1 week ago"
              delay={1.4}
            />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage="profile" />
    </div>
  );
}

function StatCard({ icon, value, label, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-card p-4 rounded-2xl flex flex-col items-center gap-2 shadow-lg"
    >
      <div className="text-accent">{icon}</div>
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </motion.div>
  );
}

function AchievementCard({ icon, title, description, date, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="bg-card p-4 rounded-2xl flex items-center gap-4 shadow-lg"
    >
      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-2xl">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-white font-bold">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <p className="text-xs text-muted-foreground">{date}</p>
    </motion.div>
  );
}
