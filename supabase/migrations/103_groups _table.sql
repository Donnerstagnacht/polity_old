CREATE TABLE IF NOT EXISTS public.groups
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    creator uuid NOT NULL,
/*     "member_counter" bigint NOT NULL DEFAULT '1'::bigint,
    "follower_counter" bigint NOT NULL DEFAULT '0'::bigint,
    "amendment_counter" bigint NOT NULL DEFAULT '0'::bigint,
    "events_counter" bigint NOT NULL DEFAULT '0'::bigint, */
    level text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    street text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    "post_code" text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    city text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    "contact_email" text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    "contact_phone" text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    "avatar_url" text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT groups_pkey PRIMARY KEY (id),
    CONSTRAINT groups_creator_fkey FOREIGN KEY (creator)
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.groups
    OWNER to postgres;

GRANT ALL ON TABLE public.groups TO anon;
GRANT ALL ON TABLE public.groups TO authenticated;
GRANT ALL ON TABLE public.groups TO postgres;
GRANT ALL ON TABLE public.groups TO service_role;
