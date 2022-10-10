CREATE TABLE IF NOT EXISTS public."following_group_system"
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    follower uuid NOT NULL,
    following uuid NOT NULL,
    CONSTRAINT "following_group_system_pkey" PRIMARY KEY (id),
    CONSTRAINT "following_group_system_follower_fkey" FOREIGN KEY (follower)
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "following_group_system_following_fkey" FOREIGN KEY (following)
        REFERENCES public.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."following_group_system"
    OWNER to postgres;
GRANT ALL ON TABLE public."following_group_system" TO anon;
GRANT ALL ON TABLE public."following_group_system" TO authenticated;
GRANT ALL ON TABLE public."following_group_system" TO postgres;
GRANT ALL ON TABLE public."following_group_system" TO service_role;
COMMENT ON TABLE public."following_group_system"
    IS 'Stores the following-follower relationship';

