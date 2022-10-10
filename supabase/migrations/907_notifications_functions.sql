--****************************
--**** Insert notification ****
--****************************


--1.Insert notifications from profile



--1.Insert notifications from group

--2. Increment Follower




--2. Increment Follower
DROP function if exists decrement_unread_message_counter(userId uuid);
create or replace function decrement_unread_message_counter(userId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update profiles
  set "unread_notifications_counter" = "unread_notifications_counter" - 1
  where id = userId;
END;
$$;

DROP function if exists reset_unread_notifications_counter(user_id uuid);
create or replace function reset_unread_notifications_counter(user_id uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update profiles
  set "unread_notifications_counter" = 0
  where id = user_id;
END;
$$;


--2.Select all notifications from groups where user is admin
DROP function if exists select_notifications_from_groups_user_admin(
  user_id_in uuid
);
--news return type
DROP TYPE if exists news;
CREATE TYPE news AS (
  avatar_url text,
  name text,
  id uuid,
  notifier uuid,
  notifying uuid,
  handler uuid,
  title text,
  message text,
  type text,
  created_at timestamp with time zone,
  for_admins boolean,
  new boolean
);
create or replace function select_notifications_from_groups_user_admin(
  user_id_in uuid
)
returns table (
  news news
)
language plpgsql
security definer
as
$$
BEGIN
RETURN QUERY
    (
    SELECT
      g.avatar_url,
      g.name,
      n.id,
      n.notifier,
      n.notifying,
      n.handler,
      n.title,
      n.message,
      n.type,
      n.created_at,
      n.for_admins,
      n.new
    FROM group_members gm
      JOIN groups g ON (gm.group_id = g.id)
      JOIN notifications_of_groups n ON (gm.group_id = n.notifying)
    WHERE
      gm.user_id = user_id_in
    AND
      gm.is_admin = true
    AND
      n.for_admins = true
  ) UNION (
  -- select all notifications to their personal profile
    SELECT
      p.avatar_url,
      p.name,
      n.id,
      n.notifier,
      n.notifying,
      n.handler,
      n.title,
      n.message,
      n.type,
      n.created_at,
      n.for_admins,
      n.new
    FROM notifications_of_user n
    JOIN profiles p ON (n.notifying = p.id)
    WHERE
      n.notifying = user_id_in
    AND
      n.for_admins = false
  ) UNION (
  -- Select all notifications due to requests to groups
  -- request canceled
  -- request accepted
  -- removed from group
    SELECT
      g.avatar_url,
      g.name,
      n.id,
      n.notifier,
      n.notifying,
      n.handler,
      n.title,
      n.message,
      n.type,
      n.created_at,
      n.for_admins,
      n.new
    FROM notifications_of_groups n
      JOIN groups  g ON (n.notifying = g.id)
    WHERE
      n.notifier = user_id_in
    AND NOT
      n.title = 'Anfrage für Mitgliedschaft'
    AND
      n.for_admins = false
  )
;
END;
$$;



-- Notification Trigger to activate WebPush Edge functions
drop extension if exists http;
create extension http;

DROP TRIGGER IF EXISTS copy_notification on public.notifications_of_user;
DROP FUNCTION IF EXISTS copy_notification_to_group();

CREATE OR REPLACE FUNCTION copy_notification_to_group()
RETURNS TRIGGER AS $$
  declare
    data_as_text text;
  BEGIN
    data_as_text := row_to_json(NEW.*)::text;
    perform http((
      'POST',
      'https://ehsbtpkdyyzoipqdmmvv.functions.supabase.co/send-web-push',
      ARRAY[
        http_header('Authorization', 'Bearer ' || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoc2J0cGtkeXl6b2lwcWRtbXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQxNjk1MzIsImV4cCI6MTk2OTc0NTUzMn0.RCp3gX4QRQx4ylZLTj98aMvjYVfxsPeSIXksOrBm6RI')
        --http_header('function-secret',  func_secret)
      ],
      'application/json',
      data_as_text
      ));
    RETURN NEW;
  END;
$$ LANGUAGE PLPGSQL SECURITY DEFINER
SET search_path = extensions, public, pg_temp;

CREATE TRIGGER copy_notification
AFTER INSERT ON public.notifications_of_user
FOR EACH ROW EXECUTE PROCEDURE copy_notification_to_group();