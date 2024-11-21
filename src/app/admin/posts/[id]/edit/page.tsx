'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useToast } from '@/components/ui/use-toast';
import RichTextEditor from '@/components/RichTextEditor';
import { MultiSelect } from '@/components/ui/multi-select';
import { Database } from '@/lib/database.types';

type Category = Database['public']['Tables']['categories']['Row'];
type Tag = Database['public']['Tables']['tags']['Row'];
type Blog = Database['public']['Tables']['blogs']['Row'];

export default function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [post, setPost] = useState<Blog | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      const { data: post, error: postError } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', params.id)
        .single();

      if (postError) {
        toast({
          title: 'Xato',
          description: postError.message,
          variant: 'destructive',
        });
        return;
      }

      if (post) {
        setPost(post);
        // Convert TipTap JSON content to HTML
        if (typeof post.content === 'string') {
          try {
            const parsedContent = JSON.parse(post.content);
            let htmlContent = '';
            
            // Convert TipTap JSON to HTML
            parsedContent.content.forEach((node: any) => {
              if (node.type === 'paragraph') {
                const textAlign = node.attrs?.textAlign ? ` style="text-align: ${node.attrs.textAlign};"` : '';
                let paragraphContent = '';
                
                if (node.content) {
                  node.content.forEach((textNode: any) => {
                    if (textNode.type === 'text') {
                      paragraphContent += textNode.text;
                    }
                  });
                }
                
                if (paragraphContent) {
                  htmlContent += `<p${textAlign}>${paragraphContent}</p>`;
                } else {
                  htmlContent += '<p><br></p>';
                }
              }
            });
            
            setContent(htmlContent);
          } catch (error) {
            console.error('Error parsing content:', error);
            setContent(post.content);
          }
        } else {
          setContent(post.content || '');
        }
      }

      // Fetch post tags
      const { data: postTags } = await supabase
        .from('blog_tags')
        .select('tag_id')
        .eq('blog_id', params.id);

      if (postTags) {
        setSelectedTags(postTags.map((pt) => pt.tag_id));
      }
    };

    fetchPost();
  }, [params.id, toast, supabase]);

  // Fetch categories and tags
  useEffect(() => {
    const fetchData = async () => {
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      const { data: tagsData } = await supabase
        .from('tags')
        .select('*')
        .order('name');

      if (categoriesData) setCategories(categoriesData);
      if (tagsData) setTags(tagsData);
    };

    fetchData();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const categoryId = formData.get('category') as string;
    const imageUrl = formData.get('image_url') as string;
    const readTime = formData.get('read_time') as string;

    try {
      // Update blog post
      const { error: updateError } = await supabase
        .from('blogs')
        .update({
          title,
          slug,
          excerpt,
          content,
          category_id: categoryId,
          image_url: imageUrl,
          read_time: readTime,
        })
        .eq('id', params.id);

      if (updateError) throw updateError;

      // Delete existing tags
      const { error: deleteError } = await supabase
        .from('blog_tags')
        .delete()
        .eq('blog_id', params.id);

      if (deleteError) throw deleteError;

      // Insert new tags
      if (selectedTags.length > 0) {
        const { error: insertError } = await supabase
          .from('blog_tags')
          .insert(
            selectedTags.map((tagId) => ({
              blog_id: params.id,
              tag_id: tagId,
            }))
          );

        if (insertError) throw insertError;
      }

      toast({
        title: 'Muvaffaqiyatli',
        description: 'Maqola yangilandi',
      });

      // Force a hard refresh of all pages
      router.refresh();
      
      // Wait a bit for the data to be updated
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to posts list
      router.push('/admin/posts');
    } catch (error: any) {
      console.error('Error updating post:', error);
      toast({
        title: 'Xato',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!post) {
    return (
      <div className="p-6">
        <div className="h-[400px] flex items-center justify-center">
          <p className="text-muted-foreground">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Maqolani tahrirlash</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Sarlavha</Label>
            <Input
              id="title"
              name="title"
              defaultValue={post.title}
              required
            />
          </div>

          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              defaultValue={post.slug}
              required
            />
          </div>

          <div>
            <Label htmlFor="excerpt">Qisqa matn</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              defaultValue={post.excerpt || ''}
              required
            />
          </div>

          <div>
            <Label htmlFor="content">Maqola matni</Label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>

          <div>
            <Label htmlFor="category">Kategoriya</Label>
            <Select name="category" defaultValue={post.category_id}>
              <SelectTrigger>
                <SelectValue placeholder="Kategoriyani tanlang" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="tags">Teglar</Label>
            <MultiSelect
              options={tags.map((tag) => ({
                value: tag.id,
                label: tag.name,
              }))}
              selected={selectedTags}
              onChange={setSelectedTags}
              placeholder="Teglarni tanlang"
            />
          </div>

          <div>
            <Label htmlFor="image_url">Rasm URL</Label>
            <Input
              id="image_url"
              name="image_url"
              defaultValue={post.image_url || ''}
            />
          </div>

          <div>
            <Label htmlFor="read_time">O'qish vaqti</Label>
            <Input
              id="read_time"
              name="read_time"
              defaultValue={post.read_time || ''}
              placeholder="5 daqiqa"
            />
          </div>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saqlanmoqda...' : 'Saqlash'}
        </Button>
      </form>
    </div>
  );
}
