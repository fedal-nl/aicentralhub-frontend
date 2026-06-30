import { Category, Tool } from '@/types/tool'

// parentCategories previously lived here as static mock data.
// Now served by the backend: GET /api/tools/categories/
// See src/lib/api.ts getCategories()
export const parentCategories: Category[] = []
export const allCategories: string[] = []

// featuredTools and allTools previously lived here as static mock data.
// Now served by the backend: GET /api/tools/?is_featured=true
// See src/lib/api.ts getTools()
export const featuredTools: Tool[] = []
export const allTools: Tool[] = []

// topCategories previously lived here as static mock data.
// Now served by the backend: GET /api/tools/categories/
export const topCategories: Category[] = []
