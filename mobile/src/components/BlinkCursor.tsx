import React, { useEffect, useRef } from 'react';
import { Animated, TextStyle } from 'react-native';

export default function BlinkCursor({ style, char = '▮' }: { style?: TextStyle; char?: string }) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0, duration: 0, delay: 500, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 0, delay: 500, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return <Animated.Text style={[style, { opacity }]}>{char}</Animated.Text>;
}
