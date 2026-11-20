import { Tool } from '@/types/tool'

export const pricingColor: Record<Tool['pricing'], string> = {
  free: '#00D4FF',
  freemium: '#7B2FFF',
  paid: '#FF6B6B',
  'free-trial': '#00E5A0',
  'contact-for-pricing': '#FF9500',
}

// Text colours for pricing chips on light backgrounds — same hues, deeper,
// so they pass WCAG AA (≥ 4.5:1) on the chip's own tinted background. The
// base colours above are still used for the tint/border and the dark OG image.
export const pricingTextOnLight: Record<Tool['pricing'], string> = {
  free: '#0E7490',
  freemium: '#6D28D9',
  paid: '#B91C1C',
  'free-trial': '#047857',
  'contact-for-pricing': '#92400E',
}

// Fallback for pricing values outside the known set (previously rendered as
// near-white text on a white card).
const FALLBACK_PRICING_COLOR = '#5B6678'

export const pricingChipSx = (pricing: Tool['pricing']) => {
  const hue = pricingColor[pricing] ?? FALLBACK_PRICING_COLOR
  return {
    background: `${hue}22`,
    color: pricingTextOnLight[pricing] ?? FALLBACK_PRICING_COLOR,
    border: `1px solid ${hue}44`,
  }
}

export const pricingLabel = (pricing: Tool['pricing']) =>
  pricing
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
