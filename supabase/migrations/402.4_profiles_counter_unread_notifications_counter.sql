--1. Increment Message Counter of Admins
DROP function if exists increment_unread_message_counter(userId uuid);
create or replace function increment_unread_message_counter(userId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update profiles
  set "unread_notifications_counter" = "unread_notifications_counter" + 1
  where id = userId;
END;
$$;

--2. Increment Message Counter of Admins
DROP function if exists increment_unread_message_counter_of_admins(group_id_in uuid);
create or replace function increment_unread_message_counter_of_admins(group_id_in uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update profiles
  set "unread_notifications_counter" = "unread_notifications_counter" + 1
  where 
  id IN (
    SELECT user_id from group_members
    WHERE
      group_id = group_id_in
      AND
      is_admin = true
  );
END;
$$;

--3. Decrement decrement_unread_message_counter
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

--4. Reset Notifications Counter
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