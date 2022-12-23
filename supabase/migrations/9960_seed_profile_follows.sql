-- insert profile followwers
insert into public.following_profile_system (
  follower,
  following
)
values (
  'f8b028b8-231b-4c80-abf2-7ca787fe686f',
  '42e58ca1-2eb8-4651-93c2-cefba2e32f42'
),
(
  '42e58ca1-2eb8-4651-93c2-cefba2e32f42',
  'f8b028b8-231b-4c80-abf2-7ca787fe686f'
);
