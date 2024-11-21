/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'www.afisha.uz',
      'images.unsplash.com',
      'plus.unsplash.com',
      process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL.replace('https://', '') : '',
    ].filter(Boolean),
  },
  i18n: {
    locales: ['uz', 'ru'],
    defaultLocale: 'uz',
    localeDetection: false
  }
}

module.exports = nextConfig;
