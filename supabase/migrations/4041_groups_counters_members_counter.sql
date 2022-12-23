-- 1. Increment Group Member Counter
CREATE OR REPLACE FUNCTION transactions.increment_group_member_counter(
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
ALTER FUNCTION transactions.increment_group_member_counter(uuid)
    OWNER TO postgres;


-- 2. Decrement Group Member Counter
CREATE OR REPLACE FUNCTION transactions.decrement_group_member_counter(
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
ALTER FUNCTION transactions.decrement_group_member_counter(uuid)
    OWNER TO postgres;
