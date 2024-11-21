import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { useMessages, useLocale } from 'next-intl';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function MainLayout({ children, className }: MainLayoutProps) {
  const messages = useMessages();
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-[#F5F9F7]">
      <Navigation />
      <main className={cn("relative bg-[#F5F9F7]", className)}>{children}</main>
      <footer className="bg-[#4C9D67]/5 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#4C9D67]">Bimar</h3>
              <p className="text-[#1F3028]/80">
                Zamonaviy tibbiyot va an'anaviy davolash usullari haqida
                professional ma'lumotlar.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold">Tezkor Havolalar</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-[#1F3028]/80 hover:text-[#4C9D67]">
                    Biz haqimizda
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-[#1F3028]/80 hover:text-[#4C9D67]">
                    Aloqa
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-[#1F3028]/80 hover:text-[#4C9D67]">
                    Maxfiylik siyosati
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h4 className="font-semibold">Bo'limlar</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/category/diseases"
                    className="text-[#1F3028]/80 hover:text-[#4C9D67]"
                  >
                    Kasalliklar
                  </a>
                </li>
                <li>
                  <a
                    href="/category/treatments"
                    className="text-[#1F3028]/80 hover:text-[#4C9D67]"
                  >
                    Davolash
                  </a>
                </li>
                <li>
                  <a
                    href="/category/prevention"
                    className="text-[#1F3028]/80 hover:text-[#4C9D67]"
                  >
                    Profilaktika
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-semibold">Bog'lanish</h4>
              <ul className="space-y-2">
                <li className="text-[#1F3028]/80">
                  <strong>Tel:</strong> +998 90 123 45 67
                </li>
                <li className="text-[#1F3028]/80">
                  <strong>Email:</strong> info@bimar.uz
                </li>
                <li className="text-[#1F3028]/80">
                  <strong>Manzil:</strong> Toshkent sh., Chilonzor t., 1-uy
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-16 pt-8 border-t text-center text-[#1F3028]/80">
            <p>&copy; {new Date().getFullYear()} Bimar. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
