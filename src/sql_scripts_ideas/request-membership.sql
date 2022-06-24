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
-- 2. cancel membership request
DROP function if exists cancel_group_membership_request(user_id_requests uuid, group_id_requested uuid);
create or replace function cancel_group_membership_request(user_id_requests uuid, group_id_requested uuid)
returns void
language plpgsql
security definer
as
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
  set "member_Counter" = "member_Counter" + 1
  where id = group_id;
END
$$;

-- 3. accept membership request Transaction
-- 3,1 Add new Member
-- 3.2 cancel membership request
-- 3.3 Increment groups counter on user
-- 3.4 increment member counter on group
DROP function if exists confirm_membership_transaction(user_id_requests uuid, group_id_requested uuid);
create or replace function confirm_membership_transaction(user_id_requests uuid, group_id_requested uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  PERFORM add_member(user_id_requests, group_id_requested, false, false , false);
  PERFORM cancel_group_membership_request(user_id_requests, group_id_requested);
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
  set "member_Counter" = "member_Counter" - 1
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
