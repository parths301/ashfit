import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ProgressBar from './ProgressBar';
import { colors, fonts } from '../theme/theme';
import { StatKey } from '../state/types';
import { statColor, statGlow, statLabelColor } from '../state/utils';

export default function StatRow({
  stat,
  value,
  canAllocate,
  onAllocate,
}: {
  stat: StatKey;
  value: number;
  canAllocate: boolean;
  onAllocate: () => void;
}) {
  const c = statColor(stat);
  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: statLabelColor(stat) }]}>{stat}</Text>
      <View style={{ flex: 1 }}>
        <ProgressBar pct={Math.min(100, value)} height={10} notch={6} trackColor={colors.cyan08} fillColor={c} glow={statGlow(stat)} />
      </View>
      <Text style={[styles.value, { color: c }]}>{value}</Text>
      {canAllocate && (
        <Pressable onPress={onAllocate} style={styles.plus}>
          <Text style={styles.plusLabel}>+</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  label: { width: 34, fontFamily: fonts.mono, fontSize: 11 },
  value: { width: 26, fontFamily: fonts.bodyBold, fontSize: 15, textAlign: 'right' },
  plus: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: colors.magenta,
    backgroundColor: colors.mag08,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusLabel: { color: colors.magenta, fontFamily: fonts.bodyBold, fontSize: 15 },
});
