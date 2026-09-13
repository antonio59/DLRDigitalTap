# Digital Tap

Citizen campaign site and click-through prototype for a **touchless DLR tap-in / tap-out** concept. Built for TfL and the public to understand the idea. It is **not** an official TfL product and does not process real journeys or payments.

Stack: **Next.js**, **Convex**, **Tailwind**, **Resend**. Hosted on **Cloudflare Workers** via OpenNext.

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

## Cloudflare

Local Next.js stays `pnpm dev`. Preview in the Workers runtime:

```bash
pnpm preview
```

Deploy:

```bash
pnpm deploy
```

Set Worker secrets (not committed):

```bash
npx wrangler secret put NEXT_PUBLIC_CONVEX_URL
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put CONTACT_TO_EMAIL
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put ADMIN_API_KEY
```

`wrangler.jsonc` is the deploy config. `netlify.toml` has been removed.

## License

MIT © Antonio Smith
