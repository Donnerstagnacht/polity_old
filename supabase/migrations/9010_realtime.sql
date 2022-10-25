begin;
  -- remove the realtime publication
  drop publication if exists supabase_realtime;

  -- re-create the publication but don't enable it for any tables
  create publication supabase_realtime;
commit;

-- add a table to the publication
alter publication supabase_realtime add table following_group_system;
alter table "following_group_system" replica identity full;

alter publication supabase_realtime add table following_profile_system;
alter table "following_profile_system" replica identity full;


alter publication supabase_realtime add table groups;
alter publication supabase_realtime add table groups_counters;
alter table "groups_counters" replica identity full;
alter publication supabase_realtime add table membership_requests;
alter table "membership_requests" replica identity full;
alter publication supabase_realtime add table group_members;
alter table "group_members" replica identity full;

alter publication supabase_realtime add table profiles;
alter publication supabase_realtime add table profiles_counters;
alter table "profiles_counters" replica identity full;

alter publication supabase_realtime add table rooms;
alter publication supabase_realtime add table rooms_messages;
alter publication supabase_realtime add table rooms_participants;
alter publication supabase_realtime add table notifications_of_groups;
alter publication supabase_realtime add table notifications_of_user;
