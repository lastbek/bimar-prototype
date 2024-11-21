create table if not exists public.posts (
    id uuid primary key default gen_random_uuid(),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    slug text not null unique,
    content text,
    excerpt text,
    image_url text,
    published boolean default false,
    category_id uuid references public.categories(id),
    author_id uuid references auth.users(id)
);

-- Create indexes for search
create index if not exists posts_title_search_idx on public.posts using gin(to_tsvector('english', title));
create index if not exists posts_content_search_idx on public.posts using gin(to_tsvector('english', content));

-- Create RLS policies
alter table public.posts enable row level security;

create policy "Enable read access for all users" on public.posts
    for select
    to authenticated, anon
    using (published = true);

create policy "Enable all access for authenticated users" on public.posts
    for all
    to authenticated
    using (true)
    with check (true);
