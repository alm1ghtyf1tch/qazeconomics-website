# QazEconomics

QazEconomics is a Next.js website for economics education, published articles,
student resources, olympiad information and volunteering.

The site supports Supabase-backed content management at `/admin`, with approved
admin accounts and draft, published and archived entries. Follow
[Admin Setup](docs/ADMIN_SETUP.md) to connect a project, import the existing
archive and create the first admin account. Without configuration, the public
site displays the existing archive and admin sign-in remains disabled.

Published external curriculum, PDF, book and olympiad links are preserved. The
original Wix member accounts and volunteer form backend are not migrated.

## Routes

- `/` — homepage entry point
- `/articles` — article archive and category labels
- `/articles/[slug]` — article detail pages
- `/events` — event archive
- `/events/[slug]` — event detail pages
- `/for-students` — student resource hub
- `/for-students/lessons` — Grade 9 curriculum overview
- `/for-students/olympiad-preparation` — published preparation materials
- `/for-students/olympiad-tracker` — external competition links
- `/for-students/essentials-of-economics` — published book link
- `/about-us` — organization information
- `/volunteer` — volunteer contact form
- `/admin` — protected content management workspace
- `/admin/new` — create content
- `/admin/[id]` — edit, publish or archive an entry
- `/posts` and `/posts/[slug]` — organization updates
- `/resources/[slug]` — newly published student resources

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run lint
npm run build
npm run test
npm run test:e2e
```

Article bodies and team profiles that have not yet been safely migrated are
marked explicitly in the UI rather than replaced with invented content.

The browser tests use an isolated Supabase HTTP simulator on port 54329 and a
Next.js dev server on port 3100. Stop an existing dev server for this checkout
before running them. Database policy tests run against embedded PostgreSQL.

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
