-- **********************
-- ******Table NOTIFICATIONS FROM USER*******
-- **********************
DROP TABLE IF EXISTS notifications_of_user;
CREATE TABLE IF NOT EXISTS public."notifications_of_user"
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    notifier uuid NOT NULL,
    notifying uuid NOT NULL,
    handler uuid NOT NULL,
    title text NOT NULL DEFAULT ''::text,
    message text NOT NULL DEFAULT ''::text,
    for_admins boolean NOT NULL DEFAULT false::boolean,
    type text NOT NULL DEFAULT ''::text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    from_group boolean NOT NULL DEFAULT false,
    new boolean NOT NULL DEFAULT true,
    CONSTRAINT "notifications_of_user_of_user_pkey" PRIMARY KEY (id),
    CONSTRAINT "notifications_of_user_notifier_fkey" FOREIGN KEY (notifier)
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "notifications_of_user_notifying_fkey" FOREIGN KEY (notifying)
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."notifications_of_user"
    OWNER to postgres;

GRANT ALL ON TABLE public."notifications_of_user" TO anon;

GRANT ALL ON TABLE public."notifications_of_user" TO authenticated;

GRANT ALL ON TABLE public."notifications_of_user" TO postgres;

GRANT ALL ON TABLE public."notifications_of_user" TO service_role;

COMMENT ON TABLE public."notifications_of_user"
    IS 'Stores notifications  triggered by users';

-- **********************
-- ******New Table NOTIFICATIONS FROM GROUPS*******
-- **********************
DROP TABLE IF EXISTS notifications_of_groups;
CREATE TABLE IF NOT EXISTS public."notifications_of_groups"
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    notifier uuid NOT NULL,
    notifying uuid NOT NULL,
    handler uuid NOT NULL,
    title text NOT NULL DEFAULT ''::text,
    message text NOT NULL DEFAULT ''::text,
    for_admins boolean NOT NULL DEFAULT false::boolean,
    type text NOT NULL DEFAULT ''::text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    from_group boolean NOT NULL DEFAULT true,
    new boolean NOT NULL DEFAULT true,
    CONSTRAINT "notifications_of_groups_of_user_pkey" PRIMARY KEY (id),
    CONSTRAINT "notifications_of_groups_notifier_fkey" FOREIGN KEY (notifier)
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "notifications_of_groups_notifying_fkey" FOREIGN KEY (notifying)
        REFERENCES public.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."notifications_of_groups"
    OWNER to postgres;

GRANT ALL ON TABLE public."notifications_of_groups" TO anon;

GRANT ALL ON TABLE public."notifications_of_groups" TO authenticated;

GRANT ALL ON TABLE public."notifications_of_groups" TO postgres;

GRANT ALL ON TABLE public."notifications_of_groups" TO service_role;

COMMENT ON TABLE public."notifications_of_groups"
    IS 'Stores notifications  triggered by groups';
