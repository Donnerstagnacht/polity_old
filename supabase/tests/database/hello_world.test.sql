begin;
select plan(1); -- only one statement to run

SELECT has_column(
    'public',
    'groups',
    'id',
    'id should exist'
);

select * from finish();
rollback;