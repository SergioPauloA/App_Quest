import 'package:flutter/material.dart';

import 'models/app_models.dart';
import 'screens/home_screen.dart';
import 'screens/leaderboard_screen.dart';
import 'screens/lesson_screen.dart';
import 'screens/profile_screen.dart';
import 'screens/signup_screen.dart';
import 'screens/splash_screen.dart';
import 'screens/victory_screen.dart';
import 'theme/app_theme.dart';

void main() {
  runApp(const LearnHeroApp());
}

class LearnHeroApp extends StatelessWidget {
  const LearnHeroApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'LearnHero',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme(),
      initialRoute: '/',
      onGenerateRoute: (settings) {
        switch (settings.name) {
          case '/':
            return MaterialPageRoute(builder: (_) => const SplashScreen());
          case '/signup':
            return MaterialPageRoute(builder: (_) => const SignUpScreen());
          case '/home':
            return MaterialPageRoute(builder: (_) => const HomeScreen());
          case '/lesson':
            return MaterialPageRoute(builder: (_) => const LessonScreen());
          case '/victory':
            final result = settings.arguments as LessonResult? ??
                const LessonResult(correctAnswers: 0, totalQuestions: 3);
            return MaterialPageRoute(builder: (_) => VictoryScreen(result: result));
          case '/leaderboard':
            return MaterialPageRoute(builder: (_) => const LeaderboardScreen());
          case '/profile':
            return MaterialPageRoute(builder: (_) => const ProfileScreen());
          default:
            return MaterialPageRoute(builder: (_) => const SplashScreen());
        }
      },
    );
  }
}
