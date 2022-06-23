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
DROP function if exists insertGroupFollowerRelationship(follower uuid, following uuid);
create or replace function insertGroupFollowerRelationship(follower uuid, following uuid)
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
DROP function if exists incrementGroupFollowerCounter(groupId uuid);
create or replace function incrementGroupFollowerCounter(groupId uuid)
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
DROP function if exists incrementGroupFollowingCounter(userId uuid);
create or replace function incrementGroupFollowingCounter(userId uuid)
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
DROP function if exists followGroupTransaction(followerId uuid, followingId uuid);
create or replace function followGroupTransaction(followerId uuid, followingId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  PERFORM insertGroupFollowerRelationship(followerId, followingId);
  PERFORM incrementGroupFollowerCounter(followingId);
  PERFORM incrementGroupFollowingCounter(followerId);
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
  DELETE FROM "following-group-system"
  WHERE
  "follower" = followerId
  AND
  "following" = followingId;
END;
$$;


--2. decrement follower
DROP function if exists decrementGroupFollowerCounter(groupId uuid);
create or replace function decrementGroupFollowerCounter(groupId uuid)
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
DROP function if exists decrementGroupFollowingCounter(userId uuid);
create or replace function decrementGroupFollowingCounter(userId uuid)
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
DROP function if exists unfollowGroupTransaction(followerId uuid, followingId uuid);
create or replace function unfollowGroupTransaction(followerId uuid, followingId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  PERFORM deleteGroupFollowerRelationship(followerId, followingId);
  PERFORM decrementGroupFollowerCounter(followingId);
  PERFORM decrementGroupFollowingCounter(followerId);
END;
$$;
