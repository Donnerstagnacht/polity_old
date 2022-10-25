DROP function if exists select_group_and_counters(group_id uuid);
DROP TYPE if exists group_type;



CREATE TYPE group_type AS (
    id uuid,
    created_at timestamp with time zone,
    name text,
    description text,
    creator uuid,
    level text,
    street text,
    post_code text,
    city text,
    contact_email text,
    contact_phone text,
    avatar_url text,
    updated_at timestamp with time zone,
    member_counter bigint,
    follower_counter bigint,
    amendment_counter bigint,
    events_counter bigint
);

DROP function if exists select_group_and_counters(group_id uuid);
create or replace function select_group_and_counters(group_id uuid)
returns table (
  group_type group_type
)
language plpgsql
security definer
as
$$
BEGIN
  return query
  Select 
    groups.id,
    groups.created_at,
    groups.name,
    groups.description,
    groups.creator,
    groups.level,
    groups.street,
    groups.post_code,
    groups.city,
    groups.contact_email,
    groups.contact_phone,
    groups.avatar_url,
    groups.updated_at,
    groups_counters.member_counter,
    groups_counters.follower_counter,
    groups_counters.amendment_counter,
    groups_counters.events_counter
  from groups
  join groups_counters 
  on (groups_counters.id = groups.id)
  where
  groups.id = group_id;
END;
$$;