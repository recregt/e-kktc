'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Header from '@/components/layout/header'
import type { User } from '@supabase/auth-js'
import type { Profile } from '@/types'

interface Order {
  id: string
  order_number: string
  total_amount: number
  status: string
  created_at: string
  order_items?: OrderItem[]
}

interface OrderItem {
  product_name: string
  quantity: number
  price: number
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: '',
    city: ''
  })
  
  const router = useRouter()
  const supabase = createClient()

  const checkUser = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)
      await fetchProfile(user.id)
      await fetchOrders(user.id)
    } catch (error) {
      console.error('Error checking user:', error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }, [router, supabase])

  useEffect(() => {
    checkUser()
  }, [checkUser])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error)
        return
      }

      if (data) {
        setProfile(data)
        setFormData({
          full_name: data.full_name || '',
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || ''
        })
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchOrders = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            product_name,
            quantity,
            price
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching orders:', error)
        return
      }

      setOrders(data || [])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleSaveProfile = async () => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...formData,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      // Profile state'ini güncelle
      if (profile) {
        setProfile({ ...profile, ...formData })
      }
      setEditing(false)
      alert('Profil başarıyla güncellendi!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Profil güncellenirken hata oluştu.')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profilim</h1>
          <p className="text-gray-600 mt-2">Hesap bilgilerinizi yönetin ve sipariş geçmişinizi görüntüleyin.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Profil Bilgileri</CardTitle>
                <Button
                  variant={editing ? "default" : "outline"}
                  onClick={() => editing ? handleSaveProfile() : setEditing(true)}
                >
                  {editing ? 'Kaydet' : 'Düzenle'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-posta
                  </label>
                  <Input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ad Soyad
                  </label>
                  <Input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    disabled={!editing}
                    placeholder="Adınızı ve soyadınızı girin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!editing}
                    placeholder="Telefon numaranızı girin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adres
                  </label>
                  <Input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!editing}
                    placeholder="Adresinizi girin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Şehir
                  </label>
                  <Input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    disabled={!editing}
                    placeholder="Şehrinizi girin"
                  />
                </div>

                {editing && (
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSaveProfile}>
                      Değişiklikleri Kaydet
                    </Button>
                    <Button variant="outline" onClick={() => setEditing(false)}>
                      İptal
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Sipariş İstatistikleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Toplam Sipariş:</span>
                    <span className="font-semibold">{orders.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Toplam Harcama:</span>
                    <span className="font-semibold">
                      {formatPrice(orders.reduce((sum, order) => sum + order.total_amount, 0))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Üyelik Tarihi:</span>
                    <span className="font-semibold">
                      {user?.created_at ? formatDate(user.created_at) : '-'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Order History */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Sipariş Geçmişi</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Henüz hiç siparişiniz yok.</p>
                  <Link href="/products">
                    <Button>Alışverişe Başla</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">Sipariş #{order.order_number}</h3>
                          <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatPrice(order.total_amount)}</p>
                          <p className="text-sm text-gray-500 capitalize">{order.status}</p>
                        </div>
                      </div>
                      
                      {order.order_items && order.order_items.length > 0 && (
                        <div className="border-t pt-3">
                          <h4 className="text-sm font-medium mb-2">Ürünler:</h4>
                          <div className="space-y-1">
                            {order.order_items.map((item: OrderItem, index: number) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{item.product_name} x{item.quantity}</span>
                                <span>{formatPrice(item.price * item.quantity)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
