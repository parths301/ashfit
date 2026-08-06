import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AngledPanel from './AngledPanel';
import GlitchText from './GlitchText';
import Glow from './Glow';
import { fonts } from '../theme/theme';
import { SystemPopup } from '../state/types';

export default function SystemPopupOverlay({ popup }: { popup: SystemPopup | null }) {
  if (!popup) return null;
  return (
    <View style={styles.backdrop}>
      <Glow color={popup.glow} radius={30}>
        <AngledPanel
          cut={{ type: 'notch', size: 16 }}
          fill="#0d0a14"
          stroke={popup.accent}
          strokeWidth={1}
          style={styles.box}
        >
          <Text style={[styles.kicker, { color: popup.accent }]}>{popup.kicker}</Text>
          <GlitchText style={[styles.title, { color: popup.accent }]} periodMs={4000}>
            {popup.title}
          </GlitchText>
          <View style={styles.lines}>
            {popup.lines.map((ln, i) => (
              <Text key={i} style={[styles.line, { color: ln.c }]}>
                {ln.t}
              </Text>
            ))}
          </View>
          <View style={styles.actions}>
            {popup.actions.map((ac, i) => (
              <Pressable key={i} onPress={ac.fn} style={styles.actionFlex}>
                <AngledPanel
                  cut={{ type: 'parallelogram', size: 8 }}
                  fill={ac.bg}
                  stroke={ac.bd}
                  style={styles.actionPad}
                >
                  <Text style={[styles.actionLabel, { color: ac.fg }]}>{ac.label}</Text>
                </AngledPanel>
              </Pressable>
            ))}
          </View>
        </AngledPanel>
      </Glow>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    zIndex: 40,
    backgroundColor: 'rgba(3,2,8,.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: { width: 320, maxWidth: '86%', paddingHorizontal: 22, paddingTop: 22, paddingBottom: 20 },
  kicker: { fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3 },
  title: { fontFamily: fonts.display, fontSize: 26, marginTop: 10 },
  lines: { marginTop: 18, gap: 5 },
  line: { fontFamily: fonts.mono, fontSize: 13 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 20 },
  actionFlex: { flex: 1 },
  actionPad: { paddingVertical: 12 },
  actionLabel: { fontFamily: fonts.display, fontSize: 12, letterSpacing: 1.5, textAlign: 'center' },
});
