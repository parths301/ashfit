import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AngledPanel from '../components/AngledPanel';
import ScreenTitle from '../components/ScreenTitle';
import { colors, fonts } from '../theme/theme';
import { routines } from '../state/demoData';

interface Props {
  onStartRun: () => void;
  onGoLift: () => void;
  onStartMeditate: () => void;
  onToast: (msg: string) => void;
}

export default function TrainScreen({ onStartRun, onGoLift, onStartMeditate, onToast }: Props) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenTitle subtitle="SELECT MODULE TO JACK IN.">TRAINING MODULES</ScreenTitle>

      <View style={{ gap: 12, marginTop: 18 }}>
        <ModuleCard
          onPress={onStartRun}
          name="RUN"
          nameColor={colors.magenta}
          border={colors.mag55}
          gradientColor="rgba(255,45,120,.1)"
          meta="GPS SIM · SECTOR 4"
          desc="LIVE PACE · DISTANCE · +XP PER KM · FEEDS DAILY GIG"
        />
        <ModuleCard
          onPress={onGoLift}
          name="LIFT"
          nameColor={colors.cyan}
          border={colors.cyan50}
          gradientColor="rgba(0,240,255,.08)"
          meta="PUSH DAY · 5 EXERCISES"
          desc="BENCH · OHP · INCLINE · FLY · DIPS — CHECK OFF SETS"
        />
        <ModuleCard
          onPress={onStartMeditate}
          name="MEDITATE"
          nameColor={colors.ink}
          border={colors.inkDim30}
          gradientColor="rgba(232,228,242,.05)"
          meta="MINDFULNESS FIRMWARE"
          desc="GUIDED BREATH CYCLE · +INT · LOWERS PENALTY RISK"
        />
      </View>

      <Text style={styles.sectionLabel}>// PRE-PROGRAMMED ROUTINES</Text>
      <View style={{ gap: 8 }}>
        {routines.map((r) => (
          <Pressable
            key={r.name}
            onPress={() => onToast('ROUTINE LOADED — AVAILABLE TOMORROW')}
            style={styles.routineRow}
          >
            <Text style={styles.routineName}>{r.name}</Text>
            <Text style={styles.routineMeta}>{r.meta}</Text>
          </Pressable>
        ))}
      </View>
      <View style={{ height: 84 }} />
    </ScrollView>
  );
}

function ModuleCard({
  onPress,
  name,
  nameColor,
  border,
  gradientColor,
  meta,
  desc,
}: {
  onPress: () => void;
  name: string;
  nameColor: string;
  border: string;
  gradientColor: string;
  meta: string;
  desc: string;
}) {
  return (
    <Pressable onPress={onPress}>
      <AngledPanel
        cut={{ type: 'notch', size: 12 }}
        gradient={{ colors: [gradientColor, 'transparent'] }}
        stroke={border}
        style={styles.moduleBox}
      >
        <View style={styles.row}>
          <Text style={[styles.moduleName, { color: nameColor }]}>{name}</Text>
          <Text style={styles.moduleMeta}>{meta}</Text>
        </View>
        <Text style={styles.moduleDesc}>{desc}</Text>
      </AngledPanel>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20 },
  moduleBox: { paddingHorizontal: 16, paddingVertical: 18 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  moduleName: { fontFamily: fonts.display, fontSize: 18 },
  moduleMeta: { fontFamily: fonts.mono, fontSize: 11, color: colors.inkDim50 },
  moduleDesc: { fontFamily: fonts.mono, fontSize: 11, color: colors.inkDim45, marginTop: 6 },
  sectionLabel: { fontFamily: fonts.mono, fontSize: 10, letterSpacing: 2.5, color: colors.cyan55, marginTop: 22, marginBottom: 8 },
  routineRow: {
    borderLeftWidth: 3,
    borderLeftColor: colors.cyan40,
    backgroundColor: colors.cyan03,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  routineName: { fontFamily: fonts.body, fontSize: 14, letterSpacing: 0.7, color: colors.ink },
  routineMeta: { fontFamily: fonts.mono, fontSize: 10, color: colors.inkDim40 },
});
