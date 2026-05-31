import 'package:flutter/material.dart';

import '../widgets/responsive_shell.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ResponsiveShell(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 120,
                height: 120,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(28),
                  gradient: const LinearGradient(colors: [Color(0xFF6C3CE1), Color(0xFF8353F3)]),
                ),
                child: const Icon(Icons.bolt, color: Color(0xFFFFD43B), size: 56),
              ),
              const SizedBox(height: 28),
              Text('LearnHero', style: Theme.of(context).textTheme.displaySmall?.copyWith(fontWeight: FontWeight.w800)),
              const SizedBox(height: 8),
              const Text('Learn. Level Up. Conquer.', textAlign: TextAlign.center),
              const SizedBox(height: 48),
              SizedBox(
                width: double.infinity,
                child: FilledButton(
                  onPressed: () => Navigator.pushReplacementNamed(context, '/signup'),
                  style: FilledButton.styleFrom(
                    backgroundColor: const Color(0xFFFFD43B),
                    foregroundColor: Colors.black,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    padding: const EdgeInsets.symmetric(vertical: 16),
                  ),
                  child: const Text('Start Your Journey'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
