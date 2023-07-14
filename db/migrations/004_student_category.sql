ALTER TABLE [sfa].[student_category] ADD [sort_order] INT NULL;
GO

DECLARE @uq VARCHAR(200)
SET @uq = (SELECT top (1) name FROM sys.objects WHERE type = 'UQ' AND OBJECT_NAME(parent_object_id) = N'student_category');  
EXEC('ALTER TABLE [sfa].[student_category] DROP CONSTRAINT ' + @uq)
GO  

UPDATE [sfa].[student_category] SET [sort_order] = 99;
UPDATE [sfa].[student_category] SET [is_active] = 0;

INSERT INTO [sfa].[student_category] ( [code], [description], [sort_order], [is_active])
VALUES ('IND', 'I have not been out of high school for more than 4 years, but I have been in the labour force for two periods of 12 consecutive months', 4, 1)

UPDATE [sfa].[student_category] SET [sort_order] = 1, [is_active] = 1, [description] = 'I am married/common-law' WHERE [id] = 2;
UPDATE [sfa].[student_category] SET [sort_order] = 2, [is_active] = 1, [description] = 'I am a single parent' WHERE [id] = 8;
UPDATE [sfa].[student_category] SET [sort_order] = 3, [is_active] = 1, [description] = 'I have been out of high school for more than 4 years' WHERE [id] = 9;
UPDATE [sfa].[student_category] SET [sort_order] = 5, [is_active] = 1, [description] = 'I have not been out of high school for more than 4 years' WHERE [id] = 1;
