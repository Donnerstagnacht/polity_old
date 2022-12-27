-- 2. for following_profile_system
ALTER TABLE IF EXISTS public.following_profile_system ENABLE ROW LEVEL SECURITY;
-- 2.1 CREATE: Authenticated user can insert new follow profile relationships
DROP POLICY  IF EXISTS "Authenticated users can insert their own and new follow profile relationships." ON following_profile_system;
CREATE POLICY "Authenticated users can insert their own and new follow profile relationships."
    ON public.following_profile_system
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (
        (auth.uid() = follower) 
    );

-- 2.2 READ: Authenticated users can read follow profile relationships
DROP POLICY  IF EXISTS "Authenticated users can read follow profile relationships." ON following_profile_system;
CREATE POLICY "Authenticated users can read follow profile relationships."
    ON public.following_profile_system
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (true);

-- 2.4 DELETE: Logged in user can delete their own follow profile relationships
DROP POLICY  IF EXISTS "Authenticated users can delete their own follow profile relationships." ON following_profile_system;
CREATE POLICY "Authenticated users can delete their own follow profile relationships."
    ON public.following_profile_system
    AS PERMISSIVE
    FOR DELETE
    TO authenticated
    USING (
        (auth.uid() = follower) 
        OR 
        --(auth.uid() = following)
        (auth.uid() IN (
            SELECT securityrules.get_followers_of_loggedin_user()
        ))
    );

