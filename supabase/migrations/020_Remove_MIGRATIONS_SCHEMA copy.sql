-- creating a trigger which deletes entries into the schema_migrations table once they are inserted
-- This is needed for a hard reset since dp push does not apply migrations which are already added
-- to the schema_migrations table
/* 
DROP SCHEMA if exists public CASCADE;
DELETE from storage.objects;
DELETE from auth.users CASCADE;

CREATE SCHEMA public;
GRANT ALL ON schema public TO anon;
GRANT ALL ON schema public TO authenticated;
GRANT ALL ON schema public TO postgres;
GRANT ALL ON schema public TO service_role;

DROP TRIGGER IF EXISTS trigger_migration_row_delete ON supabase_migrations.schema_migrations;
DROP FUNCTION IF EXISTS supabase_migrations.signup_copy_to_users_table();

CREATE OR REPLACE FUNCTION supabase_migrations.delete_migration_versions()
RETURNS TRIGGER AS $$
  BEGIN
    DELETE FROM supabase_migrations.schema_migrations;
    RETURN NEW;
  END;
$$
LANGUAGE plpgsql SECURITY DEFINER;
ALTER FUNCTION supabase_migrations.delete_migration_versions() OWNER to postgres;


CREATE TRIGGER trigger_migration_row_delete
AFTER INSERT ON supabase_migrations.schema_migrations
FOR EACH ROW EXECUTE PROCEDURE supabase_migrations.delete_migration_versions();

 */