  ALTER TABLE [sfa].[application_draft] ADD [submit_date] DATETIME2(0) NULL;
  ALTER TABLE [sfa].[application_draft] ADD [status] NVARCHAR(200) NULL DEFAULT 'In Progress'; 