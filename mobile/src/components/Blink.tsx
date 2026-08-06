import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, TextStyle } from 'react-native';

// Recreates `animation: blinkCursor Ns infinite` applied directly to a text node
// (as opposed to BlinkCursor, which appends a separate cursor glyph).
export default function Blink({
  children,
  style,
  periodMs = 1400,
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  periodMs?: number;
}) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const half = periodMs / 2;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0, duration: 0, delay: half, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 0, delay: half, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity, periodMs]);

  return <Animated.Text style={[style, { opacity }]}>{children}</Animated.Text>;
}
