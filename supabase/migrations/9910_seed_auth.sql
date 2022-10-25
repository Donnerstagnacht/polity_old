INSERT INTO auth.users (instance_id,id,aud,"role",email,encrypted_password,email_confirmed_at,last_sign_in_at,raw_app_meta_data,raw_user_meta_data,is_super_admin,created_at,updated_at,phone,phone_confirmed_at,confirmation_token,email_change,email_change_token_new,recovery_token) VALUES
  ('00000000-0000-0000-0000-000000000000'::uuid,'f8b028b8-231b-4c80-abf2-7ca787fe686f'::uuid,'authenticated','authenticated','4@test.com', '$2a$10$V31IziLiRRQFCO/ISWvGaOIonwHq0ePKojtkZOyVkmAeFBYAVSsba','2022-06-24T17:22:59.653Z','2022-06-24T17:22:59.657Z','{"provider": "email", "providers": ["email"]}','{}',FALSE,'2022-06-24T17:22:59.649Z','2022-06-24T17:22:59.649Z',NULL,NULL,'','','',''),
	('00000000-0000-0000-0000-000000000000'::uuid,'42e58ca1-2eb8-4651-93c2-cefba2e32f42'::uuid,'authenticated','authenticated','5@test.com', '$2a$10$V31IziLiRRQFCO/ISWvGaOIonwHq0ePKojtkZOyVkmAeFBYAVSsba','2022-06-24T17:23:18.660Z','2022-06-24T17:23:18.666Z','{"provider": "email", "providers": ["email"]}','{}',FALSE,'2022-06-24T17:23:18.656Z','2022-06-24T17:23:18.656Z',NULL,NULL,'','','','')

ON CONFLICT (id) DO NOTHING;

INSERT INTO auth.identities (id,user_id,identity_data,provider,last_sign_in_at,created_at,updated_at) VALUES
	('42e58ca1-2eb8-4651-93c2-cefba2e32f42','42e58ca1-2eb8-4651-93c2-cefba2e32f42'::uuid,'{"sub": "42e58ca1-2eb8-4651-93c2-cefba2e32f42"}','email','2022-06-24T17:23:18.658Z','2022-06-24T17:23:18.658Z','2022-06-24T17:23:18.658Z'),
  ('f8b028b8-231b-4c80-abf2-7ca787fe686f','f8b028b8-231b-4c80-abf2-7ca787fe686f'::uuid,'{"sub": "f8b028b8-231b-4c80-abf2-7ca787fe686f"}','email','2022-06-24T17:22:59.651Z','2022-06-24T17:22:59.651Z','2022-06-24T17:22:59.651Z')

ON CONFLICT (id, provider) DO NOTHING;

