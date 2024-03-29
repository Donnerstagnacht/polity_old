-- 1. for following_group_system
ALTER TABLE IF EXISTS public.following_group_system ENABLE ROW LEVEL SECURITY;

DROP POLICY  IF EXISTS "Authenticated users can insert their own and new follow group relationships" ON public.following_group_system;
CREATE POLICY "Authenticated users can insert their own and new follow group relationships"
    ON public.following_group_system
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (
        (auth.uid() = follower)
    );

DROP POLICY  IF EXISTS "Authenticated users can read follow group relationships." ON public.following_group_system;
CREATE POLICY "Authenticated users can read follow group relationships."
    ON public.following_group_system
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY  IF EXISTS "Authenticated users can delete their own follow group relationships and admins can delete follower of group." ON public.following_group_system;
CREATE POLICY "Authenticated users can delete their own follow group relationships and admins can delete follower of group."
    ON public.following_group_system
    AS PERMISSIVE
    FOR DELETE
    TO authenticated
    USING (
        (auth.uid() = follower) 
        OR 
        id IN (
            SELECT securityrules.get_groups_where_loggedin_user_admin()
        )
    );

