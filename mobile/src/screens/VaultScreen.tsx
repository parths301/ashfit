import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AngledPanel from '../components/AngledPanel';
import ScreenTitle from '../components/ScreenTitle';
import { colors, fonts } from '../theme/theme';
import { Milestone } from '../state/types';

export default function VaultScreen({ milestones, onShare }: { milestones: Milestone[]; onShare: (m: Milestone) => void }) {
  const unCount = milestones.filter((m) => m.un).length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenTitle subtitle={`${unCount} / ${milestones.length} UNLOCKED — SHARE UNLOCKS TO THE FEED.`}>TROPHY VAULT</ScreenTitle>
      <View style={styles.grid}>
        {milestones.map((m) => (
          <AngledPanel
            key={m.id}
            cut={{ type: 'notch', size: 12 }}
            fill={m.un ? colors.cyan04 : colors.inkDim02}
            stroke={m.un ? colors.cyan40 : colors.inkDim12}
            style={[styles.card, { opacity: m.un ? 1 : 0.6 }]}
          >
            <Text style={[styles.icon, { color: m.un ? colors.cyan : colors.inkDim25 }]}>{m.icon}</Text>
            <Text style={styles.title}>{m.title}</Text>
            <Text style={styles.desc}>{m.desc}</Text>
            <Text style={[styles.date, { color: m.un ? colors.magenta : colors.inkDim30 }]}>
              {m.un ? 'UNLOCKED · ' + m.date : '▒ LOCKED'}
            </Text>
            {m.un && (
              <Pressable onPress={() => onShare(m)}>
                <View style={styles.shareBtn}>
                  <Text style={styles.shareLabel}>◱ SHARE TO IG</Text>
                </View>
              </Pressable>
            )}
          </AngledPanel>
        ))}
      </View>
      <View style={{ height: 84 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 16 },
  card: { width: '48%', padding: 14 },
  icon: { fontFamily: fonts.bodyMed, fontSize: 26 },
  title: { fontFamily: fonts.body, fontSize: 14, letterSpacing: 0.7, color: colors.ink, marginTop: 8 },
  desc: { fontFamily: fonts.mono, fontSize: 9, color: colors.inkDim45, marginTop: 3 },
  date: { fontFamily: fonts.mono, fontSize: 9, marginTop: 8 },
  shareBtn: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.magenta,
    backgroundColor: colors.mag06,
    paddingVertical: 7,
    alignItems: 'center',
  },
  shareLabel: { fontFamily: fonts.mono, fontSize: 10, color: colors.magenta, letterSpacing: 1.5 },
});
