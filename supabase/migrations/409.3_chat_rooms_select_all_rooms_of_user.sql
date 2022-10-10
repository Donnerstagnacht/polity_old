DROP function if exists select_all_rooms_of_user(user_id_in uuid);
create or replace function select_all_rooms_of_user(user_id_in uuid)
returns table (
    id uuid,
    participant_id uuid,
    name text,
    avatar_url text,
    last_message text,
    last_message_time timestamp with time zone,
    number_of_unread_messages int4,
    is_group boolean
)
language plpgsql
security definer
as
$$
BEGIN
  return query
  Select
    r1.room_id as id,
    p.id,
    p.name,
    p.avatar_url,
    r.last_message,
    r.last_message_time,
    rp.number_of_unread_messages,
    false
  from
  (
  select * from rooms_participants where user_id = user_id_in
  ) r2
  join rooms_participants r1
  on r2.room_id = r1.room_id and not r1.user_id = user_id_in
  join profiles p
  on r1.user_id = p.id
  join rooms r
  on (r1.room_id = r.id)
  join rooms_participants rp
  on rp.room_id = r.id and not rp.user_id = user_id_in
  union
  SELECT
    r.id,
    gm.group_id,
    g.name,
    g.avatar_url,
    r.last_message,
    r.last_message_time,
    gm.number_of_unread_messages,
    true
  from
    group_members gm
  join groups g
  on g.id = gm.group_id
  join rooms_participants rp
  on rp.group_id = gm.group_id
  join rooms r
  on rp.room_id = r.id
  where
  gm.user_id = user_id_in
  order by last_message_time desc
  ;
END;
$$;
