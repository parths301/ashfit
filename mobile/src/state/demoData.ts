import { AlertItem, AppState, Lift, Milestone, Quest, Reminder } from './types';

export const initialQuests: Quest[] = [
  { id: 'run', title: 'RUN 5.0KM — SECTOR 4', xp: 120, stat: 'AGI', total: 5, progress: 3.1, unit: 'KM', done: false, hint: 'TAP TO JACK IN' },
  { id: 'lift', title: 'PUSH SESSION — IRON TEMPLE', xp: 150, stat: 'STR', total: 5, progress: 0, unit: 'EX', done: false, hint: 'TAP TO OPEN' },
  { id: 'water', title: 'HYDRATION 2.0L', xp: 40, stat: 'VIT', total: 2, progress: 1.2, unit: 'L', done: false, hint: 'TAP +0.4L' },
  { id: 'meditate', title: 'MEDITATE 10 MIN', xp: 80, stat: 'INT', total: 10, progress: 10, unit: 'MIN', done: true, hint: 'CLEAR' },
];

export const initialLifts: Lift[] = [
  { name: 'BENCH PRESS', scheme: '4×8 · 60KG', done: false },
  { name: 'OVERHEAD PRESS', scheme: '3×10 · 35KG', done: false },
  { name: 'INCLINE DB PRESS', scheme: '3×12 · 22KG', done: false },
  { name: 'CABLE FLY', scheme: '3×15 · 15KG', done: false },
  { name: 'TRICEP DIP', scheme: '3×AMRAP · BW', done: false },
];

export const initialAlerts: AlertItem[] = [
  { time: '21:02', tag: 'SYSTEM', msg: 'DIRECTIVE ISSUED. COMPLETE ALL DAILY GIGS BEFORE 00:00.', c: '#ff2d78' },
  { time: '19:40', tag: 'REMINDER', msg: 'HYDRATION CHECKPOINT — 0.8L REMAINING.', c: '#00f0ff' },
  { time: '17:12', tag: 'STREAK', msg: '12-DAY STREAK ACTIVE. DO NOT BREAK THE CHAIN.', c: '#00f0ff' },
  { time: '06:00', tag: 'REMINDER', msg: 'MORNING RUN WINDOW OPEN — SECTOR 4 ROUTE LOADED.', c: '#00f0ff' },
  { time: 'DAY 116', tag: 'SYSTEM', msg: 'VIT +1. RECOVERY METRICS NOMINAL.', c: '#e8e4f2' },
];

export const initialReminders: Reminder[] = [
  { id: 'r1', label: 'MORNING RUN', time: '06:00', days: 'MON–SAT', on: true },
  { id: 'r2', label: 'HYDRATION PING', time: 'EVERY 2H', days: 'DAILY', on: true },
  { id: 'r3', label: 'MEDITATION WINDOW', time: '22:00', days: 'DAILY', on: false },
  { id: 'r4', label: 'SLEEP PROTOCOL', time: '23:30', days: 'DAILY', on: true },
];

export const initialMilestones: Milestone[] = [
  { id: 'm1', icon: '▲', title: 'FIRST BLOOD', desc: 'FIRST WORKOUT LOGGED', date: 'DAY 001', un: true },
  { id: 'm2', icon: '◈', title: '10-DAY STREAK', desc: '10 CONSECUTIVE DAYS', date: 'DAY 114', un: true },
  { id: 'm3', icon: '⬡', title: '100KM LIFETIME', desc: 'CUMULATIVE DISTANCE', date: 'DAY 098', un: true },
  { id: 'm4', icon: '●', title: 'RANK C ASCENSION', desc: 'PROMOTED TO C-CLASS', date: 'DAY 090', un: true },
  { id: 'm5', icon: '✦', title: 'RANK B ASCENSION', desc: 'REACH LEVEL 25', date: '', un: false },
  { id: 'm6', icon: '▼', title: '5AM PROTOCOL', desc: 'TRAIN BEFORE 05:30', date: '', un: false },
  { id: 'm7', icon: '◆', title: 'IRON 100', desc: '100 LIFT SESSIONS', date: '', un: false },
  { id: 'm8', icon: '◉', title: 'MARATHON MODULE', desc: 'RUN 42.2KM SINGLE SESSION', date: '', un: false },
];

export const goalOptions = [
  { name: 'WEIGHT LOSS PROTOCOL', desc: 'CALORIC DEFICIT · CARDIO-WEIGHTED QUESTS' },
  { name: 'FULL-SPEC FITNESS', desc: 'BALANCED STR / AGI / VIT AUGMENTATION' },
  { name: 'MINDFULNESS FIRMWARE', desc: 'MEDITATION · SLEEP · INT GROWTH' },
  { name: 'STRENGTH AUGMENT', desc: 'PROGRESSIVE OVERLOAD · STR PRIORITY' },
];

export const routines = [
  { name: 'PULL DAY — BACK/BI', meta: '6 EX · 45 MIN' },
  { name: 'LEG DAY — LOWER SPEC', meta: '5 EX · 50 MIN' },
  { name: 'HIIT — 20MIN BURN', meta: 'INTERVALS · 20 MIN' },
];

export const initialAppState: AppState = {
  onboarded: false,
  obStep: 0,
  obName: 'V.ASHFORD',
  obGoal: 'FULL-SPEC FITNESS',

  screen: 'home',

  level: 24,
  xp: 2340,
  xpMax: 3000,
  rank: 'C',
  streak: 12,
  statPts: 3,
  day: 117,
  stats: { STR: 42, AGI: 37, VIT: 51, INT: 28, PER: 33 },

  quests: initialQuests,
  dailyCleared: false,

  running: false,
  runKm: 0,
  runSec: 0,

  medSec: 0,

  lifts: initialLifts,

  alerts: initialAlerts,
  reminders: initialReminders,
  milestones: initialMilestones,

  popup: null,
  shareCard: null,
  toast: null,
};
