export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  user_id: string
  full_name?: string
  avatar_url?: string
  phone?: string
  address?: string
  city?: string
  country?: string
  postal_code?: string
  user_type: 'customer' | 'seller' | 'admin'
  created_at: string
  updated_at: string
}

export interface Seller {
  id: string
  user_id: string
  business_name: string
  business_description?: string
  business_address?: string
  business_phone?: string
  business_email?: string
  tax_number?: string
  bank_account?: string
  is_verified: boolean
  is_active: boolean
  commission_rate: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  parent_id?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  seller_id: string
  category_id: string
  name: string
  slug: string
  description?: string
  price: number
  compare_price?: number
  cost_per_item?: number
  sku?: string
  track_quantity: boolean
  quantity?: number
  images: string[]
  weight?: number
  status: 'draft' | 'active' | 'archived'
  seo_title?: string
  seo_description?: string
  created_at: string
  updated_at: string
  seller?: Seller
  category?: Category
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  updated_at: string
  product?: Product
}

export interface Order {
  id: string
  user_id: string
  order_number: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  payment_method: 'cod' | 'stripe' | 'bank_transfer'
  subtotal: number
  tax_amount: number
  shipping_amount: number
  discount_amount: number
  total_amount: number
  currency: string
  customer_email: string
  customer_phone: string
  shipping_address: Address
  billing_address?: Address
  notes?: string
  created_at: string
  updated_at: string
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  seller_id: string
  product_name: string
  product_image: string
  quantity: number
  price: number
  total: number
  created_at: string
  updated_at: string
  product?: Product
  seller?: Seller
}

export interface Address {
  id: string
  user_id: string
  title: string
  first_name: string
  last_name: string
  phone?: string
  address_line_1: string
  address_line_2?: string
  city: string
  district?: string
  postal_code?: string
  country: string
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface ProductFilters {
  category_id?: string
  seller_id?: string
  min_price?: number
  max_price?: number
  search?: string
  status?: string
}

export interface Currency {
  code: string
  name: string
  symbol: string
  rate: number // Rate to base currency (TRY)
}

export interface Locale {
  code: string
  name: string
  flag: string
}
