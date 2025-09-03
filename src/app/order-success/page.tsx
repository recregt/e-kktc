'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')

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

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center">
          <CardContent className="p-8">
            {/* Success Icon */}
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Siparişiniz Alındı!
            </h1>

            <p className="text-gray-600 mb-6">
              Siparişiniz başarıyla oluşturuldu ve satıcıya iletildi. 
              En kısa sürede hazırlanıp size teslim edilecek.
            </p>

            {orderNumber && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">Sipariş Numaranız</p>
                <p className="text-xl font-bold text-gray-900">{orderNumber}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-3">Sonraki Adımlar:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                    <span>Satıcı siparişinizi onaylayacak ve hazırlamaya başlayacak</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                    <span>Ürünleriniz kargoya verildiğinde size bilgi verilecek</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                    <span>Kurye size ulaştığında ödemeyi nakit olarak yapabilirsiniz</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t pt-6 mt-6">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/products">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Alışverişe Devam Et
                  </Button>
                </Link>
                <Link href="/">
                  <Button className="w-full sm:w-auto">
                    Ana Sayfaya Dön
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Sorunuz mu var?</strong> Sipariş durumunuz hakkında bilgi almak için 
                satıcı ile iletişime geçebilir veya bize ulaşabilirsiniz.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
