import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import SignUpScreen from './components/SignUpScreen';
import HomeDashboard from './components/HomeDashboard';
import LessonScreen from './components/LessonScreen';
import VictoryScreen from './components/VictoryScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import ProfileScreen from './components/ProfileScreen';

export default function App() {
  return (
    <div className="w-full h-screen bg-background overflow-hidden">
      <div className="max-w-[390px] h-full mx-auto relative shadow-2xl">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/home" element={<HomeDashboard />} />
            <Route path="/lesson" element={<LessonScreen />} />
            <Route path="/victory" element={<VictoryScreen />} />
            <Route path="/leaderboard" element={<LeaderboardScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}