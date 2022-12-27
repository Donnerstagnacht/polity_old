DROP function if exists securityrules.get_group_requests_of_groups_where_loggedin_user_admin();
create or replace function securityrules.get_group_requests_of_groups_where_loggedin_user_admin()
returns setof uuid
language sql
security definer
stable
as $$
      SELECT 
        membership_requests.id
      FROM 
        public.membership_requests
      JOIN
        securityrules.get_groups_where_loggedin_user_admin() as group_id
      ON 
        (group_id = membership_requests.group_requested)
$$;
