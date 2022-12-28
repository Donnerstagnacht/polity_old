
-- 7. for rooms
ALTER TABLE IF EXISTS public.rooms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated user can create a room." ON rooms;
CREATE POLICY "Authenticated user can create a room."
    ON public.rooms
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can read rooms in which they are members." ON rooms;
CREATE POLICY "Authenticated users can read rooms in which they are members."
    ON public.rooms
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (
        id IN (
            SELECT securityrules.get_rooms_of_loggedin_user()
        )
    );

DROP POLICY IF EXISTS "Authenticated users can update rooms in which they are members." ON rooms;
CREATE POLICY "Authenticated users can update rooms in which they are members."
    ON public.rooms
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH check (
        id IN (
            SELECT securityrules.get_rooms_of_loggedin_user()
        )
    );

DROP POLICY IF EXISTS "Authenticated users can delete their own personal rooms." ON rooms;
CREATE POLICY "Authenticated users can delete their own personal rooms"
    ON public.rooms
    AS PERMISSIVE
    FOR DELETE
    TO authenticated
    USING (
        id IN (
            SELECT securityrules.get_rooms_of_loggedin_user()
        )
    );
