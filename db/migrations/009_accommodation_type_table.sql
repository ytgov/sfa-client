CREATE TABLE sfa.accommodation_type (
	id int NOT NULL IDENTITY(1,1),
	description nvarchar(200) NOT NULL,
	is_active bit NOT NULL DEFAULT (1)
);

SET IDENTITY_INSERT sfa.accommodation_type ON
INSERT INTO [sfa].[accommodation_type] (id, description) VALUES (1, 'Living at Parents')
INSERT INTO [sfa].[accommodation_type] (id, description) VALUES (2, 'Living on Own')
INSERT INTO [sfa].[accommodation_type] (id, description) VALUES (3, 'Both')
SET IDENTITY_INSERT sfa.accommodation_type OFF