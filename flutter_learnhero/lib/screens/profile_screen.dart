import 'package:flutter/material.dart';

import '../widgets/bottom_nav.dart';
import '../widgets/responsive_shell.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  static const badges = [
    ('🏛️', 'History Explorer', true),
    ('🧮', 'Math Wizard', true),
    ('🔬', 'Science Pro', true),
    ('📚', 'Bookworm', true),
    ('🎨', 'Creative Mind', true),
    ('🌍', 'World Traveler', false),
  ];

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    final columns = width >= 450 ? 3 : 2;

    return Scaffold(
      bottomNavigationBar: const LearnBottomNav(currentIndex: 3),
      body: SafeArea(
        child: ResponsiveShell(
          child: ListView(
            padding: const EdgeInsets.fromLTRB(20, 20, 20, 100),
            children: [
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(18),
                  child: Column(
                    children: [
                      const CircleAvatar(radius: 46, child: Text('🦸', style: TextStyle(fontSize: 34))),
                      const SizedBox(height: 12),
                      Text('CoolHero42', style: Theme.of(context).textTheme.titleLarge),
                      const SizedBox(height: 4),
                      const Text('Joined March 2026 • Level 7'),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 12),
              Row(
                children: const [
                  Expanded(child: _StatCard(value: '47', label: 'Missions')),
                  SizedBox(width: 8),
                  Expanded(child: _StatCard(value: '5', label: 'Badges')),
                  SizedBox(width: 8),
                  Expanded(child: _StatCard(value: '13', label: 'Streak')),
                ],
              ),
              const SizedBox(height: 18),
              Text('Badge Collection', style: Theme.of(context).textTheme.titleLarge),
              const SizedBox(height: 10),
              GridView.builder(
                itemCount: badges.length,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: columns,
                  crossAxisSpacing: 10,
                  mainAxisSpacing: 10,
                  childAspectRatio: 1.5,
                ),
                itemBuilder: (_, index) {
                  final (icon, name, unlocked) = badges[index];
                  return Card(
                    color: unlocked ? const Color(0xFF6C3CE1) : null,
                    child: Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(unlocked ? icon : '🔒', style: const TextStyle(fontSize: 24)),
                          const SizedBox(height: 4),
                          Text(name, textAlign: TextAlign.center, style: const TextStyle(fontSize: 12)),
                        ],
                      ),
                    ),
                  );
                },
              )
            ],
          ),
        ),
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  const _StatCard({required this.value, required this.label});

  final String value;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 12),
        child: Column(
          children: [
            Text(value, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
            Text(label, style: const TextStyle(fontSize: 12)),
          ],
        ),
      ),
    );
  }
}
