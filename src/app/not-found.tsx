import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center p-8">
        <div className="mb-8">
          {/* 404 Icon */}
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg 
              className="w-12 h-12 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
          
          {/* 404 Text */}
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Sayfa Bulunamadı</h2>
          <p className="text-gray-600 mb-8">
            Aradığınız sayfa mevcut değil. URL'yi kontrol edin veya ana sayfaya dönün.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full">
              Ana Sayfaya Dön
            </Button>
          </Link>
          
          <Link href="/products">
            <Button variant="outline" className="w-full">
              Ürünleri İncele
            </Button>
          </Link>
        </div>

        {/* Help Links */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Yardıma mı ihtiyacınız var?</p>
          <div className="flex justify-center space-x-4 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Ana Sayfa
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/products" className="text-blue-600 hover:text-blue-800">
              Ürünler
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/profile" className="text-blue-600 hover:text-blue-800">
              Profil
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
