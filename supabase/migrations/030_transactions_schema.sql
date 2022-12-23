-- Creates a "transaction" schema which is not accessible to the API to protect functions
-- and make sure thy can only be called by fullfilling all function calls of a transaction

CREATE SCHEMA IF NOT EXISTS transactions;
--GRANT USAGE ON SCHEMA transactions TO postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA transactions TO postgres;
--GRANT ALL ON ALL FUNCTIONS IN SCHEMA transactions TO postgres;
