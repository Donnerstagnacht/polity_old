-- 3. Follow profile Transaction
DROP function if exists followTransaction(
  followerId uuid,
  followingId uuid,
  title_in text,
  message_in text,
  type_in text,
  for_admins_in boolean
);
create or replace function followTransaction(
  followerId uuid,
  followingId uuid,
  title_in text,
  message_in text,
  type_in text,
  for_admins_in boolean
)
returns void
language plpgsql
security definer
as
$$
declare
BEGIN
  -- Create new following & update counter
  PERFORM transactions.insertFollowingFollowerRelationship(followerId, followingId);
  PERFORM transactions.incrementfollower_counter(followingId);
  PERFORM transactions.incrementfollowing_counter(followerId);
  PERFORM transactions.insert_notification_from_profile(
    followerId,
    followingId,
    followerId,
    title_in,
    message_in,
    type_in,
    for_admins_in
  );
  PERFORM transactions.increment_unread_message_counter(followingId);
  -- Check if room already exists
  -- create new room or accept room invitation
  PERFORM transactions.check_if_room_already_exists_and_follow(followerId, followingId);
END;
$$;
