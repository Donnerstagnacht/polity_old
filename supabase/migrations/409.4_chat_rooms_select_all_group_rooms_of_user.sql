DROP function if exists select_all_group_rooms_of_user(user_id_in uuid);
create or replace function select_all_group_rooms_of_user(user_id_in uuid)
--returns all_rooms_of_user
returns table (
    room_id uuid,
    participant_id uuid,
    name text,
    avatar_url text,
    last_message text,
    last_message_time timestamp with time zone,
    number_of_unread_messages int4
)
language plpgsql
security definer
as
$$
BEGIN
  return query
  Select
    r.id,
    gm.group_id,
    g.name,
    g.avatar_url,
    r.last_message,
    r.last_message_time,
    rp.number_of_unread_messages
  from
    group_members gm
  join groups g
  on g.id = gm.group_id
  join rooms_participants rp
  on rp.group_id = gm.group_id
  join rooms r
  on rp.room_id = r.id
  where
  gm.user_id = user_id_in;
END;
$$;