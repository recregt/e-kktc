import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center p-8">
        <div className="mb-8">
          {/* Unauthorized Icon */}
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
                d="M12 15v2m0 0v2m0-2h2m-2 0H8m4-6V9m0 0V7m0 2H8m4 0h4m-9 4a9 9 0 110-18 9 9 0 010 18z" 
              />
            </svg>
          </div>
          
          {/* 403 Text */}
          <h1 className="text-6xl font-bold text-gray-900 mb-2">403</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Yetkisiz Erişim</h2>
          <p className="text-gray-600 mb-8">
            Bu sayfaya erişim yetkiniz bulunmamaktadır. Uygun izinlere sahip olduğunuzdan emin olun.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full">
              Ana Sayfaya Dön
            </Button>
          </Link>
          
          <Link href="/profile">
            <Button variant="outline" className="w-full">
              Profilime Git
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Bu bir hata olduğunu düşünüyorsanız, sistem yöneticisi ile iletişime geçin.
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Ana Sayfa
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/products" className="text-blue-600 hover:text-blue-800">
              Ürünler
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/login" className="text-blue-600 hover:text-blue-800">
              Giriş Yap
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
