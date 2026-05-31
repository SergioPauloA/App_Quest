import 'dart:async';

import 'package:flutter/material.dart';

import '../models/app_models.dart';
import '../widgets/responsive_shell.dart';

class LessonScreen extends StatefulWidget {
  const LessonScreen({super.key});

  @override
  State<LessonScreen> createState() => _LessonScreenState();
}

class _LessonScreenState extends State<LessonScreen> {
  static const _questions = [
    QuizQuestion(question: 'What is 7 × 8?', options: ['54', '56', '64', '48'], correctIndex: 1),
    QuizQuestion(question: 'Which planet is closest to the Sun?', options: ['Venus', 'Mars', 'Mercury', 'Earth'], correctIndex: 2),
    QuizQuestion(question: 'What is the capital of France?', options: ['London', 'Berlin', 'Madrid', 'Paris'], correctIndex: 3),
  ];

  int _current = 0;
  int? _selected;
  int _correct = 0;
  bool _showResult = false;
  Timer? _timer;

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final question = _questions[_current];
    final progress = (_current + 1) / _questions.length;

    return Scaffold(
      body: SafeArea(
        child: ResponsiveShell(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: [
                Row(
                  children: [
                    IconButton(onPressed: () => Navigator.pushReplacementNamed(context, '/home'), icon: const Icon(Icons.close)),
                    Expanded(
                      child: Text('Question ${_current + 1} of ${_questions.length}', textAlign: TextAlign.center),
                    ),
                    const Text('+50 XP'),
                  ],
                ),
                const SizedBox(height: 10),
                ClipRRect(
                  borderRadius: BorderRadius.circular(999),
                  child: LinearProgressIndicator(value: progress, minHeight: 10),
                ),
                const SizedBox(height: 28),
                CircleAvatar(radius: 44, backgroundColor: const Color(0xFF6C3CE1), child: Text(_showResult ? (_isCorrect(question) ? '🎉' : '🤔') : '🦸', style: const TextStyle(fontSize: 30))),
                const SizedBox(height: 18),
                Text(question.question, style: Theme.of(context).textTheme.headlineSmall, textAlign: TextAlign.center),
                const SizedBox(height: 22),
                Expanded(
                  child: ListView.separated(
                    itemCount: question.options.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 12),
                    itemBuilder: (_, index) {
                      final state = _tileState(index, question.correctIndex);
                      return FilledButton(
                        onPressed: _showResult ? null : () => _answer(question, index),
                        style: FilledButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 14),
                          backgroundColor: state,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        ),
                        child: Align(alignment: Alignment.centerLeft, child: Text(question.options[index])),
                      );
                    },
                  ),
                ),
                AnimatedOpacity(
                  opacity: _showResult ? 1 : 0,
                  duration: const Duration(milliseconds: 250),
                  child: Padding(
                    padding: const EdgeInsets.only(top: 8),
                    child: Text(_isCorrect(question) ? 'Awesome! 🎯' : 'Not quite! Try the next one! 💪'),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }

  bool _isCorrect(QuizQuestion question) => _selected == question.correctIndex;

  Color _tileState(int index, int correctIndex) {
    if (!_showResult) return const Color(0xFF221C38);
    if (index == correctIndex) return Colors.green;
    if (index == _selected) return Colors.red;
    return const Color(0xFF221C38);
  }

  void _answer(QuizQuestion question, int index) {
    setState(() {
      _selected = index;
      _showResult = true;
      if (index == question.correctIndex) {
        _correct++;
      }
    });

    _timer = Timer(const Duration(milliseconds: 1300), () {
      if (!mounted) return;
      if (_current < _questions.length - 1) {
        setState(() {
          _current++;
          _selected = null;
          _showResult = false;
        });
      } else {
        Navigator.pushReplacementNamed(
          context,
          '/victory',
          arguments: LessonResult(correctAnswers: _correct, totalQuestions: _questions.length),
        );
      }
    });
  }
}
