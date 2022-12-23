-- 1 Delete member
CREATE OR REPLACE FUNCTION public.delete_member(
	user_id_requests uuid,
	group_id_requested uuid)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  DELETE FROM "group_members"
  WHERE
  "user_id" = user_id_requests
  AND
  "group_id" = group_id_requested;
END;
$BODY$;
ALTER FUNCTION public.delete_member(uuid, uuid)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.delete_member(uuid, uuid) TO PUBLIC;
GRANT EXECUTE ON FUNCTION public.delete_member(uuid, uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.delete_member(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_member(uuid, uuid) TO postgres;
GRANT EXECUTE ON FUNCTION public.delete_member(uuid, uuid) TO service_role;

-- 2. Delete member by id
DROP function if exists transactions.delete_member_by_id(membership_id uuid);
CREATE OR REPLACE FUNCTION transactions.delete_member_by_id(membership_id uuid)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  DELETE FROM "group_members"
  WHERE
  "id" = membership_id;
END;
$BODY$;
