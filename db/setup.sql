/*

Enter custom T-SQL here that would run after SQL Server has started up.

*/

IF NOT EXISTS (
    SELECT name
    FROM sys.databases
    WHERE name = N'SFADB_DEV'
)
CREATE DATABASE SFADB_DEV;
GO

IF NOT EXISTS (
    SELECT name
    FROM sys.databases
    WHERE name = N'sfa_client_test'
)
CREATE DATABASE sfa_client_test;
GO
