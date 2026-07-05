# Dahu — Enterprise AI Landing Site

Multilingual (zh/en/ja) Next.js 16 landing site for Dahu, an enterprise AI deployment service.

Built with Next.js 16 App Router, next-intl, Tailwind CSS v4, React 19 Server Components.

## Prerequisites

- Node.js 18+
- npm

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment (optional, see env vars below)
cp .env.example .env.local

# Development
npm run dev          # starts on port 3000
./dev.sh             # kills zombies, builds, starts on port 3004
```

Open [http://localhost:3000](http://localhost:3000) (or the port you chose) to see the site.

## Activation & Configuration

### Environment Variables

Create `.env.local` in the project root:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL (default: `https://www.dahu.ai`). Used in sitemap, robots.txt, JSON-LD structured data, and Open Graph tags. |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | No | Google Ads conversion ID (e.g. `AW-XXXXXXXXX`). When set, injects gtag.js + config script on all pages. |

### Google Ads

1. Get your Google Ads conversion ID from your Google Ads account.
2. Set `NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX` in `.env.local`.
3. Restart the dev server. The gtag script loads automatically on every page.

### Google Search & AI Crawlers

The site is already configured for search engines and AI crawlers out of the box:

- **`robots.txt`** — allows all crawlers, points to sitemap
- **`sitemap.xml`** — generated for all routes across all 3 locales (zh/en/ja)
- **JSON-LD** — Organization schema injected in root layout
- **Meta tags** — per-locale keywords, description, and title from message files
- **Open Graph / Twitter Cards** — set per locale in metadata

No additional activation needed — crawlers discover the site naturally on deploy.

### Port Conflicts

If port 3000 or 3004 is already in use:

```bash
kill $(lsof -t -i:3000) $(lsof -t -i:3004)
npm run dev
```

Or use `./dev.sh` which handles this automatically.

## Build

```bash
npm run build
npm start          # production server on port 3000
./dev.sh           # build + dev on port 3004
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # locale-routed pages (en, zh, ja)
│   │   ├── _components/   # shared UI components
│   │   ├── diagnosis/     # AI diagnosis form
│   │   ├── privacy/       # privacy policy
│   │   ├── terms/         # terms of service
│   │   └── page.tsx       # landing page
│   ├── layout.tsx         # root layout (html/head/body, gtag, JSON-LD)
│   ├── robots.ts          # robots.txt
│   └── sitemap.ts         # sitemap.xml
├── messages/              # i18n (zh.json, en.json, ja.json)
├── proxy.ts              # i18n proxy middleware
└── public/               # static assets (logo, SVG)
```

## Locales

| Code | Language |
|---|---|
| `en` | English |
| `zh` | Chinese (Simplified) |
| `ja` | Japanese |

Add a new locale by: 1) adding to `src/i18n/routing.ts` locales array, 2) creating `src/messages/{code}.json`.
