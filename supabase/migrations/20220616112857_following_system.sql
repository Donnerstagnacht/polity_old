-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.


/* ALTER TABLE IF EXISTS public.profiles
    ADD COLUMN "amendment_counter" bigint NOT NULL DEFAULT '0'::bigint;

ALTER TABLE IF EXISTS public.profiles
    ADD COLUMN "follower_counter" bigint NOT NULL DEFAULT '0'::bigint;

ALTER TABLE IF EXISTS public.profiles
    ADD COLUMN "following_counter" bigint NOT NULL DEFAULT '0'::bigint;

ALTER TABLE IF EXISTS public.profiles
    ADD COLUMN "groups_counter" bigint NOT NULL DEFAULT '0'::bigint;
 */

-- **********************
-- ******New Table*******
-- **********************
CREATE TABLE IF NOT EXISTS public."following_profile_system"
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    follower uuid NOT NULL,
    following uuid NOT NULL,
    CONSTRAINT "following_profile_system_pkey" PRIMARY KEY (id),
    CONSTRAINT "following_profile_system_follower_fkey" FOREIGN KEY (follower)
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "following_profile_system_following_fkey" FOREIGN KEY (following)
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."following_profile_system"
    OWNER to postgres;

GRANT ALL ON TABLE public."following_profile_system" TO anon;

GRANT ALL ON TABLE public."following_profile_system" TO authenticated;

GRANT ALL ON TABLE public."following_profile_system" TO postgres;

GRANT ALL ON TABLE public."following_profile_system" TO service_role;

COMMENT ON TABLE public."following_profile_system"
    IS 'Stores the following-follower relationship';