'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/cart-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const { state, updateQuantity, removeFromCart, clearCart } = useCart()
  const router = useRouter()

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleCheckout = () => {
    // Checkout sayfasına yönlendir
    router.push('/checkout')
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Empty Cart */}
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m-2.5-2.5v6.5a1 1 0 001 1h10a1 1 0 001-1V13M7 13h10" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Sepetiniz Boş
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Henüz sepetinizde ürün bulunmuyor. Harika ürünlerimizi keşfetmek için alışverişe başlayın!
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                🛍️ Alışverişe Başla
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Sepetim ({state.totalItems} ürün)
          </h1>
          <Button 
            variant="outline" 
            onClick={clearCart}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Sepeti Temizle
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.product.id} className="overflow-hidden">
                <div className="flex">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-200 flex-shrink-0 relative">
                    {item.product.images && item.product.images[0] ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        Resim Yok
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 p-4">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.product.seller?.business_name}
                        </p>
                        <p className="text-lg font-bold text-green-600 mt-2">
                          ₺{item.product.price.toLocaleString('tr-TR')}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-4"
                        >
                          Kaldır
                        </Button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="mt-3 text-right">
                      <span className="text-sm text-gray-500">Ara Toplam: </span>
                      <span className="font-semibold">
                        ₺{(item.product.price * item.quantity).toLocaleString('tr-TR')}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Sipariş Özeti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Ürün Sayısı:</span>
                  <span>{state.totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ara Toplam:</span>
                  <span>₺{state.totalPrice.toLocaleString('tr-TR')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kargo:</span>
                  <span className="text-green-600">Ücretsiz</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Toplam:</span>
                  <span>₺{state.totalPrice.toLocaleString('tr-TR')}</span>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Kapıda Ödeme ile Sipariş Ver
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    💳 Güvenli ödeme - Kapıda nakit ödeme
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
