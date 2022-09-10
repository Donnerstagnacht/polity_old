-- Create TABLE for Membership requests
CREATE TABLE IF NOT EXISTS public.membership_requests
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    user_requests uuid NOT NULL,
    group_requested uuid NOT NULL,
    CONSTRAINT membership_requests_pkey PRIMARY KEY (id),
    CONSTRAINT membership_requests_group_requested_fkey FOREIGN KEY (group_requested)
        REFERENCES public.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT membership_requests_user_requests_fkey FOREIGN KEY (user_requests)
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.membership_requests
    OWNER to postgres;
GRANT ALL ON TABLE public.membership_requests TO anon;
GRANT ALL ON TABLE public.membership_requests TO authenticated;
GRANT ALL ON TABLE public.membership_requests TO postgres;
GRANT ALL ON TABLE public.membership_requests TO service_role;


--***********************************
--****  1. Request Membership  ******
--***********************************

-- 1.1 Insert Grup Membership Request
CREATE OR REPLACE FUNCTION public.insertgroupmembershiprequest(
	user_id uuid,
	group_requested uuid)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  INSERT INTO "membership_requests" (user_id, group_requested)
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


-- 1.2 Cancel GroupMembership Request
CREATE OR REPLACE FUNCTION public.cancel_group_membership_request(
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
ALTER FUNCTION public.cancel_group_membership_request(uuid, uuid)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.cancel_group_membership_request(uuid, uuid) TO PUBLIC;
GRANT EXECUTE ON FUNCTION public.cancel_group_membership_request(uuid, uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.cancel_group_membership_request(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.cancel_group_membership_request(uuid, uuid) TO postgres;
GRANT EXECUTE ON FUNCTION public.cancel_group_membership_request(uuid, uuid) TO service_role;

-- 1.2.1. cancel membership request by request
DROP function if exists cancel_group_membership_request_by_request(request_id uuid);
create or replace function cancel_group_membership_request_by_request(request_id uuid)
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

--*****************************
--*****  2.  Join Grpup  ******
--*****************************

-- 2.1 Insert Group Member
CREATE OR REPLACE FUNCTION public.insert_group_membership_request(
	user_requests uuid,
	group_requested uuid)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  INSERT INTO "membership_requests" (user_requests, group_requested)
  VALUES (user_requests, group_requested);
END;
$BODY$;
ALTER FUNCTION public.insert_group_membership_request(uuid, uuid)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.insert_group_membership_request(uuid, uuid) TO PUBLIC;
GRANT EXECUTE ON FUNCTION public.insert_group_membership_request(uuid, uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.insert_group_membership_request(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.insert_group_membership_request(uuid, uuid) TO postgres;
GRANT EXECUTE ON FUNCTION public.insert_group_membership_request(uuid, uuid) TO service_role;


-- 2.2 Increment Group Member Counter
CREATE OR REPLACE FUNCTION public.increment_group_member_counter(
	group_id uuid)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  update groups
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


--2.3 increment groups counter => lookup file "create Groups.sql"



-- 3.4 Confirm Membership transaction
DROP function if exists confirm_membership_transaction(user_id_requests uuid, group_id_requested uuid, requested_id uuid);
create or replace function confirm_membership_transaction(user_id_requests uuid, group_id_requested uuid, requested_id uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  PERFORM add_member(user_id_requests, group_id_requested, false, false , false);
  PERFORM cancel_group_membership_request_by_request(requested_id);
  PERFORM increment_groups_counter(user_id_requests);
  PERFORM increment_group_member_counter(group_id_requested);
END;
$$;

--***************************
--*****  3. Leave Grpup  ****
--***************************

-- 3.1 Delete member
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

-- 3.1.1 Delete member by id
DROP function if exists delete_member_by_id(membership_id uuid);
CREATE OR REPLACE FUNCTION delete_member_by_id(membership_id uuid)
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

-- 3.2 Decrement Groups Counter
CREATE OR REPLACE FUNCTION public.decrement_groups_counter(
	user_id uuid)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  update profiles
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


-- 3.3 Decrement Group Member Counter
CREATE OR REPLACE FUNCTION public.decrement_group_member_counter(
	group_id uuid)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  update groups
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


--3.4 Remove Membership transaction
CREATE OR REPLACE FUNCTION public.remove_membership_transaction(
	user_id_requests uuid,
	group_id_requested uuid)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  PERFORM delete_member(user_id_requests, group_id_requested);
  PERFORM decrement_groups_counter(user_id_requests);
  PERFORM decrement_group_member_counter(group_id_requested);
END;
$BODY$;
ALTER FUNCTION public.remove_membership_transaction(uuid, uuid)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.remove_membership_transaction(uuid, uuid) TO PUBLIC;
GRANT EXECUTE ON FUNCTION public.remove_membership_transaction(uuid, uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.remove_membership_transaction(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.remove_membership_transaction(uuid, uuid) TO postgres;
GRANT EXECUTE ON FUNCTION public.remove_membership_transaction(uuid, uuid) TO service_role;

--3.4 Remove Membership transaction by id
DROP function if exists remove_membership_transaction_by_membership_id(membership_id uuid, user_id_requests uuid, group_id_requested uuid);
CREATE OR REPLACE FUNCTION remove_membership_transaction_by_membership_id(membership_id uuid, user_id_requests uuid, group_id_requested uuid)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  PERFORM delete_member_by_id(membership_id);
  PERFORM decrement_groups_counter(user_id_requests);
  PERFORM decrement_group_member_counter(group_id_requested);
END;
$BODY$;
