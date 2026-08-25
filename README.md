# Vybein Landing (Next.js)

Next.js App Router migration of the Vybein landing website, including:

- Native homepage and blog routes
- Native legal routes (`/privacy`, `/terms`, `/cookies`, `/disclaimer`, `/account-deletion`, `/child-safety`)
- App Router metadata routes: `/robots.txt` and `/sitemap.xml` (sitemap lists static pages plus all published blogs from the API, revalidated hourly)
- Legacy extension redirects (for `*.html` URLs)

## Local Development

1. Install dependencies:

```bash
npm ci
```

2. Create env file from template:

```bash
copy .env.example .env.local
```

3. Run dev server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Environment Variables

Required:

- `NEXT_PUBLIC_API_BASE_URL` (example: `https://api.vybein.com/api/v1`)
- `NEXT_PUBLIC_SITE_URL` (example: `https://vybein.com`)
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID` (example: `G-XXXXXXXXXX`, required for GA4 tracking)

## Validation Commands

```bash
npm run lint
npm run build
```

## Deployment

- Vercel config is in `vercel.json`.
- Use `DEPLOYMENT_CHECKLIST.md` for the full production cutover checklist.
