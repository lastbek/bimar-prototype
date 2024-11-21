'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Category = {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  created_at: string;
  show_in_nav: boolean;
  order: number;
};

function SortableCategory({ category }: { category: Category }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: category.id });
  const { toast } = useToast();
  const supabase = createClientComponentClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', category.id);

    if (error) {
      toast({
        title: 'Xato',
        description: 'Kategoriyani o\'chirishda xatolik yuz berdi',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Muvaffaqiyatli',
        description: 'Kategoriya o\'chirildi',
      });
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div {...attributes} {...listeners} className="cursor-grab">
              <GripVertical className="w-4 h-4 text-muted-foreground" />
            </div>
            <h3 className="font-semibold">{category.name}</h3>
          </div>
          {category.description && (
            <p className="text-sm text-muted-foreground mt-1 ml-6">
              {category.description}
            </p>
          )}
          <div className="mt-2 flex items-center space-x-2 ml-6">
            <input
              type="checkbox"
              id={`show-in-nav-${category.id}`}
              checked={category.show_in_nav}
              onChange={async (e) => {
                const { error } = await supabase
                  .from('categories')
                  .update({ show_in_nav: e.target.checked })
                  .eq('id', category.id);
                
                if (error) {
                  toast({
                    title: 'Xato',
                    description: 'Kategoriyani yangilashda xatolik yuz berdi',
                    variant: 'destructive',
                  });
                } else {
                  toast({
                    title: 'Muvaffaqiyatli',
                    description: 'Kategoriya yangilandi',
                  });
                }
              }}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor={`show-in-nav-${category.id}`} className="text-sm text-muted-foreground">
              Menyuda ko'rsatish
            </Label>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
            {category.slug}
          </code>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kategoriyani o'chirish</AlertDialogTitle>
            <AlertDialogDescription>
              Haqiqatan ham bu kategoriyani o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>O'chirish</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default function CategoriesPage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const supabase = createClientComponentClient();
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Fetch categories
  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('order', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: 'Xato',
        description: 'Kategoriyalarni yuklashda xatolik yuz berdi',
        variant: 'destructive',
      });
    } else {
      console.log('Fetched categories:', data);
      setCategories(data || []);
    }
  };

  // Load categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

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
      const maxOrder = Math.max(...categories.map(c => c.order || 0), 0);

      const { data, error } = await supabase
        .from('categories')
        .insert([
          {
            name,
            description,
            slug,
            show_in_nav: false,
            order: maxOrder + 1,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      console.log('Created category:', data);
      toast({
        title: 'Muvaffaqiyatli',
        description: 'Kategoriya yaratildi',
      });

      setOpen(false);
      setName('');
      setDescription('');
      // Refresh the categories list
      fetchCategories();
    } catch (error: any) {
      console.error('Error details:', error);
      toast({
        title: 'Xato',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = categories.findIndex((cat) => cat.id === active.id);
      const newIndex = categories.findIndex((cat) => cat.id === over.id);
      
      const newCategories = arrayMove(categories, oldIndex, newIndex);
      setCategories(newCategories);

      // Update order in database
      const updates = newCategories.map((category, index) => ({
        id: category.id,
        order: index,
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('categories')
          .update({ order: update.order })
          .eq('id', update.id);

        if (error) {
          toast({
            title: 'Xato',
            description: 'Tartibni saqlashda xatolik yuz berdi',
            variant: 'destructive',
          });
          return;
        }
      }

      toast({
        title: 'Muvaffaqiyatli',
        description: 'Kategoriyalar tartibi saqlandi',
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kategoriyalar</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Yangi kategoriya
        </Button>
      </div>

      {/* Categories List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid gap-4">
          {categories.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              Hozircha kategoriyalar yo'q
            </p>
          ) : (
            <SortableContext
              items={categories.map(cat => cat.id)}
              strategy={verticalListSortingStrategy}
            >
              {categories.map((category) => (
                <SortableCategory key={category.id} category={category} />
              ))}
            </SortableContext>
          )}
        </div>
      </DndContext>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yangi kategoriya yaratish</DialogTitle>
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
                rows={3}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? 'Yaratilmoqda...' : 'Yaratish'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
