
-- Full Text Search Profiles
ALTER TABLE IF EXISTS public.profiles
    ADD COLUMN fts tsvector GENERATED ALWAYS AS (to_tsvector('german'::regconfig, ((name || ' '::text) || city))) STORED;
CREATE INDEX IF NOT EXISTS profiles_fts
    ON public.profiles USING gin
    (fts)
    TABLESPACE pg_default;


-- Full Text Search Groups
  ALTER TABLE IF EXISTS public.groups
    ADD COLUMN fts tsvector GENERATED ALWAYS AS (to_tsvector('german'::regconfig, ((name || ' '::text) || level || city))) STORED;
CREATE INDEX IF NOT EXISTS groups_fts
    ON public.groups USING gin
    (fts)
    TABLESPACE pg_default;

