begin;

create table public.cms_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.cms_admins enable row level security;
revoke all on public.cms_admins from anon, authenticated;
grant select on public.cms_admins to authenticated;
create policy "Admins can read their membership" on public.cms_admins
  for select to authenticated using (user_id = (select auth.uid()));

create function public.cms_is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.cms_admins where user_id = (select auth.uid()));
$$;
revoke all on function public.cms_is_admin() from public;
grant execute on function public.cms_is_admin() to authenticated;

create table public.content (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('article', 'post', 'olympiad', 'event', 'resource')),
  title text not null check (char_length(trim(title)) between 3 and 200),
  slug text not null unique check (char_length(slug) between 3 and 180 and slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  summary text not null default '' check (char_length(summary) <= 700),
  body text not null default '' check (char_length(body) <= 100000),
  category text not null default '',
  author text not null default '',
  date_label text not null default '',
  location text not null default '',
  event_status text not null default 'upcoming' check (event_status in ('upcoming', 'registration-open', 'registration-closed', 'completed')),
  external_url text not null default '' check (external_url = '' or external_url ~ '^https?://'),
  cover_url text not null default '' check (cover_url = '' or cover_url ~ '^https?://'),
  cover_alt text not null default '',
  accent text not null default 'blue' check (accent in ('blue', 'coral', 'purple', 'magenta')),
  facts text[] not null default '{}',
  key_terms text[] not null default '{}',
  legacy boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz,
  constraint cover_needs_description check (cover_url = '' or char_length(trim(cover_alt)) > 0),
  constraint publication_needs_content check (legacy or status <> 'published' or char_length(trim(summary || body)) > 0),
  constraint event_needs_date check (status <> 'published' or kind not in ('event', 'olympiad') or char_length(trim(date_label)) > 0)
);

create index content_public_listing on public.content (kind, published_at desc) where status = 'published';
create index content_admin_listing on public.content (updated_at desc);
alter table public.content enable row level security;
revoke all on public.content from anon, authenticated;
grant select on public.content to anon;
grant select, insert, update on public.content to authenticated;

create policy "Visitors read published content" on public.content for select to anon, authenticated
  using (status = 'published');
create policy "Admins read all content" on public.content for select to authenticated
  using ((select public.cms_is_admin()));
create policy "Admins create content" on public.content for insert to authenticated
  with check ((select public.cms_is_admin()));
create policy "Admins update content" on public.content for update to authenticated
  using ((select public.cms_is_admin())) with check ((select public.cms_is_admin()));

create function public.content_timestamps() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at = clock_timestamp();
  if new.status = 'published' and new.published_at is null then
    new.published_at = clock_timestamp();
  end if;
  return new;
end;
$$;
create trigger content_timestamps before insert or update on public.content
  for each row execute function public.content_timestamps();

commit;
