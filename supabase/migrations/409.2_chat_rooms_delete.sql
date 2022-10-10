DROP function if exists delete_room(followerId uuid, followingId uuid);
DROP function if exists delete_room(room_id uuid);
create or replace function delete_room(room_id uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  DELETE FROM "rooms"
  WHERE
  "id" = room_id;
END;
$$;
