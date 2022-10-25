-- insert profile followwers
insert into public.following_profile_system (
  id,
  follower,
  following
)
values (
  'c675d42b-6077-487c-ab67-52bd569f1989',
  'f8b028b8-231b-4c80-abf2-7ca787fe686f',
  '42e58ca1-2eb8-4651-93c2-cefba2e32f42'
),
(
  '0702b35f-9777-48c2-8e9a-a775666b6389',
  '42e58ca1-2eb8-4651-93c2-cefba2e32f42',
  'f8b028b8-231b-4c80-abf2-7ca787fe686f'
);
