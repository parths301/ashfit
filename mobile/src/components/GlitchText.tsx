import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, Text, TextStyle, View } from 'react-native';
import { colors } from '../theme/theme';

// Approximates the design's `text-shadow: 2px 0 cyan, -2px 0 magenta` chromatic
// split plus the periodic `glitchX` keyframe jump, using two offset RN Text
// copies (RN only supports a single text-shadow) driven by an Animated loop.
export default function GlitchText({
  children,
  style,
  periodMs = 5000,
}: {
  children: string;
  style: StyleProp<TextStyle>;
  periodMs?: number;
}) {
  const jump = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      Animated.sequence([
        Animated.delay(periodMs),
        Animated.timing(jump, { toValue: -2, duration: 40, useNativeDriver: true }),
        Animated.timing(jump, { toValue: 2, duration: 40, useNativeDriver: true }),
        Animated.timing(jump, { toValue: 0, duration: 40, useNativeDriver: true }),
      ]).start(({ finished }) => finished && run());
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [jump, periodMs]);

  return (
    <View>
      <Text style={[style, { color: colors.cyan, position: 'absolute', left: 2 }]}>{children}</Text>
      <Text style={[style, { color: colors.magenta, position: 'absolute', left: -2 }]}>{children}</Text>
      <Animated.Text style={[style, { transform: [{ translateX: jump }] }]}>{children}</Animated.Text>
    </View>
  );
}
