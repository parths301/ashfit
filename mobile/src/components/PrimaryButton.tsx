import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import AngledPanel from './AngledPanel';
import Glow from './Glow';
import { colors, fonts } from '../theme/theme';

interface Props {
  label: string;
  onPress: () => void;
  bg?: string;
  fg?: string;
  glow?: string;
  border?: string;
  size?: 'lg' | 'md';
  cutSize?: number;
}

export default function PrimaryButton({
  label,
  onPress,
  bg = colors.magenta,
  fg = colors.bg1,
  glow = 'rgba(255,45,120,.5)',
  border,
  size = 'lg',
  cutSize = 12,
}: Props) {
  return (
    <Glow color={glow} radius={size === 'lg' ? 16 : 10}>
      <Pressable onPress={onPress} hitSlop={4}>
        <AngledPanel
          cut={{ type: 'parallelogram', size: cutSize }}
          fill={bg}
          stroke={border}
          style={{ paddingVertical: size === 'lg' ? 16 : 15 }}
        >
          <Text style={[styles.label, { color: fg, fontSize: size === 'lg' ? 16 : 15 }]}>{label}</Text>
        </AngledPanel>
      </Pressable>
    </Glow>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.display,
    letterSpacing: 3,
    textAlign: 'center',
  },
});
