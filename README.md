# Pierson Digital

The marketing website for **Pierson Digital** — a full-service digital marketing agency offering SEO, Meta Ads, custom websites, and CRM & automation to businesses nationwide. Built with Next.js 14 (App Router).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Contact & integration values

Key contact and integration values used across the site:

| What | Where | Value |
|------|-------|-------|
| Contact email | `components/shared.jsx` (the `CONTACT` object) | `hello@piersondigitalmarketing.com` |
| Booking calendar embed | `components/pages/BookACall.jsx` | GoHighLevel booking widget `WD29jXNzNI40oG2KgKFG` |
| Domain / canonical URLs & schema | `app/`, `sitemap.xml`, `robots.txt`, `llms.txt` | `piersondigitalmarketing.com` |
| Branding, logos, copy | `public/`, `assets/`, `components/` | Pierson Digital |

## Deploy

Configured for Vercel (`vercel.json`, Next.js framework preset). Push to a repo and import it into Vercel.
