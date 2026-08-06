import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AngledPanel from './AngledPanel';
import ProgressBar from './ProgressBar';
import { colors, fonts } from '../theme/theme';
import { Quest } from '../state/types';

export default function QuestCard({ q, onPress, showHint }: { q: Quest; onPress: () => void; showHint?: boolean }) {
  const pct = Math.min(100, Math.round((q.progress / q.total) * 100));
  const edge = q.done ? 'rgba(232,228,242,.25)' : q.progress > 0 ? colors.cyan : colors.magenta;
  const bg = q.done ? 'rgba(232,228,242,.03)' : q.progress > 0 ? colors.cyan05 : colors.mag05;
  const status = q.done ? '✓ CLEAR' : q.progress > 0 ? pct + '%' : 'QUEUED';
  const progLabel = q.progress.toFixed(1) + '/' + q.total.toFixed(1) + ' ' + q.unit;

  return (
    <Pressable onPress={onPress} style={[styles.wrap, { borderLeftColor: edge, opacity: q.done ? 0.65 : 1 }]}>
      <AngledPanel cut={{ type: 'notch', size: 10 }} fill={bg} style={styles.pad}>
        <View style={styles.row}>
          <Text style={[styles.title, q.done && styles.strike]} numberOfLines={1}>
            {q.title}
          </Text>
          <Text style={[styles.status, { color: edge }]}>{status}</Text>
        </View>
        <Text style={styles.meta}>
          ⟠ {q.xp} XP · +1 {q.stat} · {progLabel}
          {showHint ? ' · ' + q.hint : ''}
        </Text>
        <View style={styles.barWrap}>
          <ProgressBar pct={pct} height={4} notch={0} trackColor={colors.cyan10} fillColor={edge} />
        </View>
      </AngledPanel>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { borderLeftWidth: 3 },
  pad: { paddingHorizontal: 14, paddingVertical: 11 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 },
  title: { flexShrink: 1, fontFamily: fonts.body, fontSize: 15, letterSpacing: 0.7, color: colors.ink },
  strike: { textDecorationLine: 'line-through' },
  status: { fontFamily: fonts.mono, fontSize: 11 },
  meta: { fontFamily: fonts.mono, fontSize: 10, color: colors.inkDim40, marginTop: 4 },
  barWrap: { marginTop: 6 },
});
