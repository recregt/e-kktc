// Simple in-memory rate limiter
// In production, use Redis or a proper rate limiting service

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

export interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

const defaultConfig: RateLimitConfig = {
  maxRequests: 100, // 100 requests
  windowMs: 15 * 60 * 1000, // per 15 minutes
}

// Rate limit configurations for different endpoints
export const rateLimitConfigs: Record<string, RateLimitConfig> = {
  '/api/auth': { maxRequests: 5, windowMs: 15 * 60 * 1000 }, // 5 auth attempts per 15 min
  '/api/login': { maxRequests: 5, windowMs: 15 * 60 * 1000 }, // 5 login attempts per 15 min
  '/api/signup': { maxRequests: 3, windowMs: 60 * 60 * 1000 }, // 3 signups per hour
  '/api/forgot-password': { maxRequests: 3, windowMs: 60 * 60 * 1000 }, // 3 attempts per hour
  '/api/upload': { maxRequests: 10, windowMs: 60 * 1000 }, // 10 uploads per minute
  '/api/contact': { maxRequests: 5, windowMs: 60 * 60 * 1000 }, // 5 contact forms per hour
}

export function checkRateLimit(
  identifier: string,
  endpoint: string = 'default'
): { success: boolean; resetTime?: number } {
  const config = rateLimitConfigs[endpoint] || defaultConfig
  const now = Date.now()
  const key = `${identifier}:${endpoint}`
  
  // Clean up expired entries
  if (rateLimitStore.size > 10000) {
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key)
      }
    }
  }
  
  const entry = rateLimitStore.get(key)
  
  if (!entry || now > entry.resetTime) {
    // First request or window expired
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs
    })
    return { success: true }
  }
  
  if (entry.count >= config.maxRequests) {
    // Rate limit exceeded
    return { 
      success: false, 
      resetTime: entry.resetTime 
    }
  }
  
  // Increment counter
  entry.count += 1
  return { success: true }
}

export function getRateLimitHeaders(identifier: string, endpoint: string = 'default') {
  const config = rateLimitConfigs[endpoint] || defaultConfig
  const key = `${identifier}:${endpoint}`
  const entry = rateLimitStore.get(key)
  
  if (!entry) {
    return {
      'X-RateLimit-Limit': config.maxRequests.toString(),
      'X-RateLimit-Remaining': config.maxRequests.toString(),
      'X-RateLimit-Reset': new Date(Date.now() + config.windowMs).toISOString(),
    }
  }
  
  const remaining = Math.max(0, config.maxRequests - entry.count)
  
  return {
    'X-RateLimit-Limit': config.maxRequests.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': new Date(entry.resetTime).toISOString(),
  }
}
