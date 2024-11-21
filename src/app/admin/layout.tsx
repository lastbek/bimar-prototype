'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Newspaper, Tags, FolderTree, LogOut } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: Newspaper,
  },
  {
    name: 'Maqolalar',
    href: '/admin/posts',
    icon: Newspaper,
  },
  {
    name: 'Kategoriyalar',
    href: '/admin/categories',
    icon: FolderTree,
  },
  {
    name: 'Teglar',
    href: '/admin/tags',
    icon: Tags,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-[#4C9D67] transition-transform -translate-x-full sm:translate-x-0">
        <div className="h-full px-3 py-4">
          <Link href="/admin" className="flex items-center pl-2.5 mb-5">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              Bimar Admin
            </span>
          </Link>

          <ul className="space-y-2 font-medium">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center p-2 text-white rounded-lg hover:bg-[#1F3028] group",
                    pathname === item.href && "bg-[#1F3028]"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">
          {children}
        </div>
      </div>

      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-[#4C9D67] border-b border-[#BAEDD1]/20 sm:ml-64">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-white rounded-lg sm:hidden hover:bg-[#1F3028] focus:outline-none focus:ring-2 focus:ring-[#BAEDD1]"
              onClick={() => {
                const sidebar = document.querySelector('aside');
                sidebar?.classList.toggle('-translate-x-full');
              }}
            >
              <span className="sr-only">Toggle sidebar</span>
              <Newspaper className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-[#1F3028]"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
