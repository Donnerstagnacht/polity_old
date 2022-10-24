DROP TRIGGER IF EXISTS signup_copy_to_profiles on auth.users;
DROP FUNCTION IF EXISTS signup_copy_to_users_table();
CREATE OR REPLACE FUNCTION signup_copy_to_users_table()
RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO public.profiles (id)
    VALUES(new.id);
    RETURN NEW;
  END;
$$
LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER signup_copy_to_profiles
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE signup_copy_to_users_table();
