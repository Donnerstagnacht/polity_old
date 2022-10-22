CREATE OR REPLACE FUNCTION signup_copy_to_profiles_table()
RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO public.profiles_counters (id)
    VALUES(new.id);
    RETURN NEW;
  END;
$$
LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS signup_copy_to_profiles_table on auth.users;
CREATE TRIGGER signup_copy
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE signup_copy_to_profiles_table();
