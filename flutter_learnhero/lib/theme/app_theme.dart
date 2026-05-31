import 'package:flutter/material.dart';

class AppTheme {
  static const Color bg = Color(0xFF141122);
  static const Color card = Color(0xFF221C38);
  static const Color primary = Color(0xFF6C3CE1);
  static const Color accent = Color(0xFFFFD43B);

  static ThemeData darkTheme() {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: primary,
      brightness: Brightness.dark,
      surface: card,
    ).copyWith(primary: primary, secondary: accent);

    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: bg,
      cardColor: card,
      textTheme: const TextTheme(
        headlineMedium: TextStyle(fontWeight: FontWeight.w800),
        titleLarge: TextStyle(fontWeight: FontWeight.w700),
        bodyLarge: TextStyle(height: 1.4),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: card,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide.none,
        ),
      ),
      chipTheme: const ChipThemeData(
        selectedColor: accent,
        backgroundColor: card,
        side: BorderSide.none,
        labelStyle: TextStyle(fontWeight: FontWeight.w600),
      ),
    );
  }
}
