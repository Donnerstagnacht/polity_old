
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
