'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { User } from '@supabase/auth-js'
import type { Address } from '@/types'

interface AddressManagementProps {
  user: User
}

interface AddressFormData {
  title: string
  first_name: string
  last_name: string
  phone: string
  address_line_1: string
  address_line_2: string
  city: string
  district: string
  postal_code: string
  country: string
  is_default: boolean
}

const emptyFormData: AddressFormData = {
  title: '',
  first_name: '',
  last_name: '',
  phone: '',
  address_line_1: '',
  address_line_2: '',
  city: '',
  district: '',
  postal_code: '',
  country: 'KKTC',
  is_default: false
}

const ADDRESS_TITLES = [
  'Ev',
  'İş',
  'Annem/Babam',
  'Arkadaş',
  'Diğer'
]

export default function AddressManagement({ user }: AddressManagementProps) {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [formData, setFormData] = useState<AddressFormData>(emptyFormData)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const fetchAddresses = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching addresses:', error)
        return
      }

      setAddresses(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }, [user.id, supabase])

  useEffect(() => {
    fetchAddresses()
  }, [fetchAddresses])

  const handleAddAddress = () => {
    setEditingAddress(null)
    setFormData(emptyFormData)
    setShowForm(true)
  }

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address)
    setFormData({
      title: address.title,
      first_name: address.first_name,
      last_name: address.last_name,
      phone: address.phone || '',
      address_line_1: address.address_line_1,
      address_line_2: address.address_line_2 || '',
      city: address.city,
      district: address.district || '',
      postal_code: address.postal_code || '',
      country: address.country,
      is_default: address.is_default
    })
    setShowForm(true)
  }

  const handleSaveAddress = async () => {
    if (!formData.title || !formData.first_name || !formData.last_name || !formData.address_line_1 || !formData.city) {
      alert('Lütfen zorunlu alanları doldurun.')
      return
    }

    setSaving(true)

    try {
      if (editingAddress) {
        // Update existing address
        const { error } = await supabase
          .from('addresses')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingAddress.id)

        if (error) {
          console.error('Supabase update error:', error)
          throw error
        }
      } else {
        // Create new address
        const { error } = await supabase
          .from('addresses')
          .insert({
            ...formData,
            user_id: user.id
          })

        if (error) {
          console.error('Supabase insert error:', error)
          throw error
        }
      }

      await fetchAddresses()
      setShowForm(false)
      setEditingAddress(null)
      setFormData(emptyFormData)
      
    } catch (error) {
      console.error('Error saving address:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      
      // Supabase error'larını daha detaylı logla
      if (error && typeof error === 'object') {
        const supabaseError = error as { message?: string; code?: string; details?: string; hint?: string }
        console.error('Error message:', supabaseError.message)
        console.error('Error code:', supabaseError.code)
        console.error('Error details:', supabaseError.details)
        console.error('Error hint:', supabaseError.hint)
      }
      
      alert(`Adres kaydedilirken hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm('Bu adresi silmek istediğinizden emin misiniz?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', addressId)

      if (error) throw error

      await fetchAddresses()
    } catch (error) {
      console.error('Error deleting address:', error)
      alert('Adres silinirken hata oluştu.')
    }
  }

  const handleSetDefault = async (addressId: string) => {
    try {
      const { error } = await supabase
        .from('addresses')
        .update({ is_default: true })
        .eq('id', addressId)

      if (error) throw error

      await fetchAddresses()
    } catch (error) {
      console.error('Error setting default address:', error)
      alert('Varsayılan adres ayarlanırken hata oluştu.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Adres Defteri</h3>
        <Button onClick={handleAddAddress}>
          + Yeni Adres Ekle
        </Button>
      </div>

      {/* Address List */}
      {addresses.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-gray-500 mb-4">Henüz kayıtlı adresiniz yok.</p>
            <Button onClick={handleAddAddress}>
              İlk Adresinizi Ekleyin
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card key={address.id} className={`relative ${address.is_default ? 'ring-2 ring-blue-500' : ''}`}>
              {address.is_default && (
                <div className="absolute top-2 right-2">
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Varsayılan
                  </span>
                </div>
              )}
              
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{address.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-2">
                <p className="font-medium">
                  {address.first_name} {address.last_name}
                </p>
                
                {address.phone && (
                  <p className="text-sm text-gray-600">{address.phone}</p>
                )}
                
                <div className="text-sm text-gray-700">
                  <p>{address.address_line_1}</p>
                  {address.address_line_2 && <p>{address.address_line_2}</p>}
                  <p>
                    {address.district && `${address.district}, `}
                    {address.city}
                    {address.postal_code && ` ${address.postal_code}`}
                  </p>
                  <p>{address.country}</p>
                </div>
                
                <div className="flex gap-2 pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditAddress(address)}
                  >
                    Düzenle
                  </Button>
                  
                  {!address.is_default && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      Varsayılan Yap
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Sil
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Address Form Modal */}
      {showForm && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>
              {editingAddress ? 'Adres Düzenle' : 'Yeni Adres Ekle'}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Address Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adres Başlığı *
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              >
                <option value="">Seçiniz</option>
                {ADDRESS_TITLES.map(title => (
                  <option key={title} value={title}>{title}</option>
                ))}
              </select>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ad *
                </label>
                <Input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  placeholder="Adınız"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Soyad *
                </label>
                <Input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  placeholder="Soyadınız"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Telefon numaranız"
              />
            </div>

            {/* Address Lines */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adres Satırı 1 *
              </label>
              <Input
                type="text"
                value={formData.address_line_1}
                onChange={(e) => setFormData({ ...formData, address_line_1: e.target.value })}
                placeholder="Sokak, cadde, apartman adı ve numarası"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adres Satırı 2
              </label>
              <Input
                type="text"
                value={formData.address_line_2}
                onChange={(e) => setFormData({ ...formData, address_line_2: e.target.value })}
                placeholder="Daire numarası, kat, apartman adı (opsiyonel)"
              />
            </div>

            {/* Location Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İlçe/Bölge
                </label>
                <Input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder="İlçe veya bölge"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şehir *
                </label>
                <Input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Şehir"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Posta Kodu
                </label>
                <Input
                  type="text"
                  value={formData.postal_code}
                  onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                  placeholder="Posta kodu"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ülke *
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                >
                  <option value="KKTC">Kuzey Kıbrıs Türk Cumhuriyeti</option>
                  <option value="Türkiye">Türkiye</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </div>
            </div>

            {/* Default Address Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_default"
                checked={formData.is_default}
                onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="is_default" className="ml-2 block text-sm text-gray-700">
                Bu adresi varsayılan adres olarak ayarla
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleSaveAddress}
                disabled={saving}
              >
                {saving ? 'Kaydediliyor...' : (editingAddress ? 'Güncelle' : 'Kaydet')}
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => {
                  setShowForm(false)
                  setEditingAddress(null)
                  setFormData(emptyFormData)
                }}
                disabled={saving}
              >
                İptal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
