--1. Increment Following of group
DROP function if exists transactions.increment_group_event_counter(group_id uuid);
create or replace function transactions.increment_group_event_counter(group_id uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update groups_counters
  set "events_counter" = "events_counter" + 1
  where id = group_id;
END
$$;

--2. Decrement following of group
DROP function if exists transactions.decrement_group_event_counter(group_id uuid);
create or replace function transactions.decrement_group_event_counter(group_id uuid)
returns void
language plpgsql
security definer
as
$$
BEGIN
  update groups_counters
  set "events_counter" = "events_counter" - 1
  where id = group_id;
END;
$$;