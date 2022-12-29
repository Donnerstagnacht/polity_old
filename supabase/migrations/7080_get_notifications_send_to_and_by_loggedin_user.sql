DROP function if exists securityrules.get_notifications_send_to_and_by_loggedin_user();
create or replace function securityrules.get_notifications_send_to_and_by_loggedin_user()
returns setof uuid
language sql
security definer
stable
as $$
      SELECT 
        notifications_of_user.id
      FROM 
        public.notifications_of_user
      WHERE
        notifications_of_user.notifying = auth.uid()
        OR
        notifications_of_user.notifier = auth.uid()
$$;

DROP function if exists securityrules.get_notifications_send_to_loggedin_user();
create or replace function securityrules.get_notifications_send_to_loggedin_user()
returns setof uuid
language sql
security definer
stable
as $$
      SELECT 
        notifications_of_user.id
      FROM 
        public.notifications_of_user
      WHERE
        notifications_of_user.notifying = auth.uid()
$$;


DROP function if exists securityrules.get_notifications_send_by_loggedin_user();
create or replace function securityrules.get_notifications_send_by_loggedin_user()
returns setof uuid
language sql
security definer
stable
as $$
      SELECT 
        notifications_of_user.id
      FROM 
        public.notifications_of_user
      WHERE
        notifications_of_user.notifier = auth.uid()
$$;
