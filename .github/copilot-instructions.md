<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# North Cyprus E-commerce MVP - Copilot Instructions

## Project Overview
- **Tech Stack**: Next.js 15 + TypeScript + Tailwind CSS + Supabase + Vercel
- **Market**: North Cyprus (KKTC) e-commerce platform
- **Architecture**: App Router, Server Components, RLS (Row Level Security)
- **Current Phase**: Phase 2 Complete (User Profile Dashboard with Avatar Upload, Address Management, Order Filtering)

## Development Guidelines

### File Organization & Structure
When creating new files, follow this optimized structure:

```
src/
├── app/                     # Next.js App Router pages
│   ├── (auth)/             # Authentication pages (grouped route)
│   ├── (admin)/            # Admin pages (future - grouped route)
│   ├── api/                # API routes (future)
│   └── [locale]/           # Internationalization (future)
├── components/             # Reusable React components
│   ├── auth/               # Authentication-related components
│   ├── admin/              # Admin-specific components (future)
│   ├── layout/             # Layout components (header, footer, nav)
│   ├── profile/            # User profile components
│   ├── products/           # Product-related components (future)
│   ├── cart/               # Shopping cart components (future)
│   └── ui/                 # Generic UI components (buttons, inputs, etc.)
├── lib/                    # Utility functions and configurations
│   ├── supabase/           # Supabase client configurations
│   ├── validations/        # Zod validation schemas
│   ├── hooks/              # Custom React hooks (future)
│   └── utils/              # Helper functions
├── types/                  # TypeScript type definitions
├── contexts/               # React Context providers
└── constants/              # App constants (future)

database/                   # Database management
├── schema/                 # SQL schema files
│   ├── tables.sql          # Main database tables
│   ├── addresses.sql       # Address management
│   ├── storage.sql         # File storage setup
│   └── [feature].sql       # Feature-specific schemas
├── migrations/             # Database migration files
└── seeds/                  # Test/sample data

docs/                       # Documentation
├── setup.md                # Development setup guide
├── deployment.md           # Production deployment guide
├── api.md                  # API documentation
└── [feature].md            # Feature-specific docs

public/                     # Static assets
├── images/                 # Image files
├── icons/                  # Icon files
└── locales/                # Translation files (future)
```

### Component Creation Rules
1. **UI Components**: Place in `src/components/ui/` - must be reusable and generic
2. **Feature Components**: Place in `src/components/[feature]/` - feature-specific components
3. **Page Components**: Place in `src/app/[route]/page.tsx` - route-specific pages
4. **Layout Components**: Place in `src/components/layout/` - navigation, headers, footers

### Database Schema Rules
1. **New Tables**: Add to `database/schema/[feature].sql`
2. **Migrations**: Create new files in `database/migrations/`
3. **Always Include**: RLS policies, proper indexes, updated_at triggers
4. **Security First**: Every table must have appropriate RLS policies

### TypeScript Guidelines
1. **Type Definitions**: Add to `src/types/index.ts` or feature-specific files
2. **Validation Schemas**: Add to `src/lib/validations/index.ts`
3. **Strict Mode**: Always maintain TypeScript strict mode compliance
4. **Error Handling**: Use proper error types, avoid 'any'

### Phase 3 Planned Features
When implementing these features, follow the structure above:
- **Multi-language Support**: `src/app/[locale]/`, `public/locales/`
- **Advanced Search**: `src/components/search/`, `src/lib/search/`
- **Wishlist System**: `src/components/wishlist/`, `database/schema/wishlist.sql`
- **Order Tracking**: `src/components/orders/`, enhanced order management
- **Admin Panel**: `src/app/(admin)/`, `src/components/admin/`
- **Seller Dashboard**: `src/app/(seller)/`, multi-vendor support

## Completed Milestones

- [x] Verify that the copilot-instructions.md file in the .github directory is created.
- [x] Clarify Project Requirements
	<!-- North Cyprus e-commerce MVP: Next.js + Supabase + Vercel, TypeScript, Tailwind CSS -->
- [x] Scaffold the Project
	<!-- Next.js project successfully created: TypeScript, Tailwind CSS, ESLint, App Router, src/ directory -->
- [x] Customize the Project
	<!-- Supabase configuration, authentication, UI components, validations and basic pages created -->
- [x] Install Required Extensions
	<!-- No extensions needed, step skipped -->
- [x] Compile the Project
	<!-- Project successfully compiled - only Supabase environment variables missing -->
- [x] Create and Run Task
	<!-- Development server successfully started - http://localhost:3000 -->
- [x] Launch the Project
	<!-- Project successfully launched and running at http://localhost:3000 -->
- [x] Ensure Documentation is Complete
	<!-- README.md and copilot-instructions.md files present and updated -->
- [x] Phase 2 Complete: User Profile Dashboard
	<!-- Avatar Upload, Address Management, Order Filtering implemented and deployed -->
- [x] Project Structure Optimization
	<!-- Database schemas organized, comprehensive documentation added -->

## Current Status
✅ **Production Ready**: Phase 2 deployed at https://e-kktc.vercel.app
✅ **Clean Architecture**: Optimized file structure implemented
✅ **Documentation**: Comprehensive guides and API docs
🚀 **Ready for Phase 3**: Multi-language, advanced features
