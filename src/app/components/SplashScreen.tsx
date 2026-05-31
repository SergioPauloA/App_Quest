import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

export default function SplashScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        {/* Logo */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-primary to-purple-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/50">
            <div className="relative">
              <div className="w-20 h-24 bg-accent rounded-lg flex items-center justify-center">
                <Zap className="w-12 h-12 text-background" fill="currentColor" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full border-4 border-background"></div>
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-5xl font-black text-white mb-2 tracking-tight">
          LearnHero
        </h1>

        {/* Tagline */}
        <p className="text-xl text-accent mb-12 font-medium">
          Learn. Level Up. Conquer.
        </p>

        {/* Hero Character */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-12"
        >
          <div className="w-48 h-48 bg-gradient-to-br from-primary/40 to-purple-700/40 rounded-full flex items-center justify-center border-4 border-primary">
            <div className="text-8xl">🦸</div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <button
          onClick={() => navigate('/signup')}
          className="w-full max-w-sm bg-accent text-background px-8 py-4 rounded-2xl font-black text-lg shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all hover:scale-105 active:scale-95"
        >
          Start Your Journey
        </button>

        {/* Progress Dots */}
        <div className="flex gap-2 mt-8">
          <div className="w-3 h-3 bg-accent rounded-full"></div>
          <div className="w-3 h-3 bg-white/30 rounded-full"></div>
          <div className="w-3 h-3 bg-white/30 rounded-full"></div>
        </div>
      </motion.div>
    </div>
  );
}
