DROP function if exists transactions.insert_participant(room_id uuid, user_id uuid, group_id uuid);
create or replace function transactions.insert_participant(room_id uuid, user_id uuid default null, group_id uuid default null, accepted boolean default true)
returns void
language plpgsql
security definer
as
$$
BEGIN
  INSERT INTO "rooms_participants" (room_id, user_id, group_id, accepted)
  VALUES (room_id, user_id, group_id, accepted);
END;
$$;
