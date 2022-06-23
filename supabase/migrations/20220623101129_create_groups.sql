-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

-- ***********************
-- *** Create Tables *****
-- ***********************

-- 1.1 Create Groups
CREATE TABLE IF NOT EXISTS public.groups
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    creator uuid NOT NULL,
    "memberCounter" bigint NOT NULL DEFAULT '1'::bigint,
    "followerCounter" bigint NOT NULL DEFAULT '0'::bigint,
    "amendmentCounter" bigint NOT NULL DEFAULT '0'::bigint,
    "eventsCounter" bigint NOT NULL DEFAULT '0'::bigint,
    level text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    street text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    "postCode" text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    city text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    "contactEmail" text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    "contactPhone" text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    "avatarUrl" text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    " updated_at" timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT groups_pkey PRIMARY KEY (id),
    CONSTRAINT groups_creator_fkey FOREIGN KEY (creator)
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.groups
    OWNER to postgres;


-- 1.2 Create Groups policies
ALTER TABLE IF EXISTS public.groups
    ENABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE public.groups TO anon;
GRANT ALL ON TABLE public.groups TO authenticated;
GRANT ALL ON TABLE public.groups TO postgres;
GRANT ALL ON TABLE public.groups TO service_role;

CREATE POLICY "Creators can update their groups"
    ON public.groups
    AS PERMISSIVE
    FOR UPDATE
    TO public
    USING ((auth.uid() = creator));
CREATE POLICY "Enable insert for authenticated users only"
    ON public.groups
    AS PERMISSIVE
    FOR INSERT
    TO authenticated
    WITH CHECK (true);
CREATE POLICY "Everyone can read groups"
    ON public.groups
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);


-- 2.1 Create Group Members
CREATE TABLE IF NOT EXISTS public."groupMembers"
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
    CONSTRAINT "groupMembers_pkey" PRIMARY KEY (id),
    CONSTRAINT "groupMembers_group_id_fkey" FOREIGN KEY (group_id)
        REFERENCES public.groups (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "groupMembers_user_id_fkey" FOREIGN KEY (user_id)
        REFERENCES public.profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public."groupMembers"
    OWNER to postgres;


-- 2.2 Create Group Members policies
GRANT ALL ON TABLE public."groupMembers" TO anon;
GRANT ALL ON TABLE public."groupMembers" TO authenticated;
GRANT ALL ON TABLE public."groupMembers" TO postgres;
GRANT ALL ON TABLE public."groupMembers" TO service_role;


-- **************************************
-- *** Create Functions/Transactions ****
-- **************************************

-- 1. Insert Group
CREATE OR REPLACE FUNCTION public.create_group(
	name text,
	description text,
	creator uuid,
	level text)
    RETURNS uuid
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
declare
  new_id uuid;
BEGIN
  INSERT INTO "groups" (name, description, creator, level)
  VALUES (name, description, creator, level)
  returning id into new_id;
  return new_id;
END;
$BODY$;

ALTER FUNCTION public.create_group(text, text, uuid, text)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.create_group(text, text, uuid, text) TO PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_group(text, text, uuid, text) TO anon;
GRANT EXECUTE ON FUNCTION public.create_group(text, text, uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_group(text, text, uuid, text) TO postgres;
GRANT EXECUTE ON FUNCTION public.create_group(text, text, uuid, text) TO service_role;


-- 2. Insert Member
CREATE OR REPLACE FUNCTION public.add_member(
	user_id uuid,
	group_id uuid,
	is_admin boolean,
	is_board_member boolean,
	is_president boolean)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  INSERT INTO "groupMembers" (user_id, group_id, is_admin, is_board_member, is_president)
  VALUES (user_id, group_id, is_admin, is_board_member, is_president);
END;
$BODY$;

ALTER FUNCTION public.add_member(uuid, uuid, boolean, boolean, boolean)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.add_member(uuid, uuid, boolean, boolean, boolean) TO PUBLIC;
GRANT EXECUTE ON FUNCTION public.add_member(uuid, uuid, boolean, boolean, boolean) TO anon;
GRANT EXECUTE ON FUNCTION public.add_member(uuid, uuid, boolean, boolean, boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.add_member(uuid, uuid, boolean, boolean, boolean) TO postgres;
GRANT EXECUTE ON FUNCTION public.add_member(uuid, uuid, boolean, boolean, boolean) TO service_role;

-- 3. Increment Groups Counter
CREATE OR REPLACE FUNCTION public.increment_groups_counter(
	userid uuid)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN
  update profiles
  set "groupsCounter" = "groupsCounter" + 1
  where id = userId;
END
$BODY$;

ALTER FUNCTION public.increment_groups_counter(uuid)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.increment_groups_counter(uuid) TO PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_groups_counter(uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.increment_groups_counter(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_groups_counter(uuid) TO postgres;
GRANT EXECUTE ON FUNCTION public.increment_groups_counter(uuid) TO service_role;


-- 4. Create Groups Transaction
CREATE OR REPLACE FUNCTION public.create_group_transaction(
	name text,
	description text,
	creator uuid,
	level text)
    RETURNS uuid
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
declare
new_group_id uuid;
BEGIN
  Select create_group(name, description, creator, level)
  into new_group_id;
  perform add_member(creator, new_group_id, true, true , true);
  perform increment_groups_counter(creator);
  return new_group_id;
END;
$BODY$;

ALTER FUNCTION public.create_group_transaction(text, text, uuid, text)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.create_group_transaction(text, text, uuid, text) TO PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_group_transaction(text, text, uuid, text) TO anon;
GRANT EXECUTE ON FUNCTION public.create_group_transaction(text, text, uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_group_transaction(text, text, uuid, text) TO postgres;
GRANT EXECUTE ON FUNCTION public.create_group_transaction(text, text, uuid, text) TO service_role;

