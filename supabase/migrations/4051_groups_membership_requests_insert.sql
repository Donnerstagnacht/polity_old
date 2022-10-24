CREATE OR REPLACE FUNCTION public.insertgroupmembershiprequest(
	user_id uuid,
	group_requested uuid)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  INSERT INTO "membership_requests" (user_requests, group_requested)
  VALUES (user_id, group_requested);
END;
$BODY$;
ALTER FUNCTION public.insertgroupmembershiprequest(uuid, uuid)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.insertgroupmembershiprequest(uuid, uuid) TO PUBLIC;
GRANT EXECUTE ON FUNCTION public.insertgroupmembershiprequest(uuid, uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.insertgroupmembershiprequest(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.insertgroupmembershiprequest(uuid, uuid) TO postgres;
GRANT EXECUTE ON FUNCTION public.insertgroupmembershiprequest(uuid, uuid) TO service_role;
