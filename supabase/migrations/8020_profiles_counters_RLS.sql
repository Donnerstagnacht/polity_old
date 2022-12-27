
ALTER TABLE IF EXISTS public.profiles_counters ENABLE ROW LEVEL SECURITY;

-- 6.1 READ: Authenticated users can select all profiles counters
DROP POLICY IF EXISTS "Authenticated users can view profiles counters." ON public.profiles_counters;
CREATE POLICY "Authenticated users can view profiles counters."
    ON public.profiles_counters
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (true);

-- 6.2 UPDATE: Authenticated user can edit profiles counters 
DROP POLICY IF EXISTS "Authenticated users can update profiles counters." ON public.profiles_counters;
CREATE POLICY "Authenticated users can update profiles counters."
    ON public.profiles_counters
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (
        (true)
    );
