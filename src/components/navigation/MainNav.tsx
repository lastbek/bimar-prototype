import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      {/* Top bar with search */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            MedUz
          </Link>
          
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Kasallik, dori yoki shifokor qidirish..."
                className="w-full pl-10 pr-4 rounded-full border-gray-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost">Kirish</Button>
            <Button>Roʻyxatdan oʻtish</Button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="border-t">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="hidden lg:flex items-center space-x-8 py-4">
              <Link href="/diseases" className="text-gray-700 hover:text-primary">
                Kasalliklar
              </Link>
              <Link href="/symptoms" className="text-gray-700 hover:text-primary">
                Alomatlar
              </Link>
              <Link href="/clinics" className="text-gray-700 hover:text-primary">
                Klinikalar
              </Link>
              <Link href="/pharmacies" className="text-gray-700 hover:text-primary">
                Dorixonalar
              </Link>
              <Link href="/specialists" className="text-gray-700 hover:text-primary">
                Mutaxassislar
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-primary">
                Blog
              </Link>
              <Link href="/news" className="text-gray-700 hover:text-primary">
                Yangiliklar
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden border-t">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-2">
              <Link
                href="/diseases"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                Kasalliklar
              </Link>
              <Link
                href="/symptoms"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                Alomatlar
              </Link>
              <Link
                href="/clinics"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                Klinikalar
              </Link>
              <Link
                href="/pharmacies"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                Dorixonalar
              </Link>
              <Link
                href="/specialists"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                Mutaxassislar
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                Blog
              </Link>
              <Link
                href="/news"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                Yangiliklar
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNav;
