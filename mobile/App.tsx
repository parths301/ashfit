import React, { useCallback } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Orbitron_500Medium, Orbitron_700Bold, Orbitron_900Black } from '@expo-google-fonts/orbitron';
import {
  Rajdhani_400Regular,
  Rajdhani_500Medium,
  Rajdhani_600SemiBold,
  Rajdhani_700Bold,
} from '@expo-google-fonts/rajdhani';
import { ShareTechMono_400Regular } from '@expo-google-fonts/share-tech-mono';

import AppRoot from './src/AppRoot';
import { colors } from './src/theme/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [fontsLoaded] = useFonts({
    Orbitron_900Black,
    Orbitron_700Bold,
    Orbitron_500Medium,
    Rajdhani_400Regular,
    Rajdhani_500Medium,
    Rajdhani_600SemiBold,
    Rajdhani_700Bold,
    ShareTechMono_400Regular,
  });

  const onLayout = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: colors.bg0 }} onLayout={onLayout}>
        <AppRoot />
      </View>
    </SafeAreaProvider>
  );
}
