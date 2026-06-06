export interface Tool {
  id: number
  name: string
  slug: string
  description: string
  category: string
  subcategory: string
  pricing: 'free' | 'freemium' | 'paid'
  url: string
  logo?: string
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
