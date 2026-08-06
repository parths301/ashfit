import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from './PrimaryButton';
import { colors, fonts, rankColor } from '../theme/theme';
import { Milestone } from '../state/types';

interface Props {
  milestone: Milestone | null;
  name: string;
  rank: string;
  level: number;
  streak: number;
  onShare: () => void;
  onClose: () => void;
}

export default function ShareCardOverlay({ milestone, name, rank, level, streak, onShare, onClose }: Props) {
  if (!milestone) return null;
  return (
    <View style={styles.backdrop}>
      <Text style={styles.previewLabel}>// STORY PREVIEW 9:16</Text>
      <View style={styles.card}>
        <View style={styles.scanlines} pointerEvents="none" />
        <View style={styles.cardInner}>
          <Text style={styles.unlocked}>MILESTONE UNLOCKED</Text>
          <Text style={styles.icon}>{milestone.icon}</Text>
          <Text style={styles.title}>{milestone.title}</Text>
          <Text style={styles.desc}>{milestone.desc}</Text>
          <View style={{ flex: 1 }} />
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>{name}</Text>
            <Text style={[styles.footerText, { color: rankColor(rank) }]}>{rank}-CLASS · LV{level}</Text>
          </View>
          <View style={styles.footerRow2}>
            <Text style={styles.footerSub}>STREAK {streak} ◆</Text>
            <Text style={[styles.footerSub, { color: colors.magenta }]}>ASHFIT.SYS</Text>
          </View>
        </View>
      </View>
      <View style={{ width: 252 }}>
        <PrimaryButton label="◱ SHARE TO INSTAGRAM" onPress={onShare} size="md" cutSize={10} />
      </View>
      <Pressable onPress={onClose}>
        <Text style={styles.cancel}>[ CANCEL ]</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    zIndex: 50,
    backgroundColor: 'rgba(3,2,8,.88)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  previewLabel: { fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: 'rgba(232,228,242,.5)' },
  card: {
    width: 252,
    height: 448,
    backgroundColor: '#0a0912',
    borderWidth: 1,
    borderColor: 'rgba(255,45,120,.6)',
    overflow: 'hidden',
  },
  scanlines: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,.05)' },
  cardInner: { flex: 1, padding: 20, paddingTop: 24 },
  unlocked: { fontFamily: fonts.mono, fontSize: 10, letterSpacing: 3, color: colors.cyan },
  icon: { fontFamily: fonts.bodyMed, fontSize: 46, color: colors.magenta, marginTop: 24 },
  title: { fontFamily: fonts.display, fontSize: 24, lineHeight: 28, marginTop: 10, color: colors.ink },
  desc: { fontFamily: fonts.mono, fontSize: 11, color: 'rgba(232,228,242,.55)', marginTop: 8 },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,45,120,.4)',
    paddingTop: 12,
  },
  footerText: { fontFamily: fonts.mono, fontSize: 11, color: 'rgba(232,228,242,.6)' },
  footerRow2: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  footerSub: { fontFamily: fonts.mono, fontSize: 10, color: 'rgba(232,228,242,.4)' },
  cancel: { fontFamily: fonts.mono, fontSize: 12, color: 'rgba(232,228,242,.45)', letterSpacing: 1.5 },
});
