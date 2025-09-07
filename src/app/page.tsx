'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-gray-100 bg-[size:20px_20px] opacity-30"></div>
        
        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              Kuzey Kıbrıs&apos;ın #1 E-ticaret Platformu
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Güvenli</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Alışveriş
              </span>
              <span className="block">Kapınızda</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 sm:text-xl">
              Yerel işletmelerin ve müşterilerin buluşma noktası. 
              Kapıda ödeme ile güvenli, hızlı ve kolay alışveriş deneyimi.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  🛍️ Alışverişe Başla
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-gray-300 hover:border-gray-400 px-8 py-3 text-lg font-semibold">
                  🏪 Satıcı Ol
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Yerel İşletme</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Mutlu Müşteri</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Destek</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image/Illustration Placeholder */}
        <div className="absolute bottom-0 right-0 hidden lg:block">
          <div className="w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Neden e-KKTC?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Alışveriş deneyiminizi kolaylaştıran özellikler
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <CardHeader className="p-6">
                <CardTitle className="flex items-center">
                  <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <span className="text-xl font-semibold">Kapıda Ödeme</span>
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Güvenli ödeme seçenekleri ile alışverişinizi tamamlayın. 
                  Kapıda nakit veya kart ile ödeme yapabilirsiniz.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2 */}
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
              <CardHeader className="p-6">
                <CardTitle className="flex items-center">
                  <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="text-xl font-semibold">Yerel İşletmeler</span>
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Kıbrıs&apos;ın yerel işletmelerinden alışveriş yapın ve 
                  yerel ekonomiye destek olun.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3 */}
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <CardHeader className="p-6">
                <CardTitle className="flex items-center">
                  <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-xl font-semibold">Hızlı Teslimat</span>
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Ada genelinde hızlı teslimat seçenekleri ile 
                  siparişleriniz kısa sürede elinizde.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Hemen Başlayın!
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Binlerce ürün arasından seçiminizi yapın ve güvenli alışverişin tadını çıkarın.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 text-lg font-semibold">
              Ücretsiz Kayıt Ol
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
