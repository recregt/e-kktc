'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Card className="text-center">
        <CardContent className="p-8">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Siparişiniz Alındı!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Teşekkür ederiz! Siparişiniz başarıyla oluşturuldu.
          </p>

          {orderNumber && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500">Sipariş Numarası</p>
              <p className="text-xl font-semibold text-gray-900">{orderNumber}</p>
            </div>
          )}

          {/* Order Details */}
          <div className="text-left bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Sipariş Detayları</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Ödeme Yöntemi:</span>
                <span>Kapıda Ödeme</span>
              </div>
              <div className="flex justify-between">
                <span>Durum:</span>
                <span className="text-yellow-600 font-medium">Onay Bekliyor</span>
              </div>
              <div className="flex justify-between">
                <span>Tahmini Teslimat:</span>
                <span>2-3 İş Günü</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-left bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-3">Sonraki Adımlar</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Siparişiniz onaylandığında size bilgi verilecektir</li>
              <li>• Kargo hazırlandığında SMS ile bilgilendirileceksiniz</li>
              <li>• Ürünleriniz 2-3 iş günü içinde teslim edilecektir</li>
              <li>• Ödeme kargo teslim sırasında yapılacaktır</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products" className="flex-1">
              <Button className="w-full">
                Alışverişe Devam Et
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Ana Sayfaya Dön
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Kıbrıs E-ticaret
            </Link>
          </div>
        </div>
      </header>

      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Yükleniyor...</p>
          </div>
        </div>
      }>
        <OrderSuccessContent />
      </Suspense>
    </div>
  )
}
