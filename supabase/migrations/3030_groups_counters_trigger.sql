DROP TRIGGER IF EXISTS signup_trigger_copy_to_profiles_counters_table on public.groups;
DROP FUNCTION IF EXISTS create_group_copy_to_group_counters_table();

CREATE OR REPLACE FUNCTION signup_copy_to_profiles_counters_table()
RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO public.groups_counters (id)
    VALUES(new.id);
    RETURN NEW;
  END;
$$
LANGUAGE plpgsql SECURITY DEFINER;
ALTER FUNCTION public.signup_copy_to_profiles_counters_table() OWNER to postgres;


CREATE TRIGGER create_group_trigger_copy_to_group_counters
AFTER INSERT ON public.groups
FOR EACH ROW EXECUTE PROCEDURE signup_copy_to_profiles_counters_table();
