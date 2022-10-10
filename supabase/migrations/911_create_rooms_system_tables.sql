-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

-- Create Rooms Table



-- Create Messages Table


--Create Participants table
/* CREATE TABLE IF NOT EXISTS public.rooms_participants
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    room_id uuid NOT NULL,
    participant_id uuid NOT NULL,
    is_group boolean NOT NULL DEFAULT false,
    CONSTRAINT rooms_participants_pkey PRIMARY KEY (id),
    CONSTRAINT rooms_participants_participant_id_fkey FOREIGN KEY (participant_id)
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT rooms_participants_room_id_fkey FOREIGN KEY (room_id)
        REFERENCES public.rooms (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default; */


-- 1. Create New Room
DROP function if exists insert_room();
create or replace function insert_room()
  returns uuid
  language plpgsql
  SECURITY DEFINER
AS
$$
declare
  new_room_id uuid;
BEGIN
  INSERT INTO "rooms" DEFAULT VALUES
  returning id into new_room_id;
  return new_room_id;
END;
$$;

/* DROP function if exists insert_room();
create or replace function insert_room()
  returns uuid
  language plpgsql
  SECURITY DEFINER
AS
$$
declare
  new_room_id uuid;
BEGIN
  INSERT INTO "rooms" DEFAULT VALUES
  returning id into new_room_id;
  return new_room_id;
END;
$$; */


-- 2. Create new Participant
DROP function if exists insert_participant(room_id uuid, user_id uuid, group_id uuid);
create or replace function insert_participant(room_id uuid, user_id uuid default null, group_id uuid default null, accepted boolean default true)
returns void
language plpgsql
security definer
as
$$
BEGIN
  INSERT INTO "rooms_participants" (room_id, user_id, group_id, accepted)
  VALUES (room_id, user_id, group_id, accepted);
END;
$$;

-- 3 Delete Room
DROP function if exists delete_room(followerId uuid, followingId uuid);
DROP function if exists delete_room(room_id uuid);
create or replace function delete_room(room_id uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  DELETE FROM "rooms"
  WHERE
  "id" = room_id;
END;
$$;


-- 4. Delete Participant
DROP function if exists delete_participant(room_id uuid, participant_id uuid);
create or replace function delete_participant(room_id uuid, participant_id uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  DELETE FROM "rooms_participants"
  WHERE
  "room_id" = room_id
  and
  ("group_id" = participant_id or "user_id"="participant_id");
END;
$$;

-- 5. Select all individual chat rooms of user
DROP function if exists select_all_rooms_of_user(user_id_in uuid);
create or replace function select_all_rooms_of_user(user_id_in uuid)
returns table (
    id uuid,
    participant_id uuid,
    name text,
    avatar_url text,
    last_message text,
    last_message_time timestamp with time zone,
    number_of_unread_messages int4,
    is_group boolean
)
language plpgsql
security definer
as
$$
BEGIN
  return query
  Select
    r1.room_id as id,
    p.id,
    p.name,
    p.avatar_url,
    r.last_message,
    r.last_message_time,
    rp.number_of_unread_messages,
    false
  from
  (
  select * from rooms_participants where user_id = user_id_in
  ) r2
  join rooms_participants r1
  on r2.room_id = r1.room_id and not r1.user_id = user_id_in
  join profiles p
  on r1.user_id = p.id
  join rooms r
  on (r1.room_id = r.id)
  join rooms_participants rp
  on rp.room_id = r.id and not rp.user_id = user_id_in
  union
  SELECT
    r.id,
    gm.group_id,
    g.name,
    g.avatar_url,
    r.last_message,
    r.last_message_time,
    gm.number_of_unread_messages,
    true
  from
    group_members gm
  join groups g
  on g.id = gm.group_id
  join rooms_participants rp
  on rp.group_id = gm.group_id
  join rooms r
  on rp.room_id = r.id
  where
  gm.user_id = user_id_in
  order by last_message_time desc
  ;
END;
$$;

-- 5. Select all group chat rooms of user
DROP function if exists select_all_group_rooms_of_user(user_id_in uuid);
create or replace function select_all_group_rooms_of_user(user_id_in uuid)
--returns all_rooms_of_user
returns table (
    room_id uuid,
    participant_id uuid,
    name text,
    avatar_url text,
    last_message text,
    last_message_time timestamp with time zone,
    number_of_unread_messages int4
)
language plpgsql
security definer
as
$$
BEGIN
  return query
  Select
    r.id,
    gm.group_id,
    g.name,
    g.avatar_url,
    r.last_message,
    r.last_message_time,
    rp.number_of_unread_messages
  from
    group_members gm
  join groups g
  on g.id = gm.group_id
  join rooms_participants rp
  on rp.group_id = gm.group_id
  join rooms r
  on rp.room_id = r.id
  where
  gm.user_id = user_id_in;
END;
$$;

-- insert_message
DROP function if exists insert_message(room_id_in uuid, user_id_in uuid, content_in text);
create or replace function insert_message(room_id_in uuid, user_id_in uuid, content_in text)
returns void
language plpgsql
security definer
as
$$
BEGIN
  INSERT INTO "rooms_messages" (room_id, user_id, content)
  VALUES (room_id_in, user_id_in, content_in);
END;
$$;

-- update_room for last message
DROP function if exists update_room_after_message(room_id_in uuid, content_in text);
create or replace function update_room_after_message(room_id_in uuid, content_in text)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update rooms
  set
  "last_message" = content_in,
  "last_message_time" = now()
  where id = room_id_in;
END;
$$;

-- update participants for number of unread messages
DROP function if exists update_participants_after_message(room_id_in uuid, user_id_in uuid);
create or replace function update_participants_after_message(room_id_in uuid, user_id_in uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update rooms_participants
  set
  "number_of_unread_messages" = "number_of_unread_messages" + 1
  where room_id = room_id_in and not user_id = user_id_in;
END;
$$;

DROP function if exists update_groups_participants_after_message(group_id_in uuid, user_id_in uuid);
create or replace function update_groups_participants_after_message(group_id_in uuid, user_id_in uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update group_members
  set
  "number_of_unread_messages" = "number_of_unread_messages" + 1
  where group_id = group_id_in and not user_id = user_id_in;
END;
$$;



-- update participants for number of unread messages
DROP function if exists update_participants_after_message(room_id_in uuid, user_id_in uuid);
create or replace function update_participants_after_message(room_id_in uuid, user_id_in uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update rooms_participants
  set
  "number_of_unread_messages" = "number_of_unread_messages" + 1
  where room_id = room_id_in and not user_id = user_id_in;
END;
$$;

DROP function if exists update_groups_participants_after_message(group_id_in uuid, user_id_in uuid);
create or replace function update_groups_participants_after_message(group_id_in uuid, user_id_in uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update group_members
  set
  "number_of_unread_messages" = "number_of_unread_messages" + 1
  where group_id = group_id_in and not user_id = user_id_in;
END;
$$;


-- send_message_transaction
DROP function if exists send_message_transaction(
  room_id_in uuid,
  message_sender uuid,
  message_receiver uuid,
  content_in text,
  is_group boolean,
  group_id_in uuid
);
create or replace function send_message_transaction(
  room_id_in uuid,
  message_sender uuid,
  message_receiver uuid,
  content_in text,
  is_group boolean default null,
  group_id_in uuid default null
)
returns void
language plpgsql
security definer
as
$$
declare
BEGIN
  PERFORM insert_message(room_id_in, message_sender, content_in);
  PERFORM update_room_after_message(room_id_in, content_in);

  if is_group = true then
    PERFORM update_groups_participants_after_message(group_id_in, message_sender);
  else
    PERFORM update_participants_after_message(room_id_in, message_receiver);
  END IF;
END;
$$;



--select Chat Partner
DROP function if exists select_chat_partner(message_sender uuid, room_id_in uuid);
create or replace function select_chat_partner(message_sender uuid, room_id_in uuid)
returns uuid
language plpgsql
security definer
as
$$
declare
message_receiver uuid;
BEGIN
  Select
    user_id
  from
    rooms_participants
  where
    room_id = room_id_in and not user_id = message_sender
  into
  message_receiver;
  return message_receiver;
END;
$$;

--select Chat Partner as Group
DROP function if exists select_group_as_chat_partner(room_id_in uuid);
create or replace function select_group_as_chat_partner(room_id_in uuid)
returns uuid
language plpgsql
security definer
as
$$
declare
group_id_out uuid;
BEGIN
  Select
    group_id
  from
    rooms_participants
  where
    room_id = room_id_in
  into
  group_id_out;
  return group_id_out;
END;
$$;



-- get all messages of chat
DROP function if exists select_all_messages_of_room(room_id_in uuid);
create or replace function select_all_messages_of_room(room_id_in uuid)
returns table (
    message_id uuid,
    created_at_in timestamptz,
    sender_id uuid,
    content_in text
)
language plpgsql
security definer
as
$$
BEGIN
  return query
  Select
    id,
    created_at,
    user_id,
    content
  from
    rooms_messages
  where
    room_id = room_id_in
  order by
    --created_at asc
    created_at desc
  ;
END;
$$;

-- reset unread messages counter
DROP function if exists reset_number_of_unread_messages(room_id_in uuid, user_id_of_reader uuid);
create or replace function reset_number_of_unread_messages(room_id_in uuid, user_id_of_reader uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update rooms_participants
  set
  "number_of_unread_messages" = 0
  where room_id = room_id_in and user_id = user_id_of_reader;
END;
$$;

DROP function if exists reset_number_of_unread_messages_in_group(group_id_in uuid, user_id_of_reader uuid);
create or replace function reset_number_of_unread_messages_in_group(group_id_in uuid, user_id_of_reader uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update group_members
  set
  "number_of_unread_messages" = 0
  where group_id = group_id_in and user_id = user_id_of_reader;
END;
$$;


-- accept chat request
DROP function if exists accept_chat_request(room_id_in uuid, user_id_of_reader uuid);
create or replace function accept_chat_request(room_id_in uuid, user_id_of_reader uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update rooms_participants
  set
  "accepted" = true
  where room_id = room_id_in and user_id = user_id_of_reader;
END;
$$;