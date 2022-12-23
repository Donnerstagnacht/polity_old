-- Check if romm exists and delete room (unfolow)
DROP function if exists transactions.check_if_room_already_exists_and_delete(followerId uuid, followingId uuid);
DROP TYPE if exists check_if_room_already_exists_return_type;
CREATE TYPE check_if_room_already_exists_return_type AS (
    room_id uuid,
    count integer
);
create or replace function transactions.check_if_room_already_exists_and_delete(followerId uuid, followingId uuid)
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
    PERFORM transactions.delete_all_messages_of_room(number_of_participants_in_room.room_id);

    perform transactions.delete_room_participants(number_of_participants_in_room.room_id, followerId, followingId);
    perform transactions.delete_room(number_of_participants_in_room.room_id);
    return true;
  else
    return false;
  END IF;
END;
$$;
