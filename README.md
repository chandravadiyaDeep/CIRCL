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
2. Deploy the `circl-api` backend using `render.yaml`, attach its persistent disk, and configure the Resend email credentials described below.
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

## Creator application backend (JSON file + email)

The Join form posts to `https://circl-api.onrender.com/api/applications`. The backend is a small Node.js service in `backend/` and stores each submission in the private persistent file `/var/data/applications.json`. It does not use a database. The file is outside the public website repository.

### Deploy

1. In Render, create a new **Web Service** from this repository and use the included `render.yaml` blueprint (or set root directory to `backend`, build command `npm install`, start command `npm start`).
2. Keep the persistent disk mounted at `/var/data`. The included Render configuration uses a paid Starter web service because free instances do not provide persistent disks. Do not remove the disk or the JSON file can be lost.
3. In the Google Account used for `deepchandravadiya593@gmail.com`, enable 2-Step Verification and create an App Password (Google Account → Security → App passwords). Set `GMAIL_USER=deepchandravadiya593@gmail.com`, `GMAIL_APP_PASSWORD` to the generated 16-character password, and `EMAIL_FROM=deepchandravadiya593@gmail.com` in Render. Never use your normal Gmail password.
4. Keep `EMAIL_TO` set to `deepchandravadiya593@gmail.com`. Render generates `ADMIN_API_KEY` from the blueprint; save it privately.
5. The Render service URL should be `https://circl-api.onrender.com` to match the website's configured API URL. If Render assigns another name, update `APPLICATION_API_URL` in `src/App.tsx` and redeploy GitHub Pages.
6. Test `https://circl-api.onrender.com/health`; it should return JSON with `ok: true`.

### Download applications

Use an authenticated request; never publish the admin key in the frontend:
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_API_KEY" https://circl-api.onrender.com/api/admin/applications -o circl-applications.json
```

The API saves an application before attempting email delivery. If email delivery fails, the application remains safely stored and the website confirms that the notification is delayed. The service includes basic validation, CORS restrictions, rate limiting, and a private authenticated JSON export endpoint.

### Required account setup

The code and Render configuration are prepared in this repository, but the owner must connect their Render account, create/retain the persistent disk, and generate/add a Google App Password. Those credentials cannot safely be created or guessed from this repository.
