-- ============================================================
-- Hunter Games – Supabase schema
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. Profiles (extends auth.users) ----------------------------
create table public.profiles (
  id          uuid        primary key references auth.users(id) on delete cascade,
  username    text        unique not null,
  current_game text,
  last_played  text,
  last_seen   timestamptz default now()
);

-- 2. Playtime per game per user --------------------------------
create table public.playtime (
  user_id  uuid  references public.profiles(id) on delete cascade,
  game_id  text  not null,
  seconds  int   not null default 0,
  plays    int   not null default 0,
  primary key (user_id, game_id)
);

-- 3. Friendships (both directions stored for easy querying) ----
create table public.friendships (
  user_id   uuid references public.profiles(id) on delete cascade,
  friend_id uuid references public.profiles(id) on delete cascade,
  primary key (user_id, friend_id)
);

-- ============================================================
-- Row-level security
-- ============================================================
alter table public.profiles    enable row level security;
alter table public.playtime    enable row level security;
alter table public.friendships enable row level security;

-- profiles: anyone can read (needed for friend lookup), only owner can update
create policy "profiles_select" on public.profiles for select using (true);
create policy "profiles_update" on public.profiles for update using (auth.uid() = id);

-- playtime: owner only
create policy "playtime_all" on public.playtime for all using (auth.uid() = user_id);

-- friendships: owner can read their own rows; only owner can insert/delete
create policy "friendships_select" on public.friendships for select using (auth.uid() = user_id);
create policy "friendships_insert" on public.friendships for insert with check (auth.uid() = user_id);
create policy "friendships_delete" on public.friendships for delete using (auth.uid() = user_id);

-- ============================================================
-- Trigger: auto-create profile on signup
-- Username is taken from the part before '@' in the email.
-- The app signs up with email = username@huntergames.local
-- ============================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- RPCs (called from the browser via supabase.rpc())
-- These run server-side so they can do atomic increments.
-- ============================================================

-- Record a play start: increment plays, set last_played + current_game
create or replace function public.record_play(p_game_id text)
returns void language plpgsql security definer set search_path = public as $$
begin
  insert into public.playtime (user_id, game_id, seconds, plays)
  values (auth.uid(), p_game_id, 0, 1)
  on conflict (user_id, game_id)
  do update set plays = playtime.plays + 1;

  update public.profiles
  set last_played   = p_game_id,
      current_game  = p_game_id,
      last_seen     = now()
  where id = auth.uid();
end;
$$;

-- Add playtime seconds atomically
create or replace function public.add_playtime(p_game_id text, p_seconds int)
returns void language plpgsql security definer set search_path = public as $$
begin
  insert into public.playtime (user_id, game_id, seconds, plays)
  values (auth.uid(), p_game_id, p_seconds, 0)
  on conflict (user_id, game_id)
  do update set seconds = playtime.seconds + excluded.seconds;
end;
$$;

-- Add a friend (inserts both directions, bypasses RLS safely)
create or replace function public.add_friend(p_username text)
returns void language plpgsql security definer set search_path = public as $$
declare
  v_friend_id uuid;
begin
  select id into v_friend_id from public.profiles where lower(username) = lower(p_username);
  if v_friend_id is null then
    raise exception 'No user with that username.';
  end if;
  if v_friend_id = auth.uid() then
    raise exception 'That''s you!';
  end if;
  insert into public.friendships(user_id, friend_id) values (auth.uid(), v_friend_id) on conflict do nothing;
  insert into public.friendships(user_id, friend_id) values (v_friend_id, auth.uid()) on conflict do nothing;
end;
$$;

-- Update heartbeat (online presence + current game)
create or replace function public.update_heartbeat(p_current_game text)
returns void language plpgsql security definer set search_path = public as $$
begin
  update public.profiles
  set current_game = p_current_game,
      last_seen    = now()
  where id = auth.uid();
end;
$$;
