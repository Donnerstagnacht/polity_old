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
    CONSTRAINT profiles_pkey PRIMARY KEY (id),
    CONSTRAINT profiles_id_fkey FOREIGN KEY (id)
        REFERENCES auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.profiles OWNER to postgres;
GRANT ALL ON TABLE public.profiles TO anon;
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT ALL ON TABLE public.profiles TO postgres;
GRANT ALL ON TABLE public.profiles TO service_role;
