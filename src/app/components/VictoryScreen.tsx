import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Trophy, Target, Clock, Flame, Share2 } from 'lucide-react';

export default function VictoryScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { correctAnswers = 3, total = 3 } = location.state || {};

  const accuracy = Math.round((correctAnswers / total) * 100);
  const xpGained = correctAnswers * 50;

  useEffect(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#6C3CE1', '#FFD43B', '#FF6B9D'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#6C3CE1', '#FFD43B', '#FF6B9D'],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background px-6 py-12 flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="text-center"
      >
        {/* Trophy Animation */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-accent to-yellow-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-accent/50">
            <Trophy className="w-16 h-16 text-background" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-black text-white mb-4"
        >
          Mission Complete!
        </motion.h1>

        {/* XP Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="bg-primary px-8 py-4 rounded-2xl inline-block mb-8 shadow-lg shadow-primary/50"
        >
          <p className="text-4xl font-black text-accent">+{xpGained} XP</p>
        </motion.div>

        {/* New Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-card p-6 rounded-3xl mb-8 max-w-sm mx-auto"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-3xl">
              🏛️
            </div>
            <div className="text-left">
              <p className="text-sm text-accent font-bold">NEW BADGE UNLOCKED!</p>
              <p className="text-white font-black">History Explorer</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-card p-6 rounded-3xl mb-8 max-w-sm mx-auto"
        >
          <div className="grid grid-cols-3 gap-4">
            <StatItem icon={<Target />} label="Accuracy" value={`${accuracy}%`} />
            <StatItem icon={<Clock />} label="Time" value="4:32" />
            <StatItem icon={<Flame />} label="Streak" value="Day 13" />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="space-y-4 max-w-sm mx-auto">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            onClick={() => navigate('/home')}
            className="w-full bg-accent text-background px-8 py-4 rounded-2xl font-black text-lg shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all hover:scale-105 active:scale-95"
          >
            Continue Journey
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="w-full bg-card text-white px-8 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-primary/50 transition-all hover:scale-105 active:scale-95"
          >
            <Share2 className="w-5 h-5" />
            Share Achievement
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-accent">{icon}</div>
      <p className="text-white font-black text-lg">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
