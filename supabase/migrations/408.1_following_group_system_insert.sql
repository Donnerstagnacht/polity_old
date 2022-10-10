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