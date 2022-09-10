--****************************
--**** Insert notification ****
--****************************


--1.Insert notifications from profile
DROP function if exists insert_notification_from_profile(
  notifier_in uuid,
  notifying_in uuid,
  title_in text,
  content_in text,
  type_in text
);
create or replace function insert_notification_from_profile(
  notifier_in uuid,
  notifying_in uuid,
  title_in text,
  content_in text,
  type_in text
)
returns void
language plpgsql
security definer
as
$$
BEGIN
  INSERT INTO "notifications_of_user" (notifier, notifying, title, content, type)
  VALUES (notifier_in, notifying_in, title_in, content_in, type_in);
END;
$$;


--1.Insert notifications from group
DROP function if exists insert_notification_from_group(
  notifier_in uuid,
  notifying_in uuid,
  title_in text,
  content_in text,
  type_in text
);
create or replace function insert_notification_from_group(
  notifier_in uuid,
  notifying_in uuid,
  title_in text,
  content_in text,
  type_in text
)
returns void
language plpgsql
security definer
as
$$
BEGIN
  INSERT INTO "notifications_of_group" (notifier, notifying, title, content, type)
  VALUES (notifier_in, notifying_in, title_in, content_in, type_in);
END;
$$;
