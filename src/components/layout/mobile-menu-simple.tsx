'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface UserLike {
  email?: string | null;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserLike | null;
  onSignOut: () => void;
}

export default function MobileMenu({ isOpen, onClose, user, onSignOut }: MobileMenuProps) {
  // Simple escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Simple Overlay */}
      <div 
        className="mobile-menu-overlay md:hidden"
        onClick={onClose}
      />
      
      {/* Simple Menu Panel */}
      <div className={`mobile-menu-panel ${isOpen ? 'open' : ''} md:hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-blue-600">
          <h2 className="text-lg font-semibold text-white">e-KKTC</h2>
          <button 
            onClick={onClose}
            className="p-2 text-white hover:bg-white/10 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-gray-50">
          <input 
            type="text" 
            placeholder="Ürün ara..." 
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <Link 
            href="/products" 
            className="flex items-center px-6 py-4 text-gray-700 hover:bg-blue-50"
            onClick={onClose}
          >
            <span>🛍️</span>
            <span className="ml-3">Ürünler</span>
          </Link>
          
          <Link 
            href="/categories" 
            className="flex items-center px-6 py-4 text-gray-700 hover:bg-blue-50"
            onClick={onClose}
          >
            <span>📦</span>
            <span className="ml-3">Kategoriler</span>
          </Link>
          
          <Link 
            href="/cart" 
            className="flex items-center px-6 py-4 text-gray-700 hover:bg-blue-50"
            onClick={onClose}
          >
            <span>🛒</span>
            <span className="ml-3">Sepetim</span>
          </Link>
          
          <Link 
            href="/about" 
            className="flex items-center px-6 py-4 text-gray-700 hover:bg-blue-50"
            onClick={onClose}
          >
            <span>ℹ️</span>
            <span className="ml-3">Hakkımızda</span>
          </Link>
          
          <Link 
            href="/help" 
            className="flex items-center px-6 py-4 text-gray-700 hover:bg-blue-50"
            onClick={onClose}
          >
            <span>❓</span>
            <span className="ml-3">Yardım</span>
          </Link>
        </nav>

        {/* User Section */}
        <div className="border-t p-4 bg-gray-50">
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-white rounded">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium">Hoşgeldiniz!</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>
              
              <Link href="/profile" onClick={onClose}>
                <Button variant="outline" className="w-full">
                  Profilim
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="w-full text-red-600"
                onClick={() => {
                  onSignOut()
                  onClose()
                }}
              >
                Çıkış Yap
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link href="/login" onClick={onClose}>
                <Button variant="outline" className="w-full">
                  Giriş Yap
                </Button>
              </Link>
              <Link href="/signup" onClick={onClose}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Kayıt Ol
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
