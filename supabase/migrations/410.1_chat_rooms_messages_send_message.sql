DROP function if exists insert_message(room_id_in uuid, user_id_in uuid, content_in text);
create or replace function insert_message(room_id_in uuid, user_id_in uuid, content_in text)
returns void
language plpgsql
security definer
as
$$
BEGIN
  INSERT INTO "rooms_messages" (room_id, user_id, content)
  VALUES (room_id_in, user_id_in, content_in);
END;
$$;