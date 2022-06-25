alter table
  profiles
add column
  fts tsvector generated always as (to_tsvector('german', name || ' ' || city)) stored;

create index profiles_fts on profiles using gin (fts); -- generate the index

select id, fts
from profiles;
