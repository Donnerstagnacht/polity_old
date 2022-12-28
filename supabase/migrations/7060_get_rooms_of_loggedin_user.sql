DROP function if exists securityrules.get_rooms_of_loggedin_user();
create or replace function securityrules.get_rooms_of_loggedin_user()
returns setof uuid
language sql
security definer
stable
as $$
      SELECT 
        rooms_participants.room_id
      FROM 
        public.rooms_participants
      WHERE
        rooms_participants.user_id = auth.uid()
      UNION
      SELECT 
        rooms_participants.room_id
      FROM 
        public.rooms_participants
      WHERE
        rooms_participants.group_id IN (
          SELECT securityrules.get_groups_of_loggedin_user() 
        )
$$;
