import { Database } from '@/lib/database.types';
import { formatDistanceToNow } from 'date-fns';
import { uz } from 'date-fns/locale';

type Blog = Database['public']['Tables']['blogs']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];
type Tag = Database['public']['Tables']['tags']['Row'];

interface BlogWithRelations extends Blog {
  category: Category;
  blog_tags: Array<{
    tags: Tag;
  }>;
}

interface BlogCardProps {
  blog: BlogWithRelations;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <a
      href={`/blog/${blog.slug}`}
      className="group block h-full bg-card rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      {blog.image_url && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={blog.image_url}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          {blog.category && (
            <span className="text-sm font-medium text-primary">
              {blog.category.name}
            </span>
          )}
          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(blog.created_at), {
              addSuffix: true,
              locale: uz,
            })}
          </span>
        </div>

        <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {blog.title}
        </h2>

        {blog.excerpt && (
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {blog.excerpt}
          </p>
        )}

        {blog.blog_tags && blog.blog_tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {blog.blog_tags.map(({ tags }) => (
              <span
                key={tags.id}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {tags.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
