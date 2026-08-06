import React from 'react';
import { StyleSheet, Text } from 'react-native';
import AngledPanel from './AngledPanel';
import Glow from './Glow';
import { fonts } from '../theme/theme';

export default function RankBadge({ rank, color, glow, size = 58 }: { rank: string; color: string; glow: string; size?: number }) {
  return (
    <Glow color={glow} radius={16}>
      <AngledPanel
        cut={{ type: 'notchPct', xPct: 0.75, yPct: 0.75 }}
        fill="rgba(255,45,120,.08)"
        stroke={color}
        style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={[styles.letter, { color }]}>{rank}</Text>
      </AngledPanel>
    </Glow>
  );
}

const styles = StyleSheet.create({
  letter: { fontFamily: fonts.display, fontSize: 28 },
});
