-- insert group_members
insert into public.group_members (
  id,
  user_id,
  group_id,
  is_admin,
  as_admin_added,
  is_board_member,
  as_board_member_added,
  is_president,
  as_president_added
)
values (
  '8f3510f2-d7f6-4eeb-93b1-423bc59d569c',
  '42e58ca1-2eb8-4651-93c2-cefba2e32f42',
  '308c1b44-8684-47b1-b0da-c45548846046',
  true,
  '2022-04-24T17:23:18.656Z',
  true,
  '2022-04-24T17:23:18.656Z',
  true,
  '2022-04-24T17:23:18.656Z'
),
(
  '74da0a64-2e9a-496d-8db9-16d9d08153fb',
  'f8b028b8-231b-4c80-abf2-7ca787fe686f',
  'c675d42b-6077-487c-ab67-52bd569f1989',
  true,
  '2022-04-24T17:23:18.656Z',
  true,
  '2022-04-24T17:23:18.656Z',
  true,
  '2022-04-24T17:23:18.656Z'
),
(
  'b4981c63-4223-456c-aa17-332440ae9f63',
  '42e58ca1-2eb8-4651-93c2-cefba2e32f42',
  'c675d42b-6077-487c-ab67-52bd569f1989',
  false,
  '2022-04-24T17:23:18.656Z',
  false,
  '2022-04-24T17:23:18.656Z',
  false,
  '2022-04-24T17:23:18.656Z'
);
