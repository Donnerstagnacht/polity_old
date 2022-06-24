--****************************
--**** Follow Transaction ****
--****************************


--1.Insert
DROP function if exists insertFollowingFollowerRelationship(follower uuid, following uuid);
create or replace function insertFollowingFollowerRelationship(follower uuid, following uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  INSERT INTO "following_profile_system" (follower, following)
  VALUES (follower, following);
END;
$$;



--2. Increment Follower
DROP function if exists incrementfollower_counter(userId uuid);
create or replace function incrementfollower_counter(userId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update profiles
  set "follower_counter" = "follower_counter" + 1
  where id = userId;
END;
$$;


--3. Increment Following
DROP function if exists incrementfollowing_counter(userId uuid);
create or replace function incrementfollowing_counter(userId uuid)
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
DROP function if exists followTransaction(followerId uuid, followingId uuid);
create or replace function followTransaction(followerId uuid, followingId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  PERFORM insertFollowingFollowerRelationship(followerId, followingId);
  PERFORM incrementfollower_counter(followingId);
  PERFORM incrementfollowing_counter(followerId);
END;
$$;



--****************************
--****Unfollow Transaction ***
--****************************

-- 1. delete
DROP function if exists deleteFollowingFollowerRelationship(followerId uuid, followingId uuid);
create or replace function deleteFollowingFollowerRelationship(followerId uuid, followingId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  DELETE FROM "following_profile_system"
  WHERE
  "follower" = followerId
  AND
  "following" = followingId;
END;
$$;


--2. decrement follower
DROP function if exists decrementfollower_counter(userId uuid);
create or replace function decrementfollower_counter(userId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update profiles
  set "follower_counter" = "follower_counter" - 1
  where id = userId;
END;
$$;


--3. decrement following
DROP function if exists decrementfollowing_counter(userId uuid);
create or replace function decrementfollowing_counter(userId uuid)
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
DROP function if exists unfollowTransaction(followerId uuid, followingId uuid);
create or replace function unfollowTransaction(followerId uuid, followingId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  PERFORM deleteFollowingFollowerRelationship(followerId, followingId);
  PERFORM decrementfollower_counter(followingId);
  PERFORM decrementfollowing_counter(followerId);
END;
$$;
