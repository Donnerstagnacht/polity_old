-- **********************
-- ******New Table*******
-- **********************
CREATE TABLE IF NOT EXISTS public."following_group_system"
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    follower uuid NOT NULL,
    following uuid NOT NULL,
    CONSTRAINT "following_group_system_pkey" PRIMARY KEY (id),
    CONSTRAINT "following_group_system_follower_fkey" FOREIGN KEY (follower)
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "following_group_system_following_fkey" FOREIGN KEY (following)
        REFERENCES public.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."following_group_system"
    OWNER to postgres;

GRANT ALL ON TABLE public."following_group_system" TO anon;

GRANT ALL ON TABLE public."following_group_system" TO authenticated;

GRANT ALL ON TABLE public."following_group_system" TO postgres;

GRANT ALL ON TABLE public."following_group_system" TO service_role;

COMMENT ON TABLE public."following_group_system"
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
