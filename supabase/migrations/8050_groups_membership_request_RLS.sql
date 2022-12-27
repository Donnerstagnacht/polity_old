
-- 5. for membership_requests
ALTER TABLE IF EXISTS public.membership_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY  IF EXISTS "Authenticated users can insert a new membership request for themself" ON public.membership_requests;
CREATE POLICY "Authenticated users can insert a new membership request for themself"
    ON public.membership_requests
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK ((auth.uid() = user_requests));

DROP POLICY  IF EXISTS "Authenticated users can read their own membership requests and admins their groups memberships." ON public.membership_requests;
CREATE POLICY "Authenticated users can read their own membership requests and admins their groups memberships."
    ON public.membership_requests
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (
        (auth.uid() IN (SELECT securityrules.get_group_requests_of_loggedin_user()))
        OR 
        id IN (SELECT securityrules.get_group_requests_of_groups_where_loggedin_user_admin())
    );

DROP POLICY  IF EXISTS "Authenticated users can delete their own membership requests and admins can delete groups memberships." ON public.membership_requests;
CREATE POLICY "Authenticated users can delete their own membership requests and admins can delete groups memberships."
    ON public.membership_requests
    AS PERMISSIVE
    FOR DELETE
    TO authenticated
    USING (
        (auth.uid() IN (SELECT securityrules.get_group_requests_of_loggedin_user()))
        OR 
        id IN (SELECT securityrules.get_group_requests_of_groups_where_loggedin_user_admin())
    );
