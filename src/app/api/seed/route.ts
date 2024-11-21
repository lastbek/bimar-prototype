import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Add initial categories
    const categories = [
      {
        name: 'Cardiology',
        slug: 'cardiology',
        show_in_nav: true,
      },
      {
        name: 'Neurology',
        slug: 'neurology',
        show_in_nav: true,
      },
      {
        name: 'Pediatrics',
        slug: 'pediatrics',
        show_in_nav: true,
      },
      {
        name: 'Orthopedics',
        slug: 'orthopedics',
        show_in_nav: true,
      },
      {
        name: 'Mental Health',
        slug: 'mental-health',
        show_in_nav: true,
      },
    ];

    const { error } = await supabase.from('categories').upsert(
      categories.map((category) => ({
        ...category,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }))
    );

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: 'Categories seeded successfully' });
  } catch (error) {
    console.error('Error seeding categories:', error);
    return NextResponse.json({ error: 'Failed to seed categories' }, { status: 500 });
  }
}
