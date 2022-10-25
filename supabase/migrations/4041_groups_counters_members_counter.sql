-- 1. Increment Group Member Counter
CREATE OR REPLACE FUNCTION public.increment_group_member_counter(
	group_id uuid)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  update groups_counters
  set "member_counter" = "member_counter" + 1
  where id = group_id;
END
$BODY$;
ALTER FUNCTION public.increment_group_member_counter(uuid)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.increment_group_member_counter(uuid) TO PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_group_member_counter(uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.increment_group_member_counter(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_group_member_counter(uuid) TO postgres;
GRANT EXECUTE ON FUNCTION public.increment_group_member_counter(uuid) TO service_role;


-- 2. Decrement Group Member Counter
CREATE OR REPLACE FUNCTION public.decrement_group_member_counter(
	group_id uuid)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  update groups_counters
  set "member_counter" = "member_counter" - 1
  where id = group_id;
END
$BODY$;
ALTER FUNCTION public.decrement_group_member_counter(uuid)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.decrement_group_member_counter(uuid) TO PUBLIC;
GRANT EXECUTE ON FUNCTION public.decrement_group_member_counter(uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.decrement_group_member_counter(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.decrement_group_member_counter(uuid) TO postgres;
GRANT EXECUTE ON FUNCTION public.decrement_group_member_counter(uuid) TO service_role;
