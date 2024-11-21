-- Enable RLS
alter table public.blogs enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.blog_tags enable row level security;

-- Create tables
create table if not exists public.categories (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text,
    slug text unique not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.tags (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text,
    slug text unique not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.blogs (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    content jsonb,
    description text,
    slug text unique not null,
    published boolean default false,
    category_id uuid references public.categories(id),
    author_id uuid references auth.users(id),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.blog_tags (
    id uuid default gen_random_uuid() primary key,
    blog_id uuid references public.blogs(id) on delete cascade,
    tag_id uuid references public.tags(id) on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(blog_id, tag_id)
);

-- Create indexes
create index if not exists blogs_category_id_idx on public.blogs(category_id);
create index if not exists blogs_author_id_idx on public.blogs(author_id);
create index if not exists blog_tags_blog_id_idx on public.blog_tags(blog_id);
create index if not exists blog_tags_tag_id_idx on public.blog_tags(tag_id);

-- RLS Policies
create policy "Enable read access for all users" on public.blogs
    for select using (true);

create policy "Enable insert for authenticated users only" on public.blogs
    for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on public.blogs
    for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on public.blogs
    for delete using (auth.role() = 'authenticated');

-- Same policies for categories
create policy "Enable read access for all users" on public.categories
    for select using (true);

create policy "Enable insert for authenticated users only" on public.categories
    for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on public.categories
    for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on public.categories
    for delete using (auth.role() = 'authenticated');

-- Same policies for tags
create policy "Enable read access for all users" on public.tags
    for select using (true);

create policy "Enable insert for authenticated users only" on public.tags
    for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on public.tags
    for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on public.tags
    for delete using (auth.role() = 'authenticated');

-- Same policies for blog_tags
create policy "Enable read access for all users" on public.blog_tags
    for select using (true);

create policy "Enable insert for authenticated users only" on public.blog_tags
    for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on public.blog_tags
    for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on public.blog_tags
    for delete using (auth.role() = 'authenticated');

-- Functions
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Triggers
create trigger handle_updated_at
    before update on public.blogs
    for each row
    execute function public.handle_updated_at();
