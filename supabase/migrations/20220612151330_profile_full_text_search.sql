-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

ALTER TABLE IF EXISTS public.profiles
    ADD COLUMN fts tsvector GENERATED ALWAYS AS (to_tsvector('german'::regconfig, ((username || ' '::text) || city))) STORED;
CREATE INDEX IF NOT EXISTS profiles_fts
    ON public.profiles USING gin
    (fts)
    TABLESPACE pg_default;