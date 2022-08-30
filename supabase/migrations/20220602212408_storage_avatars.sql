-- Set up Storage!
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true);
-- 1.1 CREATE
DROP POLICY IF EXISTS "Anyone can upload an avatar." ON storage.objects;
create policy "Anyone can upload an avatar."
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars'
    --and auth.role() = 'authenticated'
  );

-- 1.2 READ
DROP POLICY IF EXISTS "Authenticated user can access avatar images." ON storage.objects;
create policy "Authenticated user can access avatar images."
  ON storage.objects
  FOR select
  TO authenticated
  USING (
    bucket_id = 'avatars'
    --and auth.role() = 'authenticated'
  );

-- 1.3 UPDATE
DROP POLICY IF EXISTS "Nobody can update avatar images." ON storage.objects;
create policy "Nobody can update avatar images."
  ON storage.objects
  FOR UPDATE
  --TO authenticated
  USING ( false );

-- 1.4 DELETE
DROP POLICY IF EXISTS "Only owner can delete their avatar images." ON storage.objects;
create policy "Only owner can delete their avatar images."
  ON storage.objects
  FOR DELETE
  --TO authenticated
  USING ( auth.uid() = owner );



