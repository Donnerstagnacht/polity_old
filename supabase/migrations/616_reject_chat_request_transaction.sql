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