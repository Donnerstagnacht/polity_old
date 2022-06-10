-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

ALTER TABLE IF EXISTS public.profiles DROP COLUMN IF EXISTS avatar_url;

ALTER TABLE public.profiles
    ALTER COLUMN about TYPE text COLLATE pg_catalog."default";
ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN about SET DEFAULT ''::text;

ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN about DROP NOT NULL;

ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN about SET STORAGE EXTENDED;

ALTER TABLE public.profiles
    ALTER COLUMN city TYPE text COLLATE pg_catalog."default";
ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN city SET DEFAULT ''::text;

ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN city DROP NOT NULL;

ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN city SET STORAGE EXTENDED;

ALTER TABLE public.profiles
    ALTER COLUMN "contactEmail" TYPE text COLLATE pg_catalog."default";
ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN "contactEmail" SET DEFAULT ''::text;

ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN "contactEmail" DROP NOT NULL;

ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN "contactEmail" SET STORAGE EXTENDED;

ALTER TABLE public.profiles
    ALTER COLUMN "contactPhone" TYPE text COLLATE pg_catalog."default";
ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN "contactPhone" SET DEFAULT ''::text;

ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN "contactPhone" DROP NOT NULL;

ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN "contactPhone" SET STORAGE EXTENDED;

COMMENT ON COLUMN public.profiles."contactPhone"
    IS 'phone number can be used to contact person';

ALTER TABLE public.profiles
    ALTER COLUMN "postCode" TYPE text COLLATE pg_catalog."default";
ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN "postCode" SET DEFAULT ''::text;

ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN "postCode" DROP NOT NULL;

ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN "postCode" SET STORAGE EXTENDED;

ALTER TABLE public.profiles
    ALTER COLUMN street TYPE text COLLATE pg_catalog."default";
ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN street SET DEFAULT ''::text;

ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN street DROP NOT NULL;

ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN street SET STORAGE EXTENDED;

ALTER TABLE public.profiles
    ALTER COLUMN username TYPE text COLLATE pg_catalog."default";
ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN username SET DEFAULT ''::text;

ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN username DROP NOT NULL;

ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN username SET STORAGE EXTENDED;

ALTER TABLE public.profiles
    ALTER COLUMN website TYPE text COLLATE pg_catalog."default";
ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN website SET DEFAULT ''::text;

ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN website DROP NOT NULL;

ALTER TABLE IF EXISTS public.profiles
    ALTER COLUMN website SET STORAGE EXTENDED;

ALTER TABLE IF EXISTS public.profiles
    ADD COLUMN "avatarUrl" text COLLATE pg_catalog."default" DEFAULT ''::text;
