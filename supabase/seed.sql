-- source & discussion => works but how to get the password?
--https://github.com/supabase/supabase/discussions/5043

/* INSERT INTO auth.users (instance_id,id,aud,"role",email,encrypted_password,email_confirmed_at,last_sign_in_at,raw_app_meta_data,raw_user_meta_data,is_super_admin,created_at,updated_at,phone,phone_confirmed_at,confirmation_token,email_change,email_change_token_new,recovery_token) VALUES
	('00000000-0000-0000-0000-000000000000'::uuid,'f76629c5-a070-4bbc-9918-64beaea48848'::uuid,'','authenticated','test@example.com',    '$2a$10$PznXR5VSgzjnAp7T/X7PCu6vtlgzdFt1zIr41IqP0CmVHQtShiXxS','2022-02-11 21:02:04.547','2022-02-11 22:53:12.520','{"provider": "email", "providers": ["email"]}','{}',FALSE,'2022-02-11 21:02:04.542','2022-02-11 21:02:04.542',NULL,NULL,'','','',''),
	('00000000-0000-0000-0000-000000000000'::uuid,'d9064bb5-1501-4ec9-bfee-21ab74d645b8'::uuid,'','authenticated','demo@example.com',    '$2a$10$mOJUAphJbZR4CdM38.bgOeyySurPeFHoH/T1s7HuGdpRb7JgatF7K','2022-02-12 07:40:23.616','2022-02-12 07:40:23.621','{"provider": "email", "providers": ["email"]}','{}',FALSE,'2022-02-12 07:40:23.612','2022-02-12 07:40:23.613',NULL,NULL,'','','','')
ON CONFLICT (id) DO NOTHING;

INSERT INTO auth.identities (id,user_id,identity_data,provider,last_sign_in_at,created_at,updated_at) VALUES
	('f76629c5-a070-4bbc-9918-64beaea48848','f76629c5-a070-4bbc-9918-64beaea48848'::uuid,'{"sub": "f76629c5-a070-4bbc-9918-64beaea48848"}','email','2022-02-11 21:02:04.545','2022-02-11 21:02:04.545','2022-02-11 21:02:04.545'),
	('d9064bb5-1501-4ec9-bfee-21ab74d645b8','d9064bb5-1501-4ec9-bfee-21ab74d645b8'::uuid,'{"sub": "d9064bb5-1501-4ec9-bfee-21ab74d645b8"}','email','2022-02-12 07:40:23.615','2022-02-12 07:40:23.615','2022-02-12 07:40:23.615')
ON CONFLICT (id, provider) DO NOTHING;
 */

-- Meine Versuche => builds but I can not login - password can not be encrypted?

INSERT INTO auth.users (instance_id,id,aud,"role",email,encrypted_password,email_confirmed_at,last_sign_in_at,raw_app_meta_data,raw_user_meta_data,is_super_admin,created_at,updated_at,phone,phone_confirmed_at,confirmation_token,email_change,email_change_token_new,recovery_token) VALUES
  ('00000000-0000-0000-0000-000000000000'::uuid,'f8b028b8-231b-4c80-abf2-7ca787fe686f'::uuid,'authenticated','authenticated','4@test.com', '$2a$10$V31IziLiRRQFCO/ISWvGaOIonwHq0ePKojtkZOyVkmAeFBYAVSsba','2022-06-24T17:22:59.653Z','2022-06-24T17:22:59.657Z','{"provider": "email", "providers": ["email"]}','{}',FALSE,'2022-06-24T17:22:59.649Z','2022-06-24T17:22:59.649Z',NULL,NULL,'','','',''),
	('00000000-0000-0000-0000-000000000000'::uuid,'42e58ca1-2eb8-4651-93c2-cefba2e32f42'::uuid,'authenticated','authenticated','5@test.com', '$2a$10$V31IziLiRRQFCO/ISWvGaOIonwHq0ePKojtkZOyVkmAeFBYAVSsba','2022-06-24T17:23:18.660Z','2022-06-24T17:23:18.666Z','{"provider": "email", "providers": ["email"]}','{}',FALSE,'2022-06-24T17:23:18.656Z','2022-06-24T17:23:18.656Z',NULL,NULL,'','','','')

ON CONFLICT (id) DO NOTHING;

INSERT INTO auth.identities (id,user_id,identity_data,provider,last_sign_in_at,created_at,updated_at) VALUES
	('42e58ca1-2eb8-4651-93c2-cefba2e32f42','42e58ca1-2eb8-4651-93c2-cefba2e32f42'::uuid,'{"sub": "42e58ca1-2eb8-4651-93c2-cefba2e32f42"}','email','2022-06-24T17:23:18.658Z','2022-06-24T17:23:18.658Z','2022-06-24T17:23:18.658Z'),
  ('f8b028b8-231b-4c80-abf2-7ca787fe686f','f8b028b8-231b-4c80-abf2-7ca787fe686f'::uuid,'{"sub": "f8b028b8-231b-4c80-abf2-7ca787fe686f"}','email','2022-06-24T17:22:59.651Z','2022-06-24T17:22:59.651Z','2022-06-24T17:22:59.651Z')

ON CONFLICT (id, provider) DO NOTHING;


--Udating profiles
update public.profiles
set
  updated_at = '2022-06-24T17:23:18.656Z',
  name = 'Tobias',
  avatar_url = '',
  city = 'Rosbach',
  contact_email = '5@test.com',
  contact_phone = '0145/1232434',
  post_code = '736233',
  street = 'Liebertstraße 18',
  about = 'Ich bin ein Testmitglied',
  website = 'wwww.test.com',
  amendment_counter = 0,
  follower_counter = 1,
  following_counter = 2,
  groups_counter = 1
where id = '42e58ca1-2eb8-4651-93c2-cefba2e32f42';


update public.profiles
set
  updated_at = '2022-04-24T17:23:18.656Z',
  name = 'Fabian',
  avatar_url = '',
  city = 'Gießen',
  contact_email = '4@test.com',
  contact_phone = '0141/1232434',
  post_code = '732283',
  street = 'Liebertstraße 18',
  about = 'Ich bin ein anderes Testmitglied',
  website = 'wwww.test2.com',
  amendment_counter = 0,
  follower_counter = 1,
  following_counter = 2,
  groups_counter = 2
where id = 'f8b028b8-231b-4c80-abf2-7ca787fe686f';


--insert groups
insert into public.groups (
  id,
  created_at,
  name,
  description,
  creator,
  member_counter,
  follower_counter,
  amendment_counter,
  events_counter,
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
  1,
  1,
  0,
  0,
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
  1,
  0,
  0,
  0,
  'local',
  'Liebertstraße 18',
  '3454355',
  'Rosbach',
  't@test.com',
  '123233@test.com',
  '',
  '2022-04-24T17:23:18.656Z'
);



-- insert membership requests
insert into public.membership_requests (
  id,
  created_at,
  user_requests,
  group_requested
)
values (
  'f943943d-58d1-4632-b79e-d2aa95e3f18b',
  '2022-04-24T17:23:18.656Z',
  'f8b028b8-231b-4c80-abf2-7ca787fe686f',
  '308c1b44-8684-47b1-b0da-c45548846046'
);


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


-- insert group followers
insert into public.following_group_system (
  id,
  follower,
  following
)
values (
  'ebbc144e-be1f-4440-b02c-8cc5a2ae39e8',
  '42e58ca1-2eb8-4651-93c2-cefba2e32f42',
  '308c1b44-8684-47b1-b0da-c45548846046'
),
(
  '3b783a60-0abc-4f30-bb8c-3dba4ca15d2a',
  'f8b028b8-231b-4c80-abf2-7ca787fe686f',
  'c675d42b-6077-487c-ab67-52bd569f1989'
);




--$2a$10$V/wto7QD/3y75m5xGBAg8uMGTBbpSUtUO66sf7uNzFHms8jo5DNUy



/* INSERT INTO auth.users (instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,invited_at,confirmation_token,confirmation_sent_at,recovery_token,recovery_sent_at,email_change_token_new,email_change,email_change_sent_at,last_sign_in_at,raw_app_meta_data,raw_user_meta_data,is_super_admin,created_at,updated_at,phone_confirmed_at,phone_change_sent_at,banned_until,reauthentication_sent_at,phone,phone_change,phone_change_token,confirmed_at,email_change_token_current,email_change_confirm_status,reauthentication_token) VALUES
('00000000-0000-0000-0000-000000000000'::uuid,'e6167738-c7dd-446d-b1b6-025f5918f111'::uuid,'authenticated','authenticated','1@test.com','$2a$10$XBZz97Bl2CrV.XWf9joCp.FgMTXjooWgA2LBVk3GeWhQLIyh57.0i','2022-06-24T17:21:01.402Z',,,,,,,,,'2022-06-24T17:21:01.415Z','{"provider":"email","providers":["email"]}','{}',FALSE,'2022-06-24T17:21:01.392Z','2022-06-24T17:21:01.392Z',,,,,,,,'2022-06-24T17:21:01.402Z',,0,),
('00000000-0000-0000-0000-000000000000'::uuid,'c07c32dd-1e3d-4be0-911e-9b1d9056ae98'::uuid,'authenticated','authenticated','2@test.com','$2a$10$yQkVdfnrLj6ndlVIJVSAg.udWIv8qIDepVv8JFZWAAXW/k5pXt1Vm','2022-06-24T17:21:26.005Z',,,,,,,,,'2022-06-24T17:21:26.017Z','{"provider":"email","providers":["email"]}','{}',FALSE,'2022-06-24T17:21:25.999Z','2022-06-24T17:21:25.999Z',,,,,,,,'2022-06-24T17:21:26.005Z',,0,),
('00000000-0000-0000-0000-000000000000'::uuid,'aa18494f-89ed-4c55-a8eb-76fcada02033'::uuid,'authenticated','authenticated','3@test.com','$2a$10$CGcJeOBvB4seZZJeZaoncObjlMBlgImBLwAREnGQ9bfCzN15u5ZkW','2022-06-24T17:22:16.048Z',,,,,,,,,'2022-06-24T17:22:16.064Z','{"provider":"email","providers":["email"]}','{}',FALSE,'2022-06-24T17:22:16.042Z','2022-06-24T17:22:16.042Z',,,,,,,,'2022-06-24T17:22:16.048Z',,0,),
('00000000-0000-0000-0000-000000000000'::uuid,'f8b028b8-231b-4c80-abf2-7ca787fe686f'::uuid,'authenticated','authenticated','4@test.com','$2a$10$V/wto7QD/3y75m5xGBAg8uMGTBbpSUtUO66sf7uNzFHms8jo5DNUy','2022-06-24T17:22:59.653Z',,,,,,,,,'2022-06-24T17:22:59.657Z','{"provider":"email","providers":["email"]}','{}',FALSE,'2022-06-24T17:22:59.649Z','2022-06-24T17:22:59.649Z',,,,,,,,'2022-06-24T17:22:59.653Z',,0,),
('00000000-0000-0000-0000-000000000000'::uuid,'42e58ca1-2eb8-4651-93c2-cefba2e32f42'::uuid,'authenticated','authenticated','5@test.com','$2a$10$Btg2iOESuDyf.antAZgwpejOQFFBry3fkAYXoVoCPl0k2T8lf7uCC','2022-06-24T17:23:18.660Z',,,,,,,,,'2022-06-24T17:23:18.666Z','{"provider":"email","providers":["email"]}','{}',FALSE,'2022-06-24T17:23:18.656Z','2022-06-24T17:23:18.656Z',,,,,,,,'2022-06-24T17:23:18.660Z',,0,)
ON CONFLICT (id) DO NOTHING;



INSERT INTO auth.identities (id,user_id,identity_data,provider,last_sign_in_at,created_at,updated_at) VALUES
  ('42e58ca1-2eb8-4651-93c2-cefba2e32f42','42e58ca1-2eb8-4651-93c2-cefba2e32f42'::uuid,'{"sub":"42e58ca1-2eb8-4651-93c2-cefba2e32f42"}','email','2022-06-24T17:23:18.658Z','2022-06-24T17:23:18.658Z','2022-06-24T17:23:18.658Z'),
  ('aa18494f-89ed-4c55-a8eb-76fcada02033','aa18494f-89ed-4c55-a8eb-76fcada02033'::uuid,'{"sub":"aa18494f-89ed-4c55-a8eb-76fcada02033"}','email','2022-06-24T17:22:16.045Z','2022-06-24T17:22:16.045Z','2022-06-24T17:22:16.045Z'),
  ('c07c32dd-1e3d-4be0-911e-9b1d9056ae98','c07c32dd-1e3d-4be0-911e-9b1d9056ae98'::uuid,'{"sub":"c07c32dd-1e3d-4be0-911e-9b1d9056ae98"}','email','2022-06-24T17:21:26.003Z','2022-06-24T17:21:26.003Z','2022-06-24T17:21:26.003Z'),
  ('e6167738-c7dd-446d-b1b6-025f5918f111','e6167738-c7dd-446d-b1b6-025f5918f111'::uuid,'{"sub":"e6167738-c7dd-446d-b1b6-025f5918f111"}','email','2022-06-24T17:21:01.398Z','2022-06-24T17:21:01.399Z','2022-06-24T17:21:01.399Z'),
  ('f8b028b8-231b-4c80-abf2-7ca787fe686f','f8b028b8-231b-4c80-abf2-7ca787fe686f'::uuid,'{"sub":"f8b028b8-231b-4c80-abf2-7ca787fe686f"}','email','2022-06-24T17:22:59.651Z','2022-06-24T17:22:59.651Z','2022-06-24T17:22:59.651Z')
ON CONFLICT (id, provider) DO NOTHING; */
