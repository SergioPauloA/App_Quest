import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const avatars = ['🦸', '🧙', '🐱‍👤', '👨‍🚀'];
const subjects = ['Math', 'Science', 'History', 'Languages', 'Arts', 'Technology'];

export default function SignUpScreen() {
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [username, setUsername] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSubmit = () => {
    if (username && selectedSubjects.length > 0) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <h1 className="text-4xl font-black text-white mb-2">Create Your Hero</h1>
        <p className="text-muted-foreground mb-8">Choose your avatar and interests</p>

        {/* Avatar Selection */}
        <div className="mb-8">
          <label className="text-white mb-4 block font-bold">Choose Your Avatar</label>
          <div className="grid grid-cols-4 gap-4">
            {avatars.map((avatar, index) => (
              <button
                key={index}
                onClick={() => setSelectedAvatar(index)}
                className={`aspect-square rounded-2xl flex items-center justify-center text-6xl transition-all ${
                  selectedAvatar === index
                    ? 'bg-primary ring-4 ring-accent scale-105'
                    : 'bg-card hover:bg-primary/50'
                }`}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>

        {/* Username Input */}
        <div className="mb-8">
          <label className="text-white mb-4 block font-bold">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your hero name"
            className="w-full bg-input-background text-white px-6 py-4 rounded-2xl border-2 border-transparent focus:border-primary outline-none transition-all placeholder:text-muted-foreground"
          />
        </div>

        {/* Subject Selection */}
        <div className="mb-12">
          <label className="text-white mb-4 block font-bold">What do you want to learn?</label>
          <div className="flex flex-wrap gap-3">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => toggleSubject(subject)}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  selectedSubjects.includes(subject)
                    ? 'bg-accent text-background'
                    : 'bg-card text-white hover:bg-primary/50'
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Create Button */}
        <button
          onClick={handleSubmit}
          disabled={!username || selectedSubjects.length === 0}
          className="w-full bg-accent text-background px-8 py-4 rounded-2xl font-black text-lg shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Create My Hero
        </button>

        {/* Accessibility Note */}
        <p className="text-sm text-muted-foreground text-center mt-6">
          High contrast mode available in settings
        </p>
      </motion.div>
    </div>
  );
}
