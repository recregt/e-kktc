'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/cart-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

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
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
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
                <Link href="/">
                  <Button variant="ghost">Ana Sayfa</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Empty Cart */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Sepetiniz Boş
            </h1>
            <p className="text-gray-500 mb-8">
              Alışverişe başlamak için ürünler sayfasını ziyaret edin
            </p>
            <Link href="/products">
              <Button size="lg">
                Ürünleri Görüntüle
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
              <Link href="/">
                <Button variant="ghost">Ana Sayfa</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

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
                  <div className="w-24 h-24 bg-gray-200 flex-shrink-0">
                    {item.product.images && item.product.images[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
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
