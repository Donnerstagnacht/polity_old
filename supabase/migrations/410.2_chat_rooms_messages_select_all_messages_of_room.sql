DROP function if exists select_all_messages_of_room(room_id_in uuid);
create or replace function select_all_messages_of_room(room_id_in uuid)
returns table (
    message_id uuid,
    created_at_in timestamptz,
    sender_id uuid,
    content_in text
)
language plpgsql
security definer
as
$$
BEGIN
  return query
  Select
    id,
    created_at,
    user_id,
    content
  from
    rooms_messages
  where
    room_id = room_id_in
  order by
    --created_at asc
    created_at desc
  ;
END;
$$;