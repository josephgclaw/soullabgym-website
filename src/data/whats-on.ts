// "What's on" strip on the home page — edit this list when dates change.
// Items past their `until` date (YYYY-MM-DD) drop off automatically at the next build.

export interface WhatsOn {
  label: string;   // small tag, e.g. "Fight night"
  title: string;   // e.g. "Battle at the Lab 5"
  when: string;    // human-readable date line
  blurb?: string;
  href: string;
  cta?: string;
  until: string;   // last day to show, YYYY-MM-DD
}

export const WHATS_ON: WhatsOn[] = [
  {
    label: 'Fight night',
    title: 'Battle at the Lab 5',
    when: 'Saturday 7 November',
    blurb: 'Muay Thai fight night, open to all gyms. D-class exhibition, C-class amateur bouts and junior bouts. First fight 3pm.',
    href: '/fight',
    cta: 'Register or get tickets',
    until: '2026-11-07',
  },
  {
    label: 'Kids grading',
    title: 'December Belt Grading',
    when: 'Sat 5 Dec + Mon 7 – Thu 10 Dec',
    blurb: 'Last week of Term 4. Every kids and teens class grades in its normal session.',
    href: '/grading',
    cta: 'Grading details',
    until: '2026-12-10',
  },
  {
    label: 'School holidays',
    title: 'Stand Strong',
    when: 'Queensland school holidays',
    blurb: 'Our free 2-day anti-bullying program for Townsville kids. Spots open each holidays.',
    href: '/stand-strong',
    cta: 'Register interest',
    until: '2027-12-31',
  },
];

export function currentWhatsOn(today = new Date()): WhatsOn[] {
  const t = today.toISOString().slice(0, 10);
  return WHATS_ON.filter((i) => i.until >= t);
}
