DROP function if exists unfollowGroupTransaction(followerId uuid, followingId uuid);
create or replace function unfollowGroupTransaction(followerId uuid, followingId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  PERFORM transactions.deleteGroupFollowerRelationship(followerId, followingId);
  PERFORM transactions.decrementGroupfollower_counter(followingId);
  PERFORM transactions.decrementGroupfollowing_counter(followerId);
END;
$$;
