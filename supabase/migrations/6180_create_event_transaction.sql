DROP function if exists public.create_event_transaction(text, text, uuid, uuid, text);
-- 3. Alter onGroup Create Transaction
CREATE OR REPLACE FUNCTION public.create_event_transaction(
	name text,
	description text,
	creator uuid,
  host_group uuid,
  rythm text
	)
    RETURNS uuid
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
declare
new_event_id uuid;
--new_room_id uuid;
BEGIN
  -- Create event, update event participants and counters
  Select transactions.create_event(name, description, creator, host_group, rythm)
  into new_event_id;
  perform transactions.create_event_participant(creator, new_event_id, true, true , true, false);
  perform transactions.increment_group_event_counter(host_group);
/*
  -- Create a new chat room
  Select insert_room()
  into new_room_id;
  perform transactions.insert_participant(new_room_id, null, new_event_id);
*/
  return new_event_id; 
END;
$BODY$;

ALTER FUNCTION public.create_event_transaction(text, text, uuid, uuid, text)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.create_event_transaction(text, text, uuid, uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_event_transaction(text, text, uuid, uuid, text) TO postgres;
GRANT EXECUTE ON FUNCTION public.create_event_transaction(text, text, uuid, uuid, text) TO PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_event_transaction(text, text, uuid, uuid, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.create_event_transaction(text, text, uuid, uuid, text) TO anon;
