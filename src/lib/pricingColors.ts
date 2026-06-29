import { Tool } from '@/types/tool'

export const pricingColor: Record<Tool['pricing'], string> = {
  free: '#00D4FF',
  freemium: '#7B2FFF',
  paid: '#FF6B6B',
  'free-trial': '#00E5A0',
  'contact-for-pricing': '#FF9500',
}

export const pricingLabel = (pricing: Tool['pricing']) =>
  pricing
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
