DROP function if exists securityrules.get_followers_of_loggedin_user();
create or replace function securityrules.get_followers_of_loggedin_user()
returns setof uuid
language sql
security definer
stable
as $$
      SELECT following_profile_system.follower
      FROM 
        public.following_profile_system
      WHERE
        following_profile_system.following = auth.uid()
$$;
