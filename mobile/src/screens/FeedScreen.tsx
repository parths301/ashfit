import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AngledPanel from '../components/AngledPanel';
import ScreenTitle from '../components/ScreenTitle';
import { colors, fonts } from '../theme/theme';
import { AlertItem, Reminder } from '../state/types';

interface Props {
  reminders: Reminder[];
  alerts: AlertItem[];
  onToggleReminder: (id: string) => void;
}

export default function FeedScreen({ reminders, alerts, onToggleReminder }: Props) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenTitle>FEED</ScreenTitle>

      <Text style={[styles.sectionLabel, { marginTop: 16 }]}>// REMINDERS</Text>
      <View style={{ gap: 8 }}>
        {reminders.map((r) => (
          <Pressable key={r.id} onPress={() => onToggleReminder(r.id)}>
            <AngledPanel
              cut={{ type: 'notch', size: 10 }}
              fill={colors.cyan03}
              stroke={r.on ? colors.cyan40 : colors.inkDim15}
              style={styles.reminderRow}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.reminderLabel, { color: r.on ? colors.ink : colors.inkDim45 }]}>{r.label}</Text>
                <Text style={styles.reminderMeta}>
                  {r.time} · {r.days}
                </Text>
              </View>
              <View style={[styles.track, { borderColor: r.on ? colors.cyan : colors.inkDim30, backgroundColor: r.on ? colors.cyan12 : 'transparent' }]}>
                <View style={[styles.knob, { left: r.on ? 22 : 2, backgroundColor: r.on ? colors.cyan : colors.inkDim30 }]} />
              </View>
            </AngledPanel>
          </Pressable>
        ))}
      </View>

      <Text style={[styles.sectionLabel, { color: colors.mag70, marginTop: 20 }]}>// SYSTEM ALERTS</Text>
      <View style={{ gap: 6 }}>
        {alerts.map((a, i) => (
          <View key={i} style={[styles.alertRow, { borderLeftColor: a.c }]}>
            <View style={styles.alertHead}>
              <Text style={[styles.alertTag, { color: a.c }]}>[{a.tag}]</Text>
              <Text style={styles.alertTime}>{a.time}</Text>
            </View>
            <Text style={styles.alertMsg}>{a.msg}</Text>
          </View>
        ))}
      </View>
      <View style={{ height: 84 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20 },
  sectionLabel: { fontFamily: fonts.mono, fontSize: 10, letterSpacing: 2.5, color: colors.cyan55, marginBottom: 8 },
  reminderRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 11 },
  reminderLabel: { fontFamily: fonts.body, fontSize: 15, letterSpacing: 0.7 },
  reminderMeta: { fontFamily: fonts.mono, fontSize: 10, color: colors.inkDim40, marginTop: 2 },
  track: { width: 40, height: 20, borderWidth: 1 },
  knob: { position: 'absolute', top: 2, width: 14, height: 14 },
  alertRow: { borderLeftWidth: 2, backgroundColor: colors.inkDim02, paddingHorizontal: 12, paddingVertical: 8 },
  alertHead: { flexDirection: 'row', justifyContent: 'space-between' },
  alertTag: { fontFamily: fonts.mono, fontSize: 10, letterSpacing: 1.5 },
  alertTime: { fontFamily: fonts.mono, fontSize: 10, color: colors.inkDim35 },
  alertMsg: { fontFamily: fonts.bodyReg, fontSize: 13, color: colors.inkDim75, marginTop: 2, letterSpacing: 0.4 },
});
