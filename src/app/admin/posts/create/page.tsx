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
import { Switch } from "@/components/ui/switch";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useToast } from '@/components/ui/use-toast';
import dynamic from 'next/dynamic';
import { Database } from '@/lib/database.types';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] flex items-center justify-center border rounded-lg">
      <p className="text-muted-foreground">Yuklanmoqda...</p>
    </div>
  ),
});

type Category = Database['public']['Tables']['categories']['Row'];
type Tag = Database['public']['Tables']['tags']['Row'];

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [readTime, setReadTime] = useState('5');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [published, setPublished] = useState(true);
  const [tagSearchOpen, setTagSearchOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  // Function to generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
  };

  // Fetch categories and tags
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, tagsResponse] = await Promise.all([
          supabase.from('categories').select('*').order('name'),
          supabase.from('tags').select('*').order('name')
        ]);

        if (categoriesResponse.error) throw categoriesResponse.error;
        if (tagsResponse.error) throw tagsResponse.error;

        setCategories(categoriesResponse.data || []);
        setTags(tagsResponse.data || []);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Xato',
          description: 'Ma\'lumotlarni yuklashda xatolik yuz berdi',
          variant: 'destructive',
        });
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [supabase, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = generateSlug(title);

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      // Insert blog post
      const { data: blog, error: blogError } = await supabase
        .from('blogs')
        .insert({
          title,
          slug,
          excerpt,
          content,
          category_id: categoryId,
          image_url: imageUrl,
          read_time: parseInt(readTime),
          published,
          author_id: user?.id,
        })
        .select()
        .single();

      if (blogError) throw blogError;

      // Insert blog tags
      if (selectedTags.length > 0 && blog) {
        const blogTags = selectedTags.map(tag => ({
          blog_id: blog.id,
          tag_id: tag.id
        }));

        const { error: tagError } = await supabase
          .from('blog_tags')
          .insert(blogTags);

        if (tagError) throw tagError;
      }

      toast({
        title: 'Muvaffaqiyatli',
        description: 'Maqola yaratildi',
      });

      router.push('/admin/posts');
    } catch (error: any) {
      console.error('Error creating post:', error);
      toast({
        title: 'Xato',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTagSelect = (tag: Tag) => {
    if (!selectedTags.find(t => t.id === tag.id)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setTagSearchOpen(false);
  };

  const handleTagRemove = (tagId: string) => {
    setSelectedTags(selectedTags.filter(tag => tag.id !== tagId));
  };

  if (initialLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Yangi maqola yaratish</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-8">
          {/* Title field */}
          <div className="space-y-2">
            <Label htmlFor="title">Sarlavha</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Maqola sarlavhasini kiriting"
            />
            {title && (
              <p className="text-sm text-muted-foreground">
                Slug: {generateSlug(title)}
              </p>
            )}
          </div>

          {/* Excerpt field */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Qisqacha mazmun</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Maqolaning qisqacha mazmunini kiriting"
            />
          </div>

          {/* Category field */}
          <div className="space-y-2">
            <Label htmlFor="category">Kategoriya</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
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

          {/* Tags field */}
          <div className="space-y-2">
            <Label>Teglar</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tag.name}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag.id)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Popover open={tagSearchOpen} onOpenChange={setTagSearchOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={tagSearchOpen}
                  className="w-full justify-between"
                >
                  Teg qo'shish...
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Teglarni qidirish..." />
                  <CommandEmpty>Teg topilmadi</CommandEmpty>
                  <CommandGroup>
                    {tags
                      .filter(tag => !selectedTags.find(t => t.id === tag.id))
                      .map((tag) => (
                        <CommandItem
                          key={tag.id}
                          onSelect={() => handleTagSelect(tag)}
                        >
                          {tag.name}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Image URL field */}
          <div className="space-y-2">
            <Label htmlFor="image">Rasm URL</Label>
            <Input
              id="image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Rasm URL manzilini kiriting"
            />
          </div>

          {/* Read time field */}
          <div className="space-y-2">
            <Label htmlFor="readTime">O'qish vaqti (daqiqa)</Label>
            <Input
              id="readTime"
              type="number"
              min="1"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
            />
          </div>

          {/* Content field */}
          <div className="space-y-2">
            <Label>Maqola matni</Label>
            <div className="mt-2 border rounded-lg overflow-hidden">
              <RichTextEditor
                value={content}
                onChange={setContent}
              />
            </div>
          </div>

          {/* Published toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={published}
              onCheckedChange={setPublished}
            />
            <Label htmlFor="published">
              {published ? 'Maqola chop etiladi' : 'Qoralama sifatida saqlash'}
            </Label>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/posts')}
            >
              Bekor qilish
            </Button>
            <Button
              type="submit"
              disabled={loading || !title || !content || !categoryId}
            >
              {loading ? 'Saqlanmoqda...' : 'Maqolani saqlash'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
