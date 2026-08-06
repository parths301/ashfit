import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, fonts } from '../theme/theme';

export default function ScreenTitle({ children, subtitle }: { children: string; subtitle?: string }) {
  return (
    <>
      <Text style={styles.title}>{children}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </>
  );
}

const styles = StyleSheet.create({
  title: { fontFamily: fonts.display, fontSize: 22, color: colors.ink, marginTop: 18 },
  subtitle: { fontFamily: fonts.mono, fontSize: 12, color: colors.inkDim50, marginTop: 6 },
});
