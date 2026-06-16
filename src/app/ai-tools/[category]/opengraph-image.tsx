import { ImageResponse } from 'next/og'
import { parentCategories } from '@/data/mockData'

export const runtime = 'nodejs'
export const alt = 'AI Tools Category'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: { category: string }
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

export default async function OGImage({ params }: Props) {
  const cat = parentCategories.find((c) => c.slug === params.category)

  if (!cat) {
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

  const totalTools = cat.subcategories.reduce((sum, sub) => sum + sub.count, 0)

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
          display: 'flex',
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Overline */}
        <div
          style={{
            display: 'flex',
            color: '#00D4FF',
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '0.1em',
          }}>
          CATEGORY
        </div>

        {/* Category name */}
        <div
          style={{
            display: 'flex',
            fontSize: '72px',
            fontWeight: 800,
            color: '#F1F5F9',
            lineHeight: 1,
          }}>
          {cat.name}
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
          {cat.description}
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
          <div
            style={{
              display: 'flex',
              background: 'rgba(0,212,255,0.1)',
              border: '1px solid rgba(0,212,255,0.3)',
              borderRadius: '100px',
              padding: '8px 20px',
              color: '#00D4FF',
              fontSize: '18px',
              fontWeight: 600,
            }}>
            {totalTools.toLocaleString()} tools
          </div>
          <div
            style={{
              display: 'flex',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '100px',
              padding: '8px 20px',
              color: '#94A3B8',
              fontSize: '18px',
            }}>
            {cat.subcategories.length} subcategories
          </div>
        </div>
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
        ai-centralhub.com/ai-tools/{cat.slug}
      </div>
    </div>,
    { ...size },
  )
}
