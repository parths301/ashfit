import { useCallback, useEffect, useRef, useState } from 'react';
import { colors } from '../theme/theme';
import { AppState, Milestone, Screen, StatKey, SystemPopup } from './types';
import { initialAppState } from './demoData';
import { formatTime } from './utils';

const DEMO_SPEED = 25; // matches the design tool's default `demoSpeed` slider value
const RANK_UP_LEVEL = 25;

export function useAppState() {
  const [state, setStateRaw] = useState<AppState>(initialAppState);
  const stateRef = useRef(state);
  const [now, setNow] = useState(Date.now());

  const get = useCallback(() => stateRef.current, []);

  const setState = useCallback((patch: Partial<AppState> | ((s: AppState) => Partial<AppState>)) => {
    const p = typeof patch === 'function' ? patch(stateRef.current) : patch;
    const next = { ...stateRef.current, ...p };
    stateRef.current = next;
    setStateRaw(next);
  }, []);

  const popupQueue = useRef<SystemPopup[]>([]);
  const simTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1s clock tick — drives the header clock + midnight penalty countdown display
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(
    () => () => {
      if (simTimer.current) clearInterval(simTimer.current);
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    []
  );

  const showToast = useCallback(
    (msg: string) => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      setState({ toast: msg });
      toastTimer.current = setTimeout(() => setState({ toast: null }), 2600);
    },
    [setState]
  );

  const pushAlert = useCallback(
    (tag: string, msg: string, c: string) => {
      const t = new Date().toTimeString().slice(0, 5);
      setState((s) => ({ alerts: [{ time: t, tag, msg, c }, ...s.alerts] }));
    },
    [setState]
  );

  const dismissPopup = useCallback(() => {
    setState({ popup: popupQueue.current.shift() ?? null });
  }, [setState]);

  const queuePopup = useCallback((p: SystemPopup) => {
    if (get().popup) popupQueue.current.push(p);
    else setState({ popup: p });
  }, [get, setState]);

  const unlockMilestone = useCallback(
    (id: string) => {
      const s = get();
      const ms = s.milestones.map((m) => (m.id === id ? { ...m, un: true, date: 'DAY ' + s.day } : m));
      const m = ms.find((x) => x.id === id)!;
      setState({ milestones: ms });
      queuePopup({
        kicker: '// MILESTONE UNLOCKED',
        accent: colors.cyan,
        glow: 'rgba(0,240,255,.35)',
        title: m.title,
        lines: [
          { t: m.desc, c: 'rgba(232,228,242,.7)' },
          { t: 'ADDED TO TROPHY VAULT', c: colors.cyan },
        ],
        actions: [
          {
            label: '◱ SHARE TO IG',
            bg: colors.magenta,
            fg: colors.bg1,
            bd: colors.magenta,
            fn: () => {
              dismissPopup();
              setState({ shareCard: m });
            },
          },
          { label: 'LATER', bg: 'transparent', fg: 'rgba(232,228,242,.6)', bd: 'rgba(232,228,242,.3)', fn: () => dismissPopup() },
        ],
      });
    },
    [get, setState, queuePopup, dismissPopup]
  );

  const addXp = useCallback(
    (n: number) => {
      let { xp, xpMax, level, statPts, rank } = get();
      xp += n;
      let leveled = false;
      while (xp >= xpMax) {
        xp -= xpMax;
        level++;
        statPts += 3;
        xpMax = Math.round(xpMax * 1.15);
        leveled = true;
      }
      const newRank = level >= RANK_UP_LEVEL ? 'B' : rank;
      const prevRank = rank;
      setState({ xp, xpMax, level, statPts, rank: newRank });
      if (leveled) {
        queuePopup({
          kicker: '// SYSTEM NOTICE',
          accent: colors.magenta,
          glow: 'rgba(255,45,120,.4)',
          title: 'LEVEL ' + level,
          lines: [
            { t: '+3 STAT POINTS AVAILABLE', c: colors.cyan },
            { t: 'XP THRESHOLD RAISED TO ' + xpMax, c: 'rgba(232,228,242,.6)' },
          ],
          actions: [{ label: 'ACKNOWLEDGE', bg: colors.magenta, fg: colors.bg1, bd: colors.magenta, fn: () => dismissPopup() }],
        });
        pushAlert('SYSTEM', 'LEVEL UP → LV' + level + '. +3 STAT POINTS.', colors.magenta);
      }
      if (newRank !== prevRank) {
        pushAlert('SYSTEM', 'RANK ASCENSION: C-CLASS → B-CLASS.', colors.magenta);
        unlockMilestone('m5');
      }
    },
    [get, setState, queuePopup, dismissPopup, pushAlert, unlockMilestone]
  );

  const checkDaily = useCallback(() => {
    const s = get();
    if (s.dailyCleared) return;
    if (s.quests.every((q) => q.done)) {
      setState({ dailyCleared: true });
      queuePopup({
        kicker: '// PENALTY DAEMON',
        accent: colors.magenta,
        glow: 'rgba(255,45,120,.4)',
        title: 'DIRECTIVE CLEAR',
        lines: [
          { t: 'ALL DAILY GIGS COMPLETE', c: 'rgba(232,228,242,.75)' },
          { t: 'BONUS +500 XP · PENALTY DISARMED', c: colors.cyan },
          { t: 'STREAK EXTENDED → ' + (s.streak + 1), c: colors.magenta },
        ],
        actions: [{ label: 'ACKNOWLEDGE', bg: colors.magenta, fg: colors.bg1, bd: colors.magenta, fn: () => dismissPopup() }],
      });
      setState({ streak: s.streak + 1 });
      addXp(500);
    }
  }, [get, setState, queuePopup, dismissPopup, addXp]);

  const completeQuest = useCallback(
    (id: string) => {
      const s = get();
      const q = s.quests.find((x) => x.id === id);
      if (!q || q.done) return;
      const quests = s.quests.map((x) => (x.id === id ? { ...x, done: true, progress: x.total, hint: 'CLEAR' } : x));
      const stats = { ...s.stats, [q.stat]: s.stats[q.stat] + 1 };
      setState({ quests, stats });
      pushAlert('SYSTEM', 'GIG CLEAR: ' + q.title + ' · +' + q.xp + 'XP · +1 ' + q.stat + '.', colors.cyan);
      queuePopup({
        kicker: '// GIG REPORT',
        accent: colors.cyan,
        glow: 'rgba(0,240,255,.35)',
        title: 'QUEST CLEAR',
        lines: [
          { t: q.title, c: 'rgba(232,228,242,.75)' },
          { t: '+' + q.xp + ' XP · +1 ' + q.stat, c: colors.cyan },
        ],
        actions: [{ label: 'ACKNOWLEDGE', bg: colors.cyan, fg: colors.bg2, bd: colors.cyan, fn: () => dismissPopup() }],
      });
      addXp(q.xp);
      setTimeout(() => checkDaily(), 0);
    },
    [get, setState, pushAlert, queuePopup, dismissPopup, addXp, checkDaily]
  );

  // ---- run ----
  const startRun = useCallback(() => {
    if (simTimer.current) clearInterval(simTimer.current);
    setState({ screen: 'run', running: true, runKm: 0, runSec: 0 });
    simTimer.current = setInterval(() => {
      setState((s) => ({ runSec: s.runSec + 0.25 * DEMO_SPEED, runKm: s.runKm + 0.25 * DEMO_SPEED * 0.0031 }));
    }, 250);
  }, [setState]);

  const endRun = useCallback(() => {
    if (simTimer.current) clearInterval(simTimer.current);
    const s = get();
    const km = s.runKm;
    const q = s.quests.find((x) => x.id === 'run')!;
    const newProg = Math.min(q.total, +(q.progress + km).toFixed(2));
    const quests = s.quests.map((x) => (x.id === 'run' ? { ...x, progress: newProg } : x));
    setState({ quests, running: false, screen: 'home' });
    const bonus = Math.round(km * 10);
    if (!q.done && newProg >= q.total) {
      completeQuest('run');
    } else {
      showToast('RUN LOGGED: ' + km.toFixed(2) + ' KM · +' + bonus + ' XP');
      addXp(bonus);
      pushAlert('TRAINING', 'RUN UPLOADED: ' + km.toFixed(2) + ' KM.', colors.cyan);
    }
  }, [get, setState, completeQuest, showToast, addXp, pushAlert]);

  const abortRun = useCallback(() => {
    if (simTimer.current) clearInterval(simTimer.current);
    setState({ running: false, screen: 'train' });
    showToast('RUN ABORTED — NO DATA SAVED');
  }, [setState, showToast]);

  // ---- lift ----
  const toggleLift = useCallback(
    (i: number) => {
      const s = get();
      const lifts = s.lifts.map((l, j) => (j === i ? { ...l, done: !l.done } : l));
      const doneCount = lifts.filter((l) => l.done).length;
      const quests = s.quests.map((x) => (x.id === 'lift' && !x.done ? { ...x, progress: doneCount } : x));
      setState({ lifts, quests });
    },
    [get, setState]
  );

  const finishLift = useCallback(() => {
    const s = get();
    const all = s.lifts.every((l) => l.done);
    if (!all) {
      showToast('INCOMPLETE — LOG ALL 5 EXERCISES');
      return;
    }
    setState({ screen: 'home' });
    completeQuest('lift');
  }, [get, setState, showToast, completeQuest]);

  // ---- meditate ----
  const startMeditate = useCallback(() => {
    if (simTimer.current) clearInterval(simTimer.current);
    setState({ screen: 'meditate', medSec: 0 });
    simTimer.current = setInterval(() => {
      setState((s) => ({ medSec: s.medSec + 0.25 * DEMO_SPEED }));
    }, 250);
  }, [setState]);

  const endMeditate = useCallback(() => {
    if (simTimer.current) clearInterval(simTimer.current);
    setState({ screen: 'home' });
    const q = get().quests.find((x) => x.id === 'meditate')!;
    if (!q.done) completeQuest('meditate');
    else {
      showToast('SESSION LOGGED · +20 XP');
      addXp(20);
    }
  }, [get, setState, completeQuest, showToast, addXp]);

  // ---- water ----
  const addWater = useCallback(() => {
    const s = get();
    const q = s.quests.find((x) => x.id === 'water')!;
    if (q.done) {
      showToast('HYDRATION ALREADY CLEAR');
      return;
    }
    const newProg = Math.min(q.total, +(q.progress + 0.4).toFixed(1));
    const quests = s.quests.map((x) => (x.id === 'water' ? { ...x, progress: newProg } : x));
    setState({ quests });
    if (newProg >= q.total) completeQuest('water');
    else showToast('+0.4L LOGGED · ' + newProg.toFixed(1) + '/2.0L');
  }, [get, setState, showToast, completeQuest]);

  const questTap = useCallback(
    (id: string) => {
      const q = get().quests.find((x) => x.id === id);
      if (!q) return;
      if (q.done) {
        showToast('GIG ALREADY CLEAR');
        return;
      }
      if (id === 'run') startRun();
      else if (id === 'lift') setState({ screen: 'lift' });
      else if (id === 'meditate') startMeditate();
      else if (id === 'water') addWater();
    },
    [get, showToast, startRun, setState, startMeditate, addWater]
  );

  const allocate = useCallback(
    (k: StatKey) => {
      const s = get();
      if (s.statPts <= 0) return;
      const stats = { ...s.stats, [k]: s.stats[k] + 1 };
      const nextPts = s.statPts - 1;
      setState({ stats, statPts: nextPts });
      showToast('+1 ' + k + ' ALLOCATED · ' + nextPts + ' PTS LEFT');
    },
    [get, setState, showToast]
  );

  const setScreen = useCallback((screen: Screen) => setState({ screen }), [setState]);
  const goHome = useCallback(() => setState({ screen: 'home' }), [setState]);
  const goLift = useCallback(() => setState({ screen: 'lift' }), [setState]);

  const setObName = useCallback((v: string) => setState({ obName: v.toUpperCase() }), [setState]);
  const setObGoal = useCallback((name: string) => setState({ obGoal: name }), [setState]);
  const obNext = useCallback(() => setState((s) => ({ obStep: (s.obStep + 1) as AppState['obStep'] })), [setState]);
  const skipOb = useCallback(() => setState({ onboarded: true, screen: 'home' }), [setState]);
  const finishOb = useCallback(() => {
    const s = get();
    setState({ onboarded: true, screen: 'home' });
    queuePopup({
      kicker: '// SYSTEM',
      accent: colors.cyan,
      glow: 'rgba(0,240,255,.35)',
      title: 'HUNTER REGISTERED',
      lines: [
        { t: 'WELCOME, ' + (s.obName || 'HUNTER') + '.', c: 'rgba(232,228,242,.75)' },
        { t: 'DAILY DIRECTIVES ISSUED. CLOCK IS RUNNING.', c: colors.cyan },
      ],
      actions: [{ label: 'ACKNOWLEDGE', bg: colors.cyan, fg: colors.bg2, bd: colors.cyan, fn: () => dismissPopup() }],
    });
  }, [get, setState, queuePopup, dismissPopup]);

  const toggleReminder = useCallback(
    (id: string) => {
      const s = get();
      const r = s.reminders.find((x) => x.id === id);
      if (!r) return;
      const rs = s.reminders.map((x) => (x.id === id ? { ...x, on: !x.on } : x));
      setState({ reminders: rs });
      showToast(r.label + (r.on ? ' — DISARMED' : ' — ARMED'));
    },
    [get, setState, showToast]
  );

  const openShareCard = useCallback((m: Milestone) => setState({ shareCard: m }), [setState]);
  const closeShare = useCallback(() => setState({ shareCard: null }), [setState]);
  const shareNow = useCallback(() => {
    setState({ shareCard: null });
    showToast('◱ SHARED TO INSTAGRAM STORY ✓');
    pushAlert('SOCIAL', 'MILESTONE BROADCAST TO INSTAGRAM.', colors.magenta);
  }, [setState, showToast, pushAlert]);

  return {
    state,
    now,
    fmtTime: formatTime,
    actions: {
      showToast,
      setScreen,
      goHome,
      goLift,
      setObName,
      setObGoal,
      obNext,
      skipOb,
      finishOb,
      startRun,
      endRun,
      abortRun,
      toggleLift,
      finishLift,
      startMeditate,
      endMeditate,
      addWater,
      questTap,
      allocate,
      toggleReminder,
      openShareCard,
      closeShare,
      shareNow,
      dismissPopup,
    },
  };
}

export type UseAppState = ReturnType<typeof useAppState>;
