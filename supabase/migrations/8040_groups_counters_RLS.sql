
-- 4. for groups
ALTER TABLE IF EXISTS public.groups_counters ENABLE ROW LEVEL SECURITY;
-- 4.1 CREATE: Authenticated user can create new groups
DROP POLICY IF EXISTS "Authenticated users can create new group counters." ON groups_counters;
CREATE POLICY "Authenticated users can create new group counters."
    ON public.groups_counters
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- 4.2 READ: Authenticated users can view groups.
DROP POLICY IF EXISTS "Authenticated users can view group counters." ON groups_counters;
CREATE POLICY "Authenticated users can view group counters."
    ON public.groups_counters
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (true);

-- 4.3.1 UPDATE: Group admins can update  user can up
DROP POLICY IF EXISTS "Authenticated users can update group counters." ON groups_counters;
CREATE POLICY "Authenticated users can update group counters."
    ON public.groups_counters
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH check (true);
