
-- 3. for group_members
ALTER TABLE IF EXISTS public.group_members ENABLE ROW LEVEL SECURITY;
-- 3.1 CREATE: Authenticated user can insert new group membership
/*** REVIEW ***/
-- Admins of group should be able to insert a new group membership
DROP POLICY  IF EXISTS "Authenticated users can insert new group membership" ON group_members;
CREATE POLICY "Authenticated users can insert new group membership"
    ON public.group_members
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- 3.2 READ: Authenticated users can read group membership
DROP POLICY  IF EXISTS "Authenticated users can read group membership" ON group_members;
CREATE POLICY "Authenticated users can read group membership"
    ON public.group_members
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (true);

-- 3.3 UPDATE: Authenticated user can update group membership
/*** REVIEW ***/
-- Admins should be able to delete group membership
-- Logged In user should be able to delete group membership
DROP POLICY  IF EXISTS "Authenticated users can update group membership" ON group_members;
CREATE POLICY "Authenticated users can update group membership"
    ON public.group_members
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH check (true);

-- 3.4 DELETE: Logged in user can
/*** REVIEW ***/
-- Admins should be able to update group membership
-- Group members should be able to update column "number_of_unread_messages" when sending message
DROP POLICY  IF EXISTS "Authenticated users can delete group membership" ON group_members;
CREATE POLICY "Authenticated users can delete group membership"
    ON public.group_members
    AS PERMISSIVE
    FOR DELETE
    TO authenticated
    USING (true);
