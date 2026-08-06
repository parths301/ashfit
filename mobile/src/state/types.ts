export type StatKey = 'STR' | 'AGI' | 'VIT' | 'INT' | 'PER';

export type Screen = 'home' | 'gigs' | 'train' | 'run' | 'lift' | 'meditate' | 'vault' | 'feed';

export interface Quest {
  id: string;
  title: string;
  xp: number;
  stat: StatKey;
  total: number;
  progress: number;
  unit: string;
  done: boolean;
  hint: string;
}

export interface Lift {
  name: string;
  scheme: string;
  done: boolean;
}

export interface AlertItem {
  time: string;
  tag: string;
  msg: string;
  c: string;
}

export interface Reminder {
  id: string;
  label: string;
  time: string;
  days: string;
  on: boolean;
}

export interface Milestone {
  id: string;
  icon: string;
  title: string;
  desc: string;
  date: string;
  un: boolean;
}

export interface PopupAction {
  label: string;
  bg: string;
  fg: string;
  bd: string;
  fn: () => void;
}

export interface PopupLine {
  t: string;
  c: string;
}

export interface SystemPopup {
  kicker: string;
  accent: string;
  glow: string;
  title: string;
  lines: PopupLine[];
  actions: PopupAction[];
}

export interface AppState {
  onboarded: boolean;
  obStep: 0 | 1 | 2 | 3;
  obName: string;
  obGoal: string;

  screen: Screen;

  level: number;
  xp: number;
  xpMax: number;
  rank: 'C' | 'B';
  streak: number;
  statPts: number;
  day: number;
  stats: Record<StatKey, number>;

  quests: Quest[];
  dailyCleared: boolean;

  running: boolean;
  runKm: number;
  runSec: number;

  medSec: number;

  lifts: Lift[];

  alerts: AlertItem[];
  reminders: Reminder[];
  milestones: Milestone[];

  popup: SystemPopup | null;
  shareCard: Milestone | null;
  toast: string | null;
}
