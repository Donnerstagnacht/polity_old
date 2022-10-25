
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
  website = 'wwww.test.com'
where id = '42e58ca1-2eb8-4651-93c2-cefba2e32f42';

update public.profiles_counters
set
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
  website = 'wwww.test2.com'
where id = 'f8b028b8-231b-4c80-abf2-7ca787fe686f';

update public.profiles_counters
set
  amendment_counter = 0,
  follower_counter = 1,
  following_counter = 2,
  groups_counter = 2
where id = 'f8b028b8-231b-4c80-abf2-7ca787fe686f';
