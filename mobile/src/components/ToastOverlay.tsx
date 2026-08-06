import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AngledPanel from './AngledPanel';
import Glow from './Glow';
import { colors, fonts } from '../theme/theme';

export default function ToastOverlay({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <View style={styles.wrap} pointerEvents="none">
      <Glow color="rgba(0,240,255,.3)" radius={14}>
        <AngledPanel cut={{ type: 'notch', size: 10 }} fill="#0d0a14" stroke={colors.cyan} style={styles.box}>
          <Text style={styles.text}>{message}</Text>
        </AngledPanel>
      </Glow>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 20, right: 20, bottom: 96, zIndex: 60 },
  box: { paddingHorizontal: 16, paddingVertical: 12 },
  text: { fontFamily: fonts.mono, fontSize: 12, color: colors.cyan, letterSpacing: 1 },
});
