import { getRequestConfig } from 'next-intl/server';
import { languages } from './src/config/languages';

// Validate that the incoming locale is supported
const isValidLocale = (locale: string) => {
  return Object.keys(languages).includes(locale);
};

export default getRequestConfig(async ({locale}) => {
  // Instead of throwing notFound, we'll fallback to the default locale
  if (!isValidLocale(locale)) {
    locale = 'uz'; // fallback to default locale
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
