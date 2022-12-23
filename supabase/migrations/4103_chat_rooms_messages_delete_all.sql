--delete all messages of room
DROP function if exists transactions.delete_all_messages_of_room(room_id_in uuid);
create or replace function transactions.delete_all_messages_of_room(room_id_in uuid)
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
