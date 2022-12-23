DROP function if exists transactions.deleteGroupFollowerRelationship(followerId uuid, followingId uuid);
create or replace function transactions.deleteGroupFollowerRelationship(followerId uuid, followingId uuid)
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
