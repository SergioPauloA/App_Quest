import 'package:flutter/material.dart';

import '../widgets/bottom_nav.dart';
import '../widgets/responsive_shell.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isWide = MediaQuery.of(context).size.width >= 450;

    return Scaffold(
      bottomNavigationBar: const LearnBottomNav(currentIndex: 0),
      body: SafeArea(
        child: ResponsiveShell(
          child: ListView(
            padding: const EdgeInsets.fromLTRB(20, 20, 20, 100),
            children: [
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(color: Theme.of(context).cardColor, borderRadius: BorderRadius.circular(20)),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const CircleAvatar(radius: 22, child: Text('🦸')),
                        const SizedBox(width: 12),
                        const Expanded(child: Text('CoolHero42\nLevel 7 Scholar')),
                        Container(
                          decoration: BoxDecoration(color: const Color(0xFFFFD43B), borderRadius: BorderRadius.circular(999)),
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                          child: const Text('Level 7', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(999),
                      child: const LinearProgressIndicator(value: 0.65, minHeight: 10),
                    ),
                    const SizedBox(height: 8),
                    const Text('650 / 1000 XP to Level 8'),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  gradient: const LinearGradient(colors: [Color(0xFF6C3CE1), Color(0xFF8353F3)]),
                ),
                child: const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Daily Quest', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800)),
                    SizedBox(height: 8),
                    Text('Complete 3 lessons to maintain your streak!'),
                    SizedBox(height: 12),
                    LinearProgressIndicator(value: 0.33, minHeight: 8),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              InkWell(
                borderRadius: BorderRadius.circular(20),
                onTap: () => Navigator.pushNamed(context, '/lesson'),
                child: Ink(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(color: Theme.of(context).cardColor, borderRadius: BorderRadius.circular(20)),
                  child: const Row(
                    children: [
                      CircleAvatar(radius: 30, child: Text('📚')),
                      SizedBox(width: 12),
                      Expanded(child: Text('Math Adventure\nMaster algebra basics')),
                      Text('+50 XP', style: TextStyle(color: Color(0xFFFFD43B), fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
              GridView.count(
                crossAxisCount: isWide ? 4 : 2,
                childAspectRatio: 1.4,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
                children: [
                  _quickItem(context, Icons.menu_book, 'My Courses'),
                  _quickItem(context, Icons.track_changes, 'Challenges'),
                  _quickItem(context, Icons.emoji_events, 'Ranking', onTap: () => Navigator.pushNamed(context, '/leaderboard')),
                  _quickItem(context, Icons.card_giftcard, 'Rewards'),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _quickItem(BuildContext context, IconData icon, String label, {VoidCallback? onTap}) {
    return InkWell(
      borderRadius: BorderRadius.circular(16),
      onTap: onTap,
      child: Ink(
        decoration: BoxDecoration(color: Theme.of(context).cardColor, borderRadius: BorderRadius.circular(16)),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: const Color(0xFFFFD43B)),
            const SizedBox(height: 8),
            Text(label, textAlign: TextAlign.center),
          ],
        ),
      ),
    );
  }
}
