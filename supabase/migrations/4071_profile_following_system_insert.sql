DROP function if exists transactions.insertFollowingFollowerRelationship(follower uuid, following uuid);
create or replace function transactions.insertFollowingFollowerRelationship(follower uuid, following uuid)
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
