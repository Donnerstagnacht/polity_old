-- Notification Trigger to activate WebPush Edge functions
drop extension if exists http;
create extension http;

DROP TRIGGER IF EXISTS copy_notification on public.notifications_of_user;
DROP FUNCTION IF EXISTS copy_notification_to_group();

CREATE OR REPLACE FUNCTION copy_notification_to_group()
RETURNS TRIGGER AS $$
  declare
    data_as_text text;
  BEGIN
    data_as_text := row_to_json(NEW.*)::text;
    perform http((
      'POST',
      'https://ehsbtpkdyyzoipqdmmvv.functions.supabase.co/send-web-push',
      ARRAY[
        http_header('Authorization', 'Bearer ' || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoc2J0cGtkeXl6b2lwcWRtbXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQxNjk1MzIsImV4cCI6MTk2OTc0NTUzMn0.RCp3gX4QRQx4ylZLTj98aMvjYVfxsPeSIXksOrBm6RI')
        --http_header('function-secret',  func_secret)
      ],
      'application/json',
      data_as_text
      ));
    RETURN NEW;
  END;
$$ LANGUAGE PLPGSQL SECURITY DEFINER
SET search_path = extensions, public, pg_temp;

CREATE TRIGGER copy_notification
AFTER INSERT ON public.notifications_of_user
FOR EACH ROW EXECUTE PROCEDURE copy_notification_to_group();