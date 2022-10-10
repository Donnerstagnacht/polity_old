CREATE TABLE IF NOT EXISTS public.rooms_participants
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    room_id uuid NOT NULL,
    user_id uuid,
    group_id uuid,
    accepted boolean NOT NULL DEFAULT false,
    number_of_unread_messages int4 NOT NULL  DEFAULT 0::int4,
    CONSTRAINT rooms_participants_pkey PRIMARY KEY (id),
    CONSTRAINT rooms_user_id_participant_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT rooms_participants_room_id_fkey FOREIGN KEY (room_id)
        REFERENCES public.rooms (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT rooms_participants_group_id_fkey FOREIGN KEY (group_id)
        REFERENCES public.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.rooms_participants
    OWNER to postgres;
GRANT ALL ON TABLE public.rooms_participants TO anon;
GRANT ALL ON TABLE public.rooms_participants TO authenticated;
GRANT ALL ON TABLE public.rooms_participants TO postgres;
GRANT ALL ON TABLE public.rooms_participants TO service_role;

