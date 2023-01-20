DROP function if exists public.read_events_by_group(uuid);
CREATE OR REPLACE FUNCTION public.read_events_by_group(
	group_id uuid
  )
    RETURNS uuid
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
declare
  new_id uuid;
BEGIN
  SELECT
    *
  FROM
    public.events
  WHERE 
    host_group = group_id;
END;
$BODY$;

ALTER FUNCTION public.read_events_by_group(uuid)
    OWNER TO postgres;
