import 'package:flutter/material.dart';

import '../models/app_models.dart';
import '../widgets/bottom_nav.dart';
import '../widgets/responsive_shell.dart';

class LeaderboardScreen extends StatefulWidget {
  const LeaderboardScreen({super.key});

  @override
  State<LeaderboardScreen> createState() => _LeaderboardScreenState();
}

class _LeaderboardScreenState extends State<LeaderboardScreen> {
  static const tabs = ['Global', 'Friends', 'School'];

  static const players = [
    LeaderboardPlayer(rank: 1, avatar: '🧙', name: 'MagicMaster99', xp: 15420),
    LeaderboardPlayer(rank: 2, avatar: '👨‍🚀', name: 'SpaceExplorer', xp: 14850),
    LeaderboardPlayer(rank: 3, avatar: '🐱‍👤', name: 'ShadowNinja', xp: 13990),
    LeaderboardPlayer(rank: 4, avatar: '🦸', name: 'CoolHero42', xp: 12650, isCurrentUser: true),
    LeaderboardPlayer(rank: 5, avatar: '👩‍🔬', name: 'ScienceQueen', xp: 11230),
    LeaderboardPlayer(rank: 6, avatar: '🧙', name: 'WizardKing', xp: 10890),
  ];

  String _activeTab = tabs.first;

  @override
  Widget build(BuildContext context) {
    final topThree = players.take(3).toList();
    final others = players.skip(3).toList();

    return Scaffold(
      bottomNavigationBar: const LearnBottomNav(currentIndex: 2),
      body: SafeArea(
        child: ResponsiveShell(
          child: ListView(
            padding: const EdgeInsets.fromLTRB(20, 20, 20, 100),
            children: [
              Text('Leaderboard', style: Theme.of(context).textTheme.headlineMedium),
              const SizedBox(height: 4),
              const Text('Resets in 4d 12h'),
              const SizedBox(height: 14),
              Wrap(
                spacing: 8,
                children: tabs
                    .map((tab) => ChoiceChip(
                          label: Text(tab),
                          selected: _activeTab == tab,
                          onSelected: (_) => setState(() => _activeTab = tab),
                        ))
                    .toList(),
              ),
              const SizedBox(height: 20),
              Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _podium(topThree[1], 2),
                  const SizedBox(width: 10),
                  _podium(topThree[0], 1),
                  const SizedBox(width: 10),
                  _podium(topThree[2], 3),
                ],
              ),
              const SizedBox(height: 20),
              ...others.map((p) => Card(
                    child: ListTile(
                      leading: Text('#${p.rank} ${p.avatar}'),
                      title: Text(p.name),
                      subtitle: Text('${p.xp} XP'),
                      trailing: p.isCurrentUser ? const Chip(label: Text('YOU')) : null,
                    ),
                  )),
            ],
          ),
        ),
      ),
    );
  }

  Widget _podium(LeaderboardPlayer player, int rank) {
    final heights = {1: 110.0, 2: 85.0, 3: 70.0};
    return Column(
      children: [
        Text(player.avatar, style: const TextStyle(fontSize: 26)),
        Text(player.name, style: const TextStyle(fontSize: 11), textAlign: TextAlign.center),
        const SizedBox(height: 6),
        Container(
          width: 72,
          height: heights[rank],
          decoration: BoxDecoration(
            borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
            color: rank == 1 ? const Color(0xFFFFD43B) : ThemeData.dark().cardColor,
          ),
          alignment: Alignment.topCenter,
          padding: const EdgeInsets.only(top: 8),
          child: Text('#$rank', style: const TextStyle(color: Colors.black, fontWeight: FontWeight.w700)),
        ),
      ],
    );
  }
}
