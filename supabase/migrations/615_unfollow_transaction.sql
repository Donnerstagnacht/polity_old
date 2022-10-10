-- 1. UnFollow profile Transaction
DROP function if exists unfollowTransaction(followerId uuid, followingId uuid);
create or replace function unfollowTransaction(followerId uuid, followingId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  PERFORM deleteFollowingFollowerRelationship(followerId, followingId);
  PERFORM decrementfollower_counter(followingId);
  PERFORM decrementfollowing_counter(followerId);
  -- delete room if exists
  perform check_if_room_already_exists_and_delete(followerId, followingId);
END;
$$;

--2. Unfollow transaction by Id
DROP function if exists unfollow_transaction_by_id(followerId uuid, followingId uuid, relationship_id uuid);
create or replace function unfollow_transaction_by_id(followerId uuid, followingId uuid, relationship_id uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  PERFORM delete_following_follower_relationship_by_id(relationship_id);
  PERFORM decrementfollower_counter(followingId);
  PERFORM decrementfollowing_counter(followerId);
END;
$$;