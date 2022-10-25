CREATE TABLE IF NOT EXISTS public.groups_counters
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    "member_counter" bigint NOT NULL DEFAULT '1'::bigint,
    "follower_counter" bigint NOT NULL DEFAULT '0'::bigint,
    "amendment_counter" bigint NOT NULL DEFAULT '0'::bigint,
    "events_counter" bigint NOT NULL DEFAULT '0'::bigint,
    CONSTRAINT groups_counters_pkey PRIMARY KEY (id),
    CONSTRAINT groups_counters_id_fkey FOREIGN KEY (id)
        REFERENCES public.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.groups_counters
    OWNER to postgres;

GRANT ALL ON TABLE public.groups_counters TO anon;
GRANT ALL ON TABLE public.groups_counters TO authenticated;
GRANT ALL ON TABLE public.groups_counters TO postgres;
GRANT ALL ON TABLE public.groups_counters TO service_role;
