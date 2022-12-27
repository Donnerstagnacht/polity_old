
-- 4. for groups
ALTER TABLE IF EXISTS public.groups ENABLE ROW LEVEL SECURITY;
-- 4.1 CREATE: Authenticated user can create new groups
DROP POLICY  IF EXISTS "Authenticated users can create new groups." ON groups;
CREATE POLICY "Authenticated users can create new groups."
    ON public.groups
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- 4.2 READ: Authenticated users can view groups.
DROP POLICY  IF EXISTS "Authenticated users can view groups." ON groups;
CREATE POLICY "Authenticated users can view groups."
    ON public.groups
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (true);

-- 4.3.1 UPDATE: Group admins can update  user can up
DROP POLICY  IF EXISTS "Group admin can update groups profile." ON groups;
CREATE POLICY "Group admin can update groups profile."
    ON public.groups
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH check (
    id IN (
      SELECT securityrules.get_groups_where_loggedin_user_admin()
    )
);
