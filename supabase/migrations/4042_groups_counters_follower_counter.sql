--1. Increment Follower of group
DROP function if exists incrementGroupfollower_counter(groupId uuid);
create or replace function incrementGroupfollower_counter(groupId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update groups
  set "follower_counter" = "follower_counter" + 1
  where id = groupId;
END;
$$;

--2. Decrement follower of group
DROP function if exists decrementGroupfollower_counter(groupId uuid);
create or replace function decrementGroupfollower_counter(groupId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update groups
  set "follower_counter" = "follower_counter" - 1
  where id = groupId;
END;
$$;