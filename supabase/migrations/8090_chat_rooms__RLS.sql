
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
