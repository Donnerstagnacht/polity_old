DROP function if exists transactions.create_event(text, text, uuid, uuid, text);
CREATE OR REPLACE FUNCTION transactions.create_event(
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
  new_id uuid;
BEGIN
  INSERT INTO "events" (name, description, creator, host_group, rythm)
  VALUES (name, description, creator, host_group, rythm)
  returning id into new_id;
  return new_id;
END;
$BODY$;

ALTER FUNCTION transactions.create_event(text, text, uuid, uuid, text)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION transactions.create_event(text, text, uuid, uuid, text) TO PUBLIC;
GRANT EXECUTE ON FUNCTION transactions.create_event(text, text, uuid, uuid, text) TO anon;
GRANT EXECUTE ON FUNCTION transactions.create_event(text, text, uuid, uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION transactions.create_event(text, text, uuid, uuid, text) TO postgres;
GRANT EXECUTE ON FUNCTION transactions.create_event(text, text, uuid, uuid, text) TO service_role;
