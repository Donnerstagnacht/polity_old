
-- 9. for rooms_participants
ALTER TABLE IF EXISTS public.rooms_participants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can read rooms participants if they are a room member." ON rooms_participants;
CREATE POLICY "Authenticated users can read rooms participants if they are a room member."
    ON public.rooms_participants
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (
                room_id IN (
            SELECT securityrules.get_rooms_of_loggedin_user()
        )
    );

DROP POLICY IF EXISTS "Authenticated users can update rooms participants if they are a room member." ON rooms_participants;
CREATE POLICY "Authenticated users can update rooms participants if they are a room member."
    ON public.rooms_participants
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH check (
        room_id IN (
            SELECT securityrules.get_rooms_of_loggedin_user()
        )
    );

DROP POLICY IF EXISTS "Authenticated users can delete rooms participants of a group chat if they are a member of the chat." ON rooms_participants;
CREATE POLICY "Authenticated users can delete rooms participants of a group chat if they are a member of the chat."
    ON public.rooms_participants
    AS PERMISSIVE
    FOR DELETE
    TO authenticated
    USING (
        room_id IN (
            SELECT securityrules.get_rooms_of_loggedin_user()
        )
    );
