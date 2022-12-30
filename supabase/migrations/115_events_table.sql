DROP TABLE IF EXISTS public.events;
CREATE TABLE IF NOT EXISTS public.events
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    creator uuid NOT NULL,
    name text NOT NULL DEFAULT ''::text,
    date timestamp with time zone,
    rythm text NOT NULL DEFAULT ''::text,
    online_or_real text NOT NULL DEFAULT ''::text,
    online_link text NOT NULL DEFAULT ''::text,
    description text NOT NULL DEFAULT ''::text,
    event_type text NOT NULL DEFAULT ''::text,
    host_group uuid NOT NULL,
    delegates_calculation_type text NOT NULL DEFAULT ''::text,
    number_of_delegates bigint NOT NULL DEFAULT '0'::bigint,
    number_of_executed_board_members bigint NOT NULL DEFAULT '0'::bigint,
    gender_quota_speaking boolean,
    participants_counter  bigint NOT NULL DEFAULT '0'::bigint,
    motion_deadline timestamp with time zone,
    delegate_deadline timestamp with time zone,


    CONSTRAINT "events_pkey" PRIMARY KEY (id),
    CONSTRAINT "events_creator_fkey" FOREIGN KEY (creator)
      REFERENCES public.profiles (id) MATCH SIMPLE,
    CONSTRAINT "events_host_group_fkey" FOREIGN KEY (host_group)
      REFERENCES public.groups (id) MATCH SIMPLE
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.events
    OWNER to postgres;
