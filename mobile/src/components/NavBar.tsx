import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme/theme';
import { Screen } from '../state/types';

const NAV_ITEMS: { id: Screen; label: string }[] = [
  { id: 'home', label: '◈ HUD' },
  { id: 'gigs', label: '▣ GIGS' },
  { id: 'train', label: '▲ TRAIN' },
  { id: 'vault', label: '◆ VAULT' },
  { id: 'feed', label: '◉ FEED' },
];

export default function NavBar({ screen, onTap }: { screen: Screen; onTap: (s: Screen) => void }) {
  return (
    <View style={styles.bar}>
      {NAV_ITEMS.map((n) => {
        const active = screen === n.id || (n.id === 'train' && ['run', 'lift', 'meditate'].includes(screen));
        const color = active ? colors.magenta : 'rgba(232,228,242,.4)';
        return (
          <Pressable key={n.id} onPress={() => onTap(n.id)} style={styles.item}>
            <View style={[styles.topBar, { backgroundColor: active ? colors.magenta : 'transparent' }]} />
            <Text style={[styles.label, { color }]}>{n.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(10,7,16,.96)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,45,120,.35)',
  },
  item: { flex: 1, alignItems: 'center', paddingTop: 12, paddingBottom: 22 },
  topBar: { position: 'absolute', top: -1, left: 0, right: 0, height: 2 },
  label: { fontFamily: fonts.mono, fontSize: 10, letterSpacing: 1.2, marginTop: 1 },
});
