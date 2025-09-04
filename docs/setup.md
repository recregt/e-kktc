# Setup Guide

## Requirements

- Node.js 18+
- npm or yarn
- Supabase account

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/recregt/e-kktc.git
cd e-kktc
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Add your Supabase credentials to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Database Setup
Follow the steps in `database/README.md`.

### 5. Start Development Server
```bash
npm run dev
```

The application will run at [http://localhost:3000](http://localhost:3000).

## Important Notes

- TypeScript strict mode is enabled
- ESLint and Prettier are configured
- Tailwind CSS is being used
- App Router (Next.js 15) is being used
