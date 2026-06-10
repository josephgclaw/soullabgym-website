# Soul Lab Gym — Design Overhaul Handoff

**Date:** 2026-06-10  
**Prepared for:** Haiki / Other agent  
**Prepared by:** Grok (current agent)  
**Source:** Live site audit + code review  
**Live preview:** https://soullabgym-website.vercel.app/

---

## Core Goal

Make the website feel **beautiful, creative, authentic, and human** — not AI-generated, not a slick corporate gym template.

Current strength: **Excellent real photography** from the actual gym, kids, fighters, community, and recovery space.  
Current weakness: The design system is actively sanding off the soul of those photos.

---

## Current Diagnosis (Why It Feels “AI”)

| Issue | Evidence | Why It Hurts Authenticity |
|-------|----------|---------------------------|
| **Typography** | Heavy Bebas Neue on almost every headline. Perfect tracking, perfect execution. | Reads instantly as “gym marketing template” |
| **Color & Surfaces** | Flat #F8F5F0 bone + pure #0E0E0E dark + hot pink. Many inline `!important` hacks for dark sections | Feels clinical / over-polished |
| **UI Components** | Rounded-full pink buttons, consistent pill shapes, predictable hover states | Template smell (Webflow / Astro starter) |
| **Rhythm** | Every major section uses `py-20`, clean grids with `gap-8/12`, subtle gradients | Robotic breathing — nothing feels human or hand-made |
| **Copy hygiene** | 🥊 emoji in announcement bar. Recycled phrases (“Fight-Ready Coaching”, “Real Results”) | Sounds like every other Muay Thai gym site |
| **Photo treatment** | Good raw images, but presented in uniform grids + hover scale + clean overlays | Loses the gritty, lived-in feeling the photos actually have |
| **Nav + Footer** | Functional but completely standard — no personality | Adds another layer of “this was designed in a template” |
| **Recovery page** | Strong photo grid, but pricing still looks SaaS-like + some templated explanation text | Breaks the authenticity the sauna/ice bath photos are trying to sell |

**Paradox:** The site has some of the best raw material I’ve seen on a gym site, but the presentation system is working against it.

---

## Desired New Direction

**This is not** a polished influencer-style Muay Thai gym.  
**This is** a real family-run gym in Townsville, run by a state champion who actually trains kids and cares deeply about the community.

### Visual North Star
- Warmth over coolness
- Texture and slight irregularity
- Photography that feels lived-in (use the “messy”, intimate, quiet shots too — the Buddha ice bath, kids being kids, fighters laughing)
- Hand-crafted / imperfect details
- Pink used as an accent only (not the dominant personality)
- Regional Australian character — grounded, not LA “cosmetic Muay Thai”

---

## Concrete Overhaul Plan

### 0. Foundations (Do These Early)

- Remove the announcement bar with the 🥊 emoji (or redesign it completely with zero emoji)
- Create a proper **design tokens file** (`src/styles/tokens.css` or expand `global.css`) → stop relying on inline `style` and `!important` hacks
- Add **subtle grain / texture** (very light paper noise on light sections, soft film grain on dark sections)
- Introduce tactile/organic details:
  - Slight border radius variation
  - Imperfect lines
  - Torn-paper or hand-drawn style effects on some quote/testimonial blocks
  - Subtle hand-drawn arrows or underlines in key places

### 1. Typography Overhaul (Highest ROI)

- **Restrict** Bebas Neue — mostly for very large, bold display headlines only
- Introduce a second (or third) display face that feels more human/hand-crafted. Good local/Aussie-friendly options:
  - Instrument Serif
  - Recoleta
  - Tan Pearl
  - Playfair Display (used sparingly)
  - Or a more interesting sans (Satoshi, Neue Haas Grotesk, Space Grotesk)
- Widen the type scale. Allow some deliberate off-kilter moments (different sizes in one headline block, slight rotation on one word, stacked text with breathing)
- For testimonials: use larger, slightly irregular italic or a different weight. Add real context to names (“Tee — parent of two”, “Mel J. — mum of three fighters”)
- Vary letter-spacing intentionally (some headlines tighter, some looser and more soulful)

### 2. Color & Texture

Current palette is usable but needs relaxing:
- Warm the `#F8F5F0` slightly (touch of ochre/bone warmth)
- Use **three shades of dark** instead of one flat #0E0E0E (deep black, charcoal, off-black)
- Make pink an **accent** — save the big solid pink blocks for the strongest CTAs only
- Add a secondary grounded accent (dusty terracotta/rust or muted olive) to feel more Australian + respectful of Muay Thai tradition
- Add very subtle texture layers everywhere

### 3. Homepage — Major Structural Changes

**Hero (biggest immediate fix)**
- Move away from the stacked pink blocks + white outline sub-headlines
- Preferred direction: full-bleed photo with much softer overlay + typography that feels placed by hand
- One powerful, human headline sentence instead of the three stacked lines
- Make the two CTAs feel less like template buttons

**Core Values / Pillars section**
- Tear down the current numbered `md:grid-cols-3` grid
- Better options:
  - Tighter narrative + three short powerful statements backed by real photos
  - Three overlapping or deliberately uneven photo + text story blocks
  - More organic layout that doesn’t feel like a services grid

**Testimonials**
- Make them feel like actual notes from real humans
- Mix sizes and visual weights
- Add subtle paper texture or slightly uneven alignment
- Consider light hand-drawn quote marks or dividers

**7-Day Trial section**
- Make it warmer and less salesy
- Lead with story/emotion instead of a checklist of bullets
- The “What Happens Next” cards can stay but should feel more hand-made

**Final pink CTA block**
- Keep the energy, but let the typography and photography do more of the work

### 4. About Page (Protect This Page — It Has Soul)

This is currently one of the strongest emotional pages.
- Reduce grid rigidity
- Let Joseph’s story breathe (longer paragraphs, varied weights, occasional feeling-driven bold text)
- Bigger, slightly offset hero photo of Joseph (maybe with a subtle frame or corner detail)
- Add a small “What the gym actually looks like on a random Tuesday” moment using casual/everyday shots

### 5. Gallery (The Photos Are Gold — Presentation Is the Problem)

- Break the uniform square grid in places (some 2:3 vertical portraits, some full-bleed hero moments, some clustered organic groups)
- Stronger, more intentional groupings:
  - “Morning Kids”
  - “The Adults”
  - “Fight Night”
  - “After Class / Quiet Moments”
  - “The Little Details” (Buddha, hats, gear, floor, etc.)
- Add real captions/context on at least some images (“First belt for this kid after eight months”, “Post-win corner”, “Tuesday 5:30pm kids class”)
- Lightbox should feel special — warmer, slower, maybe a subtle film border or softer vignette

### 6. Recovery Page (Already Partially Right — Just Refine)

- The 14-photo studio grid + custom lightbox is one of the best pieces of work on the site — protect the spirit
- Make the photo cards less uniform (mix aspect ratios, different crops, more breathing between some)
- Pricing cards: stop making them look like SaaS pricing tiers. Give them slightly different border treatments, make them feel more hand-crafted
- Video section: once you have the right recovery footage, frame the embed with a custom, personal detail (“Filmed on the mats at Soul Lab”, subtle paper edge, etc.)

### 7. Navigation + Footer

**Nav**
- Currently feels templated
- Options: make the logo treatment a bit more custom, add more breathing, or go even more minimal so the content carries the weight
- The current “Programs” dropdown is fine functionally — just give it more character

**Footer**
- Add a short, warm closing line somewhere (“Built by real people who show up every day” or similar)
- Social links can stay minimal but give them more presence

### 8. Micro-Details That Make It Feel Human

- Occasional hand-drawn style arrows or underlines (light SVG strokes or CSS)
- Slightly uneven spacing in certain testimonial or quote blocks
- Slower, warmer hover transitions
- Subtle film grain or paper texture on some cards
- A few sections that deliberately break the max-width container (full-bleed moments)
- Use more of the quiet, intimate, imperfect photos — they are the gold

---

## Recommended Implementation Order (Practical)

**Wave 1 — Fast, High-Impact (do this first)**
1. Announcement bar (remove emoji version)
2. Design tokens + subtle texture system
3. Typography audit + restriction on Bebas Neue
4. Homepage hero redesign

**Wave 2 — High-Trust Pages**
5. About page (emotional center)
6. Testimonials section (make them feel human)
7. Nav + Footer personality pass

**Wave 3 — System + Specialized**
8. Gallery photo treatment + groupings
9. Recovery refinements (pricing, video framing)
10. Apply same philosophy to Timetable / Stand Strong / Private Training

---

## Open Questions for the Next Steps (Ask Joe)

- Visual references: Does he have any other gyms, websites, books, photographers, posters, or local Townsville/Tropical North Queensland textures that feel close to the soul he wants?
- Pink usage: How married is he to the current volume of pink vs. letting photography + black/bone carry more of the personality?
- Irregularity tolerance: Is he okay with sections becoming deliberately less uniform (different layouts, different visual weights, uneven breathing) even if it creates more work?
- Protected favorites: Any pages or sections he currently loves the *feeling* of and wants to keep/protect?
- Starting point: Does he want a small prototype first (new hero + typography tokens) so he can react quickly before a full overhaul?

---

## Files & Technical Notes

- Project root: `/Users/josephclaw/.openclaw/workspace/projects/soullabgym-website`
- Main styling: `src/styles/global.css`
- Layout wrapper: `src/layouts/Layout.astro`
- Home: `src/pages/index.astro`
- About: `src/pages/about.astro`
- Gallery: `src/pages/gallery.astro` (very long photo list — be careful when editing)
- Recovery: `src/pages/recovery.astro` (already has a solid 14-image grid + lightbox)
- Components: `src/components/Nav.astro`, `src/components/Footer.astro`

Current build: Astro + Tailwind. 9 pages. Git → Vercel for deploys.

---

## Summary Statement to Give Joe

> “Your photos are already some of the most authentic I’ve seen on a gym site. The design system is currently the thing making the site feel like every other one. We’re going to stop over-designing it, add warmth and texture, restrict the templated typography, and let the real humans and real moments you captured do the heavy lifting.”

---

**Status:** Ready to execute.  
Waiting on direction from Joe on references + risk tolerance, then we can begin Wave 1 immediately.

---

*Handoff complete. This document is deliberately blunt so the next agent can move fast without guessing the “why”.*