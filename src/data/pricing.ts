// Membership pricing for /prices — edit this file when prices change.
//
// PLACEHOLDER: set to true while prices are still being confirmed. It shows a
// "being updated" notice on the page. Flip to false once the numbers are final.
export const PRICES_ARE_PLACEHOLDER = true;

export interface Plan {
  name: string;
  price: string;       // e.g. "$45"
  per: string;         // e.g. "per week"
  note?: string;
  featured?: boolean;  // highlights the card
}

export interface PlanGroup {
  id: string;
  title: string;
  blurb: string;
  plans: Plan[];
}

export const GROUPS: PlanGroup[] = [
  {
    id: 'adults',
    title: 'Adults',
    blurb: 'Muay Thai, boxing, pads, sparring and fighters sessions. 16+.',
    plans: [
      { name: '2 classes a week', price: '$45', per: 'per week' },
      { name: '4 classes a week', price: '$55', per: 'per week' },
      { name: 'Unlimited', price: '$60', per: 'per week', note: 'Every class, every day', featured: true },
    ],
  },
  {
    id: 'kids',
    title: 'Kids & Teens',
    blurb: 'Junior Kids (4–6), Senior Kids (7–10) and Teens (11–15).',
    plans: [
      { name: '1 class a week', price: '$25', per: 'per week' },
      { name: '2 classes a week', price: '$40', per: 'per week' },
      { name: 'Unlimited', price: '$45', per: 'per week', note: 'Every kids class', featured: true },
    ],
  },
  {
    id: 'fifo',
    title: 'FIFO',
    blurb: 'For members who work away. Unlimited classes, billed per fortnight.',
    plans: [
      { name: 'Unlimited', price: '$60', per: 'per fortnight', featured: true },
    ],
  },
];

export const CASUAL: Plan[] = [
  { name: 'Casual visit', price: '$35', per: 'per class' },
  { name: '10 class pass', price: '$300', per: 'one-off' },
];

export const FAMILY_DISCOUNT = [
  { who: '1st family member', deal: 'Full price' },
  { who: 'Each additional member', deal: '10% off' },
];

export const TERMS = [
  '4 week minimum term on all memberships.',
  '2 weeks notice to cancel, by email.',
  'Memberships continue until cancelled.',
  'Pay weekly, fortnightly or monthly — your choice.',
  'Terms and conditions apply.',
];
