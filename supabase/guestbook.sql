-- Wedding Credits: guestbook 테이블 (Supabase 무료 플랜)
-- Supabase Dashboard > SQL Editor 에서 실행

create table if not exists public.guestbook (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 50),
  message text check (message is null or char_length(message) <= 500),
  created_at timestamptz not null default now()
);

-- 인덱스: 최신순 조회
create index if not exists guestbook_created_at_idx
  on public.guestbook (created_at desc);

-- RLS 활성화
alter table public.guestbook enable row level security;

-- 누구나 읽기 (anon key)
create policy "guestbook_select_public"
  on public.guestbook
  for select
  to anon, authenticated
  using (true);

-- 누구나 작성 (anon key) — 이름 필수, 메시지 선택
create policy "guestbook_insert_public"
  on public.guestbook
  for insert
  to anon, authenticated
  with check (
    char_length(trim(name)) between 1 and 50
    and (message is null or char_length(message) <= 500)
  );

-- 수정/삭제는 비활성 (공개 정책 없음)
