DROP function if exists securityrules.get_group_requests_of_loggedin_user();
create or replace function securityrules.get_group_requests_of_loggedin_user()
returns setof uuid
language sql
security definer
stable
as $$
      SELECT membership_requests.user_requests
      FROM 
        public.membership_requests
      WHERE
        membership_requests.user_requests = auth.uid()
$$;
