import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

const questions = [
  {
    question: 'What is 7 × 8?',
    options: ['54', '56', '64', '48'],
    correct: 1,
  },
  {
    question: 'Which planet is closest to the Sun?',
    options: ['Venus', 'Mars', 'Mercury', 'Earth'],
    correct: 2,
  },
  {
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Madrid', 'Paris'],
    correct: 3,
  },
];

export default function LessonScreen() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    setTimeout(() => {
      if (index === question.correct) {
        setCorrectAnswers(prev => prev + 1);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        navigate('/victory', { state: { correctAnswers: correctAnswers + (index === question.correct ? 1 : 0), total: questions.length } });
      }
    }, 1500);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/home')}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <span className="text-white font-bold">Question {currentQuestion + 1} of {questions.length}</span>
          <div className="bg-accent text-background px-3 py-1 rounded-full font-bold text-sm">
            +50 XP
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-background/50 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-gradient-to-r from-primary to-accent h-full rounded-full"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Mascot */}
        <motion.div
          key={currentQuestion}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="self-center mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-purple-700 rounded-full flex items-center justify-center text-5xl shadow-lg shadow-primary/50">
            {showResult ? (isCorrect ? '🎉' : '🤔') : '🦸'}
          </div>
        </motion.div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1"
          >
            <h2 className="text-3xl font-black text-white mb-8 text-center">
              {question.question}
            </h2>

            {/* Answer Options */}
            <div className="space-y-4">
              {question.options.map((option, index) => {
                let bgColor = 'bg-card hover:bg-primary/50';
                let borderColor = 'border-transparent';

                if (showResult) {
                  if (index === question.correct) {
                    bgColor = 'bg-green-500';
                    borderColor = 'border-green-400';
                  } else if (index === selectedAnswer) {
                    bgColor = 'bg-red-500';
                    borderColor = 'border-red-400';
                  }
                }

                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full ${bgColor} text-white px-6 py-5 rounded-2xl font-bold text-lg border-2 ${borderColor} transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed text-left`}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Feedback */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center mt-6"
            >
              <p className="text-2xl font-black text-white">
                {isCorrect ? 'Awesome! 🎯' : 'Not quite! Try the next one! 💪'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
