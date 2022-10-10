
CREATE TABLE IF NOT EXISTS public.rooms
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    last_message text NOT NULL DEFAULT ''::text,
    last_message_time timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT rooms_pkey PRIMARY KEY (id)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.rooms
    OWNER to postgres;
GRANT ALL ON TABLE public.rooms TO anon;
GRANT ALL ON TABLE public.rooms TO authenticated;
GRANT ALL ON TABLE public.rooms TO postgres;
GRANT ALL ON TABLE public.rooms TO service_role;