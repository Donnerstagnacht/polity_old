-- 1. Select chat partner as user
DROP function if exists select_chat_partner(message_sender uuid, room_id_in uuid);
create or replace function select_chat_partner(message_sender uuid, room_id_in uuid)
returns uuid
language plpgsql
security definer
as
$$
declare
message_receiver uuid;
BEGIN
  Select
    user_id
  from
    rooms_participants
  where
    room_id = room_id_in and not user_id = message_sender
  into
  message_receiver;
  return message_receiver;
END;
$$;

-- 2. Select Chat Partner as Group
DROP function if exists select_group_as_chat_partner(room_id_in uuid);
create or replace function select_group_as_chat_partner(room_id_in uuid)
returns uuid
language plpgsql
security definer
as
$$
declare
group_id_out uuid;
BEGIN
  Select
    group_id
  from
    rooms_participants
  where
    room_id = room_id_in
  into
  group_id_out;
  return group_id_out;
END;
$$;
