CREATE TABLE IF NOT EXISTS public.events_counters
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    "guests" bigint NOT NULL DEFAULT '1'::bigint,
    "follower_counter" bigint NOT NULL DEFAULT '0'::bigint,
    "delegate_counter" bigint NOT NULL DEFAULT '0'::bigint,
    "motion_counter" bigint NOT NULL DEFAULT '0'::bigint,
    CONSTRAINT events_counters_pkey PRIMARY KEY (id),
    CONSTRAINT events_counters_id_fkey FOREIGN KEY (id)
        REFERENCES public.events (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.events_counters
    OWNER to postgres;

GRANT ALL ON TABLE public.events_counters TO anon;
GRANT ALL ON TABLE public.events_counters TO authenticated;
GRANT ALL ON TABLE public.events_counters TO postgres;
GRANT ALL ON TABLE public.events_counters TO service_role;
