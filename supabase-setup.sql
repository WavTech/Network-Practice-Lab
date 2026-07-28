-- Run this once in Supabase SQL Editor.
-- It creates one progress row per authenticated user and protects it with RLS.

create table if not exists public.quiz_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.quiz_progress enable row level security;

-- Recreate policies safely if this file is run again.
drop policy if exists "Users can read own quiz progress" on public.quiz_progress;
drop policy if exists "Users can insert own quiz progress" on public.quiz_progress;
drop policy if exists "Users can update own quiz progress" on public.quiz_progress;

create policy "Users can read own quiz progress"
on public.quiz_progress
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert own quiz progress"
on public.quiz_progress
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own quiz progress"
on public.quiz_progress
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
