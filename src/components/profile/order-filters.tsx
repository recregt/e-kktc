'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface OrderFiltersProps {
  onFiltersChange: (filters: OrderFilters) => void
  totalOrders: number
  filteredCount: number
}

export interface OrderFilters {
  search: string
  status: string
  dateFrom: string
  dateTo: string
  minAmount: string
  maxAmount: string
}

const ORDER_STATUSES = [
  { value: '', label: 'Tüm Durumlar' },
  { value: 'pending', label: 'Beklemede' },
  { value: 'confirmed', label: 'Onaylandı' },
  { value: 'shipped', label: 'Kargoya Verildi' },
  { value: 'delivered', label: 'Teslim Edildi' },
  { value: 'cancelled', label: 'İptal Edildi' }
]

export default function OrderFilters({ onFiltersChange, totalOrders, filteredCount }: OrderFiltersProps) {
  const [filters, setFilters] = useState<OrderFilters>({
    search: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    minAmount: '',
    maxAmount: ''
  })

  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleFilterChange = (key: keyof OrderFilters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const emptyFilters: OrderFilters = {
      search: '',
      status: '',
      dateFrom: '',
      dateTo: '',
      minAmount: '',
      maxAmount: ''
    }
    setFilters(emptyFilters)
    onFiltersChange(emptyFilters)
    setShowAdvanced(false)
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== '')

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Sipariş Filtrele</CardTitle>
          <div className="text-sm text-gray-500">
            {totalOrders > 0 && (
              <span>
                {filteredCount} / {totalOrders} sipariş
                {hasActiveFilters && <span className="text-blue-600"> (filtrelenmiş)</span>}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Temel Filtreler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Arama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ürün / Sipariş No Ara
            </label>
            <Input
              type="text"
              placeholder="Ürün adı veya sipariş numarası..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          {/* Durum */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sipariş Durumu
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              {ORDER_STATUSES.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Gelişmiş Filtreler Toggle */}
        <div className="flex items-center justify-between pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-blue-600"
          >
            {showAdvanced ? '↑ Gelişmiş Filtreler Gizle' : '↓ Gelişmiş Filtreler Göster'}
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
            >
              Filtreleri Temizle
            </Button>
          )}
        </div>

        {/* Gelişmiş Filtreler */}
        {showAdvanced && (
          <div className="space-y-4 pt-4 border-t bg-gray-50 -mx-6 px-6 pb-4">
            <h4 className="font-medium text-gray-900">Gelişmiş Filtreler</h4>
            
            {/* Tarih Aralığı */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Başlangıç Tarihi
                </label>
                <Input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bitiş Tarihi
                </label>
                <Input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                />
              </div>
            </div>

            {/* Tutar Aralığı */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Tutar (₺)
                </label>
                <Input
                  type="number"
                  placeholder="0"
                  min="0"
                  step="0.01"
                  value={filters.minAmount}
                  onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maksimum Tutar (₺)
                </label>
                <Input
                  type="number"
                  placeholder="9999"
                  min="0"
                  step="0.01"
                  value={filters.maxAmount}
                  onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
