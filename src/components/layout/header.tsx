'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/cart-context'
import Logo from '@/components/ui/logo'
import MobileMenu from './mobile-menu-simple'
import type { User } from '@supabase/auth-helpers-nextjs'

interface UserProfile {
  id: string
  full_name?: string
  avatar_url?: string
}

export default function Header() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { state } = useCart()
  
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .eq('id', userId)
        .single()
      
      setProfile(data)
    } catch (error) {
      console.log('Profile fetch error:', error)
      setProfile(null)
    }
  }, [supabase])

  const checkUser = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    setLoading(false)
    
    if (user) {
      await fetchProfile(user.id)
    }
  }, [supabase.auth, fetchProfile])

  useEffect(() => {
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        await fetchProfile(session.user.id)
      } else {
        setUser(null)
        setProfile(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [checkUser, supabase.auth, fetchProfile])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-30">
      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Logo size="sm" />
            
            {/* Mobile menu button */}
            <button 
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Logo size="md" />
            
            {/* Navigation */}
            <nav className="flex items-center space-x-8">
              <Link 
                href="/products" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Ürünler
              </Link>
              <Link 
                href="/categories" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Kategoriler
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Hakkımızda
              </Link>
            </nav>
            
            {/* Right side actions */}
            <div className="flex items-center space-x-3">
              {/* Search Icon */}
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m-2.5-2.5v6.5a1 1 0 001 1h10a1 1 0 001-1V13M7 13h10" />
                </svg>
                {state.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {state.totalItems}
                  </span>
                )}
              </Link>

              {/* User Section */}
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full"></div>
                  <div className="w-16 h-4 animate-pulse bg-gray-200 rounded"></div>
                </div>
              ) : user ? (
                <div className="flex items-center space-x-2">
                  {/* User Profile */}
                  <Link 
                    href="/profile" 
                    className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2 transition-colors"
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      {profile?.avatar_url ? (
                        <Image 
                          src={supabase.storage.from('avatars').getPublicUrl(profile.avatar_url).data.publicUrl}
                          alt="Avatar" 
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-sm font-medium">
                          {user.email?.[0].toUpperCase()}
                        </span>
                      )}
                    </div>
                    
                    {/* User Name */}
                    <span className="text-sm font-medium text-gray-700 hidden lg:block">
                      {profile?.full_name || user.email?.split('@')[0] || 'Kullanıcı'}
                    </span>
                  </Link>
                  
                  {/* Sign Out Button */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="text-gray-600 border-gray-300 hover:text-red-600 hover:border-red-300"
                  >
                    Çıkış
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      Giriş
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Kayıt Ol
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        user={user}
        onSignOut={handleSignOut}
      />
    </header>
  )
}
