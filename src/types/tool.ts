export interface Tool {
  id: number
  name: string
  slug: string
  url: string
  description: string
  longDescription?: string
  category: string
  subcategory: string
  pricing: 'free' | 'freemium' | 'paid' | 'free-trial' | 'contact-for-pricing'
  appType: string
  tags?: string
  logo?: string
  isFeatured?: boolean
  metaDescription?: string
  rating?: number
  reviewCount?: number
  isActive?: boolean
  approvalDate?: string
}

export interface BackendTool {
  id: number
  name: string
  slug: string
  website_url: string
  description: string
  long_description?: string
  category: string
  subcategory: string
  pricing_model: string
  app_type: string
  tags?: string
  logo_url?: string
  is_featured: boolean
  meta_description?: string
  meta_keywords?: string
  approval_date?: string
  rating?: string
  review_count?: number
  is_active: boolean
  created_at?: string
  updated_at?: string
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

export interface Category {
  name: string
  slug: string
  count: number
  subcategories: Subcategory[]
}
