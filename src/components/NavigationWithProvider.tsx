'use client';

import { NextIntlClientProvider } from 'next-intl';
import Navigation from './Navigation';

type NavigationWithProviderProps = {
  locale: string;
  messages: any;
};

export default function NavigationWithProvider({
  locale,
  messages
}: NavigationWithProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navigation />
    </NextIntlClientProvider>
  );
}
