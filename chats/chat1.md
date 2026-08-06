# Cyberpunk Fitness Leveling App

_Started 2026-07-13 19:18 UTC_

---

## User

Cyberpunk style personal fitness app that has cybernetic animation and distortion kind of effect as its being shown on a CRT monitor. Mobile first but compatible to desktop as well. Mobile app for Android and iOS both. Combine solo leveling and Cyberpunk with a share to instagram button for each milestone. Running, weight lifting and some other few pre programmed goals. Weight loss, overall fitness, mindfullness. Notification system. Reminders. And so on.

## Assistant

_[tool: questions_v2]_

## User

Questions answered:
- scope: Home / dashboard (level, stats, XP), Goals & quest system (Solo Leveling style), Milestone / achievement + share-to-Instagram card, Onboarding, Workout tracking screen (running / lifting), Notifications & reminders screen
- fidelity: Interactive prototype (tappable, working flows)
- palette: 0
- crt_intensity: Decide for me
- solo_leveling: System-style popup windows ('QUEST COMPLETE'), Level / rank system (E-rank → S-rank), Stat points (STR, AGI, VIT...), Daily quests with penalties
- tone: Cold system AI ('DIRECTIVE ISSUED')
- variations: 2-3 visual directions to pick from
- data: Invent a demo character (name, level, history)
- anything: Add any other features that may be relevant for this app. Make a final draft of how it should look with all possible features and options. We can always remove them.

## Assistant

_[tool: read_skill_prompt]_

_[tool: read_skill_prompt]_

Building 3 hi-fi visual directions of the home dashboard first — pick one and I'll build the full interactive prototype (all screens + features) in that style.

_[tool: dc_write]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Three visual directions of the home dashboard are up — pan/zoom to compare:

- **1a SYSTEM WINDOW** — pure Solo Leveling: cyan bordered panels, corner brackets, terminal copy
- **1b COMBAT HUD** — angular clipped panels, magenta-forward, denser action energy
- **1c PHOSPHOR TERMINAL** — heaviest CRT: pixel type, ASCII boxes, RGB bleed

Tell me which to build out (or a mix), and I'll do the full interactive prototype: onboarding, quests, workout tracking (run + lift), milestones with Instagram share card, level-up popups, notifications/reminders, stat allocation, penalties — the whole feature set.

## User

Found issues — fixing…

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Fixed: dark backdrop behind labels, and re-padded 1c's ASCII boxes to equal widths. Pick a direction (or a mix) and I'll build the full interactive prototype.

## User

Found issues — fixing…

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Rebuilt 1c's status and attribute boxes with real CSS borders and bar divs instead of ASCII glyphs — alignment is now solid. Pick a direction and I'll build the full prototype.

## User

1B

## Assistant

Building the full interactive prototype in the 1b COMBAT HUD style now.

_[tool: snip]_

_[tool: dc_write]_

## Assistant

_[tool: dc_write]_

## Assistant

_[tool: update_todos]_

_[tool: dc_write]_

_[tool: update_todos]_

_[tool: ready_for_verification]_

Full interactive prototype in the 1b COMBAT HUD style is out for review. What's in it:

- **Onboarding** — boot sequence, callsign entry, goal directive select (weight loss / fitness / mindfulness / strength), baseline scan (skippable)
- **HUD** — rank badge, XP bar, stat allocation (+3 unspent points, tap +), daily gigs, penalty countdown to midnight
- **GIGS** — daily quests + goal programs (Strength Augment locked until Rank B)
- **TRAIN** — run module (live simulated km/pace/kcal), lift session (log 5 exercises), meditation (breathing ring), pre-programmed routines
- **VAULT** — milestone trophies, each with Share-to-Instagram (9:16 story card preview)
- **FEED** — reminders with toggles + system alert log

The full demo loop works: clear all 4 gigs → +500 XP bonus → **LEVEL 25 → RANK B ascension → milestone unlock → share card**. Tweaks: CRT intensity, demo speed, start screen.

