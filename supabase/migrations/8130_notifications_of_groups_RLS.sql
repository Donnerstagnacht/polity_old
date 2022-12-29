
ALTER TABLE IF EXISTS public.notifications_of_groups ENABLE ROW LEVEL SECURITY;

DROP POLICY  IF EXISTS "Authenticated users can notifiy other groups." ON public.notifications_of_groups;
CREATE POLICY "Authenticated users can notifiy other groups."
    ON public.notifications_of_groups
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (
        id IN (
            SELECT securityrules.get_notifications_send_to_groups_by_loggedin_user()
        )
    );

DROP POLICY  IF EXISTS "Authenticated users can view notification send out by them and notifications of groups they own admin rights." ON public.notifications_of_groups;
CREATE POLICY "Authenticated users can view notification send out by them and notifications of groups they own admin rights."
    ON public.notifications_of_groups
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (
        (id IN (
            SELECT securityrules.get_notifications_send_to_groups_by_loggedin_user()
        ))
        OR
        (id IN (
            SELECT securityrules.get_notifications_of_groups_with_admin_rights_of_logged_in_user()
        ))
    );

DROP POLICY  IF EXISTS "Authenticated users can update notification messages send to them and notifications of groups they own admin rights." ON public.notifications_of_groups;
CREATE POLICY "Authenticated users can update notification messages send to them and notifications of groups they own admin rights."
    ON public.notifications_of_groups
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING (
        (id IN (
            SELECT securityrules.get_notifications_send_to_groups_by_loggedin_user()
        ))
        OR
        (id IN (
            SELECT securityrules.get_notifications_of_groups_with_admin_rights_of_logged_in_user()
        ))
    )
    WITH check (
        (id IN (
            SELECT securityrules.get_notifications_send_to_groups_by_loggedin_user()
        ))
        OR
        (id IN (
            SELECT securityrules.get_notifications_of_groups_with_admin_rights_of_logged_in_user()
        ))
    );
