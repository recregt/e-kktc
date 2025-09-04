# Deployment Guide

## Vercel Deployment

This project is optimized for deployment on Vercel.

### Automatic Deployment

1. Connect your GitHub repository to Vercel
2. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Click the deploy button

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## Production Checklist

- [ ] Supabase RLS policies are active
- [ ] Environment variables are configured
- [ ] Database schema is applied
- [ ] Storage bucket is configured
- [ ] No build errors (`npm run build`)
- [ ] TypeScript checks pass (`npm run type-check`)
- [ ] Linting is clean (`npm run lint`)

## Environment Variables

### Production
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Development
```
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_local_anon_key
```

## Performance

- App Router kullanılıyor
- Server Components optimize edildi
- Static generation aktif
- Image optimization aktif
