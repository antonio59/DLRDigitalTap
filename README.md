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
npx wrangler pages secret put SESSION_SECRET        # recommended: random, unrelated to ADMIN_PASSWORD
npx wrangler pages secret put TOKEN_ISSUER_SECRET   # required for voting/comments
npx wrangler pages secret put UMAMI_SCRIPT_SHA256   # required for /script.js
```

`UMAMI_SCRIPT_SHA256` is the SHA-256 of the upstream analytics script — compute it once with `curl -s https://umami.antoniosmith.xyz/script.js | shasum -a 256`. `/script.js` refuses to serve unpinned content.

`NEXT_PUBLIC_CONVEX_URL` is needed both at build time (client bundle) and as a Pages env var for the stats Function — set it under **Pages → Settings → Environment variables**. For `wrangler pages dev`, copy values into `.dev.vars` (gitignored).

Two env vars also live on the **Convex deployment** (set via `npx convex env set NAME=value` or the dashboard → Settings → Environment Variables):

- `TOKEN_ISSUER_SECRET` — must match the Pages secret; gates token issuance
- `ADMIN_PASSWORD` — enables admin-gated Convex mutations (comment deletion, GDPR erasure via `lifecycle:eraseUser`)

## License

MIT © Antonio Smith
