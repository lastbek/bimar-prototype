create table if not exists public.categories (
    id uuid primary key default gen_random_uuid(),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    slug text not null unique,
    show_in_nav boolean default false,
    image_url text
);

-- Create RLS policies
alter table public.categories enable row level security;

create policy "Enable read access for all users" on public.categories
    for select
    to authenticated, anon
    using (true);

create policy "Enable insert for authenticated users only" on public.categories
    for insert
    to authenticated
    with check (true);

create policy "Enable update for authenticated users only" on public.categories
    for update
    to authenticated
    using (true)
    with check (true);

create policy "Enable delete for authenticated users only" on public.categories
    for delete
    to authenticated
    using (true);
