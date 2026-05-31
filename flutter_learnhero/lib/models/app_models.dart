class LeaderboardPlayer {
  const LeaderboardPlayer({
    required this.rank,
    required this.avatar,
    required this.name,
    required this.xp,
    this.isCurrentUser = false,
  });

  final int rank;
  final String avatar;
  final String name;
  final int xp;
  final bool isCurrentUser;
}

class QuizQuestion {
  const QuizQuestion({
    required this.question,
    required this.options,
    required this.correctIndex,
  });

  final String question;
  final List<String> options;
  final int correctIndex;
}

class LessonResult {
  const LessonResult({required this.correctAnswers, required this.totalQuestions});

  final int correctAnswers;
  final int totalQuestions;

  int get accuracy => ((correctAnswers / totalQuestions) * 100).round();
  int get xpGained => correctAnswers * 50;
}
