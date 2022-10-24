DROP TRIGGER IF EXISTS signup_trigger_copy_to_profiles_counters_table on auth.users;
DROP FUNCTION IF EXISTS signup_copy_to_profiles_counters_table();

CREATE OR REPLACE FUNCTION signup_copy_to_profiles_counters_table()
RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO public.profiles_counters (id)
    VALUES(new.id);
    RETURN NEW;
  END;
$$
LANGUAGE plpgsql SECURITY DEFINER;
ALTER FUNCTION public.signup_copy_to_profiles_counters_table() OWNER to postgres;


CREATE TRIGGER signup_trigger_copy_to_profiles_counters_table
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE signup_copy_to_profiles_counters_table();
