CREATE OR REPLACE FUNCTION transactions.insertgroupmembershiprequest(
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
ALTER FUNCTION transactions.insertgroupmembershiprequest(uuid, uuid)
    OWNER TO postgres;
