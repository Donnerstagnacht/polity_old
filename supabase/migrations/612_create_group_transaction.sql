-- 3. Alter onGroup Create Transaction
CREATE OR REPLACE FUNCTION public.create_group_transaction(
	name text,
	description text,
	creator uuid,
	level text)
    RETURNS uuid
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
declare
new_group_id uuid;
new_room_id uuid;
BEGIN
  -- Create Group, update members table and counters
  Select create_group(name, description, creator, level)
  into new_group_id;
  perform add_member(creator, new_group_id, true, true , true);
  perform increment_groups_counter(creator);

  -- Create a new chat room
  Select insert_room()
  into new_room_id;
  perform insert_participant(new_room_id, null, new_group_id);

  return new_group_id;
END;
$BODY$;

ALTER FUNCTION public.create_group_transaction(text, text, uuid, text)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.create_group_transaction(text, text, uuid, text) TO PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_group_transaction(text, text, uuid, text) TO anon;
GRANT EXECUTE ON FUNCTION public.create_group_transaction(text, text, uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_group_transaction(text, text, uuid, text) TO postgres;
GRANT EXECUTE ON FUNCTION public.create_group_transaction(text, text, uuid, text) TO service_role;
