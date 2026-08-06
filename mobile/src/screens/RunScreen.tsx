import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import PrimaryButton from '../components/PrimaryButton';
import Blink from '../components/Blink';
import { colors, fonts } from '../theme/theme';
import { AppState } from '../state/types';
import { formatTime } from '../state/utils';

interface Props {
  state: AppState;
  onEnd: () => void;
  onAbort: () => void;
}

export default function RunScreen({ state, onEnd, onAbort }: Props) {
  const rq = state.quests.find((q) => q.id === 'run')!;
  const runGigProg = Math.min(rq.total, rq.progress + state.runKm);
  const pace = state.runKm > 0.01 ? state.runSec / 60 / state.runKm : 0;
  const pad = (n: number) => (n < 10 ? '0' : '') + n;
  const paceStr = pace > 0 ? Math.floor(pace) + ':' + pad(Math.round((pace % 1) * 60)) : '—:——';
  const kcal = Math.round(state.runKm * 62);
  const gigPct = Math.round((runGigProg / rq.total) * 100);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerText}>// RUN MODULE — SECTOR 4 </Text>
        <Blink style={styles.headerText}>● REC</Blink>
      </View>
      <View style={styles.center}>
        <Text style={styles.km}>{state.runKm.toFixed(2)}</Text>
        <Text style={styles.kmLabel}>KILOMETERS</Text>
        <View style={styles.statsRow}>
          <Stat label="TIME" value={formatTime(state.runSec)} />
          <Stat label="PACE /KM" value={paceStr} />
          <Stat label="KCAL" value={String(kcal)} />
        </View>
        <View style={styles.gigBar}>
          <ProgressBar pct={gigPct} height={8} notch={6} trackColor={colors.cyan10} fillColor={colors.cyan} glow="rgba(0,240,255,.7)" />
        </View>
        <Text style={styles.gigLabel}>
          DAILY GIG: {runGigProg.toFixed(1)} / {rq.total.toFixed(1)} KM
        </Text>
      </View>
      <PrimaryButton label="■ END RUN — UPLOAD DATA" onPress={onEnd} bg={colors.cyan} fg={colors.bg2} glow="rgba(0,240,255,.4)" />
      <Pressable onPress={onAbort} style={{ marginTop: 12 }}>
        <Text style={styles.abort}>[ ABORT — DISCARD SESSION ]</Text>
      </Pressable>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 20, paddingBottom: 24 },
  header: { flexDirection: 'row', marginTop: 18 },
  headerText: { fontFamily: fonts.mono, fontSize: 11, color: colors.mag70, letterSpacing: 3 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  km: { fontFamily: fonts.display, fontSize: 76, lineHeight: 80, color: colors.cyan, textAlign: 'center' },
  kmLabel: { fontFamily: fonts.mono, fontSize: 13, letterSpacing: 3, color: colors.inkDim50, marginTop: 6 },
  statsRow: { flexDirection: 'row', gap: 34, marginTop: 34 },
  statValue: { fontFamily: fonts.bodyBold, fontSize: 26, color: colors.magenta },
  statLabel: { fontFamily: fonts.mono, fontSize: 10, letterSpacing: 1.5, color: colors.inkDim45 },
  gigBar: { width: '80%', marginTop: 30 },
  gigLabel: { fontFamily: fonts.mono, fontSize: 11, color: colors.cyan60, marginTop: 8 },
  abort: { fontFamily: fonts.mono, fontSize: 12, color: colors.mag70, letterSpacing: 1.5, textAlign: 'center' },
});
