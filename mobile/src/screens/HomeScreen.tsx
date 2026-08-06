import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AngledPanel from '../components/AngledPanel';
import ProgressBar from '../components/ProgressBar';
import RankBadge from '../components/RankBadge';
import GlitchText from '../components/GlitchText';
import StatRow from '../components/StatRow';
import QuestCard from '../components/QuestCard';
import PrimaryButton from '../components/PrimaryButton';
import BlinkCursor from '../components/BlinkCursor';
import Blink from '../components/Blink';
import { colors, fonts, rankColor, rankGlow } from '../theme/theme';
import { AppState, StatKey } from '../state/types';
import { formatPenaltyCountdown } from '../state/utils';

const STAT_ORDER: StatKey[] = ['STR', 'AGI', 'VIT', 'INT', 'PER'];

interface Props {
  state: AppState;
  now: number;
  onAllocate: (k: StatKey) => void;
  onQuestTap: (id: string) => void;
  onStartRun: () => void;
}

export default function HomeScreen({ state, now, onAllocate, onQuestTap, onStartRun }: Props) {
  const rc = rankColor(state.rank);
  const rg = rankGlow(state.rank);
  const xpPct = Math.round((state.xp / state.xpMax) * 100);
  const canAllocate = state.statPts > 0;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <AngledPanel
        cut={{ type: 'notchXY', x: 40, y: 14 }}
        gradient={{ colors: ['rgba(255,45,120,.14)', 'transparent'], locations: [0, 0.7] }}
        stroke={colors.mag50}
        style={styles.banner}
      >
        <View style={styles.bannerRow}>
          <RankBadge rank={state.rank} color={rc} glow={rg} />
          <View style={{ flex: 1 }}>
            <GlitchText style={styles.name} periodMs={6000}>
              {state.obName || 'V.ASHFORD'}
            </GlitchText>
            <Text style={styles.sub}>
              MERC · LV{state.level} · STREAK {state.streak} ◆
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.xpLabel}>XP</Text>
            <Text style={styles.xpValue}>{xpPct}%</Text>
          </View>
        </View>
        <View style={{ marginTop: 12 }}>
          <ProgressBar pct={xpPct} height={8} notch={6} trackColor="rgba(255,45,120,.15)" fillColor={colors.magenta} glow="rgba(255,45,120,.8)" />
        </View>
        <View style={styles.bannerFoot}>
          <Text style={styles.bannerFootText}>
            {state.xp} / {state.xpMax} XP
          </Text>
          <Text style={styles.bannerFootText}>NEXT: LV{state.level + 1}</Text>
        </View>
      </AngledPanel>

      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionLabel}>// ATTRIBUTES</Text>
          <Text style={[styles.sectionLabel, { color: canAllocate ? colors.magenta : colors.inkDim35 }]}>
            {canAllocate ? `+${state.statPts} PTS UNSPENT — TAP + TO ALLOCATE` : 'ALL POINTS SPENT'}
          </Text>
        </View>
        <View style={{ gap: 7 }}>
          {STAT_ORDER.map((k) => (
            <StatRow key={k} stat={k} value={state.stats[k]} canAllocate={canAllocate} onAllocate={() => onAllocate(k)} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={[styles.sectionLabel, { color: colors.mag70 }]}>// DAILY GIGS</Text>
          <PenaltyLabel now={now} />
        </View>
        <View style={{ gap: 8 }}>
          {state.quests.map((q) => (
            <QuestCard key={q.id} q={q} onPress={() => onQuestTap(q.id)} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <PrimaryButton label="▶ JACK IN — START RUN" onPress={onStartRun} />
      </View>

      <View style={[styles.section, { paddingTop: 14 }]}>
        <View style={styles.sysLine}>
          <Text style={styles.sysLineText}>
            [SYSTEM] DIRECTIVE ISSUED. COMPLETE ALL GIGS BEFORE 00:00.
            <BlinkCursor style={styles.sysLineText} />
          </Text>
        </View>
      </View>
      <View style={{ height: 84 }} />
    </ScrollView>
  );
}

function PenaltyLabel({ now }: { now: number }) {
  return <Blink style={styles.penalty}>⚠ {formatPenaltyCountdown(now)} TO PENALTY</Blink>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingBottom: 0 },
  banner: { marginTop: 16, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 16 },
  bannerRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  name: { fontFamily: fonts.display, fontSize: 21, letterSpacing: 1 },
  sub: { fontFamily: fonts.mono, fontSize: 11, color: colors.inkDim50, marginTop: 3 },
  xpLabel: { fontFamily: fonts.mono, fontSize: 11, color: colors.cyan },
  xpValue: { fontFamily: fonts.bodyBold, fontSize: 18, color: colors.ink },
  bannerFoot: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  bannerFootText: { fontFamily: fonts.mono, fontSize: 10, color: colors.inkDim40 },
  section: { paddingHorizontal: 20, paddingTop: 18 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sectionLabel: { fontFamily: fonts.mono, fontSize: 10, letterSpacing: 2.5, color: colors.cyan55 },
  penalty: { fontFamily: fonts.mono, fontSize: 10, letterSpacing: 2.5, color: colors.magenta },
  sysLine: {
    borderLeftWidth: 2,
    borderLeftColor: colors.cyan,
    backgroundColor: colors.cyan04,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sysLineText: { fontFamily: fonts.mono, fontSize: 12, color: colors.cyan75 },
});
