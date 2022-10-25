-- Set up Storage!
delete from storage.objects CASCADE;
delete from storage.buckets CASCADE;
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true);
