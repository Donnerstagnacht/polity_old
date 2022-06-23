-- **********************
-- ******New Table*******
-- **********************
CREATE TABLE IF NOT EXISTS public."following-group-system"
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    follower uuid NOT NULL,
    following uuid NOT NULL,
    CONSTRAINT "following-group-system_pkey" PRIMARY KEY (id),
    CONSTRAINT "following-group-system_follower_fkey" FOREIGN KEY (follower)
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "following-group-system_following_fkey" FOREIGN KEY (following)
        REFERENCES public.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."following-group-system"
    OWNER to postgres;

GRANT ALL ON TABLE public."following-group-system" TO anon;

GRANT ALL ON TABLE public."following-group-system" TO authenticated;

GRANT ALL ON TABLE public."following-group-system" TO postgres;

GRANT ALL ON TABLE public."following-group-system" TO service_role;

COMMENT ON TABLE public."following-group-system"
    IS 'Stores the following-follower relationship';



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
  INSERT INTO "following-group-system" (follower, following)
  VALUES (follower, following);
END;
$$;



--2. Increment Follower
DROP function if exists incrementFollowerCounter(groupId uuid);
create or replace function incrementFollowerCounter(groupId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update groups
  set "followerCounter" = "followerCounter" + 1
  where id = groupId;
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
  DELETE FROM "following-group-system"
  WHERE
  "follower" = followerId
  AND
  "following" = followingId;
END;
$$;


--2. decrement follower
DROP function if exists decrementFollowerCounter(groupId uuid);
create or replace function decrementFollowerCounter(groupId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update groups
  set "followerCounter" = "followerCounter" - 1
  where id = groupId;
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
