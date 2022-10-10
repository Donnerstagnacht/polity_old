CREATE TABLE IF NOT EXISTS public.profiles
(
    "id" uuid NOT NULL,
    "updated_at" timestamp with time zone,
    "name" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "avatar_url" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "city" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "contact_email" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "contact_phone" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "post_code" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "street" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "about" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "website" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "amendment_counter" bigint   DEFAULT 0::bigint,
    "follower_counter" bigint  DEFAULT 0::bigint,
    "following_counter" bigint  DEFAULT 0::bigint,
    "groups_counter" bigint  DEFAULT 0::bigint,
    "unread_notifications_counter" bigint  DEFAULT 0::bigint,
    CONSTRAINT profiles_pkey PRIMARY KEY (id),
    --CONSTRAINT profiles_name_key UNIQUE (name),
    CONSTRAINT profiles_id_fkey FOREIGN KEY (id)
        REFERENCES auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
    -- CONSTRAINT name_length CHECK (char_length(name) >= 3)
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.profiles OWNER to postgres;
GRANT ALL ON TABLE public.profiles TO anon;
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT ALL ON TABLE public.profiles TO postgres;
GRANT ALL ON TABLE public.profiles TO service_role;
