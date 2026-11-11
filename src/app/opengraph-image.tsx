import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { getTotalToolCount, formatToolCount } from '@/lib/toolCount'

// nodejs, not edge: on the self-hosted (Hostinger, output: standalone) server
// the edge runtime version of this route returned 503, so the homepage had
// no working og:image. Matches the tool and category OG routes.
export const runtime = 'nodejs'
// Re-render at most hourly (same window as the tool-count fetch).
export const revalidate = 3600
export const alt = 'AI CentralHub — Free AI Tools Directory'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Read the logo from disk instead of fetching it over HTTP from our own
// site. This route is now prerendered at build time, when no server is
// running to fetch from (the HTTP fetch failed the build). public/ sits next
// to server.js in the standalone deploy, so process.cwd() resolves it there
// too. If the file can't be read, render without the logo rather than fail.
async function loadLogo(): Promise<string | null> {
  try {
    const file = await readFile(
      join(process.cwd(), 'public/assets/ai-centralhub-logo-dark-version.png'),
    )
    return `data:image/png;base64,${file.toString('base64')}`
  } catch {
    return null
  }
}

export default async function OGImage() {
  const [count, logo] = await Promise.all([getTotalToolCount(), loadLogo()])
  const label = formatToolCount(count)

  return new ImageResponse(
    <div
      style={{
        width: '1200px',
        height: '630px',
        background: '#0A0E1A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient blobs */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(123,47,255,0.3) 0%, transparent 70%)',
          top: '-150px',
          right: '-150px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)',
          bottom: '-100px',
          left: '-100px',
        }}
      />

      {/* Logo */}
      {logo && (
        <img
          src={logo}
          width={280}
          height={70}
          style={{ objectFit: 'contain', marginBottom: '32px' }}
          alt="ai-centralhub-logo"
        />
      )}

      {/* Headline */}
      <div
        style={{
          fontSize: '56px',
          fontWeight: 800,
          color: '#F1F5F9',
          textAlign: 'center',
          lineHeight: 1.1,
          marginBottom: '16px',
          maxWidth: '800px',
        }}>
        Discover the Best AI Tools
      </div>

      {/* Subtext */}
      <div
        style={{
          fontSize: '24px',
          color: '#94A3B8',
          textAlign: 'center',
          maxWidth: '600px',
        }}>
        {/* One string, not {label} + text: two text nodes count as two
            children, and Satori requires display: flex for that. This error
            is likely what made the route 503 in production. */}
        {`${label} AI tools across 12 categories & 50+ subcategories — completely free`}
      </div>

      {/* Bottom badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(0,212,255,0.1)',
          border: '1px solid rgba(0,212,255,0.3)',
          borderRadius: '100px',
          padding: '8px 20px',
        }}>
        <div style={{ color: '#00D4FF', fontSize: '16px', fontWeight: 600 }}>
          ai-centralhub.com
        </div>
      </div>
    </div>,
    { ...size },
  )
}
