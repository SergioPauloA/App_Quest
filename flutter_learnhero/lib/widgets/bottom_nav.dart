import 'package:flutter/material.dart';

class LearnBottomNav extends StatelessWidget {
  const LearnBottomNav({super.key, required this.currentIndex});

  final int currentIndex;

  static const _routes = ['/home', '/lesson', '/leaderboard', '/profile'];

  @override
  Widget build(BuildContext context) {
    return NavigationBar(
      selectedIndex: currentIndex,
      onDestinationSelected: (index) {
        if (index == currentIndex) return;
        Navigator.of(context).pushReplacementNamed(_routes[index]);
      },
      destinations: const [
        NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: 'Home'),
        NavigationDestination(icon: Icon(Icons.task_outlined), selectedIcon: Icon(Icons.task), label: 'Quests'),
        NavigationDestination(icon: Icon(Icons.emoji_events_outlined), selectedIcon: Icon(Icons.emoji_events), label: 'Rank'),
        NavigationDestination(icon: Icon(Icons.person_outline), selectedIcon: Icon(Icons.person), label: 'Perfil'),
      ],
    );
  }
}
