import { z } from 'zod'

// Strong password validation
const passwordSchema = z
  .string()
  .min(8, 'Şifre en az 8 karakter olmalıdır')
  .regex(/[a-z]/, 'Şifre en az bir küçük harf içermelidir')
  .regex(/[A-Z]/, 'Şifre en az bir büyük harf içermelidir')
  .regex(/[0-9]/, 'Şifre en az bir rakam içermelidir')
  .regex(/[^a-zA-Z0-9]/, 'Şifre en az bir özel karakter içermelidir')

// Email validation with additional checks
const emailSchema = z
  .string()
  .email('Geçerli bir e-posta adresi giriniz')
  .max(254, 'E-posta adresi çok uzun')
  .refine((email) => !email.includes('..'), 'E-posta adresinde ardışık nokta bulunamaz')

// Auth schemas
export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  fullName: z.string()
    .min(2, 'Ad soyad en az 2 karakter olmalıdır')
    .max(100, 'Ad soyad çok uzun')
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Ad soyad sadece harf ve boşluk içerebilir'),
  phone: z.string()
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Geçerli bir telefon numarası giriniz')
    .optional()
    .or(z.literal('')),
  userType: z.enum(['customer', 'seller']),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword'],
})

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Şifre gereklidir'),
})

export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword'],
})

// Safe text validation (prevents XSS)
const safeTextSchema = (fieldName: string, minLength = 1, maxLength = 255) =>
  z.string()
    .min(minLength, `${fieldName} en az ${minLength} karakter olmalıdır`)
    .max(maxLength, `${fieldName} çok uzun`)
    .regex(/^[^<>'"&]*$/, `${fieldName} güvenlik nedeniyle <, >, ', ", & karakterlerini içeremez`)

// Safe HTML content (for descriptions)
const safeHtmlSchema = (fieldName: string, maxLength = 5000) =>
  z.string()
    .max(maxLength, `${fieldName} çok uzun`)
    .refine(
      (val) => !/<script|javascript:|on\w+=/i.test(val),
      `${fieldName} güvenlik nedeniyle script içeriği içeremez`
    )

// Profile schemas
export const profileSchema = z.object({
  fullName: z.string()
    .min(2, 'Ad soyad en az 2 karakter olmalıdır')
    .max(100, 'Ad soyad çok uzun')
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Ad soyad sadece harf ve boşluk içerebilir'),
  phone: z.string()
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Geçerli bir telefon numarası giriniz')
    .optional()
    .or(z.literal('')),
  address: safeTextSchema('Adres', 5, 500).optional(),
  city: safeTextSchema('Şehir', 2, 100).optional(),
  country: safeTextSchema('Ülke', 2, 100).optional(),
  postalCode: z.string()
    .regex(/^[0-9A-Za-z\s\-]+$/, 'Geçerli bir posta kodu giriniz')
    .max(20, 'Posta kodu çok uzun')
    .optional(),
})

// Seller schemas
export const sellerSchema = z.object({
  businessName: safeTextSchema('İşletme adı', 2, 200),
  businessDescription: safeHtmlSchema('İşletme açıklaması', 2000).optional(),
  businessAddress: safeTextSchema('İşletme adresi', 5, 500).optional(),
  businessPhone: z.string()
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Geçerli bir telefon numarası giriniz')
    .optional(),
  businessEmail: emailSchema.optional(),
  taxNumber: z.string()
    .regex(/^[0-9\-\s]+$/, 'Vergi numarası sadece rakam ve tire içerebilir')
    .max(20, 'Vergi numarası çok uzun')
    .optional(),
  bankAccount: z.string()
    .regex(/^[0-9\-\s]+$/, 'Banka hesap numarası sadece rakam ve tire içerebilir')
    .max(30, 'Banka hesap numarası çok uzun')
    .optional(),
})

// Product schemas
export const productSchema = z.object({
  name: safeTextSchema('Ürün adı', 2, 200),
  description: safeHtmlSchema('Ürün açıklaması', 5000).optional(),
  categoryId: z.string().uuid('Geçerli bir kategori seçiniz'),
  price: z.number().min(0.01, 'Fiyat 0\'dan büyük olmalıdır').max(999999.99, 'Fiyat çok yüksek'),
  comparePrice: z.number().min(0).max(999999.99, 'Karşılaştırma fiyatı çok yüksek').optional(),
  costPerItem: z.number().min(0).max(999999.99, 'Maliyet çok yüksek').optional(),
  sku: safeTextSchema('SKU', 1, 100).optional(),
  trackQuantity: z.boolean().default(false),
  quantity: z.number().min(0).max(999999, 'Stok miktarı çok yüksek').optional(),
  weight: z.number().min(0).max(999999, 'Ağırlık çok yüksek').optional(),
  status: z.enum(['draft', 'active', 'archived']).default('draft'),
  seoTitle: safeTextSchema('SEO başlığı', 1, 60).optional(),
  seoDescription: safeTextSchema('SEO açıklaması', 1, 160).optional(),
})

// Address schemas
export const addressSchema = z.object({
  type: z.enum(['shipping', 'billing']),
  firstName: safeTextSchema('Ad', 1, 50),
  lastName: safeTextSchema('Soyad', 1, 50),
  company: safeTextSchema('Şirket', 2, 100).optional(),
  addressLine1: safeTextSchema('Adres satırı 1', 5, 200),
  addressLine2: safeTextSchema('Adres satırı 2', 1, 200).optional(),
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
