
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;

-- 6.1 READ: Authenticated users can select all profiles
DROP POLICY IF EXISTS "Authenticated users can view profile counters." ON public.profiles_counters;
CREATE POLICY "Authenticated users can view profile counters."
    ON public.profiles_counters
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (true);

-- 6.2 UPDATE: Authenticated user can edit profiles
DROP POLICY IF EXISTS "Authenticated users can update counters." ON public.profiles_counters;
CREATE POLICY "Authenticated users can update counters."
    ON public.profiles_counters
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);
