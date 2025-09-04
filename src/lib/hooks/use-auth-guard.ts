import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export interface UseAuthGuardOptions {
  redirectTo?: string
  requireAuth?: boolean
  allowedRoles?: string[]
}

export function useAuthGuard(options: UseAuthGuardOptions = {}) {
  const {
    redirectTo = '/login',
    requireAuth = true,
    allowedRoles = []
  } = options

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)

        if (requireAuth && !user) {
          router.push(redirectTo)
          setAuthorized(false)
          return
        }

        // Check roles if specified
        if (allowedRoles.length > 0 && user) {
          const { data: profile } = await supabase
            .from('users')
            .select('user_type')
            .eq('id', user.id)
            .single()

          const userRole = profile?.user_type
          if (!userRole || !allowedRoles.includes(userRole)) {
            router.push('/unauthorized')
            setAuthorized(false)
            return
          }
        }

        setAuthorized(true)
      } catch (error) {
        console.error('Auth check failed:', error)
        if (requireAuth) {
          router.push(redirectTo)
          setAuthorized(false)
        }
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (event === 'SIGNED_OUT') {
          setAuthorized(false)
          if (requireAuth) {
            router.push(redirectTo)
          }
        } else if (event === 'SIGNED_IN' && session?.user) {
          // Re-check authorization when user signs in
          checkAuth()
        }
      }
    )

    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requireAuth, redirectTo, JSON.stringify(allowedRoles)])

  return {
    user,
    loading,
    authorized,
    isAuthenticated: !!user
  }
}
