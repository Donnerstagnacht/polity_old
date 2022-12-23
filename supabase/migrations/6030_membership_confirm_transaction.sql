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
  PERFORM transactions.add_member(user_id_requests, group_id_requested, false, false , false);
  PERFORM transactions.cancel_group_membership_request_by_request(requested_id);
  PERFORM transactions.increment_groups_counter(user_id_requests);
  PERFORM transactions.increment_group_member_counter(group_id_requested);
  PERFORM transactions.insert_notification_from_groups(
    user_id_requests,
    group_id_requested,
    handler_in,
    title_in,
    message_in,
    type_in,
    for_inquirer_in
  );
  PERFORM transactions.insert_notification_from_groups(
    user_id_requests,
    group_id_requested,
    handler_in,
    message_for_admins_in,
    title__for_admins_in,
    type_in,
    for_admins_in
  );
  PERFORM transactions.increment_unread_message_counter_of_admins(group_id_requested);
  PERFORM transactions.increment_unread_message_counter(user_id_requests);
END;
$$;
