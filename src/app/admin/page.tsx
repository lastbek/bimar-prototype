import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, Tags, FolderTree } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getDashboardStats() {
  const supabase = createServerComponentClient({ cookies });
  
  try {
    // Get posts count
    const { count: postsCount, error: postsError } = await supabase
      .from('blogs')
      .select('*', { count: 'exact' });

    if (postsError) {
      console.error('Error fetching posts count:', postsError);
    }

    // Get categories count
    const { count: categoriesCount, error: categoriesError } = await supabase
      .from('categories')
      .select('*', { count: 'exact' });

    if (categoriesError) {
      console.error('Error fetching categories count:', categoriesError);
    }

    // Get tags count
    const { count: tagsCount, error: tagsError } = await supabase
      .from('tags')
      .select('*', { count: 'exact' });

    if (tagsError) {
      console.error('Error fetching tags count:', tagsError);
    }

    console.log('Stats:', { postsCount, categoriesCount, tagsCount });

    return {
      posts: postsCount || 0,
      categories: categoriesCount || 0,
      tags: tagsCount || 0,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      posts: 0,
      categories: 0,
      tags: 0,
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Bimar tibbiy blog boshqaruv paneli
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/admin/posts">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Jami Maqolalar
              </CardTitle>
              <Newspaper className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.posts}</div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/categories">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Kategoriyalar
              </CardTitle>
              <FolderTree className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.categories}</div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/tags">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Teglar
              </CardTitle>
              <Tags className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.tags}</div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Add more stats or quick actions here */}
      </div>
    </div>
  );
}
