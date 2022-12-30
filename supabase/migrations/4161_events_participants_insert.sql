CREATE OR REPLACE FUNCTION transactions.create_event_participant(
	user_id uuid,
	event_id uuid,
	is_admin boolean,
	is_board_member boolean,
	is_delegate boolean,
  is_guest boolean)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  INSERT INTO "events_participants" (user_id, event_id, is_admin, is_board_member, is_delegate, is_guest)
  VALUES (user_id, event_id, is_admin, is_board_member, is_delegate, is_guest);
END;
$BODY$;

ALTER FUNCTION transactions.create_event_participant(uuid, uuid, boolean, boolean, boolean, boolean)
    OWNER TO postgres;