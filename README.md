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