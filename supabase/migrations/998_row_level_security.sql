
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
/*** REVIEW ***/
-- 4.3.1 UPDATE: Group admins should be able to update groups wiki
-- 4.3.2 UPDATE: All authenticated users should be able to update counters
DROP POLICY  IF EXISTS "Authenticated users can update groups profile." ON groups;
CREATE POLICY "Authenticated users can update groups profile."
    ON public.groups
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH check (true);

-- 4.4 DELETE: Groups can not be deleted
DROP POLICY  IF EXISTS "Groups can not be deleted." ON groups;
CREATE POLICY "Groups can not be deleted."
    ON public.groups
    AS PERMISSIVE
    FOR DELETE
    TO authenticated
    USING (false);

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

-- 6. for profile
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
-- 6.1 CREATE: Authenticated user can create their own profile
DROP POLICY IF EXISTS "Authenticated users can insert their own profile." ON profiles;
CREATE POLICY "Authenticated users can insert their own profile."
    ON public.profiles
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- 6.2 READ: Authenticated users can select all profiles
DROP POLICY IF EXISTS "Authenticated users can view profiles." ON profiles;
CREATE POLICY "Authenticated users can view profiles."
    ON public.profiles
    AS PERMISSIVE
    FOR SELECT
    TO public
    --TO authenticated
    USING (true);
-- 6.3.1 UPDATE: Authenticated user can edit profiles
DROP POLICY IF EXISTS "Authenticated users can update profiles." ON profiles;
CREATE POLICY "Authenticated users can update profiles."
    ON public.profiles
    AS PERMISSIVE
    FOR UPDATE
    --TO authenticated
    TO public
    USING (true);
    --USING ((auth.uid() = id));
    --USING (true);
    --WITH check (true);

-- 6.3.2 UPDATE: Only logged in user can update their own private data
/*** REVIEW https://stackoverflow.com/questions/72756376/supabase-solutions-for-column-level-security ***/
-- WORKING APPROACH: Seperate editable columns from non editable columns, e.g. table "private data (name)" & table "counters"
/* Not working approaches */
--GRANT UPDATE(city, street, about, website, contact_email, contact_phone, post_code, name) ON TABLE public.profiles TO ((auth.uid() = id));
/* CREATE POLICY "Authenticated users can insert their own profile."
    ON public.profiles
    AS PERMISSIVE
    FOR UPDATE(city, street, about, website, contact_email, contact_phone, post_code, name)
    TO public
    WITH CHECK ((auth.uid() = id)); */

-- 6.4 DELETE: Logged in user can delete its own private data
DROP POLICY IF EXISTS "Authenticated users can delete their own profile." ON profiles;
CREATE POLICY "Authenticated users can delete their own profile."
    ON public.profiles
    AS PERMISSIVE
    FOR DELETE
    TO authenticated
    USING (true);

-- 7. for rooms
ALTER TABLE IF EXISTS public.rooms ENABLE ROW LEVEL SECURITY;
-- 7.1 CREATE: Authenticated user can create a room
DROP POLICY IF EXISTS "Authenticated user can create a room." ON rooms;
CREATE POLICY "Authenticated user can create a room."
    ON public.rooms
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- 7.2 READ: Authenticated users can read rooms
/*** REVIEW ***/
-- members of room should be able to read room
DROP POLICY IF EXISTS "Authenticated users can read rooms." ON rooms;
CREATE POLICY "Authenticated users can read rooms."
    ON public.rooms
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (true);

-- 7.3 UPDATE: Authenticated user can update room
/*** REVIEW ***/
-- members of room should be able to update room
DROP POLICY IF EXISTS "Authenticated users can update rooms." ON rooms;
CREATE POLICY "Authenticated users can update rooms."
    ON public.rooms
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH check (true);

-- 7.4 DELETE: Logged in user can delete room
/*** REVIEW ***/
-- members of room should be able to delete room
DROP POLICY IF EXISTS "Authenticated users can delete rooms." ON rooms;
CREATE POLICY "Authenticated users can delete rooms."
    ON public.rooms
    AS PERMISSIVE
    FOR DELETE
    TO authenticated
    USING (true);

-- 8. for rooms_messages
ALTER TABLE IF EXISTS public.rooms_messages ENABLE ROW LEVEL SECURITY;
-- 8.1 CREATE: Authenticated user can create messages
DROP POLICY IF EXISTS "Authenticated user can create messages." ON rooms_messages;
CREATE POLICY "Authenticated user can create messages."
    ON public.rooms_messages
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- 8.2 READ: Authenticated users can read messages
/*** REVIEW ***/
-- Authenticated user can read messages of its rooms
DROP POLICY IF EXISTS "Authenticated users can read messages." ON rooms_messages;
CREATE POLICY "Authenticated users can read messages."
    ON public.rooms_messages
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (true);

-- 8.3 UPDATE: Messages can not be updated
DROP POLICY IF EXISTS "Messages can not be updated." ON rooms_messages;
CREATE POLICY "Messages can not be updated."
    ON public.rooms_messages
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING (false)
    WITH check (true);

-- 8.4 DELETE: Messages can not be deleted
DROP POLICY IF EXISTS "Messages can not be deleted." ON rooms_messages;
CREATE POLICY "Messages can not be deleted."
    ON public.rooms_messages
    AS PERMISSIVE
    FOR DELETE
    TO authenticated
    USING (false);

-- 9. for rooms_participants
ALTER TABLE IF EXISTS public.rooms_participants ENABLE ROW LEVEL SECURITY;
-- 9.1 CREATE: Authenticated user can
DROP POLICY IF EXISTS "Authenticated user can join rooms." ON rooms_participants;
CREATE POLICY "Authenticated user can join rooms."
    ON public.rooms_participants
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (true);
-- 9.2 READ: Authenticated users can update rooms participants
/*** REVIEW ***/
-- User of room can read rooms participants
DROP POLICY IF EXISTS "Authenticated users can read rooms participants." ON rooms_participants;
CREATE POLICY "Authenticated users can read rooms participants."
    ON public.rooms_participants
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (true);

-- 9.3 UPDATE: Authenticated user can
/*** REVIEW ***/
-- User of room can update unread_messages column/field
-- Other fields should not be updateable
DROP POLICY IF EXISTS "Authenticated users can update rooms participants." ON rooms_participants;
CREATE POLICY "Authenticated users can update rooms participants."
    ON public.rooms_participants
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH check (true);

-- 9.4 DELETE: Logged in user can
/*** REVIEW ***/
-- admins can remove rooms participants of a group
-- user can remove its membership of a room
DROP POLICY IF EXISTS "Authenticated users can delete rooms participants." ON rooms_participants;
CREATE POLICY "Authenticated users can delete rooms participants."
    ON public.rooms_participants
    AS PERMISSIVE
    FOR DELETE
    TO authenticated
    USING (true);
