export interface Tool {
  id: number
  name: string
  slug: string
  description: string
  longDescription?: string
  category: string
  subcategory: string
  pricing: 'free' | 'freemium' | 'paid'
  url: string
  logo?: string
  rating?: number
  reviewCount?: number
}

export interface Subcategory {
  name: string
  slug: string
  count: number
}

export interface ParentCategory {
  name: string
  slug: string
  description: string
  subcategories: Subcategory[]
}

export interface Category {
  id: number
  name: string
  slug: string
  count: number
  icon?: string
}
