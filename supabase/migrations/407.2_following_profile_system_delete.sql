-- 1. delete by followerId and followingId
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

-- 2. delete follower by relationship Id
DROP function if exists delete_following_follower_relationship_by_id(relationship_id uuid);
create or replace function delete_following_follower_relationship_by_id(relationship_id uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  DELETE FROM "following_profile_system"
  WHERE
  "id" = relationship_id;
END;
$$;