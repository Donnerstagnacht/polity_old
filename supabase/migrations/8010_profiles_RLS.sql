
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;

-- 6.1 READ: Authenticated users can select all profiles
DROP POLICY IF EXISTS "Authenticated users can view profiles." ON profiles;
CREATE POLICY "Authenticated users can view profiles."
    ON public.profiles
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING (true);

-- 6.2 UPDATE: Authenticated user can edit profiles
DROP POLICY IF EXISTS "Authenticated users can update their own profile." ON profiles;
CREATE POLICY "Authenticated users can update their own profile."
    ON public.profiles
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING ((auth.uid() = id))
    WITH CHECK ((auth.uid() = id));
