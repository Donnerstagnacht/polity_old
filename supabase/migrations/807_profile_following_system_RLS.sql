-- 2. for following_profile_system
ALTER TABLE IF EXISTS public.following_profile_system ENABLE ROW LEVEL SECURITY;
-- 2.1 CREATE: Authenticated user can insert new follow profile relationships
DROP POLICY  IF EXISTS "Authenticated users can insert their own and new follow profile relationships." ON following_profile_system;
CREATE POLICY "Authenticated users can insert their own and new follow profile relationships."
    ON public.following_profile_system
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK ((auth.uid() = follower) OR (auth.uid() = following));

-- 2.2 READ: Authenticated users can read follow profile relationships
DROP POLICY  IF EXISTS "Authenticated users can read follow profile relationships." ON following_profile_system;
CREATE POLICY "Authenticated users can read follow profile relationships."
    ON public.following_profile_system
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (true);

-- 2.3 UPDATE: Authenticated user can update own follow profile relationships
DROP POLICY  IF EXISTS "Users can not update follow profile relationships." ON following_profile_system;
CREATE POLICY "Users can not update follow profile relationships."
    ON public.following_profile_system
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING (false)
    WITH check (true);

-- 2.4 DELETE: Logged in user can delete their own follow profile relationships
DROP POLICY  IF EXISTS "Authenticated users can delete their own follow profile relationships." ON following_profile_system;
CREATE POLICY "Authenticated users can delete their own follow profile relationships."
    ON public.following_profile_system
    AS PERMISSIVE
    FOR DELETE
    TO authenticated
    USING ((auth.uid() = follower) OR (auth.uid() = following));

