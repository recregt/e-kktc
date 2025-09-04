# API Documentation

## Authentication

### Sign Up
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    data: {
      first_name: 'John',
      last_name: 'Doe'
    }
  }
})
```

### Sign In
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})
```

### Sign Out
```typescript
const { error } = await supabase.auth.signOut()
```

## Profile Management

### Get Profile
```typescript
const { data: profile, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', user.id)
  .single()
```

### Update Profile
```typescript
const { data, error } = await supabase
  .from('users')
  .update({
    first_name: 'John',
    last_name: 'Doe Updated',
    phone: '+90 555 123 4567'
  })
  .eq('id', user.id)
```

### Avatar Upload
```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`${user.id}/avatar.jpg`, file, {
    cacheControl: '3600',
    upsert: true
  })
```

## Address Management

### Get Addresses
```typescript
const { data: addresses, error } = await supabase
  .from('addresses')
  .select('*')
  .eq('user_id', user.id)
  .order('is_default', { ascending: false })
```

### Add Address
```typescript
const { data, error } = await supabase
  .from('addresses')
  .insert({
    user_id: user.id,
    title: 'Home',
    address_line_1: 'Street 123',
    city: 'Lefkoşa',
    postal_code: '99010',
    country: 'KKTC',
    is_default: false
  })
```

### Update Address
```typescript
const { data, error } = await supabase
  .from('addresses')
  .update({ is_default: true })
  .eq('id', addressId)
  .eq('user_id', user.id)
```

### Delete Address
```typescript
const { error } = await supabase
  .from('addresses')
  .delete()
  .eq('id', addressId)
  .eq('user_id', user.id)
```

## Orders

### Get Orders
```typescript
const { data: orders, error } = await supabase
  .from('orders')
  .select(`
    *,
    order_items(
      *,
      products(name, price)
    )
  `)
  .eq('user_id', user.id)
  .order('created_at', { ascending: false })
```

## Error Handling

Tüm API çağrılarında error handling yapılmalı:

```typescript
if (error) {
  console.error('API Error:', error.message)
  // User'a hata mesajı göster
}
```

## Types

```typescript
interface Profile {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

interface Address {
  id: string
  user_id: string
  title: string
  address_line_1: string
  address_line_2?: string
  city: string
  postal_code: string
  country: string
  is_default: boolean
  created_at: string
  updated_at: string
}
```
