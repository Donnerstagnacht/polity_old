
ALTER TABLE IF EXISTS public.notifications_of_user ENABLE ROW LEVEL SECURITY;

DROP POLICY  IF EXISTS "Authenticated users can notifiy other users." ON public.notifications_of_user;
CREATE POLICY "Authenticated users can notifiy other users."
    ON public.notifications_of_user
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (
        id IN (
            SELECT securityrules.get_notifications_send_by_loggedin_user()
        )
    );

DROP POLICY  IF EXISTS "Authenticated users can view notification messages send to them or send by them to other users." ON public.notifications_of_user;
CREATE POLICY "Authenticated users can view notification messages send to them or send by them to other users."
    ON public.notifications_of_user
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (
        id IN (
            SELECT securityrules.get_notifications_send_to_and_by_loggedin_user()
        )
    );

DROP POLICY  IF EXISTS "Authenticated users can update notification messages send to them." ON public.notifications_of_user;
CREATE POLICY "Authenticated users can update notification messages send to them."
    ON public.notifications_of_user
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING (
        id IN (
            SELECT securityrules.get_notifications_send_to_loggedin_user()
        )  
    )
    WITH check (
        id IN (
            SELECT securityrules.get_notifications_send_to_loggedin_user()
        )
    );
