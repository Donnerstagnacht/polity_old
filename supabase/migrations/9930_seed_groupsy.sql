--insert groups
insert into public.groups (
  id,
  created_at,
  name,
  description,
  creator,
  level,
  street,
  post_code,
  city,
  contact_email,
  contact_phone,
  avatar_url,
  updated_at
)
values (
  '308c1b44-8684-47b1-b0da-c45548846046',
  '2022-04-24T17:23:18.656Z',
  'Rosbach',
  'Wir sind eine Gruppe in Rosbach von Tobi gegründet',
  '42e58ca1-2eb8-4651-93c2-cefba2e32f42',
  'local',
  'Liebertstraße 18',
  '3454355',
  'Rosbach',
  't@test.com',
  '123233@test.com',
  '',
  '2022-04-24T17:23:18.656Z'
),
(
  'c675d42b-6077-487c-ab67-52bd569f1989',
  '2022-04-24T17:23:18.656Z',
  'München',
  'Wir sind eine Gruppe in Rosbach von Fabi gegründet',
  'f8b028b8-231b-4c80-abf2-7ca787fe686f',
  'local',
  'Liebertstraße 18',
  '3454355',
  'Rosbach',
  't@test.com',
  '123233@test.com',
  '',
  '2022-04-24T17:23:18.656Z'
);
