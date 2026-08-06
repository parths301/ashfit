import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AngledPanel from '../components/AngledPanel';
import ProgressBar from '../components/ProgressBar';
import QuestCard from '../components/QuestCard';
import ScreenTitle from '../components/ScreenTitle';
import Blink from '../components/Blink';
import { colors, fonts } from '../theme/theme';
import { AppState } from '../state/types';
import { formatPenaltyCountdown } from '../state/utils';

interface Program {
  name: string;
  tag: string;
  pct: number;
  desc: string;
  c: string;
  locked: boolean;
}

function buildPrograms(rank: string): Program[] {
  return [
    { name: 'WEIGHT LOSS PROTOCOL', tag: 'ACTIVE · WEEK 5/12', pct: 34, desc: 'CALORIC DEFICIT + CARDIO DIRECTIVE', c: colors.magenta, locked: false },
    { name: 'FULL-SPEC FITNESS', tag: 'ACTIVE · WEEK 8/16', pct: 52, desc: 'STR / AGI / VIT BALANCED AUGMENTATION', c: colors.cyan, locked: false },
    { name: 'MINDFULNESS FIRMWARE', tag: 'ACTIVE · WEEK 2/8', pct: 18, desc: 'DAILY MEDITATION + SLEEP PROTOCOL', c: colors.cyan, locked: false },
    {
      name: 'STRENGTH AUGMENT MK.II',
      tag: rank === 'B' ? 'UNLOCKED — TAP TO ENROLL' : 'LOCKED — REQUIRES RANK B',
      pct: 0,
      desc: 'PROGRESSIVE OVERLOAD DIRECTIVE',
      c: colors.inkDim50,
      locked: rank !== 'B',
    },
  ];
}

export default function GigsScreen({ state, now, onQuestTap }: { state: AppState; now: number; onQuestTap: (id: string) => void }) {
  const programs = buildPrograms(state.rank);
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenTitle>GIGS</ScreenTitle>

      <AngledPanel cut={{ type: 'notch', size: 10 }} fill={colors.mag06} stroke={colors.mag50} style={styles.penaltyBox}>
        <Text style={styles.penaltyLabel}>⚠ PENALTY: −2 ALL STATS</Text>
        <Blink style={styles.penaltyValue}>{formatPenaltyCountdown(now)}</Blink>
      </AngledPanel>

      <Text style={[styles.sectionLabel, { color: colors.mag70, marginTop: 18 }]}>// DAILY GIGS</Text>
      <View style={{ gap: 8, marginTop: 8 }}>
        {state.quests.map((q) => (
          <QuestCard key={q.id} q={q} onPress={() => onQuestTap(q.id)} showHint />
        ))}
      </View>

      <Text style={[styles.sectionLabel, { color: colors.cyan55, marginTop: 20 }]}>// GOAL PROGRAMS</Text>
      <View style={{ gap: 8, marginTop: 8 }}>
        {programs.map((p) => (
          <AngledPanel
            key={p.name}
            cut={{ type: 'notch', size: 10 }}
            fill={colors.cyan04}
            stroke={p.locked ? colors.inkDim15 : p.c === colors.magenta ? colors.mag40 : colors.cyan35}
            style={[styles.programBox, { opacity: p.locked ? 0.55 : 1 }]}
          >
            <View style={styles.row}>
              <Text style={[styles.programName, { color: p.c }]}>{p.name}</Text>
              <Text style={[styles.programTag, { color: p.locked ? colors.mag70 : colors.inkDim45 }]}>{p.tag}</Text>
            </View>
            <Text style={styles.programDesc}>{p.desc}</Text>
            <View style={{ marginTop: 8 }}>
              <ProgressBar pct={p.pct} height={5} notch={0} trackColor={colors.cyan10} fillColor={p.c} glow={p.c} />
            </View>
          </AngledPanel>
        ))}
      </View>
      <View style={{ height: 84 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20 },
  penaltyBox: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  penaltyLabel: { fontFamily: fonts.mono, fontSize: 12, color: colors.magenta },
  penaltyValue: { fontFamily: fonts.mono, fontSize: 12, color: colors.magenta },
  sectionLabel: { fontFamily: fonts.mono, fontSize: 10, letterSpacing: 2.5 },
  programBox: { paddingHorizontal: 14, paddingVertical: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  programName: { fontFamily: fonts.body, fontSize: 15, letterSpacing: 0.7 },
  programTag: { fontFamily: fonts.mono, fontSize: 10 },
  programDesc: { fontFamily: fonts.mono, fontSize: 10, color: colors.inkDim45, marginTop: 4 },
});
