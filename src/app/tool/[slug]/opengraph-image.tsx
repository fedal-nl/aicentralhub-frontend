import { ImageResponse } from 'next/og'
import { allTools } from '@/data/mockData'

export const runtime = 'nodejs'
export const alt = 'AI Tool'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: { slug: string }
}

const pricingColor: Record<string, string> = {
  free: '#00D4FF',
  freemium: '#7B2FFF',
  paid: '#FF6B6B',
  'free-trial': '#00E5A0',
  'contact-for-pricing': '#FF9500',
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

export default async function OGImage({ params }: Props) {
  const tool = allTools.find((t) => t.slug === params.slug)

  if (!tool) {
    return new ImageResponse(
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0A0E1A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F1F5F9',
          fontSize: '48px',
          fontWeight: 800,
        }}>
        AI CentralHub
      </div>,
      { ...size },
    )
  }

  const color = pricingColor[tool.pricing] ?? '#00D4FF'
  const pricingLabel = tool.pricing
    .split('-')
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return new ImageResponse(
    <div
      style={{
        width: '1200px',
        height: '630px',
        background: '#0A0E1A',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        padding: '60px',
      }}>
      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          display: 'flex',
        }}
      />

      {/* Gradient blob */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`,
          top: '-150px',
          right: '-150px',
          display: 'flex',
        }}
      />

      {/* Logo */}
      <div style={{ display: 'flex', marginBottom: 'auto' }}>
        <img
          src={`${BASE_URL}/assets/ai-centralhub-logo-dark-version.png`}
          width={180}
          height={45}
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
        {/* Chips */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div
            style={{
              display: 'flex',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '100px',
              padding: '6px 16px',
              color: '#94A3B8',
              fontSize: '18px',
            }}>
            {tool.category}
          </div>
          <div
            style={{
              display: 'flex',
              background: `${color}22`,
              border: `1px solid ${color}44`,
              borderRadius: '100px',
              padding: '6px 16px',
              color: color,
              fontSize: '18px',
              fontWeight: 600,
            }}>
            {pricingLabel}
          </div>
        </div>

        {/* Tool name */}
        <div
          style={{
            display: 'flex',
            fontSize: '72px',
            fontWeight: 800,
            color: '#F1F5F9',
            lineHeight: 1,
          }}>
          {tool.name}
        </div>

        {/* Description */}
        <div
          style={{
            display: 'flex',
            fontSize: '24px',
            color: '#94A3B8',
            lineHeight: 1.5,
            maxWidth: '800px',
          }}>
          {tool.description}
        </div>

        {/* Rating */}
        {tool.rating && tool.reviewCount && tool.reviewCount > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                display: 'flex',
                color: '#00D4FF',
                fontSize: '20px',
                fontWeight: 700,
              }}>
              {tool.rating.toFixed(1)} / 5
            </div>
            <div
              style={{ display: 'flex', color: '#64748B', fontSize: '18px' }}>
              ({tool.reviewCount} reviews)
            </div>
          </div>
        )}
      </div>

      {/* Bottom URL */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: '40px',
          right: '60px',
          color: '#64748B',
          fontSize: '18px',
        }}>
        ai-centralhub.com/tool/{tool.slug}
      </div>
    </div>,
    { ...size },
  )
}
