import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { Layout } from '@/components/layout/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MedUz - Tibbiy ma\'lumotlar portali',
  description: 'O\'zbekistondagi eng ishonchli tibbiy ma\'lumotlar portali',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className={inter.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
