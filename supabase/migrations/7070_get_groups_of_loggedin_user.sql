DROP function if exists securityrules.get_groups_of_loggedin_user();
create or replace function securityrules.get_groups_of_loggedin_user()
returns setof uuid
language sql
security definer
stable
as $$
      SELECT group_members.group_id
      FROM 
        public.group_members
      WHERE
        group_members.user_id = auth.uid()
$$;
