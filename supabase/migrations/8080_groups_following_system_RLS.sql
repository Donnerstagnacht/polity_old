-- 1. for following_group_system
ALTER TABLE IF EXISTS public.following_group_system ENABLE ROW LEVEL SECURITY;
-- 1.1 CREATE: Authenticated user insert new follow group relationships
DROP POLICY  IF EXISTS "Authenticated users can insert their own and new follow group relationships" ON public.following_group_system;
CREATE POLICY "Authenticated users can insert their own and new follow group relationships"
    ON public.following_group_system
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (
        (auth.uid() = follower)
    );

-- 1.2 READ: Authenticated users can read all follow group relationships
DROP POLICY  IF EXISTS "Authenticated users can read follow group relationships." ON public.following_group_system;
CREATE POLICY "Authenticated users can read follow group relationships."
    ON public.following_group_system
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (true);

-- 1.3 DELETE: Logged in user can delete their own follow group relationships
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
/*         id IN (
            SELECT groups.id
            FROM 
                groups
            JOIN
                group_members
            ON 
                (group_members.group_id = groups.id)
            WHERE
                group_members.user_id = auth.uid()
            AND
                group_members.is_admin = true
        ) */
    );

