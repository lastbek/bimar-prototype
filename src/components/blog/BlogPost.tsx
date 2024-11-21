import { format } from 'date-fns';
import { Database } from '@/lib/database.types';

type Blog = Database['public']['Tables']['blogs']['Row'] & {
  categories: Database['public']['Tables']['categories']['Row'];
  blog_tags: {
    tags: Database['public']['Tables']['tags']['Row'][];
  }[];
};

interface BlogPostProps {
  post: Blog;
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="prose prose-lg dark:prose-invert mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        {post.excerpt && (
          <p className="text-xl text-muted-foreground mb-4">{post.excerpt}</p>
        )}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{post.categories?.name || 'Uncategorized'}</span>
          <span>•</span>
          <span>{format(new Date(post.created_at), 'MMMM d, yyyy')}</span>
          {post.read_time && (
            <>
              <span>•</span>
              <span>{post.read_time} daqiqa o'qish</span>
            </>
          )}
        </div>
      </header>

      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
      )}

      <div 
        className="prose prose-lg dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content as string }}
      />

      {post.blog_tags && post.blog_tags.length > 0 && (
        <div className="mt-8 pt-8 border-t">
          <h2 className="text-xl font-semibold mb-4">Teglar</h2>
          <div className="flex flex-wrap gap-2">
            {post.blog_tags.map(({ tags }) => (
              <span
                key={tags[0].id}
                className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
              >
                {tags[0].name}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
