# Digital Tap

Citizen campaign site and click-through prototype for a **touchless DLR tap-in / tap-out** concept. Built for TfL and the public to understand the idea. It is **not** an official TfL product and does not process real journeys or payments.

Stack: **Next.js** (static export), **Convex**, **Tailwind**, **Resend** (REST API). Hosted on **Cloudflare Pages**, with Pages Functions in `functions/` for the admin login, stats API, contact form and the Umami analytics proxy.

## Features

- Campaign landing page, vote, and comments
- DLR journey and pink-reader interchange demo
- Contact form (Resend)
- Admin stats (password-protected, server-side)

## Getting started

Prerequisites: Node.js 22+, pnpm 11+.

```bash
pnpm install
cp .env.example .env.local
```

Fill in Convex, Resend, and admin values. Then:

```bash
pnpm dev
```

## Cloudflare Pages

Local Next.js stays `pnpm dev`. Preview the exported site plus Pages Functions locally:

```bash
pnpm preview
```

Deploy:

```bash
pnpm deploy
```

`wrangler.jsonc` points Pages at the `out/` export. Set the secrets and env vars on the Pages project (not committed):

```bash
npx wrangler pages secret put RESEND_API_KEY
npx wrangler pages secret put CONTACT_TO_EMAIL
npx wrangler pages secret put ADMIN_PASSWORD
```

`NEXT_PUBLIC_CONVEX_URL` is needed both at build time (client bundle) and as a Pages env var for the stats Function — set it under **Pages → Settings → Environment variables**. For `wrangler pages dev`, copy values into `.dev.vars` (gitignored).

## License

MIT © Antonio Smith
