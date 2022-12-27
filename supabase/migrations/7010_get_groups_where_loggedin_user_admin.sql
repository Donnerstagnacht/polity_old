DROP function if exists securityrules.get_groups_where_loggedin_user_admin();
create or replace function securityrules.get_groups_where_loggedin_user_admin()
returns setof uuid
language sql
security definer
stable
as $$
      SELECT groups.id
      FROM 
        public.groups
      JOIN
        public.group_members
      ON 
        (group_members.group_id = groups.id)
      WHERE
        group_members.user_id = auth.uid()
      AND
        group_members.is_admin = true
$$;
