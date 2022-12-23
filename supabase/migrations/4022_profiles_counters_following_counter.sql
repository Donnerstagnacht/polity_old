-- 1. Increment Following counter
DROP function if exists transactions.incrementfollowing_counter(userId uuid);
create or replace function transactions.incrementfollowing_counter(userId uuid)
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
DROP function if exists transactions.decrementfollowing_counter(userId uuid);
create or replace function transactions.decrementfollowing_counter(userId uuid)
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
