DROP function if exists securityrules.get_notifications_of_groups_with_admin_rights_of_logged_in_user();
create or replace function securityrules.get_notifications_of_groups_with_admin_rights_of_logged_in_user()
returns setof uuid
language sql
security definer
stable
as $$
      SELECT 
        notifications_of_groups.id
      FROM 
        public.notifications_of_groups
      WHERE
        notifications_of_groups.for_admins = true
        AND
        notifications_of_groups.notifying IN (
          SELECT securityrules.get_groups_with_admin_rights_of_loggedin_user()
        )
$$;


DROP function if exists securityrules.get_notifications_send_to_groups_by_loggedin_user();
create or replace function securityrules.get_notifications_send_to_groups_by_loggedin_user()
returns setof uuid
language sql
security definer
stable
as $$
      SELECT 
        notifications_of_groups.id
      FROM 
        public.notifications_of_groups
      WHERE
        notifications_of_groups.notifier = auth.uid()
$$;
