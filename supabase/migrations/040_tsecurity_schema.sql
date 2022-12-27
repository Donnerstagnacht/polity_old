-- Creates a "securityrules" schema which is not accessible to the API to protect functions
-- It should store helper functions for "Row Level Security" Policies

CREATE SCHEMA IF NOT EXISTS securityrules;
--GRANT USAGE ON SCHEMA transactions TO postgres;
GRANT ALL ON SCHEMA securityrules TO postgres;
--GRANT ALL ON ALL FUNCTIONS IN SCHEMA transactions TO postgres;
