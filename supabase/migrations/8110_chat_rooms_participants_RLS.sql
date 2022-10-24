
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
