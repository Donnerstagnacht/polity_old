-- 1. for following_group_system
ALTER TABLE IF EXISTS public.following_group_system ENABLE ROW LEVEL SECURITY;
-- 1.1 CREATE: Authenticated user insert new follow group relationships
DROP POLICY  IF EXISTS "Authenticated users can insert their own and new follow group relationships" ON following_group_system;
CREATE POLICY "Authenticated users can insert their own and new follow group relationships"
    ON public.following_group_system
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK ((auth.uid() = follower) OR (auth.uid() = following));
-- 1.2 READ: Authenticated users can read all follow group relationships
DROP POLICY  IF EXISTS "Authenticated users can read follow group relationships." ON following_group_system;
CREATE POLICY "Authenticated users can read follow group relationships."
    ON public.following_group_system
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (true);

-- 1.3 UPDATE: User can not update follow group relationships
DROP POLICY  IF EXISTS "Users can not update follow group relationships." ON following_group_system;
CREATE POLICY "Users can not update follow group relationships."
    ON public.following_group_system
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING (false)
    WITH check (true);

-- 1.4 DELETE: Logged in user can delete their own follow group relationships
DROP POLICY  IF EXISTS "Authenticated users can delete their own follow group relationships." ON following_group_system;
CREATE POLICY "Authenticated users can delete their own follow group relationships."
    ON public.following_group_system
    AS PERMISSIVE
    FOR DELETE
    TO authenticated
    USING ((auth.uid() = follower) OR (auth.uid() = following));

