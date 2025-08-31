# User Authentication UI - Microfrontend

A Next.js-based authentication microfrontend for MyGolya with multi-language support and SEO optimization.

## Features

- **Multi-language Support**: 13 languages including RTL support for Arabic and Urdu
- **SEO Optimized**: Server-side rendering with dynamic meta tags
- **Microfrontend Ready**: Module Federation support for integration
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Form Validation**: React Hook Form with Zod validation

## Supported Languages

- English (en) - Default
- Hindi (hi), Kannada (kn), Marathi (mr), Telugu (te), Tamil (ta)
- Russian (ru), German (de), French (fr)
- Arabic (ar) - RTL, Urdu (ur) - RTL
- Japanese (ja), Korean (ko)

## Tech Stack

- **Framework**: Next.js 14 with Pages Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Forms**: React Hook Form + Zod
- **i18n**: next-i18next
- **Fonts**: Google Fonts (Noto Sans family)

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Update the API URL to point to your user-authentication-service

3. **Run development server**
   ```bash
   npm run dev
   ```
   Opens on http://localhost:3001

## Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── services/           # API services
├── styles/             # Global styles
└── types/              # TypeScript type definitions

pages/                  # Next.js pages
├── index.tsx          # Home page
├── login.tsx          # Login page
├── register.tsx       # Registration page
└── _app.tsx           # App wrapper

public/locales/         # Translation files
├── en/common.json     # English translations
├── hi/common.json     # Hindi translations
└── ar/common.json     # Arabic translations
```

## API Integration

The microfrontend connects to the user-authentication-service APIs:

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/reset-password` - Password reset
- `POST /auth/refresh` - Token refresh
- `GET /auth/verify-email` - Email verification

## Microfrontend Integration

This component can be integrated into other applications using Module Federation. The exposed components include:

- Authentication forms (Login, Register)
- Auth guard components
- Authentication hooks
- Type definitions

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## Deployment

Optimized for deployment on:
- Vercel (recommended for Next.js)
- Netlify
- Docker containers

The application supports independent deployment as a microfrontend while maintaining integration capabilities with the main portal.