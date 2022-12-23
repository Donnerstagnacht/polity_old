-- send_message_transaction
DROP function if exists send_message_transaction(
  room_id_in uuid,
  message_sender uuid,
  message_receiver uuid,
  content_in text,
  is_group boolean,
  group_id_in uuid
);
create or replace function send_message_transaction(
  room_id_in uuid,
  message_sender uuid,
  message_receiver uuid,
  content_in text,
  is_group boolean default null,
  group_id_in uuid default null
)
returns void
language plpgsql
security definer
as
$$
declare
BEGIN
  PERFORM transactions.insert_message(room_id_in, message_sender, content_in);
  PERFORM transactions.update_room_after_message(room_id_in, content_in);

  if is_group = true then
    PERFORM transactions.update_groups_participants_after_message(group_id_in, message_sender);
  else
    PERFORM transactions.update_participants_after_message(room_id_in, message_receiver);
  END IF;
END;
$$;
