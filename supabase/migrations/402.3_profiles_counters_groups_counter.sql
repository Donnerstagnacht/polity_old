-- 1. Increment Groups Counter
CREATE OR REPLACE FUNCTION public.increment_groups_counter(
	userid uuid)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  update profiles_counters
  set "groups_counter" = "groups_counter" + 1
  where id = userId;
END
$BODY$;

ALTER FUNCTION public.increment_groups_counter(uuid)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.increment_groups_counter(uuid) TO PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_groups_counter(uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.increment_groups_counter(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_groups_counter(uuid) TO postgres;
GRANT EXECUTE ON FUNCTION public.increment_groups_counter(uuid) TO service_role;

-- 2 Decrement Groups Counter
CREATE OR REPLACE FUNCTION public.decrement_groups_counter(
	user_id uuid)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  update profiles_counters
  set "groups_counter" = "groups_counter" - 1
  where id = user_id;
END
$BODY$;
ALTER FUNCTION public.decrement_groups_counter(uuid)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.decrement_groups_counter(uuid) TO PUBLIC;
GRANT EXECUTE ON FUNCTION public.decrement_groups_counter(uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.decrement_groups_counter(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.decrement_groups_counter(uuid) TO postgres;
GRANT EXECUTE ON FUNCTION public.decrement_groups_counter(uuid) TO service_role;
