import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Block access to sensitive files with 404
  const sensitiveFiles = [
    '.env',
    '.env.local',
    '.env.production',
    '.env.development',
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    'next.config',
    '.gitignore',
    'docker',
    'compose'
  ]

  const pathname = request.nextUrl.pathname.toLowerCase()
  const isSensitiveFile = sensitiveFiles.some(file => 
    pathname.includes(file) || pathname.endsWith(file)
  )

  if (isSensitiveFile) {
    return new NextResponse(null, { status: 404 })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/login',
    '/signup',
    '/auth',
    '/products',
    '/cart',
    '/checkout',
    '/order-success'
  ]

  // Static files and Next.js internal routes
  const staticRoutes = [
    '/_next',
    '/favicon.ico',
    '/api',
    '/.well-known'
  ]

  // Check if it's a static file or Next.js internal route
  const isStaticRoute = staticRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  // Check if it's a file extension (likely a static file)
  const isFileRequest = /\.[a-zA-Z0-9]+$/.test(request.nextUrl.pathname)

  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname === route || 
    request.nextUrl.pathname.startsWith(route + '/')
  )

  // Don't redirect static files, API routes, or files with extensions
  if (isStaticRoute || isFileRequest) {
    return supabaseResponse
  }

  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
