import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ComingSoonProps {
  title?: string;
  description?: string;
  showHomeButton?: boolean;
}

export function ComingSoon({
  title = "Tez kunda",
  description = "Bu sahifa hozirda ishlab chiqilmoqda. Tez orada yangiliklar bilan qaytamiz!",
  showHomeButton = true
}: ComingSoonProps) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="container px-6 py-16 text-center">
        {/* Illustration */}
        <div className="relative w-80 h-80 mx-auto mb-12">
          <Image
            src="/images/health-coming-soon.svg"
            alt="Coming Soon Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {description}
        </p>

        {/* Home Button */}
        {showHomeButton && (
          <Link href="/">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Bosh sahifaga qaytish
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
