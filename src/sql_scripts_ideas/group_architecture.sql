--****************************
--**** Create Group Transaction ****
--****************************

--1.Insert Group
DROP function if exists create_group(name text, description text, creator uuid, level text);
create or replace function create_group(name text, description text, creator uuid, level text)
returns uuid
language plpgsql
security definer
as
$$
declare
  new_id uuid;
BEGIN
  INSERT INTO "groups" (name, description, creator, level)
  VALUES (name, description, creator, level)
  returning id into new_id;
  return new_id;
END;
$$;

-- 2. Insert Member & Role
DROP function if exists add_member(creator uuid, group_id uuid, is_admin boolean, is_board_member boolean, is_president boolean);
create or replace function add_member(user_id uuid, group_id uuid, is_admin boolean, is_board_member boolean, is_president boolean)
returns void
language plpgsql
security definer
as
$$
BEGIN
  INSERT INTO "groupMembers" (user_id, group_id, is_admin, is_board_member, is_president)
  VALUES (user_id, group_id, is_admin, is_board_member, is_president);
END;
$$;

-- 3. Update user's groupCounter
DROP function if exists increment_groups_counter(userId uuid);
create or replace function increment_groups_counter(userId uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update profiles
  set "groupsCounter" = "groupsCounter" + 1
  where id = userId;
END
$$;

-- 4. group Transactions calling functions 1-3
DROP function if exists create_group_transaction(name text, description text, creator uuid, level text);
create or replace function create_group_transaction(name text, description text, creator uuid, level text)
returns uuid
language plpgsql
security definer
as
$$
declare
new_group_id uuid;
BEGIN
  Select create_group(name, description, creator, level)
  into new_group_id;
  perform add_member(creator, new_group_id, true, true , true);
  perform increment_groups_counter(creator);
  return new_group_id;
END;
$$;
