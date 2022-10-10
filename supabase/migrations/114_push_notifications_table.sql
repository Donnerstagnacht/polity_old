DROP TABLE IF EXISTS public.push_notifications;
CREATE TABLE IF NOT EXISTS public.push_notifications
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    endpoint text COLLATE pg_catalog."default" DEFAULT ''::text,
    expiration_time text COLLATE pg_catalog."default" DEFAULT ''::text,
    p256dh text COLLATE pg_catalog."default" DEFAULT ''::text,
    auth text COLLATE pg_catalog."default" DEFAULT ''::text,
    CONSTRAINT "push_notifications_pkey" PRIMARY KEY (id),
    CONSTRAINT "push_notifcations_fkey" FOREIGN KEY ( user_id)
        REFERENCES public.profiles (id) MATCH SIMPLE
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.groups
    OWNER to postgres;

-- 1.2 Create policies
GRANT ALL ON TABLE public.groups TO anon;
GRANT ALL ON TABLE public.groups TO authenticated;
GRANT ALL ON TABLE public.groups TO postgres;
GRANT ALL ON TABLE public.groups TO service_role;
