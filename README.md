# Medical Blog

A modern medical blog platform built with Next.js 13+ and Supabase, featuring authentication, blog post management, and a responsive design.

## Features

- 🔐 Authentication with Supabase
- 📝 Blog post creation and management
- 🏷️ Category-based organization
- 🎨 Responsive design with Tailwind CSS
- 🔍 SEO optimization
- 💨 Fast page loads with Next.js App Router

## Tech Stack

- Next.js 13+ (App Router)
- TypeScript
- Supabase
- Tailwind CSS
- React Hook Form
- date-fns
- next-seo

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a Supabase project and add environment variables
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env.local` file with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
src/
├── app/                 # App router pages
├── components/          # Reusable components
├── lib/                 # Utility functions and configurations
├── types/              # TypeScript types
└── styles/             # Global styles
```
# bimar-prototype
