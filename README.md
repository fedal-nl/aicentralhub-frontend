# AI CentralHub — Frontend

The official frontend for [ai-centralhub.com](https://ai-centralhub.com), a free AI tools directory covering thousands of tools across 12 categories and 50+ subcategories.

## Tech Stack

| | |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **UI Library** | MUI v9 |
| **Font** | Space Grotesk (next/font/google) |
| **Auth** | NextAuth.js v5 (Google + GitHub OAuth) |
| **Email** | Resend |
| **Analytics** | Google Analytics GA4 (loaded in consent-denied mode until the visitor accepts the cookie banner) |
| **Hosting** | Hostinger (Node.js hosting) |
| **DNS / CDN / Security** | Cloudflare |
| **Backend** | Django REST API (separate repo) |

## Getting Started

### Prerequisites
- Node.js 22+
- npm

### Installation

```bash
git clone https://github.com/fedal-nl/aicentralhub-frontend.git
cd aicentralhub-frontend
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` in the root and fill in the values, or create `.env.local` from this template:

```env
# Backend
BACKEND_URL=https://api.fedal.xyz
API_KEY=your_api_key_here

# Auth
AUTH_SECRET=generate_with_openssl_rand_-base64_32
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Email
RESEND_API_KEY=
CONTACT_EMAIL=your_inbox@example.com

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
FALLBACK_TOOL_COUNT=5000
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

The build uses Next.js `output: 'standalone'`.

### Docker

A multi-stage `Dockerfile` (Node 22 Alpine, non-root user, port 3000) builds and runs the standalone server. `Dockerfile.dev` is provided for development.

```bash
docker build -t aicentralhub-frontend .
docker run -p 3000:3000 --env-file .env.local aicentralhub-frontend
```

`NEXT_PUBLIC_*` variables are inlined at build time, so they must be available when the image is built.

## Deployment

Production runs on Hostinger Node.js hosting, with DNS and the security/CDN layer provided by Cloudflare. Set the production environment variables (see below) in the hosting panel, then deploy the standalone build. Deployments are currently manual (ZIP upload); pushes to `main` do not deploy automatically.

## Project Structure

```
src/
├── app/
│   ├── api/                    # Next.js API route handlers (proxies to backend)
│   │   ├── auth/               # NextAuth.js handler
│   │   ├── categories/         # Categories proxy
│   │   ├── contact/            # Contact form (Resend)
│   │   ├── favorites/          # Favorites proxy (authenticated)
│   │   ├── news-feed/          # News feed route
│   │   ├── newsletter/         # Newsletter subscription
│   │   ├── reviews/            # Reviews proxy (authenticated)
│   │   ├── submit-tool/        # Tool submission (backend + Resend)
│   │   └── tools-proxy/        # Tools proxy
│   ├── about/                  # About us page
│   ├── ai-tools/               # AI tools listing + category + subcategory pages
│   ├── categories/             # Categories overview
│   ├── contact/                # Contact page
│   ├── dashboard/              # User dashboard (profile + favorites)
│   ├── featured-tools/         # Featured tools page
│   ├── login/ + signup/        # Auth pages
│   ├── news/                   # News page
│   ├── submit-tool/            # Submit a tool page
│   ├── tool/[slug]/            # Tool detail pages
│   ├── privacy-policy/         # Privacy policy
│   └── cookies-policy/         # Cookies policy
├── auth.ts                     # NextAuth.js configuration
├── middleware.ts               # Route protection (dashboard, submit-tool)
├── components/
│   ├── ai-tools/               # AI tools page components + filters
│   ├── analytics/              # Google Analytics
│   ├── auth/                   # Login, signup, session handler
│   ├── categories/             # Categories page components
│   ├── contact/                # Contact page components
│   ├── dashboard/              # Dashboard, profile card, favorites list
│   ├── featured-tools/         # Featured tools page
│   ├── home/                   # Homepage sections
│   ├── legal/                  # Cookie consent + policy components
│   ├── news/                   # News page components
│   ├── skeletons/              # Loading skeleton components
│   ├── structured-data/        # JSON-LD structured data components
│   ├── submit-tool/            # Submit tool form + coming soon
│   └── tool/                   # Tool detail, reviews, favorites button
├── data/
│   ├── legalContent.ts         # Privacy + cookies policy text
│   └── mockData.ts             # Empty shell (all data served from backend)
├── lib/
│   ├── api.ts                  # Backend API client (getTools, getCategories etc.)
│   ├── authEmails.ts           # Signup emails (Resend)
│   ├── backendAuth.ts          # Authenticated fetch helper
│   ├── categoryIcons.ts        # Category emoji icon mapping
│   ├── parseRss.ts             # RSS parsing for the news feed
│   ├── pricingColors.ts        # Pricing color + label helpers
│   └── toolCount.ts            # Dynamic tool count helper
├── theme/
│   ├── theme.ts                # MUI theme + customColors tokens
│   └── ThemeRegistry.tsx       # MUI + SessionProvider wrapper
└── types/
    ├── favorite.ts             # Favorite interface
    ├── next-auth.d.ts          # NextAuth session/JWT type augmentation
    ├── review.ts               # Review interface
    └── tool.ts                 # Tool, Category, Subcategory interfaces
```

## Key Architectural Decisions

- **Server vs Client Components** — Pages use Server Components for SSR/metadata. Interactive UI extracted into `*Client.tsx` Client Components.
- **API proxying** — All backend calls go through Next.js API routes (`/api/*`) to keep the `API_KEY` server-side only, never exposed to the browser.
- **Auth flow** — NextAuth.js handles Google/GitHub OAuth. On first sign-in, the `jwt` callback POSTs to Django's `/api/auth/social/` to create a `UserProfile` and receive a backend JWT. That token is stored in the NextAuth session for authenticated API calls. Automatic token refresh is handled in the `jwt` callback using `/api/auth/token/refresh/`.
- **Theme tokens** — Custom colors defined in `theme.ts` via `customColors` for single-source-of-truth light-mode styling.
- **Dynamic tool count** — `src/lib/toolCount.ts` fetches the real count from the backend, rounds down to the nearest 100, and appends `+`. Revalidates hourly. `FALLBACK_TOOL_COUNT` is used only if the fetch fails.
- **Cookie consent** — The banner (`components/legal/CookieConsent.tsx`) stores the visitor's choice in `localStorage` under `cookie_consent`. Google Analytics starts with analytics storage denied and is only granted when the choice is `accepted`.
- **Legal content** — Privacy and cookies policy text lives in `src/data/legalContent.ts`. Update it, including the last-updated date, whenever hosting, analytics, email or any other data processor changes.
- **Path alias** — `@/*` maps to `src/*`.

## Branch Strategy

- `main` — production branch
- `feat/*` — feature branches, merged via PR
- CI runs on every PR: TypeScript check → ESLint → build (`.github/workflows/ci.yml`)

## Environment Variables (Production)

| Variable | Description |
|---|---|
| `BACKEND_URL` | Django REST API base URL |
| `API_KEY` | Server-side API key for backend (never `NEXT_PUBLIC_`) |
| `AUTH_SECRET` | NextAuth secret (generate with `openssl rand -base64 32`) |
| `AUTH_URL` | Production URL used by NextAuth (e.g. `https://ai-centralhub.com`) |
| `AUTH_TRUST_HOST` | Set to `true` when running behind a proxy such as Cloudflare |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret |
| `RESEND_API_KEY` | Resend API key for transactional email |
| `CONTACT_EMAIL` | Inbox that receives contact form submissions |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics GA4 measurement ID |
| `NEXT_PUBLIC_BASE_URL` | Production URL (e.g. https://ai-centralhub.com) |
| `FALLBACK_TOOL_COUNT` | Tool count shown if the live count fetch fails |

## License

MIT