CREATE TABLE IF NOT EXISTS public.profiles_counters
(
    "id" uuid NOT NULL,
    "amendment_counter" bigint   DEFAULT 0::bigint,
    "follower_counter" bigint  DEFAULT 0::bigint,
    "following_counter" bigint  DEFAULT 0::bigint,
    "groups_counter" bigint  DEFAULT 0::bigint,
    "unread_notifications_counter" bigint  DEFAULT 0::bigint,
    CONSTRAINT profiles_counters_pkey PRIMARY KEY (id),
    CONSTRAINT profiles_counters_id_fkey FOREIGN KEY (id)
        REFERENCES auth.users (id) MATCH SIMPLE,
    CONSTRAINT profiles_counters_fkey FOREIGN KEY (id)
        REFERENCES auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.profiles_counters OWNER to postgres;
GRANT ALL ON TABLE public.profiles_counters TO anon;
GRANT ALL ON TABLE public.profiles_counters TO authenticated;
GRANT ALL ON TABLE public.profiles_counters TO postgres;
GRANT ALL ON TABLE public.profiles_counters TO service_role;
