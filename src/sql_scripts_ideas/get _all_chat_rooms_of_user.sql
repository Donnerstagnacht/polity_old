Select r1.room_id, r1.user_id, p.name, p.avatar_url
from
(
select * from rooms_participants where user_id = '42e58ca1-2eb8-4651-93c2-cefba2e32f42'
) r2
join rooms_participants r1
on r2.room_id = r1.room_id and not r1.user_id = '42e58ca1-2eb8-4651-93c2-cefba2e32f42'
join profiles p
on r1.user_id = p.id;
