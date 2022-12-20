INSERT INTO auth.users (
  instance_id, --1
  id, --2
  aud, --3
  "role", --4
  email, --5
  encrypted_password, --6
  email_confirmed_at, --7
  invited_at, --8
  confirmation_token, --9
  confirmation_sent_at, --10
  recovery_token, --11
  recovery_sent_at, --12
  email_change_token_new, --13
  email_change, --14
  email_change_sent_at, --15
  last_sign_in_at, --16
  raw_app_meta_data, --17
  raw_user_meta_data, --18
  is_super_admin, --19
  created_at, --20
  updated_at, --21
  phone, --22
  phone_confirmed_at, --23
  phone_change, --24
  phone_change_token, --25
  phone_change_sent_at, --26
  confirmed_at, --27
  email_change_token_current, --28
  email_change_confirm_status, --29
  banned_until, --30
  reauthentication_token, --31
  reauthentication_sent_at --32
) VALUES
  (
    '00000000-0000-0000-0000-000000000000'::uuid, --1
    'f8b028b8-231b-4c80-abf2-7ca787fe686f'::uuid, --2
    'authenticated', --3
    'authenticated', --4
    '4@test.com', --5
    '$2a$10$V31IziLiRRQFCO/ISWvGaOIonwHq0ePKojtkZOyVkmAeFBYAVSsba', --6
    '2022-06-24T17:22:59.653Z', --7
    '2022-06-24T17:22:59.653Z', --invited_at, --8
    '', --confirmation_token, --9
    '2022-06-24T17:22:59.653Z', --confirmation_sent_at, --10
    '', --recovery_token, --11
    '2022-06-24T17:22:59.653Z', --recovery_sent_at, --12
    '', --email_change_token_new, --13
    '', --email_change, --14
    '2022-06-24T17:22:59.653Z', --email_change_sent_at, --15
    '2022-06-24T17:22:59.657Z', --16
    '{"provider": "email", "providers": ["email"]}', --17
    '{}', --18
    FALSE, --19
    '2022-06-24T17:22:59.649Z', --20
    '2022-06-24T17:22:59.649Z', --21
    NULL, --22
    NULL, --23
    '', --phone_change, --24
    '', --phone_change_token, --25
    '2022-06-24T17:22:59.653Z', --phone_change_sent_at, --26
    DEFAULT,--'2011-01-01 00:00:00+03'::TIMESTAMP WITH TIME ZONE, --'2022-11-22 15:13:57.853992+00', --confirmed_at, --27
    '', --email_change_token_current, --28
    1, --email_change_confirm_status, --29
    '2022-06-24T17:22:59.653Z', --banned_until, --30
    '', --reauthentication_token, --31
    '2022-06-24T17:22:59.653Z' --reauthentication_sent_at --32
  ),
	(
    '00000000-0000-0000-0000-000000000000'::uuid, --1
    '42e58ca1-2eb8-4651-93c2-cefba2e32f42'::uuid, --2
    'authenticated', --3
    'authenticated', --4
    '5@test.com', --5
    '$2a$10$V31IziLiRRQFCO/ISWvGaOIonwHq0ePKojtkZOyVkmAeFBYAVSsba', --6
    '2022-06-24T17:23:18.660Z', --7
    '2022-06-24T17:22:59.653Z', --invited_at, --8
    '', --confirmation_token, --9
    '2022-06-24T17:22:59.653Z', --confirmation_sent_at, --10
    '', --recovery_token, --11
    '2022-06-24T17:22:59.653Z', --recovery_sent_at, --12
    '', --email_change_token_new, --13
    '', --email_change, --14
    '2022-06-24T17:22:59.653Z', --email_change_sent_at, --15
    '2022-06-24T17:23:18.666Z', --16
    '{"provider": "email", "providers": ["email"]}', --17
    '{}', --18
    FALSE, --19
    '2022-06-24T17:23:18.656Z', --20
    '2022-06-24T17:23:18.656Z', --21
    NULL, --22
    NULL, --23
    '', --phone_change, --24
    '', --phone_change_token, --25
    '2022-06-24T17:22:59.653Z', --phone_change_sent_at, --26
    DEFAULT, --'2011-01-01 00:00:00+03'::TIMESTAMP WITH TIME ZONE, --'2022-11-22 15:13:57.853992+00', --confirmed_at, --27
    '', --email_change_token_current, --28
    1, --email_change_confirm_status, -- 29
    '2022-06-24T17:22:59.653Z', --banned_until, --30
    '', --reauthentication_token, --31
    '2022-06-24T17:22:59.653Z' --reauthentication_sent_at --32
  )

ON CONFLICT (id) DO NOTHING;

INSERT INTO auth.identities (
  id, --1
  user_id, --2
  identity_data, --3
  provider, --4
  last_sign_in_at, --5
  created_at, --6
  updated_at --7
) VALUES
	(
    '42e58ca1-2eb8-4651-93c2-cefba2e32f42', --12
    '42e58ca1-2eb8-4651-93c2-cefba2e32f42'::uuid, --2
    '{"sub": "42e58ca1-2eb8-4651-93c2-cefba2e32f42"}', --3
    'email', --4
    '2022-06-24T17:23:18.658Z', --5
    '2022-06-24T17:23:18.658Z', --6
    '2022-06-24T17:23:18.658Z' --7
  ),
  (
    'f8b028b8-231b-4c80-abf2-7ca787fe686f', --1
    'f8b028b8-231b-4c80-abf2-7ca787fe686f'::uuid, --2
    '{"sub": "f8b028b8-231b-4c80-abf2-7ca787fe686f"}', --3
    'email', --4
    '2022-06-24T17:22:59.651Z', --5
    '2022-06-24T17:22:59.651Z', --6
    '2022-06-24T17:22:59.651Z' --7
  )

ON CONFLICT (id, provider) DO NOTHING;

