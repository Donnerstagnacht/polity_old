-- 1. Accept chat invitation (update accepted)
DROP function if exists update_accepted(room_id_in uuid, user_id_in uuid);
create or replace function update_accepted(room_id_in uuid, user_id_in uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update rooms_participants
  set accepted = true
  where
  "room_id" = room_id_in
  and
  "user_id" = user_id_in;
END;
$$;


-- 2. Check if room exists and Follow
DROP function if exists check_if_room_already_exists_and_follow(followerId uuid, followingId uuid);
DROP TYPE if exists check_if_room_already_exists_return_type;
CREATE TYPE check_if_room_already_exists_return_type AS (
    room_id uuid,
    count integer
);
create or replace function check_if_room_already_exists_and_follow(followerId uuid, followingId uuid)
returns boolean
language plpgsql
security definer
as
$$
declare
number_of_participants_in_room check_if_room_already_exists_return_type;
new_room_id uuid;
BEGIN
  Select room_id, count(user_id) from rooms_participants
  where user_id = followerId or user_id = followingId
  group by rooms_participants.room_id
  having count(user_id) > 1
  into number_of_participants_in_room;

  if number_of_participants_in_room.count = 2 then
    -- room already exists and room invitation is set to accepted
    perform update_accepted(number_of_participants_in_room.room_id, followerId);
    return true;
  else
    -- create room and set room invitation
    Select insert_room()
    into new_room_id;
    perform insert_participant(new_room_id, followerId, null, true);
    perform insert_participant(new_room_id, followingId, null, false);
    return false;
  END IF;
END;
$$;


-- 3. Follow profile Transaction
DROP function if exists followTransaction(followerId uuid, followingId uuid);
create or replace function followTransaction(followerId uuid, followingId uuid)
returns void
language plpgsql
security definer
as
$$
declare
BEGIN
  -- Create new following & update counter
  PERFORM insertFollowingFollowerRelationship(followerId, followingId);
  PERFORM incrementfollower_counter(followingId);
  PERFORM incrementfollowing_counter(followerId);
  PERFORM insert_notification_from_profile(followerId, followingId, 'Neuer Follower', 'Dir folgt eine neue Person', 'account');

  -- Check if room already exists
  -- create new room or accept room invitation
  perform check_if_room_already_exists_and_follow(followerId, followingId);
END;
$$;


--delete room participants
DROP function if exists delete_room_participants(room_id_in uuid, follower_id_in uuid, following_id_in uuid);
create or replace function delete_room_participants(room_id_in uuid, follower_id_in uuid, following_id_in uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  DELETE FROM "rooms_participants"
  WHERE
  "room_id" = room_id_in
  AND
  "user_id" = follower_id_in
  or
  "user_id" = following_id_in;
END;
$$;


--delete room
DROP function if exists delete_room(room_id_in uuid);
create or replace function delete_room(room_id_in uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  DELETE FROM "rooms"
  WHERE
  "id" = room_id_in;
END;
$$;



-- Check if romm exists and delete room (unfolow)
DROP function if exists check_if_room_already_exists_and_delete(followerId uuid, followingId uuid);
DROP TYPE if exists check_if_room_already_exists_return_type;
CREATE TYPE check_if_room_already_exists_return_type AS (
    room_id uuid,
    count integer
);
create or replace function check_if_room_already_exists_and_delete(followerId uuid, followingId uuid)
returns boolean
language plpgsql
security definer
as
$$
declare
number_of_participants_in_room check_if_room_already_exists_return_type;
new_room_id uuid;
BEGIN
  Select room_id, count(user_id) from rooms_participants
  where user_id = followerId or user_id = followingId
  group by rooms_participants.room_id
  having count(user_id) > 1
  into number_of_participants_in_room;

  if number_of_participants_in_room.count = 2 then
    -- room already exists and room invitation is set to accepted
    PERFORM delete_all_messages_of_room(number_of_participants_in_room.room_id);

    perform delete_room_participants(number_of_participants_in_room.room_id, followerId, followingId);
    perform delete_room(number_of_participants_in_room.room_id);
    return true;
  else
    return false;
  END IF;
END;
$$;


-- 5. Alter onUnFollow profile Transaction
-- *** TODO ****************
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

--delete all messages of room
DROP function if exists delete_all_messages_of_room(room_id_in uuid);
create or replace function delete_all_messages_of_room(room_id_in uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  DELETE FROM "rooms_messages"
  WHERE
  "room_id" = room_id_in;
END;
$$;

--reject chatRequest
DROP function if exists reject_chat_request_transaction(room_id_in uuid, follower_id uuid, following_id uuid);
create or replace function reject_chat_request_transaction(room_id_in uuid, follower_id uuid, following_id uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  PERFORM delete_room_participants(room_id_in, follower_id, following_id);
  PERFORM delete_all_messages_of_room(room_id_in);
  PERFORM delete_room(room_id_in);
END;
$$;

--4.1 Unfollow transaction by Id
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
