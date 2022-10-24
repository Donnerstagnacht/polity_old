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
