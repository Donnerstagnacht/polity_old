-- 1. Increment unread messages
DROP function if exists update_participants_after_message(room_id_in uuid, user_id_in uuid);
create or replace function update_participants_after_message(room_id_in uuid, user_id_in uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update rooms_participants
  set
  "number_of_unread_messages" = "number_of_unread_messages" + 1
  where room_id = room_id_in and not user_id = user_id_in;
END;
$$;

-- 1. Reset unread messages
DROP function if exists reset_number_of_unread_messages(room_id_in uuid, user_id_of_reader uuid);
create or replace function reset_number_of_unread_messages(room_id_in uuid, user_id_of_reader uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update rooms_participants
  set
  "number_of_unread_messages" = 0
  where room_id = room_id_in and user_id = user_id_of_reader;
END;
$$;

/* DROP function if exists update_participants_after_message(room_id_in uuid, user_id_in uuid);
create or replace function update_participants_after_message(room_id_in uuid, user_id_in uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update rooms_participants
  set
  "number_of_unread_messages" = "number_of_unread_messages" + 1
  where room_id = room_id_in and not user_id = user_id_in;
END;
$$; */