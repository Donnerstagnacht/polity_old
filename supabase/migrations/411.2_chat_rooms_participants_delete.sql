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

DROP function if exists delete_room_participants(room_id_in uuid, follower_id_in uuid, following_id_in uuid);
create or replace function delete_room_participants(room_id_in uuid, follower_id_in uuid, following_id_in uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  DELETE FROM "rooms_participants"
  WHERE
  "room_id" = room_id_in
  AND
  "user_id" = follower_id_in
  or
  "user_id" = following_id_in;
END;
$$;