--1. Increment Following of group
DROP function if exists incrementGroupfollowing_counter(userId uuid);
create or replace function incrementGroupfollowing_counter(userId uuid)
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
DROP function if exists decrementGroupfollowing_counter(userId uuid);
create or replace function decrementGroupfollowing_counter(userId uuid)
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