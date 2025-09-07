'use client'

import { useState } from 'react'
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
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Mobile Menu */}
      <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl z-50 md:hidden transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menü</h2>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-4">
            <div className="space-y-1">
              <Link 
                href="/products" 
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={onClose}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Ürünler
              </Link>
              
              <Link 
                href="/categories" 
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={onClose}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Kategoriler
              </Link>
              
              <Link 
                href="/cart" 
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={onClose}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m-2.5-2.5v6.5a1 1 0 001 1h10a1 1 0 001-1V13M7 13h10" />
                </svg>
                Sepetim
              </Link>
              
              {user && (
                <Link 
                  href="/profile" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={onClose}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profilim
                </Link>
              )}
              
              <Link 
                href="/about" 
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={onClose}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Hakkımızda
              </Link>
              
              <Link 
                href="/help" 
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={onClose}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Yardım
              </Link>
            </div>
          </nav>

          {/* Bottom Actions */}
          <div className="border-t p-4 space-y-3">
            {user ? (
              <>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Hoşgeldiniz!</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    onSignOut()
                    onClose()
                  }}
                >
                  Çıkış Yap
                </Button>
              </>
            ) : (
              <div className="space-y-2">
                <Link href="/login" onClick={onClose}>
                  <Button variant="outline" className="w-full">
                    Giriş Yap
                  </Button>
                </Link>
                <Link href="/signup" onClick={onClose}>
                  <Button className="w-full">
                    Kayıt Ol
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
