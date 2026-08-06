import React, { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import CRTOverlay from './components/CRTOverlay';
import NavBar from './components/NavBar';
import SystemPopupOverlay from './components/SystemPopupOverlay';
import ShareCardOverlay from './components/ShareCardOverlay';
import ToastOverlay from './components/ToastOverlay';

import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import GigsScreen from './screens/GigsScreen';
import TrainScreen from './screens/TrainScreen';
import RunScreen from './screens/RunScreen';
import LiftScreen from './screens/LiftScreen';
import MeditateScreen from './screens/MeditateScreen';
import VaultScreen from './screens/VaultScreen';
import FeedScreen from './screens/FeedScreen';

import { useAppState } from './state/useAppState';
import { colors, fonts } from './theme/theme';
import { formatClock } from './state/utils';
import { Screen } from './state/types';

const CRT_INTENSITY = 65; // matches the design tool's default `crt` prop value

export default function AppRoot() {
  const { state, now, actions } = useAppState();
  const { width } = useWindowDimensions();
  const isWideWeb = Platform.OS === 'web' && width > 480;

  const flicker = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(flicker, { toValue: 1, duration: 5520, useNativeDriver: true }),
        Animated.timing(flicker, { toValue: 0.85, duration: 60, useNativeDriver: true }),
        Animated.timing(flicker, { toValue: 1, duration: 60, useNativeDriver: true }),
        Animated.timing(flicker, { toValue: 1, duration: 180, useNativeDriver: true }),
        Animated.timing(flicker, { toValue: 0.95, duration: 60, useNativeDriver: true }),
        Animated.timing(flicker, { toValue: 1, duration: 120, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [flicker]);

  const screen: Screen | 'ob' = state.onboarded ? state.screen : 'ob';
  const navVisible = state.onboarded && !['run', 'lift', 'meditate'].includes(screen);

  return (
    <View style={styles.outer}>
      <StatusBar style="light" />
      <View style={[styles.frameWrap, isWideWeb && styles.frameWrapWide]}>
        <Animated.View style={[styles.frame, isWideWeb && styles.frameFixed, { opacity: flicker }]}>
          <LinearGradient colors={[colors.bg1, colors.bg2]} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={StyleSheet.absoluteFill} />
          <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
            {screen === 'ob' ? (
              <OnboardingScreen
                state={state}
                onNext={actions.obNext}
                onSkip={actions.skipOb}
                onFinish={actions.finishOb}
                onNameChange={actions.setObName}
                onGoalPick={actions.setObGoal}
              />
            ) : (
              <>
                <View style={styles.statusBar}>
                  <Text style={styles.statusText}>{formatClock(now)}</Text>
                  <Text style={styles.statusText}>▲ SYNC 98.2% · DAY {state.day}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  {screen === 'home' && (
                    <HomeScreen state={state} now={now} onAllocate={actions.allocate} onQuestTap={actions.questTap} onStartRun={actions.startRun} />
                  )}
                  {screen === 'gigs' && <GigsScreen state={state} now={now} onQuestTap={actions.questTap} />}
                  {screen === 'train' && (
                    <TrainScreen
                      onStartRun={actions.startRun}
                      onGoLift={actions.goLift}
                      onStartMeditate={actions.startMeditate}
                      onToast={actions.showToast}
                    />
                  )}
                  {screen === 'run' && <RunScreen state={state} onEnd={actions.endRun} onAbort={actions.abortRun} />}
                  {screen === 'lift' && (
                    <LiftScreen state={state} onToggle={actions.toggleLift} onFinish={actions.finishLift} onBack={actions.goHome} />
                  )}
                  {screen === 'meditate' && <MeditateScreen medSec={state.medSec} onEnd={actions.endMeditate} />}
                  {screen === 'vault' && <VaultScreen milestones={state.milestones} onShare={actions.openShareCard} />}
                  {screen === 'feed' && (
                    <FeedScreen reminders={state.reminders} alerts={state.alerts} onToggleReminder={actions.toggleReminder} />
                  )}
                </View>

                {navVisible && <NavBar screen={state.screen} onTap={actions.setScreen} />}
              </>
            )}

            <SystemPopupOverlay popup={state.popup} />
            <ShareCardOverlay
              milestone={state.shareCard}
              name={state.obName || 'V.ASHFORD'}
              rank={state.rank}
              level={state.level}
              streak={state.streak}
              onShare={actions.shareNow}
              onClose={actions.closeShare}
            />
            <ToastOverlay message={state.toast} />
            <CRTOverlay intensity={CRT_INTENSITY} />
          </SafeAreaView>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1, backgroundColor: colors.bg0 },
  frameWrap: { flex: 1 },
  frameWrapWide: { alignItems: 'center', justifyContent: 'center' },
  frame: { flex: 1, overflow: 'hidden' },
  frameFixed: { flex: 0, width: 430, height: 932, maxHeight: '96%' },
  safe: { flex: 1 },
  statusBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 14 },
  statusText: { fontFamily: fonts.mono, fontSize: 12, color: colors.mag60 },
});
