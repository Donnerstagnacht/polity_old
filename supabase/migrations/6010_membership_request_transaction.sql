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
