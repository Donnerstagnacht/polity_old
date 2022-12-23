-- 1. Cancel by requests and requested id
CREATE OR REPLACE FUNCTION transactions.cancel_group_membership_request(
	user_id_requests uuid,
	group_id_requested uuid)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  DELETE FROM "membership_requests"
  WHERE
  "user_requests" = user_id_requests
  AND
  "group_requested" = group_id_requested;
END;
$BODY$;
ALTER FUNCTION transactions.cancel_group_membership_request(uuid, uuid)
    OWNER TO postgres;


-- 2. Cancel by request_id
DROP function if exists transactions.cancel_group_membership_request_by_request(request_id uuid);
create or replace function transactions.cancel_group_membership_request_by_request(request_id uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  DELETE FROM "membership_requests"
  WHERE
  "id" = request_id;
END;
$$;
