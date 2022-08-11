-- 1. Request membership
DROP function if exists insert_group_membership_request(user_requests uuid, group_requested uuid);
create or replace function insert_group_membership_request(user_requests uuid, group_requested uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  INSERT INTO "membership_requests" (user_requests, group_requested)
  VALUES (user_requests, group_requested);
END;
$$;
-- 2. cancel membership request by request
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

-- 1a Cancel GroupMembership Request by group and
DROP function if exists cancel_group_membership_request(user_id_requests uuid, group_id_requested uuid);
CREATE OR REPLACE FUNCTION cancel_group_membership_request(user_id_requests uuid, group_id_requested uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS
$$
BEGIN
  DELETE FROM "membership_requests"
  WHERE
  "user_requests" = user_id_requests
  AND
  "group_requested" = group_id_requested;
END;
$$;


--3. Increment_member_counter
DROP function if exists increment_group_member_counter(group_id uuid);
create or replace function increment_group_member_counter(group_id uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update groups
  set "member_counter" = "member_counter" + 1
  where id = group_id;
END
$$;

-- 3. accept membership request Transaction
-- 3,1 Add new Member
-- 3.2 cancel membership request
-- 3.3 Increment groups counter on user
-- 3.4 increment member counter on group
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


-- Delete Membe Transaction


-- 1. Delete Member
DROP function if exists delete_member(user_id_requests uuid, group_id_requested uuid);
create or replace function delete_member(user_id_requests uuid, group_id_requested uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  DELETE FROM "group_members"
  WHERE
  "user_id" = user_id_requests
  AND
  "group_id" = group_id_requested;
END;
$$;

-- 1.a Delete Member by membership_ id
DROP function if exists delete_member_by_membership_id(membership_id uuid);
create or replace function delete_member_by_membership_id(membership_id uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  DELETE FROM "group_members"
  WHERE
  "id" = membership_id;
END;
$$;

-- 2. Decemremnt Member counter
DROP function if exists decrement_groups_counter(user_id uuid);
create or replace function decrement_groups_counter(user_id uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update profiles
  set "groups_counter" = "groups_counter" - 1
  where id = user_id;
END
$$;


-- 3. Decrement group Counter
DROP function if exists decrement_group_member_counter(group_id uuid);
create or replace function decrement_group_member_counter(group_id uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update groups
  set "member_counter" = "member_counter" - 1
  where id = group_id;
END
$$;

4. --Remove member transaction
DROP function if exists remove_membership_transaction(user_id_requests uuid, group_id_requested uuid);
create or replace function remove_membership_transaction(user_id_requests uuid, group_id_requested uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  PERFORM delete_member(user_id_requests, group_id_requested);
  PERFORM decrement_groups_counter(user_id_requests);
  PERFORM decrement_group_member_counter(group_id_requested);
END;
$$;

-- 4.a Remove member transaction by membership id
DROP function if exists remove_membership_transaction_by_membership_id(user_id_requests uuid, group_id_requested uuid, membership_id uuid);
create or replace function remove_membership_transaction_by_membership_id(user_id_requests uuid, group_id_requested uuid, membership_id uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  PERFORM delete_member_by_membership_id(membership_id);
  PERFORM decrement_groups_counter(user_id_requests);
  PERFORM decrement_group_member_counter(group_id_requested);
END;
$$;
