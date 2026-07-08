create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nickname text not null,
  nickname_key text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "read public profiles"
  on public.profiles for select
  using (true);

create policy "insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  profile_nickname text;
  profile_nickname_key text;
begin
  profile_nickname := coalesce(new.raw_user_meta_data ->> 'nickname', split_part(new.email, '@', 1), 'Игрок');
  profile_nickname_key := coalesce(new.raw_user_meta_data ->> 'nickname_key', lower(profile_nickname));

  insert into public.profiles (id, nickname, nickname_key)
  values (new.id, profile_nickname, profile_nickname_key)
  on conflict (id) do update
    set nickname = excluded.nickname,
        nickname_key = excluded.nickname_key,
        updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;

create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute function public.handle_new_user_profile();
