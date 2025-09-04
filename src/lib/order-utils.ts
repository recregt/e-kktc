// Order status utilities and helpers

export interface OrderStatus {
  value: string
  label: string
  color: string
  bgColor: string
}

export const ORDER_STATUSES: Record<string, OrderStatus> = {
  'pending': {
    value: 'pending',
    label: 'Beklemede',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100'
  },
  'confirmed': {
    value: 'confirmed',
    label: 'Onaylandı',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100'
  },
  'shipped': {
    value: 'shipped',
    label: 'Kargoya Verildi',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100'
  },
  'delivered': {
    value: 'delivered',
    label: 'Teslim Edildi',
    color: 'text-green-700',
    bgColor: 'bg-green-100'
  },
  'cancelled': {
    value: 'cancelled',
    label: 'İptal Edildi',
    color: 'text-red-700',
    bgColor: 'bg-red-100'
  }
}

export const getOrderStatus = (status: string): OrderStatus => {
  return ORDER_STATUSES[status] || {
    value: status,
    label: status.charAt(0).toUpperCase() + status.slice(1),
    color: 'text-gray-700',
    bgColor: 'bg-gray-100'
  }
}

export const formatOrderDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(price)
}
