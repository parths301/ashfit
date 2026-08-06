import React, { useId, useState, useCallback } from 'react';
import { View, StyleSheet, ViewStyle, LayoutChangeEvent } from 'react-native';
import Svg, { Polygon, Defs, LinearGradient, Stop } from 'react-native-svg';

// Recreates the design's CSS clip-path angular corner cuts as an SVG polygon
// background, since RN has no clip-path. Content is rendered in a normal View
// on top and is expected to be padded away from the cut corner(s) — matching
// how every panel in the source design is composed (text never sits in the notch).

export type CutSpec =
  | { type: 'none' }
  | { type: 'parallelogram'; size: number } // top-left & bottom-right both slanted inward
  | { type: 'notch'; size: number } // bottom-right corner cut
  | { type: 'notchXY'; x: number; y: number } // bottom-right corner cut, asymmetric
  | { type: 'notchPct'; xPct: number; yPct: number } // bottom-right cut as % of box (rank badge)
  | { type: 'notchTopBottomRight'; size: number }; // top-right + bottom-right cut (input fields)

export interface GradientSpec {
  colors: string[];
  locations?: number[];
  // direction as fractions of own bounding box, 0..1
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
}

interface AngledPanelProps {
  cut: CutSpec;
  fill?: string;
  gradient?: GradientSpec;
  stroke?: string;
  strokeWidth?: number;
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
}

function buildPoints(cut: CutSpec, w: number, h: number): string {
  switch (cut.type) {
    case 'parallelogram': {
      const n = cut.size;
      return `${n},0 ${w},0 ${w - n},${h} 0,${h}`;
    }
    case 'notch': {
      const n = cut.size;
      return `0,0 ${w},0 ${w},${h - n} ${w - n},${h} 0,${h}`;
    }
    case 'notchXY': {
      const { x, y } = cut;
      return `0,0 ${w},0 ${w},${h - y} ${w - x},${h} 0,${h}`;
    }
    case 'notchPct': {
      const { xPct, yPct } = cut;
      return `0,0 ${w},0 ${w},${h * yPct} ${w * xPct},${h} 0,${h}`;
    }
    case 'notchTopBottomRight': {
      const n = cut.size;
      return `0,0 ${w - n},0 ${w},${n} ${w},${h} 0,${h}`;
    }
    case 'none':
    default:
      return `0,0 ${w},0 ${w},${h} 0,${h}`;
  }
}

export default function AngledPanel({ cut, fill, gradient, stroke, strokeWidth = 1, style, children }: AngledPanelProps) {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const gradId = useId().replace(/[:]/g, '');

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize((prev) => (prev && prev.w === width && prev.h === height ? prev : { w: width, h: height }));
  }, []);

  const points = size ? buildPoints(cut, size.w, size.h) : '';

  return (
    <View style={style} onLayout={onLayout}>
      {size && (
        <Svg width={size.w} height={size.h} style={StyleSheet.absoluteFill} pointerEvents="none">
          {gradient && (
            <Defs>
              <LinearGradient
                id={gradId}
                x1={gradient.x1 ?? 0}
                y1={gradient.y1 ?? 0}
                x2={gradient.x2 ?? 1}
                y2={gradient.y2 ?? 0}
              >
                {gradient.colors.map((c, i) => (
                  <Stop
                    key={i}
                    offset={gradient.locations ? gradient.locations[i] : i / (gradient.colors.length - 1)}
                    stopColor={c}
                  />
                ))}
              </LinearGradient>
            </Defs>
          )}
          <Polygon
            points={points}
            fill={gradient ? `url(#${gradId})` : fill ?? 'transparent'}
            stroke={stroke}
            strokeWidth={stroke ? strokeWidth : 0}
          />
        </Svg>
      )}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { position: 'relative' },
});
