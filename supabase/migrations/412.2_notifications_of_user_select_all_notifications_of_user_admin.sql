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


DROP function if exists set_non_existing_groups_set_notifications_to_false(user_id_in uuid);
create or replace function set_non_existing_groups_set_notifications_to_false(user_id_in uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update notifications_of_groups
  set "new" = false
  where
      notifier = user_id_in
    AND NOT
      title = 'Anfrage für Mitgliedschaft'
    AND
      for_admins = false;
END;
$$;