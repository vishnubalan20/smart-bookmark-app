This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Smart Bookmark App

### Tech Stack
- Next.js (App Router)
- Supabase (Auth, DB, Realtime)
- Tailwind CSS
- Deployed on Vercel

### Features
- Google OAuth login
- Private bookmarks per user
- Realtime updates across tabs
- Delete bookmarks

### Challenges Faced
- Google OAuth redirect issues on Vercel
- Realtime sync handling
- Fixing hydration mismatch errors
- While deploying on Vercel, the app showed: Google login was not redirecting properly.
- Adding bookmarks did not work initially.


### Solutions
- Used dynamic redirectTo via window.location.origin
- Configured Supabase URL settings correctly
- Used client components for auth flows
- Added `.env.local` file with Supabase URL and API key.
- Configured the Google OAuth redirect URL correctly.
- Fixed frontend logic for adding bookmarks.

