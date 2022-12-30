CREATE TABLE IF NOT EXISTS public."events_participants"
(
    user_id uuid NOT NULL,
    event_id uuid NOT NULL,
    is_admin boolean NOT NULL DEFAULT false,
    is_board_member boolean NOT NULL DEFAULT false,
    is_delegate boolean NOT NULL DEFAULT false,
    is_guest boolean NOT NULL DEFAULT false,
    CONSTRAINT "events_participants_pkey" PRIMARY KEY (user_id, event_id),
    CONSTRAINT "events_participants_user_id_fkey" FOREIGN KEY (user_id)
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "events_participants_event_id_fkey" FOREIGN KEY (event_id)
        REFERENCES public.events (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public."events_participants"
    OWNER to postgres;

COMMENT ON TABLE public."events_participants"
    IS 'Stores the user-event relationship (event participants)';
