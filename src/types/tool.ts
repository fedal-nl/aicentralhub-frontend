export interface Tool {
  id: number
  name: string
  slug: string
  description: string
  category: string
  pricing: 'free' | 'freemium' | 'paid'
  url: string
  logo?: string
}

export interface Category {
  id: number
  name: string
  slug: string
  count: number
  icon?: string
}
