# North Cyprus E-commerce MVP

A modern e-commerce platform MVP developed for the North Cyprus market.

## 🚀 Live Demo

**Website**: [https://e-kktc.vercel.app](https://e-kktc.vercel.app)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Authentication + RLS)
- **Deployment**: Vercel
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS + Radix UI
- **State Management**: React Context API

## ✨ Features

### ✅ MVP Features (Completed)
- **Product Catalog**: Browse and search products with filtering
- **Shopping Cart**: Add/remove items with persistent state
- **User Authentication**: Sign up/sign in with Supabase Auth
- **Checkout System**: Complete order flow with customer information
- **Cash on Delivery**: COD payment method support
- **Order Management**: Order creation and tracking
- **Responsive Design**: Mobile-first responsive UI
- **Security**: Row Level Security (RLS) policies

### 🔄 Future Features
- **Online Payments**: Stripe integration
- **Multi-language**: Turkish/English support
- **Multi-currency**: TRY/EUR/USD support
- **Real-time Notifications**: Order status updates
- **Admin Panel**: Order and inventory management
- **Seller Dashboard**: Multi-vendor support

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages (login, signup)
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout process
│   ├── order-success/     # Order confirmation
│   ├── products/          # Product catalog
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/                # Base UI components (button, card, input)
│   └── auth/              # Authentication components
├── contexts/              # React Context providers
│   └── cart-context.tsx   # Shopping cart state management
├── lib/                   # Utilities and configurations
│   ├── supabase/          # Supabase client configurations
│   ├── validations/       # Form validation schemas
│   └── utils.ts           # Helper functions
└── types/                 # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/recregt/e-kktc.git
cd e-kktc
```

2. **Install dependencies:**
```bash
npm install
```

3. **Environment setup:**
```bash
cp .env.example .env.local
```

4. **Configure Supabase:**
Create a new Supabase project and add your environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. **Database setup:**
Run the SQL schema in your Supabase SQL Editor:
```bash
# Execute the contents of supabase-schema.sql in Supabase dashboard
```

6. **Start development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Schema

### Core Tables
- **`profiles`** - User profiles and preferences
- **`products`** - Product catalog with images and pricing
- **`categories`** - Product categorization
- **`orders`** - Customer orders with status tracking
- **`order_items`** - Individual items within orders
- **`sellers`** - Vendor/seller information (future)

### Security
- **Row Level Security (RLS)** enabled on all tables
- **Authentication policies** for user data protection
- **Role-based access** for different user types

## 🌐 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🛒 User Journey

1. **Browse Products** - View product catalog on `/products`
2. **Add to Cart** - Add desired items to shopping cart
3. **Authentication** - Sign up or sign in for checkout
4. **Checkout** - Enter delivery information
5. **Order Confirmation** - Receive order confirmation
6. **Cash on Delivery** - Pay when order is delivered

## 🔒 Security Features

- **Supabase Authentication** with email/password
- **Row Level Security** policies on database
- **Protected routes** with middleware
- **Input validation** with proper sanitization
- **HTTPS** enforced in production

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach
- **Modern UI** - Clean, minimalist design
- **Loading States** - Smooth user experience
- **Error Handling** - User-friendly error messages
- **Accessibility** - ARIA labels and keyboard navigation

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database and Auth by [Supabase](https://supabase.com/)
- Deployed on [Vercel](https://vercel.com/)
- UI components inspired by [Radix UI](https://www.radix-ui.com/)

## 📞 Contact

- **Website**: [https://e-kktc.vercel.app](https://e-kktc.vercel.app)
- **Repository**: [https://github.com/recregt/e-kktc](https://github.com/recregt/e-kktc)

---

*Made with ❤️ for North Cyprus e-commerce market*
