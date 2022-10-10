-- **********************
-- ******New Table*******
-- **********************

--****************************
--**** Follow Transaction ****
--****************************

--1.Insert
DROP function if exists insertGroupFollowerRelationship(follower uuid, following uuid);
create or replace function insertGroupFollowerRelationship(follower uuid, following uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  INSERT INTO "following_group_system" (follower, following)
  VALUES (follower, following);
END;
$$;



--2. Increment Follower
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


--3. Increment Following
DROP function if exists incrementGroupfollowing_counter(userId uuid);
create or replace function incrementGroupfollowing_counter(userId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update profiles
  set "following_counter" = "following_counter" + 1
  where id = userId;
END
$$;


--4. Transaction
DROP function if exists followGroupTransaction(followerId uuid, followingId uuid);
create or replace function followGroupTransaction(followerId uuid, followingId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  PERFORM insertGroupFollowerRelationship(followerId, followingId);
  PERFORM incrementGroupfollower_counter(followingId);
  PERFORM incrementGroupfollowing_counter(followerId);
END;
$$;



--****************************
--****Unfollow Transaction ***
--****************************

-- 1. delete
DROP function if exists deleteGroupFollowerRelationship(followerId uuid, followingId uuid);
create or replace function deleteGroupFollowerRelationship(followerId uuid, followingId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  DELETE FROM "following_group_system"
  WHERE
  "follower" = followerId
  AND
  "following" = followingId;
END;
$$;


--2. decrement follower
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


--3. decrement following
DROP function if exists decrementGroupfollowing_counter(userId uuid);
create or replace function decrementGroupfollowing_counter(userId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update profiles
  set "following_counter" = "following_counter" - 1
  where id = userId;
END;
$$;


--4. transaction
DROP function if exists unfollowGroupTransaction(followerId uuid, followingId uuid);
create or replace function unfollowGroupTransaction(followerId uuid, followingId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  PERFORM deleteGroupFollowerRelationship(followerId, followingId);
  PERFORM decrementGroupfollower_counter(followingId);
  PERFORM decrementGroupfollowing_counter(followerId);
END;
$$;
