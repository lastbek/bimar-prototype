'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useToast } from '@/components/ui/use-toast';
import { Database } from '@/lib/database.types';

type Tag = Database['public']['Tables']['tags']['Row'];

export const dynamic = 'force-dynamic';

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();
  const supabase = createClientComponentClient<Database>();

  // Fetch tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data, error } = await supabase
          .from('tags')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        console.log('Fetched tags:', data);
        setTags(data || []);
      } catch (error: any) {
        console.error('Error fetching tags:', error);
        toast({
          title: 'Xato',
          description: 'Teglarni yuklashda xatolik yuz berdi',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [supabase, toast]);

  // Function to generate slug from name
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = generateSlug(name);

      const { data, error } = await supabase
        .from('tags')
        .insert([
          {
            name,
            description,
            slug,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      console.log('Created tag:', data);
      setTags((prevTags) => [data, ...prevTags]);

      toast({
        title: 'Muvaffaqiyatli',
        description: 'Teg yaratildi',
      });

      setOpen(false);
      setName('');
      setDescription('');
    } catch (error: any) {
      console.error('Error creating tag:', error);
      toast({
        title: 'Xato',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && tags.length === 0) {
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
        <h1 className="text-2xl font-bold">Teglar</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Yangi teg
        </Button>
      </div>

      {/* Tags list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tags.length === 0 ? (
          <p className="text-muted-foreground col-span-full text-center py-4">
            Hozircha teglar yo'q
          </p>
        ) : (
          tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-start justify-between p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
            >
              <div>
                <h3 className="font-semibold">{tag.name}</h3>
                {tag.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {tag.description}
                  </p>
                )}
                <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded mt-2 block">
                  {tag.slug}
                </code>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yangi teg yaratish</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nomi</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {name && (
                <p className="text-xs text-muted-foreground mt-1">
                  Slug: {generateSlug(name)}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="description">Tavsif</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Yaratilmoqda...' : 'Yaratish'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
