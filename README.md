# CIRCL — Independent Creator Network

CIRCL is an Instagram-first creator network for India's fashion and lifestyle creators. The website is built as a React + TypeScript application with Vite and Framer Motion, designed around an editorial monochrome identity.

## Stack

- React 19 + TypeScript
- Vite build system
- Framer Motion for motion and transitions
- Lucide React icons
- React Router with hash-based routing for GitHub Pages
- Custom responsive CSS

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

The repository includes `.github/workflows/deploy.yml`. Configure **Settings → Pages → Build and deployment → Source → GitHub Actions**. Pushes to `main` build the Vite app and deploy the `dist` directory.

The app is configured with Vite base path `/CIRCL/` and hash routing, so routes work on GitHub Pages without a server rewrite.

## Before public creator onboarding

1. Set the official CIRCL Instagram URL in `src/App.tsx`.
2. Connect a secure creator application backend or form service. The current application form only prepares/copies an application locally; it does not upload or store data.
3. Add a real referral analytics endpoint before describing referral click tracking as active.
4. Complete the Privacy Policy and Terms with the actual operator identity, contact address, service providers, retention rules and applicable legal review.
5. Replace editorial image URLs with owned/licensed brand photography when available.
6. Test the deployed site on mobile and desktop.

## Product principles

- Organic discovery, not guaranteed follower counts
- No follow-for-follow or artificial engagement
- Creator ownership of original content
- Permission before reposting or reuse
- Transparent reporting with clear attribution limits
- Instagram is the initial and only community platform

The site does not include advertising sales, payments, subscriptions or monetization features.
