CREATE OR REPLACE FUNCTION public.create_group(
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
  new_id uuid;
BEGIN
  INSERT INTO "groups" (name, description, creator, level)
  VALUES (name, description, creator, level)
  returning id into new_id;
  return new_id;
END;
$BODY$;

ALTER FUNCTION public.create_group(text, text, uuid, text)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.create_group(text, text, uuid, text) TO PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_group(text, text, uuid, text) TO anon;
GRANT EXECUTE ON FUNCTION public.create_group(text, text, uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_group(text, text, uuid, text) TO postgres;
GRANT EXECUTE ON FUNCTION public.create_group(text, text, uuid, text) TO service_role;
