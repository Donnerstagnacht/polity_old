--1. Increment Follower of group
DROP function if exists transactions.incrementGroupfollower_counter(groupId uuid);
create or replace function transactions.incrementGroupfollower_counter(groupId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update groups_counters
  set "follower_counter" = "follower_counter" + 1
  where id = groupId;
END;
$$;

--2. Decrement follower of group
DROP function if exists transactions.decrementGroupfollower_counter(groupId uuid);
create or replace function transactions.decrementGroupfollower_counter(groupId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update groups_counters
  set "follower_counter" = "follower_counter" - 1
  where id = groupId;
END;
$$;