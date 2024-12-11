/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'www.afisha.uz',
      'images.unsplash.com',
      'plus.unsplash.com',
    ],
  },
  i18n: {
    locales: ['uz', 'ru'],
    defaultLocale: 'uz',
    localeDetection: false
  }
}

module.exports = nextConfig;
