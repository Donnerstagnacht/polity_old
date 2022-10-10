CREATE TABLE IF NOT EXISTS public.rooms_messages
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    room_id uuid NOT NULL,
    user_id uuid NOT NULL,
    content text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    CONSTRAINT rooms_messages_pkey PRIMARY KEY (id),
    CONSTRAINT rooms_messages_room_id_fkey FOREIGN KEY (room_id)
        REFERENCES public.rooms (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT rooms_messages_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.rooms_messages
    OWNER to postgres;
GRANT ALL ON TABLE public.rooms_messages TO anon;
GRANT ALL ON TABLE public.rooms_messages TO authenticated;
GRANT ALL ON TABLE public.rooms_messages TO postgres;
GRANT ALL ON TABLE public.rooms_messages TO service_role;

