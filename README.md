# Kıbrıs E-ticaret MVP

Kuzey Kıbrıs pazarı için geliştirilen e-ticaret platformu MVP'si.

## Teknoloji Yığını

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Authentication)
- **Deployment**: Vercel
- **Uluslararasılaştırma**: next-intl
- **Form Yönetimi**: React Hook Form + Zod

## Özellikler

### MVP Özellikleri
- ✅ Ürün listeleme ve görüntüleme
- ✅ Basit sepet sistemi
- ✅ Kullanıcı kayıt/giriş (Supabase Auth)
- ✅ Satıcı paneli
- ✅ Sipariş yönetimi
- ✅ Kapıda ödeme

### Gelecek Özellikler
- 🔄 Online ödeme (Stripe entegrasyonu)
- 🔄 Çoklu dil desteği (TR/EN)
- 🔄 Çoklu kur desteği (TL/EUR/USD)
- 🔄 Real-time bildirimler
- 🔄 Admin paneli

## Proje Yapısı

```
src/
├── app/                  # Next.js App Router
│   ├── (auth)/          # Authentication pages
│   ├── (dashboard)/     # Dashboard pages
│   ├── (shop)/          # Shop pages
│   └── api/             # API routes
├── components/          # Reusable components
│   ├── ui/              # Base UI components
│   ├── auth/            # Authentication components
│   ├── product/         # Product components
│   └── cart/            # Cart components
├── lib/                 # Utilities
│   ├── supabase/        # Supabase configuration
│   ├── validations/     # Zod schemas
│   └── utils.ts         # Helper functions
├── types/               # TypeScript type definitions
└── hooks/               # Custom React hooks
```

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Environment variables dosyasını oluşturun:
```bash
cp .env.example .env.local
```

3. Supabase projesi oluşturun ve environment variables'ları ayarlayın:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## Veritabanı Şeması

### Tablolar
- `profiles` - Kullanıcı profilleri
- `sellers` - Satıcı bilgileri
- `products` - Ürün bilgileri
- `categories` - Ürün kategorileri
- `orders` - Siparişler
- `order_items` - Sipariş öğeleri
- `cart_items` - Sepet öğeleri
