'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const navigation = {
  main: [
    { name: 'Bosh sahifa', href: '/' },
    { name: 'Kasalliklar', href: '/diseases' },
    { name: 'Simptomlar', href: '/symptoms' },
    { name: 'Dorilar', href: '/medicines' },
    { name: 'Maqolalar', href: '/blog' },
    { name: 'Shifokorlar', href: '/doctors' },
    { name: 'Biz haqimizda', href: '/about' },
    { name: 'Bog\'lanish', href: '/contact' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      href: '#',
      icon: Instagram,
    },
    {
      name: 'Twitter',
      href: '#',
      icon: Twitter,
    },
    {
      name: 'YouTube',
      href: '#',
      icon: Youtube,
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
        <div className="flex items-center justify-center mb-8">
          <Link href="/" className="flex items-center">
            <div className="relative h-20 w-20">
              <Image
                src="/images/logo.svg"
                alt="Medical Blog Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        <nav className="mb-8 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-primary">
                {item.name}
              </Link>
            </div>
          ))}
        </nav>

        <div className="mt-8 border-t border-gray-900/10 pt-8">
          <div className="flex justify-center space-x-10">
            {navigation.social.map((item) => (
              <Link key={item.name} href={item.href} className="text-gray-400 hover:text-primary">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} MedUz. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
}
