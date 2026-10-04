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
  creationSource?: string
  isCreatedByCurrentUser?: boolean
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
  creation_source?: string
  is_created_by_current_user?: boolean
}

// Review status of a user's tool submission, as returned by
// GET /api/profiles/{id}/tools/. The backend may add other values later, so
// `status` is typed as a plain string and the UI falls back to
// `status_display` for anything it doesn't recognise.
export type SubmissionStatus =
  | 'pending'
  | 'in_review'
  | 'on_hold'
  | 'rejected'
  | 'approved'

export interface ToolSubmissionLog {
  id: number
  status: string
  comments: string
  created_at: string
}

export interface ToolSubmission {
  id: number
  tool: BackendTool
  status: string
  status_display: string
  comments: string
  submitted_at: string
  updated_at: string
  toolsubmitlogs: ToolSubmissionLog[]
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
