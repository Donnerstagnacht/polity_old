--1. Cancel Membership request transaction
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
  PERFORM transactions.cancel_group_membership_request(user_id_requests_in, group_id_requested_in);
  PERFORM transactions.insert_notification_from_groups(
    user_id_requests_in,
    group_id_requested_in,
    handler_in,
    title_in,
    message_in,
    type_in,
    for_inquirer_in
  );
  PERFORM transactions.insert_notification_from_groups(
    user_id_requests_in,
    group_id_requested_in,
    handler_in,
    title__for_admins_in,
    message_for_admins_in,
    type_in,
    for_admins_in
  );
  PERFORM transactions.increment_unread_message_counter_of_admins(group_id_requested_in);
  PERFORM transactions.increment_unread_message_counter(user_id_requests_in);
END;
$BODY$;

--2. Cancel Membership request transaction_by_id
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
  PERFORM transactions.cancel_group_membership_request_by_request(request_id_in);
  PERFORM transactions.insert_notification_from_groups(
    user_id_requests_in,
    group_id_requested_in,
    handler_in,
    title_in,
    message_in,
    type_in,
    for_inquirer_in
  );
  PERFORM transactions.insert_notification_from_groups(
    user_id_requests_in,
    group_id_requested_in,
    handler_in,
    title__for_admins_in,
    message_for_admins_in,
    type_in,
    for_admins_in
  );
  PERFORM transactions.increment_unread_message_counter_of_admins(group_id_requested_in);
  PERFORM transactions.increment_unread_message_counter(user_id_requests_in);
END;
$BODY$;
