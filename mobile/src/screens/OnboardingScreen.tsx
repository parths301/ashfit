import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import AngledPanel from '../components/AngledPanel';
import BlinkCursor from '../components/BlinkCursor';
import GlitchText from '../components/GlitchText';
import { colors, fonts } from '../theme/theme';
import { AppState } from '../state/types';
import { goalOptions } from '../state/demoData';

interface Props {
  state: AppState;
  onNext: () => void;
  onSkip: () => void;
  onFinish: () => void;
  onNameChange: (v: string) => void;
  onGoalPick: (name: string) => void;
}

export default function OnboardingScreen({ state, onNext, onSkip, onFinish, onNameChange, onGoalPick }: Props) {
  return (
    <View style={styles.screen}>
      {state.obStep === 0 && <BootStep onNext={onNext} onSkip={onSkip} />}
      {state.obStep === 1 && <CallsignStep name={state.obName} onChange={onNameChange} onNext={onNext} />}
      {state.obStep === 2 && <DirectiveStep goal={state.obGoal} onPick={onGoalPick} onNext={onNext} />}
      {state.obStep === 3 && <BaselineStep state={state} onFinish={onFinish} />}
    </View>
  );
}

function BootStep({ onNext, onSkip }: { onNext: () => void; onSkip: () => void }) {
  return (
    <View style={styles.center}>
      <GlitchText style={styles.logo} periodMs={3500}>
        ASHFIT
      </GlitchText>
      <Text style={styles.logoSub}>SYS v2.4 — HUNTER AUGMENTATION OS</Text>
      <View style={styles.bootLines}>
        <BootLine label="> BIOLINK............." value="OK" color={colors.cyan} />
        <BootLine label="> NEURAL HANDSHAKE...." value="OK" color={colors.cyan} />
        <BootLine label="> QUEST ENGINE........" value="OK" color={colors.cyan} />
        <BootLine label="> PENALTY DAEMON......" value="ARMED" color={colors.magenta} />
        <View style={styles.bootRow}>
          <Text style={styles.bootBase}>{'> AWAITING HUNTER'}</Text>
          <BlinkCursor style={styles.bootBase} />
        </View>
      </View>
      <View style={{ marginTop: 44 }}>
        <PrimaryButton label="▶ INITIALIZE" onPress={onNext} />
      </View>
      <Pressable onPress={onSkip} style={{ marginTop: 16 }}>
        <Text style={styles.skip}>[ SKIP — LOAD DEMO PROFILE ]</Text>
      </Pressable>
    </View>
  );
}

function BootLine({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={styles.bootRow}>
      <Text style={styles.bootBase}>{label} </Text>
      <Text style={[styles.bootBase, { color }]}>{value}</Text>
    </View>
  );
}

function CallsignStep({ name, onChange, onNext }: { name: string; onChange: (v: string) => void; onNext: () => void }) {
  return (
    <View style={styles.center}>
      <Text style={styles.kicker}>// REGISTRATION 1/3</Text>
      <Text style={styles.stepTitle}>IDENTIFY YOURSELF</Text>
      <Text style={styles.stepSub}>CALLSIGN WILL BE BOUND TO YOUR HUNTER LICENSE.</Text>
      <AngledPanel
        cut={{ type: 'notch', size: 12 }}
        fill={colors.cyan05}
        stroke={colors.cyan50}
        style={{ marginTop: 28 }}
      >
        <TextInput
          value={name}
          onChangeText={onChange}
          autoCapitalize="characters"
          autoCorrect={false}
          placeholderTextColor="rgba(0,240,255,.35)"
          style={styles.input}
        />
      </AngledPanel>
      <View style={{ marginTop: 28 }}>
        <PrimaryButton label="CONFIRM CALLSIGN" onPress={onNext} size="md" />
      </View>
    </View>
  );
}

function DirectiveStep({ goal, onPick, onNext }: { goal: string; onPick: (n: string) => void; onNext: () => void }) {
  return (
    <View style={styles.center}>
      <Text style={styles.kicker}>// REGISTRATION 2/3</Text>
      <Text style={styles.stepTitle}>SELECT DIRECTIVE</Text>
      <Text style={styles.stepSub}>PRIMARY GOAL PROGRAM. OTHERS CAN RUN IN PARALLEL.</Text>
      <View style={{ gap: 10, marginTop: 24 }}>
        {goalOptions.map((g) => {
          const sel = goal === g.name;
          return (
            <Pressable key={g.name} onPress={() => onPick(g.name)}>
              <AngledPanel
                cut={{ type: 'notch', size: 10 }}
                fill={sel ? colors.mag08 : colors.cyan03}
                stroke={sel ? colors.magenta : colors.cyan40}
                style={styles.goalPad}
              >
                <View style={styles.row}>
                  <Text style={[styles.goalName, { color: sel ? colors.magenta : colors.ink }]}>{g.name}</Text>
                  <Text style={[styles.goalMark, { color: sel ? colors.magenta : colors.inkDim30 }]}>
                    {sel ? '◉ SELECTED' : '○'}
                  </Text>
                </View>
                <Text style={styles.goalDesc}>{g.desc}</Text>
              </AngledPanel>
            </Pressable>
          );
        })}
      </View>
      <View style={{ marginTop: 24 }}>
        <PrimaryButton label="LOCK IN DIRECTIVE" onPress={onNext} size="md" />
      </View>
    </View>
  );
}

function BaselineStep({ state, onFinish }: { state: AppState; onFinish: () => void }) {
  return (
    <View style={styles.center}>
      <Text style={styles.kicker}>// REGISTRATION 3/3</Text>
      <Text style={styles.stepTitle}>BASELINE SCAN</Text>
      <AngledPanel
        cut={{ type: 'none' }}
        fill={colors.cyan03}
        stroke={colors.cyan40}
        style={styles.scanBox}
      >
        <ScanRow label="CALLSIGN....." value={state.obName} color={colors.cyan} />
        <ScanRow label="DIRECTIVE...." value={state.obGoal} color={colors.magenta} />
        <ScanRow label="START RANK..." value="E-CLASS" />
        <ScanRow label="DAILY QUESTS." value="4 ISSUED / DAY" />
        <ScanRow label="PENALTY......" value="STAT DECAY AT 00:00" />
        <ScanRow label="DEMO SAVE...." value="DAY 117 · LV.24 · C-CLASS" color={colors.cyan} />
      </AngledPanel>
      <Text style={styles.warning}>⚠ THE SYSTEM DOES NOT ACCEPT EXCUSES.</Text>
      <View style={{ marginTop: 24 }}>
        <PrimaryButton label="REGISTER HUNTER" onPress={onFinish} />
      </View>
    </View>
  );
}

function ScanRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <Text style={styles.scanLine}>
      {label} <Text style={{ color: color ?? colors.ink }}>{value}</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', padding: 32 },
  logo: { fontFamily: fonts.display, fontSize: 40, letterSpacing: 2 },
  logoSub: { fontFamily: fonts.mono, fontSize: 13, color: colors.cyan70, marginTop: 6, letterSpacing: 4 },
  bootLines: { marginTop: 36, gap: 2 },
  bootRow: { flexDirection: 'row' },
  bootBase: { fontFamily: fonts.mono, fontSize: 13, lineHeight: 26, color: colors.inkDim55 },
  skip: { fontFamily: fonts.mono, fontSize: 12, color: colors.inkDim40, letterSpacing: 1.5, textAlign: 'center' },
  kicker: { fontFamily: fonts.mono, fontSize: 11, color: colors.cyan60, letterSpacing: 3 },
  stepTitle: { fontFamily: fonts.display, fontSize: 24, color: colors.ink, marginTop: 10 },
  stepSub: { fontFamily: fonts.mono, fontSize: 13, color: colors.inkDim50, marginTop: 8 },
  input: {
    color: colors.cyan,
    fontFamily: fonts.bodyBold,
    fontSize: 22,
    letterSpacing: 2,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  goalPad: { paddingHorizontal: 16, paddingVertical: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  goalName: { fontFamily: fonts.body, fontSize: 16, letterSpacing: 1 },
  goalMark: { fontFamily: fonts.mono, fontSize: 11 },
  goalDesc: { fontFamily: fonts.mono, fontSize: 11, color: colors.inkDim45, marginTop: 4 },
  scanBox: { marginTop: 24, paddingHorizontal: 18, paddingVertical: 18 },
  scanLine: { fontFamily: fonts.mono, fontSize: 13, lineHeight: 27, color: colors.inkDim70 },
  warning: { fontFamily: fonts.mono, fontSize: 12, color: 'rgba(255,45,120,.8)', marginTop: 16 },
});
