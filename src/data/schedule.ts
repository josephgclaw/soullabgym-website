// Class timetable data for <Schedule /> — edit this file when the timetable changes.
// time is 24h "HH:MM". Two sessions with the same time share a row.
// Source: Gymdesk widget (slg.gymdesk.com), fetched 2026-09-08.

export type Level = 'kids' | 'all' | 'intermediate' | 'fighters';

export interface Session {
  time: string;
  name: string;
  level: Level;
  note?: string;
}

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type DayName = (typeof DAYS)[number];

export const LEVELS: Record<Level, { label: string; cls: string }> = {
  kids:         { label: 'Kids',         cls: 'lv-kids' },
  all:          { label: 'All levels',   cls: 'lv-all' },
  intermediate: { label: 'Intermediate', cls: 'lv-int' },
  fighters:     { label: 'Fighters',     cls: 'lv-fig' },
};

export const SCHEDULE: Record<DayName, Session[]> = {
  Monday: [
    { time: '09:00', name: 'Muay Thai',           level: 'all',          note: 'All levels' },
    { time: '15:45', name: 'Junior Kids',          level: 'kids',         note: '4–6 yrs' },
    { time: '16:30', name: 'Senior Kids',          level: 'kids',         note: '7–10 yrs' },
    { time: '17:15', name: 'Muay Thai Technique',  level: 'intermediate', note: 'Level 2–3' },
  ],
  Tuesday: [
    { time: '06:00', name: 'Muay Thai',            level: 'all',          note: 'All levels' },
    { time: '09:00', name: 'Muay Thai',            level: 'all',          note: 'All levels' },
    { time: '16:30', name: 'Teens Muay Thai',      level: 'kids',         note: '11–15 yrs' },
    { time: '17:15', name: 'Muay Thai Pads',       level: 'all',          note: 'Level 1' },
    { time: '18:00', name: 'Fighters',             level: 'fighters',     note: 'Level 3 · Invite only' },
  ],
  Wednesday: [
    { time: '09:00', name: 'Muay Thai',            level: 'all',          note: 'All levels' },
    { time: '15:45', name: 'Junior Kids',          level: 'kids',         note: '4–6 yrs' },
    { time: '16:30', name: 'Senior Kids',          level: 'kids',         note: '7–10 yrs' },
    { time: '17:15', name: 'Sparring',             level: 'intermediate', note: 'Level 2–3' },
  ],
  Thursday: [
    { time: '06:00', name: 'Muay Thai',            level: 'all',          note: 'All levels' },
    { time: '09:00', name: 'Muay Thai',            level: 'all',          note: 'All levels' },
    { time: '16:30', name: 'Teens Muay Thai',      level: 'kids',         note: '11–15 yrs' },
    { time: '17:15', name: 'Muay Thai Pads',       level: 'all',          note: 'Level 1' },
    { time: '18:00', name: 'Fighters',             level: 'fighters',     note: 'Level 3 · Invite only' },
    { time: '18:00', name: 'Clinch',               level: 'intermediate', note: 'Level 2–3' },
  ],
  Friday: [
    { time: '09:00', name: 'Muay Thai',            level: 'all',          note: 'All levels' },
    { time: '17:30', name: 'Muay Thai',            level: 'all',          note: 'All levels' },
  ],
  Saturday: [
    { time: '08:00', name: 'Junior Kids',          level: 'kids',         note: '4–6 yrs' },
    { time: '08:45', name: 'Senior Kids',          level: 'kids',         note: '7–10 yrs' },
    { time: '09:30', name: 'Pads & Technique',     level: 'all',          note: 'Level 1–2 · Teens & Adults' },
    { time: '10:30', name: 'Open Sparring',        level: 'intermediate', note: 'Boxing & Muay Thai' },
  ],
  Sunday: [],
};

export function formatTime(t: string): { time: string; period: 'am' | 'pm' } {
  const [h, m] = t.split(':').map(Number);
  return { time: `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')}`, period: h >= 12 ? 'pm' : 'am' };
}

export function groupByTime(list: Session[]): { time: string; items: Session[] }[] {
  const out: { time: string; items: Session[] }[] = [];
  [...list].sort((a, b) => a.time.localeCompare(b.time)).forEach((s) => {
    const last = out[out.length - 1];
    if (last && last.time === s.time) last.items.push(s);
    else out.push({ time: s.time, items: [s] });
  });
  return out;
}

export function nextDayWithClasses(fromIndex: number): DayName | null {
  for (let k = 1; k <= 7; k++) {
    const d = DAYS[(fromIndex + k) % 7];
    if (SCHEDULE[d].length) return d;
  }
  return null;
}
