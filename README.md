# Digital Tap

Prototype app that digitises the Docklands Light Railway (DLR) tap-in / tap-out travel experience. Built with **Next.js 14**, **Supabase**, **Tailwind CSS**, and **Resend** for transactional email.

[![Netlify Status](https://api.netlify.com/api/v1/badges?project_name=dlr-digital-tap)](https://app.netlify.com/sites/dlrdigitaltap)


*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/antonio59s-projects/v0-digital-tap-prototype)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/TlpmhNkRFxV)

## Features

- Tap-in / Tap-out simulation with Supabase as the realtime data backend
- Auth & storage powered by Supabase
- Responsive UI built with Tailwind CSS & Radix UI
- Contact form that sends email via Resend
- Deployed on Netlify with SSR/ISR support via the `@netlify/next` plugin


This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm ≥ 8 (install: `npm i -g pnpm`)

### Clone & install

```bash
pnpm install
```

### Environment variables

Create `.env.local` and add:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_key
```

### Dev server

```bash
pnpm dev
```

### Production build

```bash
pnpm build && pnpm start
```


Your project is live at:

**[https://vercel.com/antonio59s-projects/v0-digital-tap-prototype](https://vercel.com/antonio59s-projects/v0-digital-tap-prototype)**

## Deployment on Netlify

1. Push this repository to GitHub
2. In Netlify, choose **New site → Import from Git** and select the repo
3. Set the environment variables shown above
4. Netlify detects `netlify.toml` and builds with `pnpm build`

The site will deploy at `https://<your-subdomain>.netlify.app`.


Continue building your app on:

**[https://v0.dev/chat/projects/TlpmhNkRFxV](https://v0.dev/chat/projects/TlpmhNkRFxV)**

## License

MIT © 2025 Antonio Smith


1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
