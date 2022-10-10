
-- 6. for profile
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
-- 6.1 CREATE: Authenticated user can create their own profile
DROP POLICY IF EXISTS "Authenticated users can insert their own profile." ON profiles;
CREATE POLICY "Authenticated users can insert their own profile."
    ON public.profiles
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- 6.2 READ: Authenticated users can select all profiles
DROP POLICY IF EXISTS "Authenticated users can view profiles." ON profiles;
CREATE POLICY "Authenticated users can view profiles."
    ON public.profiles
    AS PERMISSIVE
    FOR SELECT
    TO public
    --TO authenticated
    USING (true);
-- 6.3.1 UPDATE: Authenticated user can edit profiles
DROP POLICY IF EXISTS "Authenticated users can update profiles." ON profiles;
CREATE POLICY "Authenticated users can update profiles."
    ON public.profiles
    AS PERMISSIVE
    FOR UPDATE
    --TO authenticated
    TO public
    USING (true);
    --USING ((auth.uid() = id));
    --USING (true);
    --WITH check (true);

-- 6.3.2 UPDATE: Only logged in user can update their own private data
/*** REVIEW https://stackoverflow.com/questions/72756376/supabase-solutions-for-column-level-security ***/
-- WORKING APPROACH: Seperate editable columns from non editable columns, e.g. table "private data (name)" & table "counters"
/* Not working approaches */
--GRANT UPDATE(city, street, about, website, contact_email, contact_phone, post_code, name) ON TABLE public.profiles TO ((auth.uid() = id));
/* CREATE POLICY "Authenticated users can insert their own profile."
    ON public.profiles
    AS PERMISSIVE
    FOR UPDATE(city, street, about, website, contact_email, contact_phone, post_code, name)
    TO public
    WITH CHECK ((auth.uid() = id)); */

-- 6.4 DELETE: Logged in user can delete its own private data
DROP POLICY IF EXISTS "Authenticated users can delete their own profile." ON profiles;
CREATE POLICY "Authenticated users can delete their own profile."
    ON public.profiles
    AS PERMISSIVE
    FOR DELETE
    TO authenticated
    USING (true);
