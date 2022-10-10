DROP function if exists insert_room();
create or replace function insert_room()
  returns uuid
  language plpgsql
  SECURITY DEFINER
AS
$$
declare
  new_room_id uuid;
BEGIN
  INSERT INTO "rooms" DEFAULT VALUES
  returning id into new_room_id;
  return new_room_id;
END;
$$;
