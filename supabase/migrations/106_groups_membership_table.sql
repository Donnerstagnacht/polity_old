CREATE TABLE IF NOT EXISTS public."group_members"
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    group_id uuid NOT NULL,
    is_admin boolean NOT NULL DEFAULT false,
    as_admin_added timestamp with time zone NOT NULL DEFAULT now(),
    is_board_member boolean NOT NULL DEFAULT false,
    as_board_member_added timestamp with time zone NOT NULL DEFAULT now(),
    is_president boolean NOT NULL DEFAULT false,
    as_president_added timestamp with time zone NOT NULL DEFAULT now(),
    number_of_unread_messages int4 NOT NULL  DEFAULT 0::int4,
    CONSTRAINT "group_members_pkey" PRIMARY KEY (id),
    CONSTRAINT "group_members_group_id_fkey" FOREIGN KEY (group_id)
        REFERENCES public.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "group_members_user_id_fkey" FOREIGN KEY (user_id)
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public."group_members"
    OWNER to postgres;

GRANT ALL ON TABLE public."group_members" TO anon;
GRANT ALL ON TABLE public."group_members" TO authenticated;
GRANT ALL ON TABLE public."group_members" TO postgres;
GRANT ALL ON TABLE public."group_members" TO service_role;
