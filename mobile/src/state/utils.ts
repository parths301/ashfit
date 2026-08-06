import { colors } from '../theme/theme';
import { StatKey } from './types';

const pad = (n: number) => (n < 10 ? '0' : '') + n;

export function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}

export function formatClock(now: number): string {
  return new Date(now).toTimeString().slice(0, 5);
}

// Countdown to local midnight — mirrors the design's penalty-daemon timer.
export function formatPenaltyCountdown(now: number): string {
  const mid = new Date(now);
  mid.setHours(24, 0, 0, 0);
  const d = Math.max(0, mid.getTime() - now);
  const hh = Math.floor(d / 3600000);
  const mm = Math.floor(d / 60000) % 60;
  const ss = Math.floor(d / 1000) % 60;
  return pad(hh) + ':' + pad(mm) + ':' + pad(ss);
}

// Only VIT renders "hot" (magenta) in the source design — every other stat is cyan.
export function statColor(stat: StatKey): string {
  return stat === 'VIT' ? colors.magenta : colors.cyan;
}
export function statGlow(stat: StatKey): string {
  return stat === 'VIT' ? 'rgba(255,45,120,.7)' : 'rgba(0,240,255,.7)';
}
export function statLabelColor(stat: StatKey): string {
  return stat === 'VIT' ? colors.magenta : 'rgba(232,228,242,.6)';
}
