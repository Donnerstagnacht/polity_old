DROP function if exists update_room_after_message(room_id_in uuid, content_in text);
create or replace function update_room_after_message(room_id_in uuid, content_in text)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update rooms
  set
  "last_message" = content_in,
  "last_message_time" = now()
  where id = room_id_in;
END;
$$;
