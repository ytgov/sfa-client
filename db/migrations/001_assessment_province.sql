-- add refrence to province table by id
ALTER TABLE sfa.assessment ADD parent_province_id INT NULL REFERENCES sfa.province;

-- remove the old varchar 
ALTER TABLE sfa.assessment DROP COLUMN parent_province;
