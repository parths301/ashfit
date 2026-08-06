import React from 'react';
import { View, ViewStyle } from 'react-native';

// Approximates the design's `box-shadow: 0 0 Npx color` neon glow. RN's New
// Architecture (Skia) renders colored shadows on both platforms, so a plain
// shadow* style set is enough — no manual blur layering needed.
export default function Glow({
  color,
  radius = 24,
  style,
  children,
}: {
  color: string;
  radius?: number;
  style?: ViewStyle | ViewStyle[];
  children: React.ReactNode;
}) {
  return (
    <View
      style={[
        {
          shadowColor: color,
          shadowOpacity: 1,
          shadowRadius: radius,
          shadowOffset: { width: 0, height: 0 },
          elevation: 10,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
