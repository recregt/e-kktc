// Security utilities for input sanitization and validation

/**
 * Sanitize HTML to prevent XSS attacks
 * Basic implementation - in production consider using DOMPurify
 */
export function sanitizeHtml(input: string): string {
  if (!input) return ''
  
  // Remove script tags and event handlers
  const sanitized = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
  
  return sanitized
}

/**
 * Escape HTML characters to prevent XSS
 */
export function escapeHtml(input: string): string {
  if (!input) return ''
  
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }
  
  return input.replace(/[&<>"'\/]/g, (match) => htmlEscapes[match])
}

/**
 * Validate file uploads
 */
export interface FileValidationOptions {
  maxSize?: number // in bytes
  allowedTypes?: string[]
  allowedExtensions?: string[]
}

export function validateFile(
  file: File,
  options: FileValidationOptions = {}
): { valid: boolean; error?: string } {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
  } = options

  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `Dosya boyutu ${Math.round(maxSize / 1024 / 1024)}MB'dan büyük olamaz`
    }
  }

  // Check MIME type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Desteklenmeyen dosya türü: ${file.type}`
    }
  }

  // Check file extension
  const extension = '.' + file.name.split('.').pop()?.toLowerCase()
  if (!allowedExtensions.includes(extension)) {
    return {
      valid: false,
      error: `Desteklenmeyen dosya uzantısı: ${extension}`
    }
  }

  // Check for suspicious file names
  const suspiciousPatterns = [
    /\.(php|asp|aspx|jsp|exe|bat|cmd|sh)$/i,
    /\.htaccess$/i,
    /web\.config$/i
  ]

  if (suspiciousPatterns.some(pattern => pattern.test(file.name))) {
    return {
      valid: false,
      error: 'Güvenlik nedeniyle bu dosya türü desteklenmiyor'
    }
  }

  return { valid: true }
}

/**
 * Generate secure random strings
 */
export function generateSecureToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  
  // Use crypto.getRandomValues if available (browser)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const randomArray = new Uint8Array(length)
    crypto.getRandomValues(randomArray)
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(randomArray[i] % chars.length)
    }
  } else {
    // Fallback to Math.random (less secure)
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
  }
  
  return result
}

/**
 * Validate and sanitize URLs
 */
export function validateUrl(url: string): { valid: boolean; sanitized?: string; error?: string } {
  if (!url) return { valid: false, error: 'URL boş olamaz' }
  
  try {
    const parsedUrl = new URL(url)
    
    // Only allow HTTP and HTTPS
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return { valid: false, error: 'Sadece HTTP ve HTTPS protokolleri desteklenir' }
    }
    
    // Block localhost and private IPs in production
    if (process.env.NODE_ENV === 'production') {
      const hostname = parsedUrl.hostname.toLowerCase()
      const privateRanges = [
        'localhost',
        '127.0.0.1',
        '0.0.0.0',
        '::1',
        'local'
      ]
      
      if (privateRanges.some(range => hostname.includes(range))) {
        return { valid: false, error: 'Özel IP adresleri ve localhost desteklenmez' }
      }
    }
    
    return { valid: true, sanitized: parsedUrl.toString() }
  } catch {
    return { valid: false, error: 'Geçersiz URL formatı' }
  }
}

/**
 * Check for common SQL injection patterns
 */
export function detectSqlInjection(input: string): boolean {
  if (!input) return false
  
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/i,
    /(OR|AND)\s+\d+\s*=\s*\d+/i,
    /['";](\s*)(OR|AND|UNION)/i,
    /\b(WAITFOR|DELAY)\b/i,
    /\b(CAST|CONVERT)\s*\(/i,
    /\b(@@VERSION|USER_NAME|DB_NAME)\b/i
  ]
  
  return sqlPatterns.some(pattern => pattern.test(input))
}

/**
 * Rate limiting for client-side usage
 */
export class ClientRateLimit {
  private requests: Map<string, number[]> = new Map()
  
  constructor(
    private maxRequests: number = 10,
    private windowMs: number = 60000 // 1 minute
  ) {}
  
  canMakeRequest(key: string): boolean {
    const now = Date.now()
    const requests = this.requests.get(key) || []
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs)
    
    if (validRequests.length >= this.maxRequests) {
      return false
    }
    
    validRequests.push(now)
    this.requests.set(key, validRequests)
    
    return true
  }
  
  getRemainingRequests(key: string): number {
    const now = Date.now()
    const requests = this.requests.get(key) || []
    const validRequests = requests.filter(time => now - time < this.windowMs)
    
    return Math.max(0, this.maxRequests - validRequests.length)
  }
}

/**
 * Content Security Policy nonce generator
 */
export function generateCSPNonce(): string {
  return generateSecureToken(16)
}
