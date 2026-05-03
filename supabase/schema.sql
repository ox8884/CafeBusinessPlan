-- Dessert Cafe Startup Planner Supabase schema
-- 적용 위치: Supabase SQL Editor 또는 supabase db push 대상 migration
-- 목표:
-- 1) seed 성격의 공개 데이터는 익명/인증 사용자 모두 읽기 가능
-- 2) Jay/Wave의 개인 진행 상태는 auth.uid()별로 분리
-- 3) 클라이언트 anon key만으로도 RLS가 데이터 경계를 보호

create extension if not exists "pgcrypto";

create table if not exists public.roadmap_stages (
  id text primary key,
  phase text not null,
  title text not null,
  description text not null,
  status text not null check (status in ('Not Started', 'In Progress', 'Completed', 'Need Help')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.startup_tasks (
  id text primary key,
  title text not null,
  description text not null,
  priority text not null check (priority in ('High', 'Medium', 'Low')),
  estimated_duration text not null,
  estimated_cost text not null,
  owner text not null,
  status text not null check (status in ('Not Started', 'In Progress', 'Completed', 'Need Help')),
  deadline date not null,
  links text[] not null default '{}',
  notes text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  purpose text not null,
  status text not null check (status in ('Not Started', 'In Progress', 'Completed', 'Need Help')),
  source text not null,
  official_link text,
  file_location text,
  notes text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.veteran_benefits (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  category text not null,
  description text not null,
  status text not null check (status in ('Not Started', 'In Progress', 'Completed', 'Need Help')),
  verification text not null,
  official_link text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  type text not null,
  url text not null,
  notes text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.official_research_items (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  agency text not null check (agency in ('Celina', 'Collin County', 'Texas', 'Federal', 'Veteran')),
  topic text not null,
  url text not null,
  verification_status text not null check (verification_status in ('Verified', 'Needs Review', 'Blocked')),
  last_checked date not null,
  notes text not null default '',
  last_http_status int,
  last_error text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  korean_name text not null,
  description text not null,
  price text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 사용자별 편집 상태: 현재 앱의 localStorage 구조와 1:1 매핑
create table if not exists public.user_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  task_statuses jsonb not null default '{}'::jsonb,
  document_statuses jsonb not null default '{}'::jsonb,
  document_details jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.roadmap_stages enable row level security;
alter table public.startup_tasks enable row level security;
alter table public.documents enable row level security;
alter table public.veteran_benefits enable row level security;
alter table public.resources enable row level security;
alter table public.official_research_items enable row level security;
alter table public.menu_items enable row level security;
alter table public.user_state enable row level security;

-- 공개 seed 데이터는 누구나 읽기 가능. 쓰기는 service_role 또는 dashboard에서만 관리 권장.
do $$
begin
  create policy "public read roadmap" on public.roadmap_stages for select using (true);
  create policy "public read tasks" on public.startup_tasks for select using (true);
  create policy "public read documents" on public.documents for select using (true);
  create policy "public read benefits" on public.veteran_benefits for select using (true);
  create policy "public read resources" on public.resources for select using (true);
  create policy "public read official research" on public.official_research_items for select using (true);
  create policy "public read menu" on public.menu_items for select using (true);
exception
  when duplicate_object then null;
end $$;

-- 개인 상태는 본인만 읽기/쓰기 가능.
do $$
begin
  create policy "users read own planner state" on public.user_state for select using (auth.uid() = user_id);
  create policy "users insert own planner state" on public.user_state for insert with check (auth.uid() = user_id);
  create policy "users update own planner state" on public.user_state for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
  create policy "users delete own planner state" on public.user_state for delete using (auth.uid() = user_id);
exception
  when duplicate_object then null;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  table_name text;
begin
  foreach table_name in array array['roadmap_stages','startup_tasks','documents','veteran_benefits','resources','official_research_items','menu_items','user_state'] loop
    execute format('drop trigger if exists set_%s_updated_at on public.%I', table_name, table_name);
    execute format('create trigger set_%s_updated_at before update on public.%I for each row execute function public.set_updated_at()', table_name, table_name);
  end loop;
end $$;
