
--4. Transaction
DROP function if exists followGroupTransaction(followerId uuid, followingId uuid);
create or replace function followGroupTransaction(followerId uuid, followingId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  PERFORM transactions.insertGroupFollowerRelationship(followerId, followingId);
  PERFORM transactions.incrementGroupfollower_counter(followingId);
  PERFORM transactions.incrementGroupfollowing_counter(followerId);
END;
$$;
