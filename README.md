# AI CentralHub — Frontend

The official frontend for [ai-centralhub.com](https://ai-centralhub.com), a free AI tools directory with 7,400+ tools across 12 categories and 59 subcategories.

## Tech Stack

| | |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **UI Library** | MUI v6 |
| **Font** | Space Grotesk (next/font/google) |
| **Auth** | NextAuth.js v5 (Google + GitHub OAuth) |
| **Email** | Resend |
| **Analytics** | Google Analytics GA4 |
| **Deployment** | Vercel |
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

Create a `.env.local` file in the root:

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

## Project Structure

```
src/
├── app/
│   ├── api/                    # Next.js API route handlers (proxies to backend)
│   │   ├── auth/               # NextAuth.js handler
│   │   ├── categories/         # Categories proxy
│   │   ├── contact/            # Contact form (Resend)
│   │   ├── favorites/          # Favorites proxy (authenticated)
│   │   ├── newsletter/         # Newsletter subscription
│   │   ├── reviews/            # Reviews proxy (authenticated)
│   │   └── tools-proxy/        # Tools proxy
│   ├── about/                  # About us page
│   ├── ai-tools/               # AI tools listing + category + subcategory pages
│   ├── categories/             # Categories overview
│   ├── contact/                # Contact page
│   ├── dashboard/              # User dashboard (profile + favorites)
│   ├── featured-tools/         # Featured tools page
│   ├── login/ + signup/        # Auth pages
│   ├── submit-tool/            # Submit a tool page
│   ├── tool/[slug]/            # Tool detail pages
│   ├── privacy-policy/         # Privacy policy
│   └── cookies-policy/         # Cookies policy
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
│   ├── skeletons/              # Loading skeleton components
│   ├── structured-data/        # JSON-LD structured data components
│   ├── submit-tool/            # Submit tool form + coming soon
│   └── tool/                   # Tool detail, reviews, favorites button
├── data/
│   └── mockData.ts             # Empty shell (all data served from backend)
├── lib/
│   ├── api.ts                  # Backend API client (getTools, getCategories etc.)
│   ├── backendAuth.ts          # Authenticated fetch helper
│   ├── categoryIcons.ts        # Category emoji icon mapping
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
- **Dynamic tool count** — `src/lib/toolCount.ts` fetches the real count from the backend, rounds down to the nearest 100, and appends `+`. Revalidates hourly.
- **Path alias** — `@/*` maps to `src/*`.

## Branch Strategy

- `main` — production branch, deployed to Vercel automatically
- `feat/*` — feature branches, merged via PR
- CI runs on every PR: TypeScript check → ESLint → build (`.github/workflows/ci.yml`)

## Environment Variables (Vercel)

| Variable | Description |
|---|---|
| `BACKEND_URL` | Django REST API base URL |
| `API_KEY` | Server-side API key for backend (never `NEXT_PUBLIC_`) |
| `AUTH_SECRET` | NextAuth secret (generate with `openssl rand -base64 32`) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret |
| `RESEND_API_KEY` | Resend API key for transactional email |
| `CONTACT_EMAIL` | Inbox that receives contact form submissions |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics GA4 measurement ID |
| `NEXT_PUBLIC_BASE_URL` | Production URL (e.g. https://ai-centralhub.com) |

## License

MIT