-- 1. delete by followerId and followingId
DROP function if exists transactions.deleteFollowingFollowerRelationship(followerId uuid, followingId uuid);
create or replace function transactions.deleteFollowingFollowerRelationship(followerId uuid, followingId uuid)
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
