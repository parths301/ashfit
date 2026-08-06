import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { colors, fonts } from '../theme/theme';
import { formatTime } from '../state/utils';

export default function MeditateScreen({ medSec, onEnd }: { medSec: number; onEnd: () => void }) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.25, duration: 4000, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 4000, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [scale]);

  return (
    <View style={styles.screen}>
      <Text style={styles.kicker}>// MINDFULNESS FIRMWARE v1.2</Text>
      <View style={styles.center}>
        <Animated.View style={[styles.ring, { transform: [{ scale }] }]} />
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.time}>{formatTime(medSec)}</Text>
          <Text style={styles.hint}>BREATHE WITH THE RING</Text>
        </View>
      </View>
      <PrimaryButton label="■ END SESSION" onPress={onEnd} bg={colors.cyan} fg={colors.bg2} glow="rgba(0,240,255,.4)" size="md" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 20, paddingBottom: 24 },
  kicker: { fontFamily: fonts.mono, fontSize: 11, color: colors.cyan70, letterSpacing: 3, marginTop: 18 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 30 },
  ring: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: colors.cyan60,
    backgroundColor: 'rgba(0,240,255,.08)',
    shadowColor: colors.cyan,
    shadowOpacity: 0.5,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 0 },
  },
  time: { fontFamily: fonts.bodyBold, fontSize: 34, color: colors.cyan },
  hint: { fontFamily: fonts.mono, fontSize: 11, color: colors.inkDim50, letterSpacing: 2.5, marginTop: 4 },
});
