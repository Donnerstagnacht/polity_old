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


/* DROP function if exists update_groups_participants_after_message(group_id_in uuid, user_id_in uuid);
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
$$; */