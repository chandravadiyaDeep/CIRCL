# CIRCL — Creator Network

CIRCL is an independent, Instagram-first creator network for Indian lifestyle creators. The website explains organic creator discovery, collaboration, transparent measurement and participation guidelines.

## Website

- `index.html` — animated homepage
- `about.html` — brand story
- `why-circl.html` — creator benefits
- `how-it-works.html` — organic discovery process
- `transparency.html` — tracking and measurement principles
- `guidelines.html` — creator guidelines and operating agreement
- `join.html` — creator application
- `privacy.html` and `terms.html` — draft legal documents

## Configure before launch

Edit the `CIRCL_CONFIG` object in `index.html`:

- `instagramUrl`: official CIRCL Instagram profile URL
- `channelUrl`: official Instagram Broadcast Channel invitation URL
- `applicationUrl`: reserved for a future secure application endpoint
- `analyticsEndpoint`: optional HTTPS endpoint for referral click events

The creator application currently prepares a local email draft to `hello@circl.network`. It does not submit data to a server. Configure a monitored contact address or secure form provider before accepting applications publicly.

The referral script can record a referral identifier in session storage and optionally send a click event to a configured endpoint. With no endpoint configured, no analytics event is transmitted. A referral click is not proof of a channel join or creator follow.

## GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select branch `main` and folder `/ (root)`.
4. Save and wait for GitHub Pages to publish.
5. The expected project URL is `https://chandravadiyaDeep.github.io/CIRCL/`, subject to Pages being enabled.

Alternatively configure GitHub Actions as the Pages build source if you later add a Pages deployment workflow.

## Important pre-launch checks

- Add the real Instagram profile and Broadcast Channel invitation links.
- Confirm a monitored support/privacy contact and the operator's legal identity.
- Have Privacy Policy, Terms and Creator Agreement reviewed and completed for the actual operator, data providers, retention periods and applicable law.
- Connect a secure application backend/form before collecting applications at scale.
- Configure a real referral analytics endpoint before describing click tracking as active.
- Test all pages and links on mobile and desktop.
- Respect reduced-motion preferences. The homepage intro is skippable and automatically finishes.

## Scope

The initial product is for organic creator networking only. No advertising marketplace, payments, paid subscriptions, follower exchange or guaranteed growth claims are included.
