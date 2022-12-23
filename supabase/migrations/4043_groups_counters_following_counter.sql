--1. Increment Following of group
DROP function if exists transactions.incrementGroupfollowing_counter(userId uuid);
create or replace function transactions.incrementGroupfollowing_counter(userId uuid)
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

--2. Decrement following of group
DROP function if exists transactions.decrementGroupfollowing_counter(userId uuid);
create or replace function transactions.decrementGroupfollowing_counter(userId uuid)
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