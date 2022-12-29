
-- 3. for group_members
ALTER TABLE IF EXISTS public.group_members ENABLE ROW LEVEL SECURITY;
DROP POLICY  IF EXISTS "Admins of group should be able to insert a new group membership" ON group_members;
CREATE POLICY "Admins of group should be able to insert a new group membership"
    ON public.group_members
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (
        group_id IN (
            SELECT securityrules.get_groups_where_loggedin_user_admin()
        )
    );

DROP POLICY  IF EXISTS "Authenticated users can read their own group memberships and admins can read their members" ON group_members;
CREATE POLICY "Authenticated users can read their own group memberships and admins can read their members"
    ON public.group_members
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (
        --true
        (auth.uid() IN (
            SELECT securityrules.get_memberships_of_loggedin_user()
        ))
        OR
        (group_id IN (
            SELECT securityrules.get_groups_where_loggedin_user_admin()
        ))
    );

/*** REVIEW ***/
-- Admins should be able to update group membership
-- Group members should be able to update column "number_of_unread_messages" when sending message
DROP POLICY  IF EXISTS "Authenticated users can delete their own group membership and admins can remove members of their groups" ON group_members;
CREATE POLICY "Authenticated users can delete their own group membership and admins can remove members of their groups"
    ON public.group_members
    AS PERMISSIVE
    FOR DELETE
    TO authenticated
    USING (
        (auth.uid() IN (
            SELECT securityrules.get_memberships_of_loggedin_user()
        ))
        OR
        (group_id IN (
            SELECT securityrules.get_groups_where_loggedin_user_admin()
        ))
    );
