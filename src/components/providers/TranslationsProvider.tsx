'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

type Props = {
  messages: any;
  locale: string;
  children: ReactNode;
};

export default function TranslationsProvider({
  messages,
  locale,
  children,
}: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
