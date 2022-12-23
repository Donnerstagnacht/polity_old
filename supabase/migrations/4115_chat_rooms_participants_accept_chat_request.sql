DROP function if exists accept_chat_request(room_id_in uuid, user_id_of_reader uuid);
create or replace function accept_chat_request(room_id_in uuid, user_id_of_reader uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update rooms_participants
  set
  "accepted" = true
  where 
    room_id = room_id_in 
    and 
    user_id = user_id_of_reader;
END;
$$;

DROP function if exists transactions.update_accepted(room_id_in uuid, user_id_in uuid);
create or replace function transactions.update_accepted(room_id_in uuid, user_id_in uuid)
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
