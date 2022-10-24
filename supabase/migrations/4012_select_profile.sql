DROP function if exists select_profile_and_counters(user_id uuid);
DROP TYPE if exists profile;

CREATE TYPE profile AS (
    id uuid,
    updated_at timestamp with time zone,
    name text,
    avatar_url text,
    city text,
    contact_email text,
    contact_phone text,
    post_code text,
    street text,
    about text,
    website text,
    amendment_counter bigint,
    follower_counter bigint,
    following_counter bigint,
    groups_counter bigint,
    unread_notifications_counter bigint
);

DROP function if exists select_profile_and_counters(user_id uuid);
create or replace function select_profile_and_counters(user_id uuid)
returns table (
  profile profile
)
language plpgsql
security definer
as
$$
BEGIN
  return query
  Select 
    profiles.id uuid,
    profiles.updated_at timestamp,
    profiles.name text,
    profiles.avatar_url text,
    profiles.city text,
    profiles.contact_email text,
    profiles.contact_phone text,
    profiles.post_code text,
    profiles.street text,
    profiles.about text,
    profiles.website text,
    profiles_counters.amendment_counter bigint,
    profiles_counters.follower_counter bigint,
    profiles_counters.following_counter bigint,
    profiles_counters.groups_counter bigint,
    profiles_counters.unread_notifications_counter bigint
  from profiles
  join profiles_counters 
  on (profiles_counters.id = profiles.id)
  where
  profiles.id = user_id;
END;
$$;