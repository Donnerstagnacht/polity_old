CREATE OR REPLACE FUNCTION public.add_member(
	user_id uuid,
	group_id uuid,
	is_admin boolean,
	is_board_member boolean,
	is_president boolean)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  INSERT INTO "group_members" (user_id, group_id, is_admin, is_board_member, is_president)
  VALUES (user_id, group_id, is_admin, is_board_member, is_president);
END;
$BODY$;

ALTER FUNCTION public.add_member(uuid, uuid, boolean, boolean, boolean)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.add_member(uuid, uuid, boolean, boolean, boolean) TO PUBLIC;
GRANT EXECUTE ON FUNCTION public.add_member(uuid, uuid, boolean, boolean, boolean) TO anon;
GRANT EXECUTE ON FUNCTION public.add_member(uuid, uuid, boolean, boolean, boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.add_member(uuid, uuid, boolean, boolean, boolean) TO postgres;
GRANT EXECUTE ON FUNCTION public.add_member(uuid, uuid, boolean, boolean, boolean) TO service_role;
