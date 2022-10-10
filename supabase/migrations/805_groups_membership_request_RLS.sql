
-- 5. for membership_requests
ALTER TABLE IF EXISTS public.membership_requests ENABLE ROW LEVEL SECURITY;
-- 5.1 CREATE: Authenticated user can insert a new membership request for themself
DROP POLICY  IF EXISTS "Authenticated users can insert a new membership request for themself" ON membership_requests;
CREATE POLICY "Authenticated users can insert a new membership request for themself"
    ON public.membership_requests
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK ((auth.uid() = user_requests));

-- 5.2 READ: Authenticated users can read membership requests
/*** REVIEW ***/
-- Admins of requested group can read membership requests
-- User can read membership requests
DROP POLICY  IF EXISTS "Authenticated users can read membership requests." ON membership_requests;
CREATE POLICY "Authenticated users can read membership requests."
    ON public.membership_requests
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (true);

-- 5.3 UPDATE: Membership requests can not be updated
DROP POLICY  IF EXISTS "Membership requests can not be updated." ON membership_requests;
CREATE POLICY "Membership requests can not be updated."
    ON public.membership_requests
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING (false);
    --WITH check (true);

-- 5.4 DELETE: Logged in user can delete membership requests.
/*** REVIEW ***/
-- Admins of requested group can delete requests
-- User can remove requested group
DROP POLICY  IF EXISTS "Authenticated users can delete membership requests." ON membership_requests;
CREATE POLICY "Authenticated users can delete membership requests."
    ON public.membership_requests
    AS PERMISSIVE
    FOR DELETE
    TO authenticated
    USING (true);
