ALTER TABLE [sfa].[msfaa] ADD [rec_create_date] DATETIME2(0) NOT NULL DEFAULT GETDATE(); 
ALTER TABLE [sfa].[msfaa] ADD [rec_last_mod_date] DATETIME2(0) NULL; 