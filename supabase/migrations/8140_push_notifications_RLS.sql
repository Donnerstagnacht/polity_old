ALTER TABLE IF EXISTS public.push_notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY  IF EXISTS "Authenticated users can create new groups." ON public.push_notifications;
CREATE POLICY "Authenticated users can create new groups."
    ON public.push_notifications
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (
        (auth.uid() = user_id)
    );