-- Set up Storage!
delete from storage.buckets;
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true);
