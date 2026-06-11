# AI CentralHub — Frontend

The official frontend for [ai-centralhub.com](https://ai-centralhub.com), a free AI tools directory with 7,000+ tools across 50+ categories.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **UI Library:** MUI v6
- **Styling:** SCSS + MUI theme
- **Font:** Space Grotesk (via next/font/google)
- **Deployment:** Vercel

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
BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
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

src/
├── app/                    # Next.js App Router pages
│   ├── ai-tools/           # AI tools listing + category pages
│   ├── tool/               # Tool detail pages
│   ├── featured-tools/     # Featured tools page
│   ├── categories/         # Categories overview
│   ├── contact/            # Contact page
│   ├── submit-tool/        # Submit a tool page
│   ├── privacy-policy/     # Privacy policy
│   └── cookies-policy/     # Cookies policy
├── components/             # Reusable components
│   ├── ai-tools/           # AI tools page components
│   ├── analytics/          # Google Analytics
│   ├── categories/         # Categories components
│   ├── contact/            # Contact page components
│   ├── featured-tools/     # Featured tools components
│   ├── home/               # Homepage sections
│   ├── legal/              # Cookie consent + policy components
│   ├── submit-tool/        # Submit tool components
│   └── tool/               # Tool detail components
├── data/                   # Mock data (replace with API calls)
├── theme/                  # MUI theme configuration
└── types/                  # TypeScript interfaces

## Key Architectural Decisions

- **Server vs Client Components:** Pages use Server Components for SSG/SSR and metadata. Interactive UI is extracted into `*Client.tsx` Client Components.
- **Theme tokens:** Custom colors defined in `theme.ts` via `customColors` for single-source-of-truth styling.
- **Mock data:** All data is currently served from `src/data/mockData.ts`. Ready to swap for backend API calls.
- **Path alias:** `@/*` maps to `src/*`.

## Branch Strategy

- `main` — production branch, deployed to Vercel
- `feat/*` — feature branches, merged via PR

## Deployment

Deployed on Vercel. Every push to `main` triggers an automatic deployment.

Required environment variables on Vercel:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `BACKEND_URL`

## License

MIT