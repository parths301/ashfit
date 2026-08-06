import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AngledPanel from '../components/AngledPanel';
import { colors, fonts } from '../theme/theme';
import { AppState } from '../state/types';

interface Props {
  state: AppState;
  onToggle: (i: number) => void;
  onFinish: () => void;
  onBack: () => void;
}

export default function LiftScreen({ state, onToggle, onFinish, onBack }: Props) {
  const liftCount = state.lifts.filter((l) => l.done).length;
  const allDone = liftCount === 5;

  return (
    <View style={styles.screen}>
      <Text style={styles.kicker}>// LIFT MODULE — PUSH DAY</Text>
      <Text style={styles.title}>IRON TEMPLE</Text>
      <Text style={styles.sub}>{liftCount} / 5 EXERCISES COMPLETE — TAP TO LOG</Text>
      <ScrollView style={{ flex: 1, marginTop: 16 }} contentContainerStyle={{ gap: 9 }}>
        {state.lifts.map((l, i) => (
          <Pressable key={l.name} onPress={() => onToggle(i)}>
            <AngledPanel
              cut={{ type: 'notch', size: 10 }}
              fill={l.done ? colors.cyan07 : colors.inkDim02}
              stroke={l.done ? colors.cyan60 : colors.inkDim20}
              style={styles.row}
            >
              <View style={[styles.checkbox, { borderColor: l.done ? colors.cyan : colors.inkDim40, backgroundColor: l.done ? colors.cyan : 'transparent' }]}>
                {l.done && <Text style={styles.check}>✓</Text>}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.liftName, l.done && styles.strike]}>{l.name}</Text>
                <Text style={styles.liftScheme}>{l.scheme}</Text>
              </View>
              <Text style={[styles.liftStatus, { color: l.done ? colors.cyan : colors.inkDim35 }]}>
                {l.done ? 'LOGGED' : 'PENDING'}
              </Text>
            </AngledPanel>
          </Pressable>
        ))}
      </ScrollView>
      <View style={{ marginTop: 16 }}>
        <Pressable onPress={onFinish}>
          <AngledPanel
            cut={{ type: 'parallelogram', size: 12 }}
            fill={allDone ? colors.cyan : 'transparent'}
            stroke={colors.cyan}
            style={styles.finishBtn}
          >
            <Text style={[styles.finishLabel, { color: allDone ? colors.bg2 : colors.cyan50 }]}>
              {allDone ? '■ COMPLETE SESSION · +150 XP' : 'LOG ALL EXERCISES TO COMPLETE'}
            </Text>
          </AngledPanel>
        </Pressable>
      </View>
      <Pressable onPress={onBack} style={{ marginTop: 12 }}>
        <Text style={styles.back}>[ BACK TO HUD ]</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 20, paddingBottom: 24 },
  kicker: { fontFamily: fonts.mono, fontSize: 11, color: colors.cyan70, letterSpacing: 3, marginTop: 18 },
  title: { fontFamily: fonts.display, fontSize: 22, color: colors.ink, marginTop: 8 },
  sub: { fontFamily: fonts.mono, fontSize: 12, color: colors.inkDim50, marginTop: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, paddingVertical: 13 },
  checkbox: { width: 24, height: 24, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  check: { color: colors.bg2, fontFamily: fonts.bodyBold, fontSize: 15 },
  liftName: { fontFamily: fonts.body, fontSize: 16, letterSpacing: 0.7, color: colors.ink },
  strike: { textDecorationLine: 'line-through' },
  liftScheme: { fontFamily: fonts.mono, fontSize: 10, color: colors.inkDim45, marginTop: 2 },
  liftStatus: { fontFamily: fonts.mono, fontSize: 11 },
  finishBtn: { paddingVertical: 15 },
  finishLabel: { fontFamily: fonts.display, fontSize: 15, letterSpacing: 2, textAlign: 'center' },
  back: { fontFamily: fonts.mono, fontSize: 12, color: colors.inkDim40, letterSpacing: 1.5, textAlign: 'center' },
});
