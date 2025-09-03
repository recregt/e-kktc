import { z } from 'zod'

// Auth schemas
export const signUpSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
  confirmPassword: z.string(),
  fullName: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır'),
  phone: z.string().optional(),
  userType: z.enum(['customer', 'seller']),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword'],
})

export const signInSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  password: z.string().min(1, 'Şifre gereklidir'),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
})

export const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword'],
})

// Profile schemas
export const profileSchema = z.object({
  fullName: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır'),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
})

// Seller schemas
export const sellerSchema = z.object({
  businessName: z.string().min(2, 'İşletme adı en az 2 karakter olmalıdır'),
  businessDescription: z.string().optional(),
  businessAddress: z.string().optional(),
  businessPhone: z.string().optional(),
  businessEmail: z.string().email('Geçerli bir e-posta adresi giriniz').optional(),
  taxNumber: z.string().optional(),
  bankAccount: z.string().optional(),
})

// Product schemas
export const productSchema = z.object({
  name: z.string().min(2, 'Ürün adı en az 2 karakter olmalıdır'),
  description: z.string().optional(),
  categoryId: z.string().min(1, 'Kategori seçiniz'),
  price: z.number().min(0.01, 'Fiyat 0\'dan büyük olmalıdır'),
  comparePrice: z.number().optional(),
  costPerItem: z.number().optional(),
  sku: z.string().optional(),
  trackQuantity: z.boolean().default(false),
  quantity: z.number().min(0).optional(),
  weight: z.number().min(0).optional(),
  status: z.enum(['draft', 'active', 'archived']).default('draft'),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
})

// Address schemas
export const addressSchema = z.object({
  type: z.enum(['shipping', 'billing']),
  firstName: z.string().min(1, 'Ad gereklidir'),
  lastName: z.string().min(1, 'Soyad gereklidir'),
  company: z.string().optional(),
  addressLine1: z.string().min(5, 'Adres en az 5 karakter olmalıdır'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'Şehir gereklidir'),
  state: z.string().optional(),
  postalCode: z.string().min(1, 'Posta kodu gereklidir'),
  country: z.string().min(1, 'Ülke gereklidir'),
  phone: z.string().optional(),
  isDefault: z.boolean().default(false),
})

// Order schemas
export const orderSchema = z.object({
  customerEmail: z.string().email('Geçerli bir e-posta adresi giriniz'),
  customerPhone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
  paymentMethod: z.enum(['cod', 'stripe', 'bank_transfer']).default('cod'),
  shippingAddress: addressSchema,
  billingAddress: addressSchema.optional(),
  notes: z.string().optional(),
})

// Cart schemas
export const addToCartSchema = z.object({
  productId: z.string().min(1, 'Ürün ID gereklidir'),
  quantity: z.number().min(1, 'Miktar en az 1 olmalıdır'),
})

export const updateCartItemSchema = z.object({
  quantity: z.number().min(0, 'Miktar 0 veya daha büyük olmalıdır'),
})

// Category schemas
export const categorySchema = z.object({
  name: z.string().min(2, 'Kategori adı en az 2 karakter olmalıdır'),
  description: z.string().optional(),
  parentId: z.string().optional(),
  isActive: z.boolean().default(true),
})

// Search and filter schemas
export const productFilterSchema = z.object({
  categoryId: z.string().optional(),
  sellerId: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  search: z.string().optional(),
  status: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export const searchSchema = z.object({
  query: z.string().min(1, 'Arama terimi gereklidir'),
  categoryId: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
})

// Type exports
export type SignUpInput = z.infer<typeof signUpSchema>
export type SignInInput = z.infer<typeof signInSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type ProfileInput = z.infer<typeof profileSchema>
export type SellerInput = z.infer<typeof sellerSchema>
export type ProductInput = z.infer<typeof productSchema>
export type AddressInput = z.infer<typeof addressSchema>
export type OrderInput = z.infer<typeof orderSchema>
export type AddToCartInput = z.infer<typeof addToCartSchema>
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type ProductFilterInput = z.infer<typeof productFilterSchema>
export type SearchInput = z.infer<typeof searchSchema>
