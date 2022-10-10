DROP function if exists delete_participant(room_id uuid, participant_id uuid);
create or replace function delete_participant(room_id uuid, participant_id uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  DELETE FROM "rooms_participants"
  WHERE
  "room_id" = room_id
  and
  ("group_id" = participant_id or "user_id"="participant_id");
END;
$$;