--1. Increment Follower
DROP function if exists transactions.incrementfollower_counter(userId uuid);
create or replace function transactions.incrementfollower_counter(userId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update profiles_counters
  set "follower_counter" = "follower_counter" + 1
  where id = userId;
END;
$$;

--2. decrement follower
DROP function if exists transactions.decrementfollower_counter(userId uuid);
create or replace function transactions.decrementfollower_counter(userId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update profiles_counters
  set "follower_counter" = "follower_counter" - 1
  where id = userId;
END;
$$;
