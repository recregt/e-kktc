'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useCart } from '@/contexts/cart-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import type { User } from '@supabase/supabase-js'

interface CheckoutForm {
  fullName: string
  phone: string
  email: string
  address: string
  city: string
  notes: string
}

export default function CheckoutPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState<CheckoutForm>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: ''
  })
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({})
  
  const { state, clearCart } = useCart()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Kullanıcı kontrolü
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setUser(user)
        // Kullanıcı bilgilerini form'a doldur
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, phone, address, city')
          .eq('id', user.id)
          .single()

        if (profile) {
          setForm(prev => ({
            ...prev,
            fullName: profile.full_name || '',
            phone: profile.phone || '',
            email: user.email || '',
            address: profile.address || '',
            city: profile.city || ''
          }))
        } else {
          setForm(prev => ({
            ...prev,
            email: user.email || ''
          }))
        }
      }
      setLoading(false)
    }

    checkUser()
  }, [supabase])

  // Sepet boşsa ana sayfaya yönlendir
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4">🛒</div>
            <h2 className="text-xl font-semibold mb-2">Sepetiniz Boş</h2>
            <p className="text-gray-600 mb-4">
              Sipariş vermek için önce sepetinize ürün eklemelisiniz.
            </p>
            <Link href="/products">
              <Button>Ürünleri Görüntüle</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutForm> = {}

    if (!form.fullName.trim()) newErrors.fullName = 'Ad Soyad gereklidir'
    if (!form.phone.trim()) newErrors.phone = 'Telefon numarası gereklidir'
    if (!form.email.trim()) newErrors.email = 'E-posta adresi gereklidir'
    if (!form.address.trim()) newErrors.address = 'Adres gereklidir'
    if (!form.city.trim()) newErrors.city = 'Şehir gereklidir'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setSubmitting(true)

    try {
      // RLS policy gereği user_id gerekiyor
      // Guest kullanıcıları signup'a yönlendir
      if (!user) {
        localStorage.setItem('checkoutForm', JSON.stringify(form));
        localStorage.setItem('pendingOrder', JSON.stringify(state.items));
        router.push('/signup?redirect=checkout');
        return;
      }

      // Sipariş oluştur
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: state.totalPrice,
          subtotal: state.totalPrice,
          status: 'pending',
          payment_method: 'cod',
          payment_status: 'pending',
          customer_phone: form.phone,
          customer_email: form.email,
          shipping_address: {
            address: form.address,
            city: form.city,
            full_name: form.fullName,
            phone: form.phone
          },
          notes: form.notes
        })
        .select()
        .single()

      if (orderError) throw orderError

      // Sipariş detaylarını ekle
      const orderItems = state.items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
        total: item.product.price * item.quantity,
        product_name: item.product.name,
        seller_id: item.product.seller_id || null,
        product_image: item.product.images?.[0] || null
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) {
        console.error('Order items error:', itemsError)
        // Eğer order items eklenemezse, order'ı da sil
        await supabase.from('orders').delete().eq('id', order.id)
        throw new Error('Sipariş detayları eklenirken hata oluştu. RLS politikası eksik olabilir.')
      }

      // Sepeti temizle
      clearCart()

      // Başarı sayfasına yönlendir
      router.push(`/order-success?order=${order.order_number}`)

    } catch (error) {
      console.error('Sipariş hatası:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      
      let errorMessage = 'Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.'
      
      if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = `Hata: ${error.message}`
      }
      
      alert(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sipariş Ver</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Müşteri Bilgileri */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Teslimat Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!user && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-800">
                      💡 Zaten hesabınız var mı? 
                      <Link href="/login?redirect=checkout" className="underline ml-1">
                        Giriş yapın
                      </Link>
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ad Soyad *
                  </label>
                  <Input
                    value={form.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Adınız ve soyadınız"
                    className={errors.fullName ? 'border-red-500' : ''}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon *
                  </label>
                  <Input
                    value={form.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+90 533 123 45 67"
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-posta *
                  </label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="email@example.com"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teslimat Adresi *
                  </label>
                  <Input
                    value={form.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Mahalle, sokak, bina no, daire no"
                    className={errors.address ? 'border-red-500' : ''}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Şehir *
                  </label>
                  <Input
                    value={form.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Lefkoşa, Girne, Mağusa..."
                    className={errors.city ? 'border-red-500' : ''}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sipariş Notu
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Teslimat için özel talimatlar..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sipariş Özeti */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Sipariş Özeti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Ürünler */}
                <div className="space-y-3">
                  {state.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.product.name}</h4>
                        <p className="text-sm text-gray-500">
                          {item.quantity} x ₺{item.product.price.toLocaleString('tr-TR')}
                        </p>
                      </div>
                      <span className="font-medium">
                        ₺{(item.product.price * item.quantity).toLocaleString('tr-TR')}
                      </span>
                    </div>
                  ))}
                </div>

                <hr />

                {/* Ödemeler */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Ara Toplam:</span>
                    <span>₺{state.totalPrice.toLocaleString('tr-TR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kargo:</span>
                    <span className="text-green-600">Ücretsiz</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Toplam:</span>
                    <span>₺{state.totalPrice.toLocaleString('tr-TR')}</span>
                  </div>
                </div>

                <hr />

                {/* Ödeme Yöntemi */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Ödeme Yöntemi</h4>
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">💵</span>
                    <span>Kapıda Nakit Ödeme</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Ürünleriniz size teslim edilirken nakit olarak ödeme yapacaksınız.
                  </p>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? 'Sipariş Veriliyor...' : 'Siparişi Onayla'}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Siparişi onaylayarak{' '}
                  <Link href="/terms" className="underline">kullanım koşullarını</Link>{' '}
                  kabul etmiş olursunuz.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
