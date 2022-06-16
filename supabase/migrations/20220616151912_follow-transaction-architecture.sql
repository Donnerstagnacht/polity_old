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
  INSERT INTO "following-profile-system" (follower, following)
  VALUES (follower, following);
END;
$$;



--2. Increment Follower
DROP function if exists incrementFollowerCounter(userId uuid);
create or replace function incrementFollowerCounter(userId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update profiles
  set "followerCounter" = "followerCounter" + 1
  where id = userId;
END;
$$;


--3. Increment Following
DROP function if exists incrementFollowingCounter(userId uuid);
create or replace function incrementFollowingCounter(userId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update profiles
  set "followingCounter" = "followingCounter" + 1
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
  PERFORM incrementFollowerCounter(followingId);
  PERFORM incrementfollowingcounter(followerId);
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
  DELETE FROM "following-profile-system"
  WHERE
  "follower" = followerId
  AND
  "following" = followingId;
END;
$$;


--2. decrement follower
DROP function if exists decrementFollowerCounter(userId uuid);
create or replace function decrementFollowerCounter(userId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update profiles
  set "followerCounter" = "followerCounter" - 1
  where id = userId;
END;
$$;


--3. decrement following
DROP function if exists decrementFollowingCounter(userId uuid);
create or replace function decrementFollowingCounter(userId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update profiles
  set "followingCounter" = "followingCounter" - 1
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
  PERFORM decrementFollowerCounter(followingId);
  PERFORM decrementfollowingcounter(followerId);
END;
$$;
