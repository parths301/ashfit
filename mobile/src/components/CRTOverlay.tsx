import React, { useEffect, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Svg, { Defs, Pattern, Rect, RadialGradient, Stop } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

// Recreates the prototype's always-on CRT layer: horizontal scanlines, faint
// RGB-fringe vertical stripes, a slow moving scan band, and a vignette —
// intensity controlled by `intensity` (0-100, mirrors the design's `crt` prop).
export default function CRTOverlay({ intensity }: { intensity: number }) {
  const [h, setH] = useState(0);
  const band = useRef(new Animated.Value(0)).current;

  const onLayout = (e: LayoutChangeEvent) => setH(e.nativeEvent.layout.height);

  useEffect(() => {
    if (!h) return;
    band.setValue(-0.15 * h);
    const loop = Animated.loop(
      Animated.timing(band, {
        toValue: 1.15 * h,
        duration: 5000,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [h, band]);

  const opacity = Math.min(1, intensity / 65);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none" onLayout={onLayout}>
      <View style={[StyleSheet.absoluteFill, { opacity }]}>
        {h > 0 && (
          <Svg width="100%" height={h} style={StyleSheet.absoluteFill}>
            <Defs>
              <Pattern id="scanlines" width={3} height={3} patternUnits="userSpaceOnUse">
                <Rect x={0} y={0} width={3} height={1} fill="rgba(0,0,0,.15)" />
              </Pattern>
              <Pattern id="rgbFringe" width={3} height={3} patternUnits="userSpaceOnUse">
                <Rect x={0} y={0} width={1} height={3} fill="rgba(255,0,60,.02)" />
                <Rect x={1} y={0} width={1} height={3} fill="rgba(0,240,255,.02)" />
              </Pattern>
              <RadialGradient id="vignette" cx="50%" cy="50%" r="58%">
                <Stop offset="0" stopColor="#000" stopOpacity={0} />
                <Stop offset="1" stopColor="#000" stopOpacity={0.45} />
              </RadialGradient>
              <RadialGradient id="vignetteOuter" cx="50%" cy="50%" r="72%">
                <Stop offset="0" stopColor="#000" stopOpacity={0} />
                <Stop offset="1" stopColor="#000" stopOpacity={0.45} />
              </RadialGradient>
            </Defs>
            <Rect x={0} y={0} width="100%" height="100%" fill="url(#scanlines)" />
            <Rect x={0} y={0} width="100%" height="100%" fill="url(#rgbFringe)" />
            <Rect x={0} y={0} width="100%" height="100%" fill="url(#vignetteOuter)" />
          </Svg>
        )}
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 90,
            transform: [{ translateY: band }],
          }}
        >
          <LinearGradient
            colors={['transparent', 'rgba(255,45,120,.05)', 'transparent']}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </View>
    </View>
  );
}
