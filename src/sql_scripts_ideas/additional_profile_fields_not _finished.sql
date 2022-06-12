alter table public.profiles
add levelLocal boolean default false,
add levelRegional boolean default false,
add levelFederal boolean default false,
add topics arr default '',
add lastContribution date default current_date
