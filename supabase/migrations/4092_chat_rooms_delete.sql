DROP function if exists transactions.delete_room(followerId uuid, followingId uuid);
DROP function if exists transactions.delete_room(room_id uuid);
create or replace function transactions.delete_room(room_id uuid)
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
