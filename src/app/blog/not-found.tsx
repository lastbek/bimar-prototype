import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] py-16">
      <div className="container px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Maqola topilmadi
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Kechirasiz, siz qidirayotgan maqola mavjud emas yoki o'chirilgan bo'lishi mumkin.
        </p>
        <Button asChild>
          <Link href="/blog">
            Barcha maqolalar
          </Link>
        </Button>
      </div>
    </main>
  );
}
