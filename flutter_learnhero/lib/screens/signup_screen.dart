import 'package:flutter/material.dart';

import '../widgets/responsive_shell.dart';

class SignUpScreen extends StatefulWidget {
  const SignUpScreen({super.key});

  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  static const avatars = ['🦸', '🧙', '🐱‍👤', '👨‍🚀'];
  static const subjects = ['Math', 'Science', 'History', 'Languages', 'Arts', 'Technology'];

  final _nameController = TextEditingController();
  final _selectedSubjects = <String>{};
  int _avatarIndex = 0;

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  bool get _canContinue => _nameController.text.trim().isNotEmpty && _selectedSubjects.isNotEmpty;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: ResponsiveShell(
          child: ListView(
            padding: const EdgeInsets.all(24),
            children: [
              Text('Create Your Hero', style: Theme.of(context).textTheme.headlineMedium),
              const SizedBox(height: 8),
              const Text('Choose your avatar and interests'),
              const SizedBox(height: 24),
              const Text('Choose your avatar', style: TextStyle(fontWeight: FontWeight.w700)),
              const SizedBox(height: 12),
              Row(
                children: List.generate(avatars.length, (index) {
                  final selected = index == _avatarIndex;
                  return Expanded(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 4),
                      child: InkWell(
                        borderRadius: BorderRadius.circular(16),
                        onTap: () => setState(() => _avatarIndex = index),
                        child: Ink(
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          decoration: BoxDecoration(
                            color: selected ? const Color(0xFF6C3CE1) : Theme.of(context).cardColor,
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(color: selected ? const Color(0xFFFFD43B) : Colors.transparent, width: 2),
                          ),
                          child: Text(avatars[index], textAlign: TextAlign.center, style: const TextStyle(fontSize: 34)),
                        ),
                      ),
                    ),
                  );
                }),
              ),
              const SizedBox(height: 24),
              TextField(
                controller: _nameController,
                decoration: const InputDecoration(labelText: 'Username', hintText: 'Enter your hero name'),
                onChanged: (_) => setState(() {}),
              ),
              const SizedBox(height: 24),
              const Text('What do you want to learn?', style: TextStyle(fontWeight: FontWeight.w700)),
              const SizedBox(height: 12),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: subjects
                    .map((subject) => FilterChip(
                          label: Text(subject),
                          selected: _selectedSubjects.contains(subject),
                          onSelected: (selected) {
                            setState(() {
                              selected ? _selectedSubjects.add(subject) : _selectedSubjects.remove(subject);
                            });
                          },
                        ))
                    .toList(),
              ),
              const SizedBox(height: 32),
              FilledButton(
                onPressed: _canContinue ? () => Navigator.pushReplacementNamed(context, '/home') : null,
                style: FilledButton.styleFrom(
                  backgroundColor: const Color(0xFFFFD43B),
                  foregroundColor: Colors.black,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                child: const Text('Create My Hero'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
