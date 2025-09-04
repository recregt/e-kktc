'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useCart } from '@/contexts/cart-context'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/auth-js'

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<{ full_name?: string; avatar_url?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const { state } = useCart()
  const router = useRouter()
  const supabase = createClient()

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', userId)
        .single()
      
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }, [supabase])

  const checkUser = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user) {
        await fetchProfile(user.id)
      }
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setLoading(false)
    }
  }, [supabase, fetchProfile])

  useEffect(() => {
    checkUser()
    
    // Auth state değişikliklerini dinle
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [checkUser, supabase.auth, fetchProfile])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Kıbrıs E-ticaret
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/products">
              <Button variant="ghost">Ürünler</Button>
            </Link>
            
            <Link href="/cart" className="relative">
              <Button variant="ghost">
                Sepet
                {state.totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {state.totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {loading ? (
              <div className="w-8 h-8 animate-pulse bg-gray-200 rounded"></div>
            ) : user ? (
              <div className="flex items-center space-x-3">
                <Link href="/profile" className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {profile?.avatar_url ? (
                      <img 
                        src={supabase.storage.from('avatars').getPublicUrl(profile.avatar_url).data.publicUrl}
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">👤</span>
                    )}
                  </div>
                  
                  {/* User Name */}
                  <span className="text-sm font-medium text-gray-700">
                    {profile?.full_name || user.email?.split('@')[0] || 'Kullanıcı'}
                  </span>
                </Link>
                
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Çıkış
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost">Giriş Yap</Button>
                </Link>
                <Link href="/signup">
                  <Button>Kayıt Ol</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
