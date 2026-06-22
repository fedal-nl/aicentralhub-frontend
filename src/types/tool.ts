export interface Tool {
  id: number
  name: string
  slug: string
  description: string
  longDescription?: string
  category: string
  subcategory: string
  pricing: 'free' | 'freemium' | 'paid' | 'free-trial' | 'contact-us'
  appType: 'website' | 'app' | 'chrome-extension' | 'api'
  url: string
  logo?: string
  isFeatured?: boolean
  metaDescription?: string
  rating?: number
  reviewCount?: number
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
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
