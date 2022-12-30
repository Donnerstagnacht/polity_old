DROP TRIGGER IF EXISTS create_event_trigger_copy_to_events_counters_table on public.events;
DROP FUNCTION IF EXISTS create_event_copy_to_events_counters_table();

CREATE OR REPLACE FUNCTION create_event_copy_to_events_counters_table()
RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO public.events_counters (id)
    VALUES(new.id);
    RETURN NEW;
  END;
$$
LANGUAGE plpgsql SECURITY DEFINER;
ALTER FUNCTION public.create_event_copy_to_events_counters_table() OWNER to postgres;


CREATE TRIGGER create_event_trigger_copy_to_events_counters_table
AFTER INSERT ON public.events
FOR EACH ROW EXECUTE PROCEDURE create_event_copy_to_events_counters_table();
