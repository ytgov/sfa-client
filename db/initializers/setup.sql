/*

Enter custom T-SQL here that would run after SQL Server has started up.

*/

IF NOT EXISTS (
    SELECT name
    FROM sys.databases
    WHERE name = N'SFADB_DEV'
)
RESTORE DATABASE SFADB_DEV FROM DISK = N'backups/sfa.bak';

IF NOT EXISTS (
    SELECT name
    FROM sys.databases
    WHERE name = N'sfa_client_test'
)
RESTORE DATABASE sfa_client_test FROM DISK = N'backups/sfa.bak'
WITH MOVE 'SFADB' TO '/var/opt/mssql/data/sfa_client_test.mdf',
MOVE 'SFADB_log' TO '/var/opt/mssql/data/sfa_client_test_log.ldf';
GO
