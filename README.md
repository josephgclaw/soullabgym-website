# Soul Lab Gym Website

Townsville's Muay Thai Home for Families, Fighters & Future Champions.

Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com).

---

## Getting Started

### Run locally

```bash
npm run dev
```

Visit: http://localhost:4321

### Build for production

```bash
npm run build
```

Output goes to the `dist/` folder.

### Preview production build

```bash
npm run preview
```

---

## Deploy to VPS

```bash
# Set your server details
export VPS_IP="your.server.ip"
export VPS_USER="root"  # or your deploy user

./deploy.sh
```

The script will:
1. Run `npm run build`
2. `rsync` the `dist/` folder to `/var/www/soullabgym` on your VPS

---

## Adding Embed Codes

### Gymdesk (Live Timetable)

Open `src/pages/timetable.astro` and find:

```html
<!-- GYMDESK EMBED — Replace this comment with the Gymdesk schedule embed code when provided -->
```

Replace the placeholder `<div>` block with the Gymdesk embed code.

---

### ZipLeads (Private Training Booking)

Open `src/pages/private-training.astro` and find:

```html
<!-- ZIPLEADS BOOKING EMBED — Replace this comment with the ZipLeads calendar embed code when provided -->
```

Replace the placeholder `<div>` block with the ZipLeads embed code.

---

### Google Maps

Open `src/pages/contact.astro` and find:

```html
<!-- TODO: Add Google Maps embed -->
```

Replace the placeholder `<div>` block with the Google Maps iframe embed.

---

## Adding Photos

### Hero Background Image

Open `src/pages/index.astro` and find:

```html
<!-- TODO: Add hero background image -->
<div class="hero-bg absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900"></div>
```

Replace the gradient div with an `<img>` or CSS background-image pointing to your hero photo. Place photos in the `public/` folder.

### Coach Photo

Open `src/pages/about.astro` and find:

```html
<!-- TODO: Add coach photo -->
```

Replace the placeholder div with an `<img src="/photos/joseph.jpg" alt="Joseph Gabiola" />`.

### Gym Gallery

Open `src/pages/about.astro` and find:

```html
<!-- TODO: Photo gallery — Joe will supply gym photos -->
<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
  <!-- Photos go here -->
```

Add `<img>` tags inside the grid. Place photos in `public/photos/`.

---

## Project Structure

```
src/
  components/
    Nav.astro         — Navigation bar
    Footer.astro      — Site footer
  layouts/
    Layout.astro      — Base HTML layout with SEO meta tags
  pages/
    index.astro       — Home page
    timetable.astro   — Class timetable
    private-training.astro — Private training page
    contact.astro     — Contact page
    about.astro       — About page
  styles/
    global.css        — Global styles + Tailwind import
public/               — Static assets (images, favicon, etc.)
deploy.sh             — Deployment script
```

---

## Brand

- **Colours:** Black background, Red (#DC2626), White text
- **Font:** Inter (Google Fonts)
- **Phone:** 0432 558 304
- **Email:** soullabgym@gmail.com
- **Address:** 2/70 Ingham Road, West End, Townsville QLD
