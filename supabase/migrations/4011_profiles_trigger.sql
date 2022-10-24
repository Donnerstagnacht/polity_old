DROP TRIGGER IF EXISTS signup_trigger_copy_to_profiles on auth.users;
DROP FUNCTION IF EXISTS signup_copy_to_users_table();

CREATE OR REPLACE FUNCTION public.signup_copy_to_profiles_table()
RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO public.profiles (id)
    VALUES(new.id);
    RETURN NEW;
  END;
$$
LANGUAGE plpgsql SECURITY DEFINER;
ALTER FUNCTION public.signup_copy_to_profiles_table() OWNER to postgres;


CREATE TRIGGER signup_trigger_copy_to_profiles
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.signup_copy_to_profiles_table();
