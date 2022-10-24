-- 1. Increment Following counter
DROP function if exists incrementfollowing_counter(userId uuid);
create or replace function incrementfollowing_counter(userId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update profiles_counters
  set "following_counter" = "following_counter" + 1
  where id = userId;
END
$$;

-- 2. Increment Following counter
DROP function if exists decrementfollowing_counter(userId uuid);
create or replace function decrementfollowing_counter(userId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update profiles_counters
  set "following_counter" = "following_counter" - 1
  where id = userId;
END;
$$;
