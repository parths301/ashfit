import React from 'react';
import { View } from 'react-native';
import AngledPanel from './AngledPanel';

interface Props {
  pct: number; // 0-100
  height?: number;
  trackColor: string;
  fillColor: string;
  glow?: string;
  notch?: number;
}

export default function ProgressBar({ pct, height = 8, trackColor, fillColor, glow, notch = 6 }: Props) {
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <AngledPanel cut={{ type: 'notch', size: notch }} fill={trackColor} style={{ height }}>
      <View
        style={{
          width: `${clamped}%`,
          height,
          backgroundColor: fillColor,
          shadowColor: glow ?? fillColor,
          shadowOpacity: glow ? 1 : 0,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 0 },
        }}
      />
    </AngledPanel>
  );
}
