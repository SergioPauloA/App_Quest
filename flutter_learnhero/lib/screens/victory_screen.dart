import 'package:flutter/material.dart';

import '../models/app_models.dart';
import '../widgets/responsive_shell.dart';

class VictoryScreen extends StatelessWidget {
  const VictoryScreen({super.key, required this.result});

  final LessonResult result;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: ResponsiveShell(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const CircleAvatar(radius: 60, backgroundColor: Color(0xFFFFD43B), child: Icon(Icons.emoji_events, size: 56, color: Colors.black)),
                const SizedBox(height: 20),
                Text('Mission Complete!', style: Theme.of(context).textTheme.headlineMedium),
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
                  decoration: BoxDecoration(color: const Color(0xFF6C3CE1), borderRadius: BorderRadius.circular(16)),
                  child: Text('+${result.xpGained} XP', style: const TextStyle(fontSize: 26, fontWeight: FontWeight.w800)),
                ),
                const SizedBox(height: 18),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _stat('Accuracy', '${result.accuracy}%'),
                        _stat('Time', '4:32'),
                        _stat('Streak', 'Day 13'),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                SizedBox(
                  width: double.infinity,
                  child: FilledButton(
                    onPressed: () => Navigator.pushReplacementNamed(context, '/home'),
                    style: FilledButton.styleFrom(
                      backgroundColor: const Color(0xFFFFD43B),
                      foregroundColor: Colors.black,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                    child: const Text('Continue Journey'),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _stat(String label, String value) {
    return Column(
      children: [
        Text(value, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 16)),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(fontSize: 12)),
      ],
    );
  }
}
