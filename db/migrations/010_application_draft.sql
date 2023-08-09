ALTER TABLE [sfa].[application_draft] ADD [application_id] INT NULL;

ALTER TABLE [sfa].[application] ADD [has_last_travel] INT NULL;
ALTER TABLE [sfa].[application] ADD [last_travel_year] INT NULL;
ALTER TABLE [sfa].[application] ADD [last_travel_month] INT NULL;
