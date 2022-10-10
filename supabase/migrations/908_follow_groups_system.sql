
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
