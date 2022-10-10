

--***********************************
--****  1. Request Membership  ******
--***********************************

-- 1.1 Insert Group Membership Request


-- 1.2 Cancel GroupMembership Request



-- 1.2.1. cancel membership request by request


--*****************************
--*****  2.  Join Grpup  ******
--*****************************





--2.3 increment groups counter => lookup file "create Groups.sql"



-- 3.4 Confirm Membership transaction
DROP function if exists confirm_membership_transaction(
  user_id_requests uuid,
  group_id_requested uuid,
  requested_id uuid,
  handler_in uuid,
  title_in text,
  message_in text,
  title__for_admins_in text,
  message_for_admins_in text,
  type_in text,
  for_inquirer_in boolean,
  for_admins_in boolean
);
create or replace function confirm_membership_transaction(
  user_id_requests uuid,
  group_id_requested uuid,
  requested_id uuid,
  handler_in uuid,
  title_in text,
  message_in text,
  title__for_admins_in text,
  message_for_admins_in text,
  type_in text,
  for_inquirer_in boolean,
  for_admins_in boolean
)
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
  PERFORM insert_notification_from_groups(
    user_id_requests,
    group_id_requested,
    handler_in,
    title_in,
    message_in,
    type_in,
    for_inquirer_in
  );
  PERFORM insert_notification_from_groups(
    user_id_requests,
    group_id_requested,
    handler_in,
    message_for_admins_in,
    title__for_admins_in,
    type_in,
    for_admins_in
  );
  PERFORM increment_unread_message_counter_of_admins(group_id_requested);
  PERFORM increment_unread_message_counter(user_id_requests);
END;
$$;

--***************************
--*****  3. Leave Grpup  ****
--***************************





--3.4 Remove Membership transaction
CREATE OR REPLACE FUNCTION public.remove_membership_transaction(
	user_id_requests uuid,
	group_id_requested uuid,
  handler_in uuid,
  title_in text,
  message_in text,
  title__for_admins_in text,
  message_for_admins_in text,
  type_in text,
  for_inquirer_in boolean,
  for_admins_in boolean
)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  PERFORM delete_member(user_id_requests, group_id_requested);
  PERFORM decrement_groups_counter(user_id_requests);
  PERFORM decrement_group_member_counter(group_id_requested);
  PERFORM insert_notification_from_groups(
    user_id_requests,
    group_id_requested,
    handler_in,
    title_in,
    message_in,
    type_in,
    for_inquirer_in
  );
  PERFORM insert_notification_from_groups(
    user_id_requests,
    group_id_requested,
    handler_in,
    title__for_admins_in,
    message_for_admins_in,
    type_in,
    for_admins_in
  );
  PERFORM increment_unread_message_counter_of_admins(group_id_requested);
  PERFORM increment_unread_message_counter(user_id_requests);
END;
$BODY$;

--3.4 Remove Membership transaction by id
DROP function if exists remove_membership_transaction_by_membership_id(
  membership_id uuid,
  user_id_requests uuid,
  group_id_requested uuid,
  handler_in uuid,
  title_in text,
  message_in text,
  title__for_admins_in text,
  message_for_admins_in text,
  type_in text,
  for_inquirer_in boolean,
  for_admins_in boolean
);
CREATE OR REPLACE FUNCTION remove_membership_transaction_by_membership_id(
  membership_id uuid,
  user_id_requests uuid,
  group_id_requested uuid,
  handler_in uuid,
  title_in text,
  message_in text,
  title__for_admins_in text,
  message_for_admins_in text,
  type_in text,
  for_inquirer_in boolean,
  for_admins_in boolean
)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  PERFORM delete_member_by_id(membership_id);
  PERFORM decrement_groups_counter(user_id_requests);
  PERFORM decrement_group_member_counter(group_id_requested);
  PERFORM insert_notification_from_groups(
    user_id_requests,
    group_id_requested,
    handler_in,
    title_in,
    message_in,
    type_in,
    for_inquirer_in
  );
  PERFORM insert_notification_from_groups(
    user_id_requests,
    group_id_requested,
    handler_in,
    title__for_admins_in,
    message_for_admins_in,
    type_in,
    for_admins_in
  );
  PERFORM increment_unread_message_counter_of_admins(group_id_requested);
  PERFORM increment_unread_message_counter(user_id_requests);
END;
$BODY$;


--4. Request Membership transaction
DROP function if exists request_membership_transaction(
  user_id_requests uuid,
  group_id_requested uuid,
  handler_in uuid,
  title_in text,
  message_in text,
  title__for_admins_in text,
  message_for_admins_in text,
  type_in text,
  for_inquirer_in boolean,
  for_admins_in boolean
);
CREATE OR REPLACE FUNCTION request_membership_transaction(
  user_id_requests uuid,
  group_id_requested uuid,
  handler_in uuid,
  title_in text,
  message_in text,
  title__for_admins_in text,
  message_for_admins_in text,
  type_in text,
  for_inquirer_in boolean,
  for_admins_in boolean
)
RETURNS void
LANGUAGE 'plpgsql'
COST 100
VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  PERFORM insertgroupmembershiprequest(user_id_requests, group_id_requested);
  PERFORM insert_notification_from_groups(
    user_id_requests,
    group_id_requested,
    handler_in,
    title_in,
    message_in,
    type_in,
    for_inquirer_in
  );
  PERFORM insert_notification_from_groups(
    user_id_requests,
    group_id_requested,
    handler_in,
    title__for_admins_in,
    message_for_admins_in,
    type_in,
    for_admins_in
  );
  PERFORM increment_unread_message_counter_of_admins(group_id_requested);
END;
$BODY$;

--3.4 Cancel Membership request transaction
DROP function if exists cancel_membership_request_transaction(
  user_id_requests_in uuid,
  group_id_requested_in uuid,
  handler_in uuid,
  title_in text,
  message_in text,
  title__for_admins_in text,
  message_for_admins_in text,
  type_in text,
  for_inquirer_in boolean,
  for_admins_in boolean
);
CREATE OR REPLACE FUNCTION public.cancel_membership_request_transaction(
	user_id_requests_in uuid,
	group_id_requested_in uuid,
  handler_in uuid,
  title_in text,
  message_in text,
  title__for_admins_in text,
  message_for_admins_in text,
  type_in text,
  for_inquirer_in boolean,
  for_admins_in boolean
)
RETURNS void
LANGUAGE 'plpgsql'
COST 100
VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  PERFORM cancel_group_membership_request(user_id_requests_in, group_id_requested_in);
  PERFORM insert_notification_from_groups(
    user_id_requests_in,
    group_id_requested_in,
    handler_in,
    title_in,
    message_in,
    type_in,
    for_inquirer_in
  );
  PERFORM insert_notification_from_groups(
    user_id_requests_in,
    group_id_requested_in,
    handler_in,
    title__for_admins_in,
    message_for_admins_in,
    type_in,
    for_admins_in
  );
  PERFORM increment_unread_message_counter_of_admins(group_id_requested_in);
  PERFORM increment_unread_message_counter(user_id_requests_in);
END;
$BODY$;

--3.4 Cancel Membership request transaction_by_id
DROP function if exists cancel_membership_request_transaction_by_id(
  user_id_requests_in uuid,
  group_id_requested_in uuid,
  request_id_in uuid,
  handler_in uuid,
  title_in text,
  message_in text,
  title__for_admins_in text,
  message_for_admins_in text,
  type_in text,
  for_inquirer_in boolean,
  for_admins_in boolean
);
CREATE OR REPLACE FUNCTION public.cancel_membership_request_transaction_by_id(
	user_id_requests_in uuid,
	group_id_requested_in uuid,
  request_id_in uuid,
  handler_in uuid,
  title_in text,
  message_in text,
  title__for_admins_in text,
  message_for_admins_in text,
  type_in text,
  for_inquirer_in boolean,
  for_admins_in boolean
)
RETURNS void
LANGUAGE 'plpgsql'
COST 100
VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  PERFORM cancel_group_membership_request_by_request(request_id_in);
  PERFORM insert_notification_from_groups(
    user_id_requests_in,
    group_id_requested_in,
    handler_in,
    title_in,
    message_in,
    type_in,
    for_inquirer_in
  );
  PERFORM insert_notification_from_groups(
    user_id_requests_in,
    group_id_requested_in,
    handler_in,
    title__for_admins_in,
    message_for_admins_in,
    type_in,
    for_admins_in
  );
  PERFORM increment_unread_message_counter_of_admins(group_id_requested_in);
  PERFORM increment_unread_message_counter(user_id_requests_in);
END;
$BODY$;
