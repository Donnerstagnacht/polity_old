CREATE TABLE IF NOT EXISTS public.membership_requests
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    user_requests uuid NOT NULL,
    group_requested uuid NOT NULL,
    CONSTRAINT membership_requests_pkey PRIMARY KEY (id),
    CONSTRAINT membership_requests_group_requested_fkey FOREIGN KEY (group_requested)
        REFERENCES public.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT membership_requests_user_requests_fkey FOREIGN KEY (user_requests)
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.membership_requests
    OWNER to postgres;
GRANT ALL ON TABLE public.membership_requests TO anon;
GRANT ALL ON TABLE public.membership_requests TO authenticated;
GRANT ALL ON TABLE public.membership_requests TO postgres;
GRANT ALL ON TABLE public.membership_requests TO service_role;
