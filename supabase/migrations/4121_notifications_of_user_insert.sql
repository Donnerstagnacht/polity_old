DROP function if exists transactions.insert_notification_from_profile(
  notifier_in uuid,
  notifying_in uuid,
  handler_in uuid,
  title_in text,
  message_in text,
  type_in text,
  for_admins_in boolean
);
create or replace function transactions.insert_notification_from_profile(
  notifier_in uuid,
  notifying_in uuid,
  handler_in uuid,
  title_in text,
  message_in text,
  type_in text,
  for_admins_in boolean
)
returns void
language plpgsql
security definer
as
$$
BEGIN
  INSERT INTO "notifications_of_user" (notifier, notifying, handler, title, message, type, for_admins)
  VALUES (notifier_in, notifying_in, handler_in, title_in, message_in, type_in, for_admins_in);
END;
$$;

DROP function if exists public.insert_notification_from_profile(
  notifier_in uuid,
  notifying_in uuid,
  handler_in uuid,
  title_in text,
  message_in text,
  type_in text,
  for_admins_in boolean
);
create or replace function public.insert_notification_from_profile(
  notifier_in uuid,
  notifying_in uuid,
  handler_in uuid,
  title_in text,
  message_in text,
  type_in text,
  for_admins_in boolean
)
returns void
language plpgsql
security definer
as
$$
BEGIN
  INSERT INTO "notifications_of_user" (notifier, notifying, handler, title, message, type, for_admins)
  VALUES (notifier_in, notifying_in, handler_in, title_in, message_in, type_in, for_admins_in);
END;
$$;