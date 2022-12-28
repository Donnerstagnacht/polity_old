
-- 8. for rooms_messages
ALTER TABLE IF EXISTS public.rooms_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated user can create messages in rooms in which they are members." ON rooms_messages;
CREATE POLICY "Authenticated user can create messages in rooms in which they are members."
    ON public.rooms_messages
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (
        room_id IN (
            SELECT securityrules.get_rooms_of_loggedin_user()
        )
    );

DROP POLICY IF EXISTS "Authenticated users can read messages in rooms in which they are members." ON rooms_messages;
CREATE POLICY "Authenticated users can read messages in rooms in which they are members."
    ON public.rooms_messages
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (
        room_id IN (
            SELECT securityrules.get_rooms_of_loggedin_user()
        )
    );
