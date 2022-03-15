
CREATE TABLE [dbo].[inst_camp](
	[INSTITUTION_ID] [smallint] NOT NULL,
	[NAME] [nvarchar](200) NOT NULL,
	[INSTITUTION_CODE] [nvarchar](50) NOT NULL,
	[IS_ACTIVE_FLG] [bit] NOT NULL,
	[INSTITUTION] [nvarchar](200) NOT NULL,
	[CAMPUS] [nvarchar](100) NULL,
	[Status] [nvarchar](50) NULL,
	[NEW_ID] [bigint] NOT NULL,
	[CAMP_ID] [bigint] NOT NULL
) ON [PRIMARY]
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1748, N'AB Dog Grooming School - DEDESIGNATED', N'BPJS', 0, N'AB Dog Grooming School', N'Alberta', N'Dedesignated', 1, 1)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1162, N'Academy Canada - CHGD ADDRESS', N'JPAY', 0, N'Academy Canada', NULL, N'Changed Address', 2, 2)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3109, N'Academy of Classical Oriental Sciences', N'APQY', 1, N'Academy of Classical Oriental Sciences', NULL, NULL, 3, 3)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2602, N'Academy of Excellence', N'APBJ', 1, N'Academy of Excellence', NULL, NULL, 4, 4)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (393, N'Academy of Excellence Victoria - CHGD ADDRESS', N'APBJ', 0, N'Academy of Excellence', N'Victoria', N'Changed Address', 4, 5)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2392, N'Academy of Fashion Design', N'CPHR', 1, N'Academy of Fashion Design', NULL, NULL, 5, 6)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4909, N'Academy of Learning - Nanaimo', N'APMT', 1, N'Academy of Learning', N'Nanaimo', NULL, 6, 7)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3345, N'Academy of Learning - Red Deer', N'BPII', 1, N'Academy of Learning', N'Red Deer', NULL, 6, 8)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3742, N'Academy of Learning - Williams Lake', N'APWC', 1, N'Academy of Learning', N'Williams Lake', NULL, 6, 9)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1966, N'Academy of Learning Campbell River - CLOSURE', N'AQBD', 0, N'Academy of Learning', N'Campbell River', N'Closure', 6, 10)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (440, N'Academy of Learning Kelowna - CLOSURE', N'APKO', 0, N'Academy of Learning', N'Kelowna', N'Closure', 6, 11)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (395, N'Academy of Learning Medicine Hat - CLOSURE', N'BPIE', 0, N'Academy of Learning', N'Medicine Hat', N'Closure', 6, 12)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (441, N'Academy of Learning Moncton - CLOSURE', N'GPBU', 0, N'Academy of Learning', N'Moncton', N'Closure', 6, 13)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (439, N'Academy of Learning Red Deer - CHGD ADDRESS', N'BPII', 0, N'Academy of Learning', N'Red Deer', N'Changed Address', 6, 14)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2362, N'Academy of Professional Hair Design', N'BPTJ', 1, N'Academy of Professional Hair Design', NULL, NULL, 7, 15)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2498, N'Acadia University', N'HUAA', 1, N'Acadia University', NULL, NULL, 8, 16)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (400, N'Acadia University - CHGD ADDRESS', N'HUAA', 0, N'Acadia University', NULL, N'Changed Address', 8, 17)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (401, N'Action Aviation - CLOSURE', N'LPAA', 0, N'Action Aviation', NULL, N'Closure', 9, 18)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1290, N'Actor''s Working Academy - CLOSURE', N'AQAN', 0, N'Actor''s Working Academy', NULL, N'Closure', 10, 19)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4766, N'Adler University', N'APRY', 1, N'Adler University', NULL, NULL, 11, 20)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (402, N'Advanced School of Hair Design - CLOSURE', N'APDR', 0, N'Advanced School of Hair Design', NULL, N'Closure', 12, 21)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1672, N'Alberta Academy of Aesthetics', N'BPCO', 1, N'Alberta Academy of Aesthetics', NULL, NULL, 13, 22)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4879, N'Alberta Business and Educational Services College', N'BPQF', 1, N'Alberta Business and Educational Services College', NULL, NULL, 14, 23)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (403, N'Alberta College of Art Calgary - DO NOT USE', N'BVAY', 1, N'Alberta College of Art Calgary', NULL, N'Do Not Use', 15, 24)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1397, N'Alberta College of First Aid Training - CHGD ADDRESS', N'BPTH', 0, N'Alberta College of First Aid Training', NULL, N'Changed Address', 16, 25)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5195, N'Alberta College of Massage Therapy - Calgary', N'BPGY', 1, N'Alberta College of Massage Therapy', N'Calgary', NULL, 17, 26)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3993, N'Alberta College of Massage Therapy - Edmonton', N'BPTO', 1, N'Alberta College of Massage Therapy', N'Edmonton', NULL, 17, 27)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (404, N'Alberta Institute of Massage - CHGD ADDRESS', N'BPIQ', 0, N'Alberta Institute of Massage', NULL, N'Changed Address', 18, 28)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3465, N'Alberta School of Dog Grooming', N'BPNB', 1, N'Alberta School of Dog Grooming', NULL, NULL, 19, 29)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (405, N'Alberta School of Electrolysis - CHGD ADDRESS', N'BPCO', 0, N'Alberta School of Electrolysis', NULL, N'Changed Address', 20, 30)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (596, N'Alberta School of Radiation Therapy', N'BNAP', 1, N'Alberta School of Radiation Therapy', NULL, NULL, 21, 31)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5535, N'Alberta University of the Arts', N'BVAY', 1, N'Alberta University of the Arts', NULL, NULL, 22, 32)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (406, N'Alberta Vocational Centre Calgary - CLOSURE', N'BVAB', 0, N'Alberta Vocational Centre', N'Calgary', N'Closure', 23, 33)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (442, N'Alberta Vocational Centre Edmonton - CLOSURE', N'BVAE', 0, N'Alberta Vocational Centre', N'Edmonton', NULL, 23, 34)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5511, N'Alexander College', N'APUF', 1, N'Alexander College', NULL, NULL, 24, 35)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1905, N'Alexandria VoTech - NOT DESIGNATED', N'NULL', 0, N'Alexandria VoTech', NULL, N'Not Designated', 25, 36)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (407, N'Algoma University College', N'EUAA', 1, N'Algoma University College', NULL, NULL, 26, 37)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5344, N'Algonquin Careers Academy - Ottawa', N'EPGP', 1, N'Algonquin Careers Academy', N'Ottawa', NULL, 27, 38)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (443, N'Algonquin College Nepean - CLOSURE', N'EVAA', 0, N'Algonquin College of Arts', N'Nepean', N'Closure', 28, 39)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1794, N'Algonquin College of Arts Ottawa', N'EVAA', 1, N'Algonquin College of Arts', N'Ottawa', NULL, 28, 40)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1974, N'Algonquin College Perth - CLOSURE', N'EVAA', 0, N'Algonquin College of Arts', N'Perth', N'Closure', 28, 41)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3339, N'Alive Academy - NOT DESIGNATED', N'NULL', 0, N'Alive Academy', NULL, N'Not Designated', 29, 42)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4664, N'Alkan Air Flight Training', N'LPAH', 1, N'Alkan Air Flight Training', NULL, NULL, 30, 43)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (526, N'Alliance College Ltd - CLOSURE', N'BPSV', 0, N'Alliance College Ltd', NULL, N'Closure', 31, 44)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (408, N'Ambassador University - CLOSURE', N'MPHH', 0, N'Ambassador University', NULL, N'Closure', 32, 45)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2376, N'Ambrose University', N'BPSV', 1, N'Ambrose University', NULL, NULL, 33, 46)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2160, N'Ambrose University College CHGD ADDRESS', N'BPSV', 0, N'Ambrose University', N'College', N'Changed Address', 33, 47)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1869, N'American Academy of Dramtic Arts - INACTIVE', N'MSAY', 0, N'American Academy of Dramtic Arts', NULL, NULL, 34, 48)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4637, N'American Public University System', N'MXNK', 1, N'American Public University System', NULL, NULL, 35, 49)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3257, N'American University', N'MUAQ', 1, N'American University', NULL, NULL, 36, 50)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2447, N'American University - DEDESIGNATED', N'MUAQ', 0, N'American University', NULL, N'Dedesignated', 36, 51)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3586, N'Amherst College', N'MUAR', 1, N'Amherst College', NULL, NULL, 37, 52)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (409, N'Anchorage Community College - INACTIVE', N'MJPH', 0, N'Anchorage Community College', NULL, NULL, 38, 53)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1836, N'Andrew Jackson University - INACTIVE', N'MXGY', 0, N'Andrew Jackson University', NULL, NULL, 39, 54)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (411, N'Anglo-European College of Chiropractic - INACTIVE', N'PUAB', 0, N'Anglo-European College of Chiropractic', NULL, NULL, 40, 55)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2744, N'Animation Mentor.Com - NOT DESIGNATED', N'NULL', 0, N'Animation Mentor.Com', NULL, N'Not Designated', 41, 56)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (412, N'Applied Multimedia Training Centre - CLOSURE', N'BVBJ', 0, N'Applied Multimedia Training Centre', NULL, N'Closure', 42, 57)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (419, N'Arctic College Iqaluit - CHGD ADDRESS', N'WPAA', 0, N'Arctic College Iqaluit', NULL, N'Changed Address', 43, 58)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3454, N'Arizona State University', N'MUBB', 1, N'Arizona State University', NULL, NULL, 44, 59)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1075, N'Arizona State University - CHGD ADDRESS', N'MUBB', 0, N'Arizona State University', NULL, N'Changed Address', 44, 60)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1147, N'Arrowsmith School', N'NULL', 0, N'Arrowsmith School', NULL, NULL, 45, 61)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2036, N'Art Institute of Pittsburgh', N'MQCW', 1, N'Art Institute of Pittsburgh', NULL, NULL, 46, 62)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1679, N'Art Institute of Vancouver - Burnaby - CHANGED', N'APCY', 0, N'Art Institute of Vancouver', N'Burnaby', N'Changed Address', 47, 63)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2505, N'Art Institute of Vancouver - Vancouver', N'APZC', 1, N'Art Institute of Vancouver', N'Vancouver', NULL, 47, 64)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2606, N'Art Institute of Vancouver Burnaby - DUPLICATE', N'APCY', 0, N'Art Institute of Vancouver', N'Burnaby', N'Duplicate', 47, 65)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3786, N'Artists Within Makeup Academy', N'BPMK', 1, N'Artists Within Makeup Academy', NULL, NULL, 48, 66)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3813, N'Ashton College', N'APZE', 1, N'Ashton College', NULL, NULL, 49, 67)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5554, N'Ashworth College - NOT DESIGNATED', N'MPGK', 1, N'Ashworth College', NULL, N'Not Designated', 50, 68)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (420, N'Assiniboine Community College', N'DVAA', 1, N'Assiniboine Community College', NULL, NULL, 51, 69)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (421, N'Athabasca University', N'BUAB', 1, N'Athabasca University', NULL, NULL, 52, 70)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1104, N'Athabasca University Lethbridge NOT DESIGNATED', N'BUAB', 0, N'Athabasca University', N'Lethbridge', N'Not Designated', 52, 71)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (423, N'Augustana University College - DEDESIGNATED', N'BUAN', 0, N'Augustana University College', NULL, N'Dedesignated', 53, 72)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3872, N'Aurora College - Yellowknife', N'KVAD', 1, N'Aurora College', N'Yellowknife', NULL, 54, 73)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (445, N'Aurora College Fort Smith - INACTIVE', N'KVAA', 0, N'Aurora College', N'Fort Smith', NULL, 54, 74)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (424, N'Aurora College Inuvik', N'KVAC', 1, N'Aurora College', N'Inuvik', NULL, 54, 75)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (444, N'Aurora College Yellowknife CHGD ADDRESS', N'KVAD', 0, N'Aurora College', N'Yellowknife', N'Changed Address', 54, 76)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2610, N'Aurora Dental College', N'', 1, N'Aurora Dental College', NULL, NULL, 55, 77)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3249, N'Australian Catholic University - INACTIVE', N'VURZ', 0, N'Australian Catholic University', NULL, NULL, 56, 78)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2355, N'Automotive Training Centre', N'APOF', 1, N'Automotive Training Centre', NULL, NULL, 57, 79)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (808, N'Aveda institute', N'APON', 0, N'Aveda institute', N'Victoria', NULL, 58, 80)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3434, N'Aveda Institute - Calgary', N'BPNT', 1, N'Aveda institute', N'Calgary', N'Calgary', 58, 81)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1063, N'Aveda Institute - Victoria', N'APON', 1, N'Aveda institute', N'Victoria', N'Victoria', 58, 82)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1994, N'Aveda Institute Toronto', N'EPMI', 1, N'Aveda institute', N'Toronto', NULL, 58, 83)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3578, N'Aveda Institute Vancouver', N'APVQ', 1, N'Aveda institute', N'Vancouver', NULL, 58, 84)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1174, N'Avola College of Hair & Esthetics', N'EPFO', 1, N'Avola College of Hair & Esthetics', NULL, NULL, 59, 85)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (426, N'Banff Centre of Fine Arts - CLOSURE', N'BVAP', 0, N'Banff Centre of Fine Arts', NULL, N'Closure', 60, 86)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1045, N'BC Open University - CLOSURE', N'AVAR', 0, N'BC Open University', NULL, N'Closure', 61, 87)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (425, N'BCIT', N'AVAA', 1, N'BCIT', NULL, NULL, 62, 88)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3959, N'Bella Elite Academy Ltd', N'BPOO', 1, N'Bella Elite Academy Ltd', NULL, N'Chayged Ltd', 63, 89)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2501, N'Ben Gurion University - INACTIVE', N'RUAO', 0, N'Ben Gurion University', NULL, NULL, 64, 90)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2145, N'Ben Gurion University of Negev - DUPLICATE', N'RUAO', 0, N'Ben Gurion University', N'Negev', N'Duplicate', 64, 91)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5226, N'Berklee College of Music', N'MUCO', 1, N'Berklee College of Music', NULL, NULL, 65, 92)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4796, N'Berlin Dance Institute', N'', 0, N'Berlin Dance Institute', NULL, NULL, 66, 93)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2275, N'Bethany Bible College - DEDESIGNATED', N'GPAB', 0, N'Bethany Bible College', NULL, N'Dedesignated', 67, 94)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2740, N'Beyond Adventure - Sport Tourism', N'', 1, N'Beyond Adventure - Sport Tourism', NULL, NULL, 68, 95)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2233, N'Bishop''s University', N'FUAA', 1, N'Bishop''s University', NULL, NULL, 69, 96)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (427, N'Bishop''s University - CHANGED', N'FUAA', 0, N'Bishop''s University', NULL, N'Changed Address', 69, 97)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (446, N'Blanche MacDonald Centre', N'APBE', 1, N'Blanche MacDonald Centre', NULL, NULL, 70, 98)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1693, N'Blekinge Institute of Technology - INACTIVE', N'QUXG', 0, N'Blekinge Institute of Technology', NULL, NULL, 71, 99)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3658, N'Blue Quills First Nations College', N'BPJP', 1, N'Blue Quills First Nations College', NULL, NULL, 72, 100)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (447, N'Bodenseehof - DEDESIGNATED', N'QPCL', 0, N'Bodenseehof', NULL, N'Dedesignated', 73, 101)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4362, N'Bond University', N'VPAH', 1, N'Bond University', NULL, NULL, 74, 102)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1009, N'Booth University College', N'DPAP', 1, N'Booth University College', NULL, NULL, 75, 103)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2211, N'Boucher Institute of Naturopathic Medicine', N'APYL', 1, N'Boucher Institute of Naturopathic Medicine', NULL, NULL, 76, 104)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1931, N'Boucher Institute of Naturopathic Medicine - DUPLICATE', N'APYL', 0, N'Boucher Institute of Naturopathic Medicine', NULL, N'Duplicate', 76, 105)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3846, N'Bournemouth University', N'PUGU', 1, N'Bournemouth University', NULL, NULL, 77, 106)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1659, N'Bow Valley College', N'BJAP', 1, N'Bow Valley College', NULL, NULL, 78, 107)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1078, N'Bow Valley College - CLOSURE', N'BVAB', 0, N'Bow Valley College', NULL, N'Closure', 78, 108)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (448, N'Brandon University', N'DUAA', 1, N'Brandon University', NULL, NULL, 80, 109)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2548, N'Bredin College of Business and Health Care - Spruce Grove', N'BPLR', 1, N'Bredin College of Business and Health Care', N'Spruce Grove', NULL, 81, 110)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (449, N'Briercrest Bible College', N'CPAC', 1, N'Briercrest Bible College', NULL, NULL, 82, 111)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (456, N'Brigham Young University Hawaii', N'MWXG', 1, N'Brigham Young University', N'Hawaii', NULL, 83, 112)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (450, N'Brigham Young University Idaho', N'MJJB', 1, N'Brigham Young University', N'Idaho', NULL, 83, 113)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (458, N'Brigham Young University Utah', N'MUDP', 1, N'Brigham Young University', N'Utah', NULL, 83, 114)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5221, N'Brighton College - Burnaby', N'AQBE', 1, N'Brighton College', N'Burnaby', N'Burnaby', 84, 115)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1764, N'British Columbia Helicopters', N'APSX', 1, N'British Columbia Helicopters', NULL, NULL, 85, 116)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2618, N'Brno University of Technology', N'', 0, N'Brno University of Technology', NULL, N'Chayged Technology', 86, 117)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (459, N'Brock University', N'EUBD', 1, N'Brock University', NULL, NULL, 87, 118)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (460, N'Brown University', N'MUDS', 1, N'Brown University', NULL, NULL, 88, 119)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (461, N'Brownsville Revival School of Ministry', N'', 1, N'Brownsville Revival School of Ministry', NULL, NULL, 89, 120)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2826, N'Brunel University', N'', 0, N'Brunel University', NULL, N'Changed University', 90, 121)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (534, N'Burman University', N'BJAB', 1, N'Burman University', NULL, NULL, 91, 122)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (464, N'Cabot Institute - CHANGED', N'JVAB', 0, N'Cabot Institute', NULL, N'Changed Address', 92, 123)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (465, N'Cabrillo College', N'MJBD', 1, N'Cabrillo College', NULL, NULL, 93, 124)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (466, N'Calgary Flight Training Centre - DEDESIGNATED', N'BPEO', 0, N'Calgary Flight Training Centre', NULL, N'Dedesignated', 94, 125)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (467, N'Cambrian College', N'EVBH', 1, N'Cambrian College', NULL, NULL, 95, 126)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (523, N'Camosun College - All Campuses', N'AJBH', 1, N'Camosun College', N'All Campuses', N'All Campuses', 96, 127)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (468, N'Camosun College - Lansdowne - DO NOT USE', N'AJAA', 0, N'Camosun College', N'Lansdowne', N'Do Not Use', 96, 128)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4886, N'Can-Fit-Pro', N'', 0, N'Can-Fit-Pro', NULL, NULL, 97, 129)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (525, N'Canadian Accupressure Institute - DEDESIGNATED', N'APOW', 0, N'Canadian Accupressure Institute', NULL, N'Dedesignated', 98, 130)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3758, N'Canadian Career College of Innovative Technology and Management', N'EPEC', 1, N'Canadian Career College of Innovative Technology and Management', NULL, NULL, 99, 131)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (529, N'Canadian College of Acupunture & Oriental Medicine - DEDESIGNATED', N'APNB', 0, N'Canadian College of Acupunture & Oriental Medicine', NULL, N'Dedesignated', 100, 132)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (527, N'Canadian College of Business & Language - DEDESIGNATED', N'APOI', 0, N'Canadian College of Business & Language', NULL, N'Dedesignated', 101, 133)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4818, N'Canadian College of Health, Science & Technology', N'EQIY', 1, N'Canadian College of Health, Science & Technology', NULL, NULL, 102, 134)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3752, N'Canadian College of Massage & Hydrotherapy - Cambridge', N'EQIZ', 1, N'Canadian College of Massage & Hydrotherapy', N'Cambridge', NULL, 103, 135)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1374, N'Canadian College of Massage & Hydrotherapy - DUPLLICATE', N'HPFB', 0, N'Canadian College of Massage & Hydrotherapy', N'Halifax', N'Dupllicate', 103, 136)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3325, N'Canadian College of Massage & Hydrotherapy - Halifax', N'HPFB', 1, N'Canadian College of Massage & Hydrotherapy', N'Halifax', N'Halifax', 103, 137)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3327, N'Canadian College of Massage & Hydrotherapy - Toronto', N'EQDB', 1, N'Canadian College of Massage & Hydrotherapy', N'Toronto', N'Toronto', 103, 138)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (528, N'Canadian College of Performing Arts', N'APYB', 1, N'Canadian College of Performing Arts', NULL, NULL, 104, 139)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3809, N'Canadian Health Care Academy - Surrey', N'APQU', 1, N'Canadian Health Care Academy', N'Surrey', N'Chayged Surrey', 105, 140)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2237, N'Canadian Institute of Floral Design', N'JJJJ', 0, N'Canadian Institute of Floral Design', NULL, NULL, 106, 141)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2622, N'Canadian Institution of Natural Health and Healing - DEDESIGNATED', N'APCH', 0, N'Canadian Institution of Natural Health and Healing', NULL, N'Dedesignated', 107, 142)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (530, N'Canadian Memorial Chiropractic College', N'EPCK', 1, N'Canadian Memorial Chiropractic College', NULL, NULL, 108, 143)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2135, N'Canadian Mennonite University', N'DUAK', 1, N'Canadian Mennonite University', NULL, NULL, 109, 144)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (531, N'Canadian Nazarene College - DEDESIGNATED', N'BPIB', 0, N'Canadian Nazarene College', NULL, N'Dedesignated', 110, 145)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (532, N'Canadian Outdoor Leadership Training Centre', N'APRM', 1, N'Canadian Outdoor Leadership Training Centre', NULL, NULL, 111, 146)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1989, N'Canadian School of Modern Broadcasting - SUSPENDED', N'BPKR', 0, N'Canadian School of Modern Broadcasting', NULL, N'Suspended', 112, 147)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (551, N'Canadian School of Modern Broadcasting - SUSPENDED1', N'BPKR', 0, N'Canadian School of Modern Broadcasting', NULL, N'Suspended', 112, 148)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2438, N'Canadian School of Natural Nutrition - DEDESIGNATED', N'AQAV', 0, N'Canadian School of Natural Nutrition', NULL, N'Dedesignated', 113, 149)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3920, N'Canadian School of Natural Nutrition - Moncton', N'GPKM', 1, N'Canadian School of Natural Nutrition', N'Moncton', NULL, 113, 150)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4869, N'Canadian School of Natural Nutrition - Vancouver Island', N'AQEJ', 1, N'Canadian School of Natural Nutrition', N'Vancouver Island', NULL, 113, 151)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1166, N'Canadian Tourism College', N'APEY', 1, N'Canadian Tourism College', N'Vancouver', NULL, 114, 152)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4876, N'Canadian Tourism College - Surrey', N'APIC', 1, N'Canadian Tourism College', N'Surrey', NULL, 114, 153)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (533, N'Canadian Travel School', N'APIC', 1, N'Canadian Travel School', NULL, NULL, 115, 154)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (535, N'Canadore College', N'EVAD', 1, N'Canadore College', NULL, NULL, 116, 155)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2687, N'Canscribe Career Centre', N'APUJ', 1, N'Canscribe Career Centre', NULL, NULL, 117, 156)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (932, N'Cape Breton University', N'HUAJ', 1, N'Cape Breton University', NULL, NULL, 118, 157)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4563, N'Capella University', N'MQXG', 1, N'Capella University', NULL, NULL, 119, 158)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1080, N'Capernwray Bible School - DEDESIGNATED', N'PPEA', 0, N'Capernwray Bible School', NULL, N'Dedesignated', 120, 159)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (536, N'Capernwray Bible School Australia - INACTIVE', N'VPAG', 0, N'Capernwray Bible School', N'Australia', NULL, 120, 160)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (537, N'Capernwray Bible School England - DEDESIGNATED', N'PPEA', 0, N'Capernwray Bible School', N'England', N'Dedesignated', 120, 161)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (538, N'Capernwray Harbour Bible School - CLOSURE', N'APET', 0, N'Capernwray Harbour Bible School', NULL, N'Closure', 121, 162)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (539, N'Capilano College - CHANGED', N'AJAB', 0, N'Capilano College', NULL, N'Changed Address', 122, 163)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2465, N'Capilano University', N'AUAV', 1, N'Capilano University', NULL, NULL, 123, 164)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (540, N'Career Academy (The) - CLOSURE', N'JPCT', 0, N'Career Academy (The)', NULL, N'Closure', 124, 165)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (541, N'Career College - DEDESIGNATED', N'BPDM', 0, N'Career College', NULL, N'Dedesignated', 125, 166)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (543, N'Career Development Institute Abbotsford - DEDESIGNATED', N'APPA', 0, N'Career Development Institute', N'Abbotsford', N'Dedesignated', 126, 167)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (542, N'Career Development Institute Surrey', N'APIM', 1, N'Career Development Institute', N'Surrey', NULL, 126, 168)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (545, N'Carleton Trail Regional College', N'CJAA', 1, N'Carleton Trail Regional College', NULL, NULL, 127, 169)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (547, N'Carleton University', N'EUAE', 1, N'Carleton University', NULL, NULL, 128, 170)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2765, N'Case Western Reserve University', N'MUFL', 1, N'Case Western Reserve University', NULL, N'Chayged University', 129, 171)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3613, N'Casper College', N'MJBH', 1, N'Casper College', NULL, NULL, 130, 172)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1555, N'Castlebar - VTOS', N'ZZZZ', 0, N'Castlebar', NULL, NULL, 131, 173)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3608, N'Castleton State University', N'MUFM', 1, N'Castleton State University', NULL, NULL, 132, 174)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2580, N'CCMH Foothills College of Massage Therapy - Calgary - CLOSURE', N'BPKU', 0, N'CCMH Foothills College of Massage Therapy', N'Calgary', N'Closure', 133, 175)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (549, N'CDI - College of Business & Technology Edmonton - DEDESIGNATED', N'BPFN', 0, N'CDI - College of Business & Technology', N'Edmonton', N'Dedesignated', 134, 176)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (548, N'CDI - College of Business & Technology Halifax - CLOSURE', N'HPBL', 0, N'CDI - College of Business & Technology', N'Halifax', N'Closure', 134, 177)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2202, N'CDI Career Dev. Institute - CHANGED', N'APIN', 0, N'CDI Career Dev. Institute', NULL, N'Changed Address', 135, 178)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3157, N'CDI College - Burnaby', N'APIN', 1, N'CDI College', N'Burnaby', NULL, 136, 179)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3580, N'CDI College - Calgary City Centre', N'BPLB', 1, N'CDI College', N'Calgary City Centre', NULL, 136, 180)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3172, N'CDI College - Edmonton', N'BPLD', 1, N'CDI College', N'Edmonton', NULL, 136, 181)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4903, N'CDI College - Edmonton North', N'BPLE', 1, N'CDI College', N'Edmonton North', NULL, 136, 182)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3391, N'CDI College - Edmonton West Campus', N'BPMV', 1, N'CDI College', N'Edmonton West', NULL, 136, 183)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5229, N'CDI College - Mississauga', N'EPFS', 1, N'CDI College', N'Mississauga', NULL, 136, 184)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1818, N'CDI College - Surrey', N'APIM', 1, N'CDI College', N'Surrey', NULL, 136, 185)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5237, N'CDI College - Toronto', N'EPWH', 1, N'CDI College', N'Toronto', NULL, 136, 186)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3830, N'CDI College - Victoria', N'APSH', 1, N'CDI College', N'Victoria', NULL, 136, 187)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4568, N'CDI College - Winnipeg', N'DPDO', 1, N'CDI College', N'Winnipeg', NULL, 136, 188)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (594, N'CDI College of Business', N'APBX', 1, N'CDI College', NULL, NULL, 136, 189)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1417, N'CDI College Ottawa - DEDESIGNATED', N'EQCZ', 0, N'CDI College', N'Ottawa', N'Dedesignated', 136, 190)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1502, N'CDI College Vancouver', N'APBX', 1, N'CDI College', N'Vancouver', NULL, 136, 191)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (550, N'CDI College- Calgary - DEDESIGNATED', N'BPIC', 0, N'CDI College', N'Calgary', N'Dedesignated', 136, 192)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3880, N'CDI College- Richmond', N'APUW', 1, N'CDI College', N'Richmond', NULL, 136, 193)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1320, N'Cegep de Drummondville', N'FJAE', 1, N'Cegep de Drummondville', N'Drummondville', NULL, 137, 194)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1431, N'Cegep de Jonquiere', N'FJAN', 1, N'Cegep de Jonquiere', N'Jonquiere', NULL, 138, 195)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3235, N'Cegep de l''Abitibi-Temiscamingue - INACTIVE', N'FJBF', 0, N'Cegep de l''Abitibi-Temiscamingue', NULL, NULL, 139, 196)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3929, N'CEGEP de l''Outaouais', N'FJAL', 1, N'Cegep de L''Outaouais', N'l''Outaouais', NULL, 140, 197)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1321, N'Cegep de L''Outaouais', N'', 0, N'Cegep de L''Outaouais', N'L''Outaouais', NULL, 140, 198)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1490, N'Cegep De Limoilou', N'FJAT', 1, N'Cegep De Limoilou', N'Limoilou', NULL, 141, 199)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (552, N'Cegep de Saint Jerome - INACTIVE', N'FJAQ', 0, N'Cegep de Saint Jerome', N'Saint Jerome', NULL, 142, 200)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2128, N'Cegep de Sainte Foy', N'FJBH', 1, N'Cegep de Sainte Foy', N'Sainte Foy', NULL, 143, 201)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3903, N'Cegep du Vieux Montreal', N'FJBO', 1, N'Cegep du Vieux Montreal', N'Montreal', NULL, 144, 202)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1159, N'Cegep du Vieux Montreal - DEDESIGNATED', N'FJDC', 0, N'Cegep du Vieux Montreal', N'Montreal', N'Dedesignated', 144, 203)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1476, N'Cegep Granby', N'', 0, N'Cegep Granby', N'Granby', NULL, 145, 204)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1415, N'Cegep Marie-Victorin - DEDESIGNATED', N'FPAC', 0, N'Cegep Marie-Victorin', N'Marie-Victorin', N'Dedesignated', 146, 205)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (553, N'Centennial College', N'EVAQ', 1, N'Centennial College', NULL, NULL, 147, 206)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (554, N'Center for Digital Imaging & Sound - DEDESIGNATED', N'APCY', 0, N'Center for Digital Imaging & Sound', NULL, N'Dedesignated', 148, 207)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1343, N'Center for Nursing Studies', N'', 0, N'Center for Nursing Studies', NULL, NULL, 149, 208)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (556, N'Central Community College', N'JVAI', 1, N'Central Community College', NULL, NULL, 150, 209)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (558, N'Central Newfoundland Regional College', N'JVAL', 1, N'Central Newfoundland Regional College', NULL, NULL, 151, 210)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (559, N'Central St. Martins School - DEDESIGNATED', N'PJAH', 0, N'Central St. Martins School', NULL, N'Dedesignated', 152, 211)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3438, N'Centre de Formation Harricana', N'HHHH', 1, N'Centre de Formation Harricana', NULL, NULL, 153, 212)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3836, N'Centre de Formation Professionnelle - Fierbourg', N'FVBL', 1, N'Centre de Formation Professionnelle', N'Fierbourg', NULL, 154, 213)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2683, N'Centre for Arts & Technology - Fredericton', N'GPHX', 1, N'Centre for Arts & Technology', N'Fredericton', NULL, 155, 214)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2582, N'Centre for Arts & Technology - Kelowna', N'APZU', 1, N'Centre for Arts & Technology', N'Kelowna', NULL, 155, 215)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2728, N'Centre for Distance Education', N'HPEU', 1, N'Centre for Distance Education', NULL, NULL, 156, 216)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1926, N'Centre for Distance Education - DUPLICATE', N'HPEU', 0, N'Centre for Distance Education', NULL, N'Duplicate', 156, 217)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1849, N'Centre for Trades & Technology - CLOSURE', N'AQBR', 1, N'Centre for Trades & Technology', NULL, N'Closure', 157, 218)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3245, N'Centro Escolar University', N'UUAA', 1, N'Centro Escolar University', NULL, NULL, 158, 219)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (560, N'Certified General Accounting BC - CLOSURE', N'APEB', 0, N'Certified General Accounting', N'British Columbia', N'Closure', 159, 220)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (563, N'Champlain Regional College Lennoxville - DEDESIGNATED', N'FJBC', 0, N'Champlain Regional College', N'Lennoxville', N'Dedesignated', 160, 221)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (561, N'Champlain Regional College St. Lambert - INACTIVE', N'FJBB', 0, N'Champlain Regional College', N'St. Lambert', NULL, 160, 222)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1953, N'Chinook College', N'', 0, N'Chinook College', NULL, NULL, 161, 223)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1970, N'Chinook Helicopters Ltd  - CHANGED', N'APHN', 0, N'Chinook Helicopters Ltd.', NULL, N'Changed Address', 162, 224)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3016, N'Chinook Helicopters Ltd.', N'APHN', 1, N'Chinook Helicopters Ltd.', NULL, NULL, 162, 225)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (565, N'Chpale Edmonton Secretarial School - CLOSURE', N'BPAD', 0, N'Chpale Edmonton Secretarial School', NULL, N'Closure', 163, 226)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (566, N'Christian Life College - INACTIVE', N'MQBP', 0, N'Christian Life College', NULL, NULL, 164, 227)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3483, N'City University of Seattle', N'APDL', 1, N'City University of Seattle', N'Seattle', NULL, 165, 228)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2679, N'Clayton College of National Health', N'NULL', 0, N'Clayton College of National Health', NULL, NULL, 166, 229)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1087, N'Coast Mountain College', N'AJAL', 1, N'Coast Mountain College', NULL, NULL, 167, 230)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1124, N'College Ahuntsic', N'FJAA', 1, N'College Ahuntsic', NULL, NULL, 168, 231)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3671, N'College de Bois-De-Boulogne', N'FJBV', 1, N'College de Bois-De-Boulogne', N'Boulogne', NULL, 169, 232)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (564, N'College de Saint-Foy', N'FJBH', 1, N'College de Saint-Foy', N'Foy', NULL, 170, 233)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (567, N'College de Sherbrooke', N'FJBK', 1, N'College de Sherbrooke', N'Sherbrooke', NULL, 171, 234)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (571, N'College Inter-Dec', N'FPCY', 1, N'College Inter-Dec', NULL, NULL, 172, 235)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (570, N'College International de Cannes - INACTIVE', N'QUMF', 0, N'College International de Cannes', NULL, NULL, 173, 236)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3267, N'College Jean-De-Brebeuf', N'NULL', 0, N'College Jean-De-Brebeuf', N'Brebeuf', NULL, 174, 237)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1112, N'College of Alma - INACTIVE', N'FJBQ', 0, N'College of Alma', NULL, NULL, 175, 238)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (572, N'College of Business & Technology - CLOSURE', N'CPDK', 0, N'College of Business & Technology', NULL, N'Closure', 176, 239)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (573, N'College of New Caledonia Prince George', N'AJAJ', 1, N'College of New Caledonia', N'Prince George', NULL, 177, 240)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (574, N'College of New Caledonia Quesnel - DEDESIGNATED', N'MVEV', 0, N'College of New Caledonia', N'Quesnel', N'Dedesignated', 177, 241)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5494, N'College of North Atlantic - Happy Valley-Goose Bay Campus', N'JVAN', 1, N'College of North Atlantic', N'Happy Valley-Goose Bay Campus', NULL, 178, 242)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2239, N'College of Piping', N'NULL', 0, N'College of Piping', N'Piping', NULL, 179, 243)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (575, N'College of the Canyons - DEDESIGNATED', N'MVEV', 0, N'College of the Canyons', NULL, N'Dedesignated', 180, 244)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3811, N'College of the North Atlantic - Corner Brook Campus', N'JVAK', 1, N'College of the North Atlantic', N'Corner Brook Campus', NULL, 181, 245)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2670, N'College of the Redwoods - INACTIVE', N'MXAR', 0, N'College of the Redwoods', NULL, NULL, 182, 246)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (498, N'College of the Rockies - All Campuses', N'AJAF', 1, N'College of the Rockies', N'All Campuses', NULL, 183, 247)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1403, N'College of the Rockies - Kimberley Campus', N'AJAF', 0, N'College of the Rockies', N'Kimberley Campus', NULL, 183, 248)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1188, N'College of the Rockies Golden', N'AJAF', 0, N'College of the Rockies', N'Golden', NULL, 183, 249)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (577, N'College of the Rockies Invermere', N'AJAF', 0, N'College of the Rockies', N'Invermere', NULL, 183, 250)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4030, N'Colorado School of Mines', N'MUHC', 1, N'Colorado School of Mines', NULL, NULL, 184, 251)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3308, N'Colorado Technical University - INACTIVE', N'MWHJ', 0, N'Colorado Technical University', NULL, NULL, 185, 252)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (578, N'Columbia Academy - CLOSURE', N'APDE', 0, N'Columbia Academy', NULL, N'Closure', 186, 253)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (579, N'Columbia Bible College', N'APAJ', 1, N'Columbia Bible College', NULL, NULL, 187, 254)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (584, N'Compu College Burnaby - DEDESIGNATED', N'APHA', 0, N'Compu College', N'Burnaby', N'Dedesignated', 188, 255)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (586, N'Compu College Charlottetown', N'IPAL', 1, N'Compu College', N'Charlottetown', NULL, 188, 256)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (582, N'Compu College Vancouver - DEDESIGNATED', N'APFQ', 0, N'Compu College', N'Vancouver', N'Dedesignated', 188, 257)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (583, N'Compu College Victoria - CLOSURE', N'APGN', 0, N'Compu College', N'Victoria', N'Closure', 188, 258)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (588, N'Concordia University Montreal', N'FUAC', 1, N'Concordia University', N'Montreal', NULL, 189, 259)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (592, N'Concordia University of Edmonton', N'BUAM', 1, N'Concordia University', N'Edmonton', NULL, 189, 260)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (589, N'Concordia University Sir George Williams Campus', N'FUAC', 1, N'Concordia University', N'Sir George Williams', NULL, 189, 261)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2163, N'Conestoga College of Applied Arts & Technology', N'EVAI', 1, N'Conestoga College of Applied Arts & Technology', NULL, NULL, 190, 262)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (593, N'Confederation College', N'EVAK', 1, N'Confederation College', N'College', NULL, 191, 263)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2247, N'Cosmetology School of Canada - Edmonton', N'', 0, N'Cosmetology School of Canada', N'Edmonton', NULL, 192, 264)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2176, N'Counsellor Training Institute of Canada - CLOSURE', N'HPFM', 0, N'Counsellor Training Institute of Canada', NULL, N'Closure', 193, 265)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3149, N'Cours De Civilization Francaise De La Sorbonne - DEDESIGNATED', N'QULA', 0, N'Cours De Civilization Francaise De La Sorbonne', NULL, N'Dedesignated', 194, 266)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (422, N'Crandall University', N'GPKJ', 1, N'Crandall University', NULL, NULL, 195, 267)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (598, N'Culinary Institute of America - INACTIVE', N'MZAC', 0, N'Culinary Institute of America', NULL, NULL, 196, 268)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (599, N'Cypress Hills Regional College - DEDESIGNATED', N'CJAD', 0, N'Cypress Hills Regional College', NULL, N'Dedesignated', 197, 269)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (600, N'Dalhousie University', N'HUAB', 1, N'Dalhousie University', NULL, NULL, 198, 270)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (601, N'Dauphin Air Services - CLOSURE', N'DPBL', 0, N'Dauphin Air Services', NULL, N'Closure', 199, 271)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (603, N'Dawson College', N'FJAG', 1, N'Dawson College', NULL, NULL, 200, 272)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (604, N'Delmar Beauty School - DEDESIGNATED', N'BPBA', 0, N'Delmar Beauty School', NULL, N'Dedesignated', 201, 273)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (605, N'Delmar College of Hair Design - DEDESIGNATED', N'BPBA', 0, N'Delmar College of Hair Design', NULL, N'Dedesignated', 202, 274)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3160, N'DEREE - The American College of Greece', N'QPET', 1, N'DEREE - The American College of Greece', NULL, NULL, 203, 275)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (607, N'Devry Institute of Technology', N'BPDB', 1, N'Devry Institute of Technology', NULL, NULL, 204, 276)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2535, N'Discovery Community College', N'APUY', 1, N'Discovery Community College', NULL, NULL, 205, 277)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3164, N'Discovery Community College - Bowen', N'APTP', 1, N'Discovery Community College', N'Bowen', NULL, 205, 278)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3761, N'Divesafe International', N'APVC', 1, N'Divesafe International', NULL, NULL, 206, 279)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2251, N'Diving Dynamics Career Development', N'APJL', 1, N'Diving Dynamics Career Development', NULL, NULL, 207, 280)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (608, N'Dominelli Career Institute Inc - CLOSURE', N'APCM', 0, N'Dominelli Career Institute Inc', NULL, N'Closure', 208, 281)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1699, N'Dominelli International College of Esthetics - CLOSURE', N'APCM', 0, N'Dominelli International College of Esthetics', NULL, N'Closure', 209, 282)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2873, N'Dominican College of Blauvelt - INACTIVE', N'MXBI', 0, N'Dominican College of Blauvelt', NULL, NULL, 210, 283)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1800, N'Dominion Herbal College - CHANGED', N'APYF', 0, N'Dominion Herbal College', NULL, N'Changed Address', 211, 284)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2082, N'Dominion Herbal College - DEDESIGNATED', N'APYF', 0, N'Dominion Herbal College', NULL, N'Dedesignated', 211, 285)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (610, N'Douglas College - All Campuses', N'AJAE', 1, N'Douglas College', N'All Campuses', N'All Campuses', 212, 286)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (611, N'Douglas College Coquitlam - DEDESIGNATED', N'AJBL', 0, N'Douglas College Coquitlam', NULL, N'Dedesignated', 213, 287)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5155, N'Drake Medox College', N'APDB', 1, N'Drake Medox College', NULL, NULL, 214, 288)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (612, N'Dubrulle Culinary Arts International - DEDESIGNATED', N'APDW', 0, N'Dubrulle Culinary Arts International', NULL, N'Dedesignated', 215, 289)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2888, N'Duisenberg School of Finance', N'', 1, N'Duisenberg School of Finance', NULL, NULL, 216, 290)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (613, N'Durham College of Applied Arts & Technology', N'EVAL', 1, N'Durham College of Applied Arts & Technology', NULL, NULL, 217, 291)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3034, N'Eastern College', N'HPCK', 1, N'Eastern College', N'Halifax', NULL, 218, 292)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (587, N'Eastern College - Saint John', N'GPCZ', 1, N'Eastern College', N'Saint John', NULL, 218, 293)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (585, N'Eastern College - St. John''s NFLD', N'JPAE', 1, N'Eastern College', N'Saint John', NULL, 218, 294)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3457, N'Eastern College - St. John''s NFLD - DUPLICATE', N'JPAE', 0, N'Eastern College', N'Saint John', N'Duplicate', 218, 295)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (614, N'Eastern Pentecostal Bible College - DEDESIGNATED', N'EPCN', 0, N'Eastern Pentecostal Bible College', NULL, N'Dedesignated', 219, 296)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (615, N'Eastern Washington University', N'MUJZ', 1, N'Eastern Washington University', NULL, NULL, 220, 297)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (616, N'Eberhard Karls University', N'QUBQ', 1, N'Eberhard Karls University', NULL, NULL, 221, 298)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (617, N'Ecole d''Enseignment Superieur - INACTIVE', N'FPEH', 0, N'Ecole d''Enseignment Superieur', NULL, NULL, 222, 299)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3817, N'Ecole des Metiers du Sud-Ouest de Montreal', N'FVDG', 1, N'Ecole des Metiers du Sud-Ouest de Montreal', N'Montreal', NULL, 223, 300)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2344, N'Ecole du Show Business', N'FPTN', 1, N'Ecole du Show Business', NULL, NULL, 224, 301)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4241, N'Ecole National de Cirque', N'FPEQ', 1, N'Ecole National de Cirque', NULL, NULL, 225, 302)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (618, N'Edmonton Flying Club', N'BPBL', 1, N'Edmonton Flying Club', NULL, NULL, 226, 303)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (622, N'Edutech Training Centre - CLOSURE', N'DPDF', 0, N'Edutech Training Centre', NULL, N'Closure', 227, 304)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3683, N'Eidgenossische Technische Hochschule', N'QVBE', 1, N'Eidgenossische Technische Hochschule', N'Hochschule', NULL, 228, 305)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3824, N'Elevated Learning Academy Inc. - Calgary', N'BPMS', 1, N'Elevated Learning Academy Inc.', N'Calgary', NULL, 229, 306)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4657, N'Elite Massage Academy', N'', 1, N'Elite Massage Academy', NULL, NULL, 230, 307)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3463, N'Emergency Services Academy', N'BPLO', 1, N'Emergency Services Academy', NULL, NULL, 231, 308)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (623, N'Emily Carr Institute - DEDESIGNATED', N'AVAN', 0, N'Emily Carr Institute', NULL, N'Dedesignated', 232, 309)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2449, N'Emily Carr University of Arts & Design', N'AUAW', 1, N'Emily Carr University of Arts & Design', NULL, NULL, 233, 310)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4738, N'Erasmus University - Rotterdam', N'QULR', 1, N'Erasmus University', N'Rotterdam', NULL, 234, 311)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (624, N'Est-Elle Academy of Hair Design', N'BPCC', 1, N'Est-Elle Academy of Hair Design', NULL, NULL, 235, 312)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3428, N'European Graduate School', N'QWFI', 1, N'European Graduate School', NULL, NULL, 236, 313)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3470, N'Eveline Charles Academy - Calgary', N'BPMZ', 1, N'Eveline Charles Academy', N'Calgary', NULL, 237, 314)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3532, N'Eveline Charles Academy - Edmonton', N'BPNA', 1, N'Eveline Charles Academy', N'Edmonton', NULL, 237, 315)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3554, N'Everest College of Business Technology and Healthcare', N'EQBF', 0, N'Everest College of Business Technology and Healthcare', NULL, NULL, 238, 316)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (625, N'Fairview College - DEDESIGNATED', N'BVAF', 0, N'Fairview College', NULL, N'Dedesignated', 239, 317)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (626, N'Fanshawe College', N'EVAM', 1, N'Fanshawe College', NULL, NULL, 240, 318)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2303, N'Fashion Institute of Design & Merchandising', N'MVAY', 1, N'Fashion Institute of Design & Merchandising', NULL, NULL, 241, 319)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2011, N'Feng Chia University - INACTIVE', N'UUDG', 0, N'Feng Chia University', NULL, NULL, 242, 320)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4630, N'Fielding Graduate University', N'MPQP', 1, N'Fielding Graduate University', NULL, NULL, 243, 321)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2855, N'Fisheries & Marine Institute - Memorial University of Nfld.', N'JVAA', 1, N'Fisheries & Marine Institute - Memorial University of Nfld.', NULL, NULL, 244, 322)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (630, N'Foothills Massage Therapy College - CLOSURE', N'BPIA', 0, N'Foothills Massage Therapy College', NULL, N'Closure', 245, 323)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (628, N'Foothills Nursing Hospital - CLOSURE', N'BNAF', 0, N'Foothills Nursing Hospital', NULL, N'Closure', 246, 324)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (631, N'Gabriel Dumont Institute - CLOSURE', N'CTAD', 0, N'Gabriel Dumont Institute', NULL, N'Closure', 247, 325)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3145, N'Gander Flight Training Centre', N'JPBR', 1, N'Gander Flight Training Centre', NULL, NULL, 248, 326)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (633, N'Gardner College - DEDESIGNATED', N'BPAG', 0, N'Gardner College', NULL, N'Dedesignated', 249, 327)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (636, N'George Brown College St James', N'EVAU', 1, N'George Brown College ', N'St. James', NULL, 250, 328)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (634, N'George Brown College Toronto', N'EVAU', 1, N'George Brown College', N'Toronto', NULL, 250, 329)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (637, N'Georgian College', N'EVAW', 1, N'Georgian College', NULL, NULL, 251, 330)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4312, N'Glasgow School of Art', N'PPEC', 1, N'Glasgow School of Art', NULL, NULL, 252, 331)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (638, N'Goethe Institute Frankfurt', N'QUCV', 1, N'Goethe Institute', N'Frankfurt', NULL, 253, 332)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3405, N'Goh Ballet Academy', N'NNNN', 0, N'Goh Ballet Academy', N'Academy', NULL, 254, 333)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1708, N'Grand Rapids Community College - INACTIVE', N'MJDV', 0, N'Grand Rapids Community College', NULL, NULL, 255, 334)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (639, N'Grand River Polytechnic Institute - INACTIVE', N'EVDO', 0, N'Grand River Polytechnic Institute', NULL, NULL, 256, 335)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (640, N'Grande Prairie Regional College', N'BJAC', 1, N'Grande Prairie Regional College', NULL, NULL, 257, 336)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3116, N'Grande Prairie Regional College - Fairview', N'BJAC', 1, N'Grande Prairie Regional College', N'Fairview', NULL, 257, 337)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (643, N'Grant MacEwan Community College City Centre - CHANGED', N'BJAD', 0, N'Grant MacEwan University', N'City Centre', N'Changed Address', 258, 338)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (641, N'Grant MacEwan Community College Edmonton - CHANGED', N'BJAD', 0, N'Grant MacEwan University', N'Edmonton', N'Changed Address', 258, 339)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2748, N'Grant MacEwan University City Centre', N'BJAD', 1, N'Grant MacEwan University', N'City Centre', NULL, 258, 340)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2749, N'Grant MacEwan University Edmonton', N'BJAD', 1, N'Grant MacEwan University', N'Edmonton', NULL, 258, 341)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2560, N'Granville Business College', N'APLG', 1, N'Granville Business College', NULL, NULL, 259, 342)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1636, N'Greenwood College of Advanced Technology - CLOSURE', N'APYW', 0, N'Greenwood College of Advanced Technology', NULL, N'Closure', 260, 343)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1549, N'Greenwood College of Advanced Technology - CLOSURE1', N'APYW', 0, N'Greenwood College of Advanced Technology', NULL, N'Closure', 260, 344)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3059, N'Grenoble Graduate School of Business', N'QPIN', 1, N'Grenoble Graduate School of Business', NULL, NULL, 261, 345)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1834, N'Griffith University', N'VUSY', 1, N'Griffith University', NULL, NULL, 262, 346)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2512, N'Hair Design Centre', N'HPAT', 1, N'Hair Design Centre', NULL, NULL, 263, 347)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5442, N'Harris Institute for the Arts', N'EPKL', 1, N'Harris Institute for the Arts', NULL, NULL, 264, 348)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (644, N'Harvard College', N'MUMQ', 1, N'Harvard College', NULL, NULL, 265, 349)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (645, N'Hebrew University', N'RUAC', 1, N'Hebrew University', NULL, NULL, 266, 350)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (647, N'Helen Lefeaux Inc. - CLOSURE', N'APCK', 0, N'Helen Lefeaux Inc.', NULL, N'Closure', 267, 351)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (648, N'Heli-College Canada Training', N'APOP', 1, N'Heli-College Canada Training', NULL, NULL, 268, 352)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (649, N'Heriot-Watt University', N'PUAW', 1, N'Heriot-Watt University', NULL, NULL, 269, 353)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (650, N'Heritage Baptist College', N'EPAS', 1, N'Heritage Baptist College', NULL, NULL, 270, 354)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3029, N'Hertie School of Governance', N'QPKD', 1, N'Hertie School of Governance', NULL, NULL, 271, 355)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1968, N'Herzing College', N'EPAT', 1, N'Herzing College', NULL, NULL, 272, 356)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (651, N'Herzing Institute', N'FPAA', 1, N'Herzing Institute', NULL, NULL, 273, 357)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1361, N'Hesser College - INACTIVE', N'MJRR', 0, N'Hesser College', NULL, NULL, 274, 358)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4617, N'Hilltop Academy', N'APOU', 0, N'Hilltop Academy', NULL, NULL, 275, 359)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3468, N'Hilltop Security Academy', N'APOU', 0, N'Hilltop Academy', N'Security', NULL, 275, 360)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (652, N'Hilltop Security Academy - DEDESIGNATED', N'BPJV', 0, N'Hilltop Security Academy', NULL, N'Dedesignated', 276, 361)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3209, N'Hogskolen I Finnmark', N'', 0, N'Hogskolen I Finnmark', N'Finnmark', NULL, 277, 362)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2263, N'Holland College', N'IJAA', 1, N'Holland College', NULL, NULL, 278, 363)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4237, N'Holland College - Waterfront Campus', N'IJAC', 1, N'Holland College', N'Waterfront', NULL, 278, 364)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (653, N'Hollywood North School of Beauty - DEDESIGNATED', N'APJP', 0, N'Hollywood North School of Beauty', NULL, N'Dedesignated', 279, 365)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1710, N'Horizon College & Seminary', N'CPAO', 1, N'Horizon College & Seminary', NULL, NULL, 280, 366)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (654, N'Humber College - DO NOT USE', N'EVAX', 0, N'Humber College Institute of Technology & Advanced Learning', NULL, N'Do Not Use', 281, 367)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3067, N'Humber College - Lakeshore - DO NOT USE', N'EVAX', 0, N'Humber College Institute of Technology & Advanced Learning', N'Lakeshore', N'Do Not Use', 281, 368)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1691, N'Humber College Institute of Technology & Advanced Learning', N'EVAX', 1, N'Humber College Institute of Technology & Advanced Learning', NULL, NULL, 281, 369)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1798, N'Humboldt - Universitat Zu Berlin', N'QUOE', 1, N'Universitat Zu Berlin', N'Humboldt', NULL, 282, 370)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3675, N'Huron University College', N'EUAY', 1, N'Huron University College', NULL, NULL, 283, 371)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (661, N'ICS Learning Systems - INACTIVE', N'FPCJ', 0, N'ICS Learning Systems', NULL, NULL, 284, 372)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5518, N'IE University', N'QPKY', 1, N'IE University', NULL, NULL, 285, 373)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3201, N'Illinois College of Optometry', N'MPTG', 1, N'Illinois College of Optometry', NULL, NULL, 286, 374)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (707, N'Inchbald School - INACTIVE', N'PVBN', 0, N'Inchbald School', NULL, NULL, 287, 375)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5540, N'InFocus Film School', N'AQCY', 1, N'InFocus Film School', NULL, NULL, 288, 376)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (664, N'Information Technology Institute Halifax - CLOSURE', N'HPBB', 1, N'Information Technology Institute', N'Halifax', N'Closure', 289, 377)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (663, N'Information Technology Institute Vancouver - CLOSURE', N'APYG', 0, N'Information Technology Institute', N'Vancouver', N'Closure', 289, 378)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3576, N'inSignia College of Health and Business', N'APRV', 1, N'inSignia College of Health and Business', NULL, NULL, 290, 379)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2299, N'Institut de Tourisme & Hotellerie du Quebec - INACTIVE', N'FVAH', 0, N'Institut de Tourisme & Hotellerie du Quebec', NULL, NULL, 291, 380)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (665, N'Institute of Indigenous Government - CLOSURE', N'AJBK', 0, N'Institute of Indigenous Government', NULL, N'Closure', 292, 381)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3507, N'Institute of Technology Development Canada', N'APAF', 1, N'Institute of Technology Development Canada', NULL, NULL, 293, 382)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1839, N'Institute of Transpersonal Psychology', N'MPZZ', 1, N'Institute of Transpersonal Psychology', NULL, NULL, 294, 383)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1300, N'Instituto Hemingway S.L. - INACTIVE', N'QPJL', 0, N'Instituto Hemingway S.L.', NULL, NULL, 295, 384)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2319, N'Interdisciplinary Center Herzliya - INACTIVE', N'RUBQ', 1, N'Interdisciplinary Center', N'Herzliya', NULL, 296, 385)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2848, N'Interior Academy of Hair Design', N'APWT', 1, N'Interior Academy of Hair Design', NULL, NULL, 297, 386)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1862, N'Interior Academy of Hair Design - DEDESIGNATED', N'APFS', 0, N'Interior Academy of Hair Design', NULL, N'Dedesignated', 297, 387)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (666, N'Interior Academy of Hair Design - DEDESIGNATED1', N'APFS', 0, N'Interior Academy of Hair Design', NULL, N'Dedesignated', 297, 388)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2575, N'Interior Heavy Equipment Operator School Ltd.', N'APUH', 1, N'Interior Heavy Equipment Operator School Ltd.', NULL, NULL, 298, 389)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (668, N'International Academy of Design - DEDESIGNATED', N'EPGV', 0, N'International Academy of Design', NULL, N'Dedesignated', 299, 390)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2074, N'International Career School Canada', N'', 1, N'International Career School Canada', NULL, NULL, 300, 391)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (670, N'International College of Traditional Chinese Medicine Victoria - DEDESIGNATED', N'APOH', 0, N'International College of Traditional Chinese Medicine', N'Victoria', N'Dedesignated', 301, 392)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (669, N'International College of Traditional Medicine Vancouver', N'APOG', 1, N'International College of Traditional Medicine Vancouver', N'Vancouver', NULL, 302, 393)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (671, N'International Hairdressing School - DEDESIGNATED', N'APAT', 0, N'International Hairdressing School', NULL, N'Dedesignated', 303, 394)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (672, N'International Institute of Tourism and Management - INACTIVE', N'QPGZ', 0, N'International Institute of Tourism and Management', NULL, NULL, 304, 395)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1911, N'International Language Schools of Canada', N'', 0, N'International Language Schools of Canada', NULL, NULL, 305, 396)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5489, N'International University of Health Sciences', N'ZPAK', 1, N'International University of Health Sciences', NULL, NULL, 306, 397)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (673, N'Island Career Academy', N'HPEE', 1, N'Island Career Academy', NULL, NULL, 307, 398)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3304, N'Island School of Building Arts', N'', 0, N'Island School of Building Arts', NULL, NULL, 308, 399)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5152, N'Jacksonville University', N'MUOE', 1, N'Jacksonville University', NULL, NULL, 309, 400)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (674, N'James Cook University of North Queensland', N'VUAW', 1, N'James Cook University of North Queensland', N'North Queensland', NULL, 310, 401)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (675, N'Joe Kubert School - INACTIVE', N'MPRB', 0, N'Joe Kubert School', NULL, NULL, 311, 402)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2527, N'John Abbott College (Cegep)', N'FJAM', 1, N'John Abbott College (Cegep)', NULL, NULL, 312, 403)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (676, N'John Casablancas Inst. of Applied Arts', N'APCZ', 1, N'John Casablancas Inst. of Applied Arts', NULL, NULL, 313, 404)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4189, N'John Jay College of Criminal Justice', N'MWQO', 1, N'John Jay College of Criminal Justice', NULL, NULL, 314, 405)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1847, N'Johns Hopkins Bloomberg School of Public Health', N'MQXH', 1, N'Johns Hopkins Bloomberg School of Public Health', NULL, NULL, 315, 406)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2157, N'Joji''s Hair School - CLOSURE', N'APPH', 1, N'Joji''s Hair School', NULL, N'Closure', 316, 407)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2509, N'Josai International University - INACTIVE', N'UPAP', 0, N'Josai International University', NULL, NULL, 317, 408)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (677, N'Judi''s School of Beauty - CLOSURE', N'APHR', 0, N'Judi''s School of Beauty', NULL, N'Closure', 318, 409)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (678, N'Justice Institute of BC', N'AVAX', 1, N'Justice Institute of BC', NULL, NULL, 319, 410)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3864, N'Kathmandu University - Rangjung Yeshe Institute', N'TUGG', 1, N'Kathmandu University - Rangjung Yeshe Institute', N'Rangjung Yeshe Institute', NULL, 320, 411)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (679, N'Katholieke Universiteit Leuven - INACTIVE', N'QUJV', 0, N'Katholieke Universiteit', N'Leuven', NULL, 321, 412)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (680, N'KDM Dental College International', N'BPFF', 1, N'KDM Dental College International', NULL, NULL, 322, 413)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (681, N'Keewatin Community College - DEDESIGNATED', N'DVAC', 0, N'Keewatin Community College', NULL, N'Dedesignated', 323, 414)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3893, N'Kelowna College of Professional Counselling', N'AQCC', 1, N'Kelowna College of Professional Counselling', NULL, NULL, 324, 415)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1519, N'Kelsey College - CLOSURE', N'MVIS', 0, N'Kelsey College', NULL, N'Closure', 325, 416)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (682, N'Kemptville College', N'EVAJ', 1, N'Kemptville College', NULL, NULL, 326, 417)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (683, N'Keyano College', N'BVAH', 1, N'Keyano College', NULL, NULL, 327, 418)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3918, N'Keyin College - St. John''s', N'JPAC', 1, N'Keyin College', N'St. John''s', N'St. John''s', 328, 419)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (685, N'Kikkawa College', N'EPFD', 1, N'Kikkawa College', NULL, NULL, 329, 420)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3549, N'Kilgore College Fire Academy', N'MXHZ', 1, N'Kilgore College Fire Academy', NULL, N'Chayged Academy', 330, 421)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1724, N'Kings Bible College', N'UUUU', 0, N'Kings Bible College', NULL, NULL, 331, 422)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (473, N'Kings'' University', N'BUAO', 1, N'Kings'' University', NULL, NULL, 332, 423)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3153, N'Kingswood University', N'GPAB', 1, N'Kingswood University', NULL, NULL, 333, 424)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1740, N'Klondike Business & Entrepreneurship School - DEDESIGNATED', N'LPAG', 0, N'Klondike Business & Entrepreneurship School', NULL, N'Dedesignated', 334, 425)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (686, N'Kootenay School of the Arts - DEDESIGNATED', N'AJAP', 0, N'Kootenay School of the Arts', NULL, N'Dedesignated', 335, 426)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2257, N'Kosmetae Academy', N'APJS', 0, N'Kosmetae Academy', NULL, NULL, 336, 427)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3247, N'Kutenai Art Therapy Institute', N'APPU', 1, N'Kutenai Art Therapy Institute', NULL, NULL, 337, 428)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2441, N'Kwantlen Polytechnic University', N'AUAX', 1, N'Kwantlen Polytechnic University', NULL, NULL, 338, 429)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (687, N'Kwantlen University College - DUPLICATE', N'AJAV', 0, N'Kwantlen University College', NULL, N'Duplicate', 339, 430)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5165, N'L R Helicopters Inc.', N'BPMR', 1, N'L R Helicopters Inc.', NULL, NULL, 340, 431)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (688, N'La Cite Collegiate-Piece C1020', N'EVDB', 1, N'La Cite Collegiate-Piece C1020', NULL, NULL, 341, 432)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (689, N'Lakehead University', N'EUAL', 1, N'Lakehead University', NULL, NULL, 342, 433)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2154, N'Lakeland College - DUPLICATE', N'BVAM', 0, N'Lakeland College', NULL, N'Duplicate', 343, 434)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2978, N'Lakeland College - Lloydminster - CHANGED', N'CJAE', 0, N'Lakeland College', N'Lloydminster', N'Changed Address', 343, 435)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2977, N'Lakeland College - Vermilion', N'BVAM', 1, N'Lakeland College', N'Vermilion', NULL, 343, 436)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (692, N'Lakeland College Lloydminster - CHANGED', N'CJAE', 0, N'Lakeland College', N'Lloydminster', N'Changed Address', 343, 437)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (693, N'Lakeland College Saskatchewan - CHANGED', N'BVAM', 0, N'Lakeland College', N'Saskatchewan', N'Changed Address', 343, 438)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (691, N'Lakeland College Vermilion - DUPLICATE', N'BVAM', 0, N'Lakeland College', N'Vermilion', N'Duplicate', 343, 439)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (694, N'Lane Community College - INACTIVE', N'MJFG', 0, N'Lane Community College', NULL, NULL, 344, 440)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (695, N'Langara College', N'AJAM', 1, N'Langara College', NULL, NULL, 345, 441)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1774, N'Langley Education Centre', N'', 0, N'Langley Education Centre', NULL, NULL, 346, 442)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2566, N'Lansing Community College - INACTIVE', N'MJFH', 0, N'Lansing Community College', NULL, NULL, 347, 443)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2731, N'LaSalle College - DO NOT USE', N'APYA', 0, N'LaSalle College', NULL, N'Do Not Use', 348, 444)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1151, N'LaSalle College - DUPLICATE', N'APYA', 0, N'LaSalle College', NULL, N'Duplicate', 348, 445)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1307, N'LaSalle College Montreal', N'FPBH', 1, N'LaSalle College', N'Montreal', NULL, 348, 446)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4896, N'LaSalle College Vancouver - Renfrew', N'APZC', 1, N'LaSalle College', N'Vancouver', NULL, 348, 447)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (696, N'Laurentian University', N'EUAM', 1, N'Laurentian University', NULL, NULL, 349, 448)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3007, N'Laval University', N'FUAU', 1, N'Laval University', NULL, NULL, 350, 449)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (698, N'Laval University - DUPLICATE', N'FUAU', 0, N'Laval University', NULL, N'Duplicate', 350, 450)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (699, N'Le Cordon Bleu Cooking School', N'', 0, N'Le Cordon Bleu Cooking School', NULL, NULL, 351, 451)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (700, N'Le Petit Seminaire de Quebec - INACTIVE', N'FPBQ', 0, N'Le Petit Seminaire de Quebec', NULL, NULL, 352, 452)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2339, N'Leiden University', N'QUDC', 1, N'Leiden University', NULL, NULL, 353, 453)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (437, N'Lethbridge College', N'BJAF', 1, N'Lethbridge College', NULL, NULL, 354, 454)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (701, N'Life Skills Training Centre - CLOSURE', N'APJV', 0, N'Life Skills Training Centre Ltd.', NULL, N'Closure', 355, 455)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (711, N'Life Skills Training Centre Ltd. Edmonton - CLOSURE', N'BPFQ', 0, N'Life Skills Training Centre Ltd.', N'Edmonton', N'Closure', 355, 456)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (712, N'Life Skills Training Centre Ltd. Surrey - CLOSURE', N'APJV', 0, N'Life Skills Training Centre Ltd.', N'Surrey', N'Closure', 355, 457)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1567, N'Lindenwood University', N'MUPY', 0, N'Lindenwood University', NULL, NULL, 356, 458)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1108, N'London Contemporary Dance School - INACTIVE', N'PPAU', 0, N'London Contemporary Dance School', NULL, NULL, 357, 459)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (713, N'London School of Economics', N'PUEQ', 1, N'London School of Economics', NULL, NULL, 358, 460)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2931, N'London School of Hairdressing & Aesthetics', N'APDK', 1, N'London School of Hairdressing & Aesthetics', NULL, NULL, 359, 461)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1223, N'London School of Hairdressing & Aesthetics - DUPLICATE', N'APDK', 0, N'London School of Hairdressing & Aesthetics', NULL, N'Duplicate', 359, 462)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3436, N'London School of Hygiene and Tropical Medicine', N'PUFH', 1, N'London School of Hygiene and Tropical Medicine', NULL, NULL, 360, 463)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1229, N'Loughborough University of Technolgoy', N'PUBM', 1, N'Loughborough University of Technolgoy', NULL, NULL, 361, 464)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3432, N'Louis Riel Arts & Technology Centre', N'DVAD', 1, N'Louis Riel Arts & Technology Centre', NULL, NULL, 362, 465)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2407, N'Loxx Academy of Hair Design Inc', N'APLZ', 1, N'Loxx Academy of Hair Design Inc', NULL, NULL, 363, 466)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (715, N'Loyalist College', N'EVBF', 1, N'Loyalist College', NULL, NULL, 364, 467)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2244, N'Lund University', N'QUDJ', 1, N'Lund University', NULL, NULL, 365, 468)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1546, N'Lutheran Theological Seminary', N'CUAD', 1, N'Lutheran Theological Seminary', NULL, NULL, 366, 469)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2982, N'M.C. College - Kelowna', N'APBU', 1, N'M.C. College', N'Kelowna', NULL, 367, 470)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (716, N'Main Dance Project Society - DEDESIGNATED', N'APNC', 0, N'Main Dance Project Society', NULL, N'Dedesignated', 368, 471)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3891, N'Makami College Inc.', N'BPTB', 1, N'Makami College Inc.', NULL, NULL, 369, 472)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (717, N'Malaspina University College - CHANGED', N'AJAG', 0, N'Malaspina University College', NULL, N'Changed Address', 370, 473)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1363, N'Manitoba Institute for Trades and Technology', N'DVAQ', 1, N'Manitoba Institute for Trades and Technology', NULL, NULL, 371, 474)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4300, N'Maritime Business College', N'HPAE', 1, N'Maritime Business College', NULL, NULL, 372, 475)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (718, N'Maritime Christian College', N'IPAA', 1, N'Maritime Christian College', NULL, NULL, 373, 476)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (719, N'Martech College of Marketing - CLOSURE', N'BPFI', 0, N'Martech College of Marketing', NULL, N'Closure', 374, 477)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (720, N'Martier School of Beauty - CLOSURE', N'APIK', 0, N'Martier School of Beauty', NULL, N'Closure', 375, 478)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2550, N'Martier School of Hair Design & Esthetics - CLOSURE', N'APIK', 0, N'Martier School of Hair Design & Esthetics', NULL, N'Closure', 376, 479)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (721, N'Marvel Beauty School - Saskatchewan', N'CPBG', 1, N'Marvel Beauty School', N'Saskatchewan', NULL, 377, 480)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (790, N'Marvel College - Kelowna', N'APBU', 1, N'Marvel College', N'Kelowna', NULL, 378, 481)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2106, N'Marvel College Edmonton - CHANGED', N'BPAY', 0, N'Marvel College', N'Edmonton', N'Changed', 378, 482)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1438, N'Marvel College Kelowna', N'APBU', 1, N'Marvel College', N'Kelowna', NULL, 378, 483)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1234, N'Marvel College Ottawa', N'EQCP', 1, N'Marvel College', N'Ottawa', NULL, 378, 484)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1534, N'Marvel College Vancouver - CLOSURE', N'APXK', 0, N'Marvel College', N'Vancouver', N'Closure', 378, 485)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (723, N'Marvel Trade & Business College Edmonton - DUPLICATE', N'BPAY', 1, N'Marvel Trade & Business College', N'Edmonton', N'Duplicate', 379, 486)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (724, N'Marvel Trade & Business College Red Deer - CHANGED', N'BPCT', 1, N'Marvel Trade & Business College', N'Red Deer', N'Changed Address', 379, 487)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2608, N'Massachusetts Institute of Technology', N'MUSH', 1, N'Massachusetts Institute of Technology', NULL, NULL, 380, 488)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (725, N'Massachusetts Institute of Technology - DUPLICATE', N'MUSH', 0, N'Massachusetts Institute of Technology', NULL, N'Duplicate', 380, 489)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2206, N'Massey University', N'VUAY', 1, N'Massey University', NULL, NULL, 381, 490)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (728, N'Master''s School of Hair Design - DEDESIGNATED', N'BPEJ', 0, N'Master''s School of Hair Design', NULL, N'Dedesignated', 382, 491)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (726, N'Masters College and Seminary', N'EPCN', 1, N'Masters College and Seminary', NULL, NULL, 383, 492)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4820, N'Masters University and Seminary', N'MQAQ', 1, N'Masters University and Seminary', NULL, NULL, 384, 493)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1768, N'Maui Community College INACTIVE', N'MJWQ', 0, N'Maui Community College', NULL, NULL, 385, 494)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1365, N'Maui School of Therapeutic Massage', N'AAAA', 0, N'Maui School of Therapeutic Massage', NULL, NULL, 386, 495)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3330, N'Mauna Loa Helicopters', N'MQGW', 1, N'Mauna Loa Helicopters', NULL, NULL, 387, 496)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (722, N'MC College - Calgary', N'BPAS', 1, N'MC College', N'Calgary', NULL, 388, 497)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2381, N'MC College - Edmonton', N'BPAY', 1, N'MC College', N'Edmonton', NULL, 388, 498)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2141, N'MC College - Red Deer', N'BPCT', 1, N'MC College', N'Red Deer', NULL, 388, 499)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (729, N'McGill University', N'FUAV', 1, N'McGill University', NULL, NULL, 389, 500)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (730, N'McKay Career Training Inc.', N'CPBY', 1, N'McKay Career Training Inc.', NULL, NULL, 390, 501)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5140, N'McKenzie Learning Systems Inc.', N'GPKG', 1, N'McKenzie Learning Systems Inc.', NULL, NULL, 391, 502)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (731, N'McMaster University', N'EUAN', 1, N'McMaster University', NULL, NULL, 392, 503)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4235, N'Medavie Health Ed', N'HPFL', 1, N'Medavie Health Ed', NULL, NULL, 393, 504)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3089, N'Medical University of the Americas', N'ZUBX', 1, N'Medical University of the Americas', NULL, NULL, 394, 505)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (732, N'Medicine Hat College', N'BJAI', 1, N'Medicine Hat College', NULL, NULL, 395, 506)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3498, N'Medix School - Career College Group of London', N'EPIA', 1, N'Medix School - Career College Group of London', NULL, NULL, 396, 507)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3176, N'Meiji University - INACTIVE', N'TUBB', 0, N'Meiji University', NULL, NULL, 397, 508)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1983, N'Memorial University of Newfoundland - St. John''s', N'JUAA', 1, N'Memorial University of Newfoundland', N'St. John''s', NULL, 398, 509)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (733, N'Memorial University of Newfoundland - St. Johns - CHANGED', N'JUAA', 0, N'Memorial University of Newfoundland', N'St. John''s', N'Changed Address', 398, 510)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1488, N'Memorial University of Newfoundland-Sir W. Grenfell Campus', N'JUAB', 1, N'Memorial University of Newfoundland', N'Sir W. Grenfell', NULL, 398, 511)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2657, N'Metalworks Institute of Sound & Music Production', N'EPLF', 1, N'Metalworks Institute of Sound & Music Production', NULL, NULL, 399, 512)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (734, N'Metro State University of Denver', N'MUST', 1, N'Metro State University of Denver', N'Denver', NULL, 400, 513)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1376, N'Michener Institute of  Applied Health Science', N'EVBZ', 1, N'Michener Institute of  Applied Health Science', NULL, NULL, 401, 514)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2306, N'Michigan State University', N'MUSW', 1, N'Michigan State University', NULL, NULL, 402, 515)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3472, N'Middlebury College - INACTIVE', N'MUTB', 0, N'Middlebury College', NULL, NULL, 403, 516)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (735, N'Millar College of the Bible', N'CPBA', 1, N'Millar College of the Bible', N'Saskatchewan', NULL, 404, 517)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4244, N'Millar College of the Bible - Tappen Campus', N'AQCS', 1, N'Millar College of the Bible', N'British Columbia', NULL, 404, 518)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5502, N'Minot State University', N'MUTO', 1, N'Minot State University', NULL, NULL, 405, 519)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (736, N'Mississippi State University - Veterinary Medicine College', N'MUTQ', 1, N'Mississippi State University - Veterinary Medicine College', NULL, NULL, 406, 520)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1902, N'Missouri State University SW - INACTIVE', N'MWGO', 0, N'Missouri State University SW', NULL, NULL, 407, 521)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1259, N'Mobile Dynamics', N'', 0, N'Mobile Dynamics', NULL, NULL, 408, 522)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3895, N'Modern College of Hairstyling and Esthetics', N'EPMR', 1, N'Modern College of Hairstyling and Esthetics', NULL, NULL, 409, 523)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (738, N'Mohawk College Of Applied Arts & Technology', N'EVBO', 1, N'Mohawk College Of Applied Arts & Technology', NULL, NULL, 410, 524)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2314, N'Moncton Flight College - DEDESIGNATED', N'GPAS', 0, N'Moncton Flight College', NULL, N'Dedesignated', 411, 525)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (741, N'Montana State University', N'MUUB', 1, N'Montana State University', NULL, NULL, 412, 526)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4074, N'Montana State University - Billings', N'MUUB', 0, N'Montana State University', N'Billings', NULL, 412, 527)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (743, N'Montessori Centre International Ltd. - INACTIVE', N'PPFJ', 0, N'Montessori Centre International Ltd.', NULL, NULL, 413, 528)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2571, N'Montessori Training Centre of British Columbia', N'APEM', 1, N'Montessori Training Centre of British Columbia', N'Columbia', NULL, 414, 529)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (744, N'Morgan Air Services Calgary International Airport - DEDESIGNATED', N'BPEU', 0, N'Morgan Air Services Calgary International Airport', NULL, N'Dedesignated', 415, 530)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (783, N'Motorcycle Mechanics Institute - INACTIVE', N'MPNV', 0, N'Motorcycle Mechanics Institute', NULL, NULL, 416, 531)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (745, N'Mount Allison University', N'GUAF', 1, N'Mount Allison University', NULL, NULL, 417, 532)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3969, N'Mount Carmel Bible College', N'', 0, N'Mount Carmel Bible College', NULL, NULL, 418, 533)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3222, N'Mount Carmel College - DO NOT USE', N'', 0, N'Mount Carmel College', NULL, N'Do Not Use', 419, 534)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (746, N'Mount Royal College - CHANGED', N'BJAG', 0, N'Mount Royal University', N'College', N'Changed Address', 420, 535)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2711, N'Mount Royal University', N'BJAG', 1, N'Mount Royal University', N'University', NULL, 420, 536)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (747, N'Mount St Vincent University', N'HUAD', 1, N'Mount St Vincent University', NULL, N'deleted note that was here', 421, 537)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1900, N'Mountain View Helicopters', N'BPRJ', 1, N'Mountain View Helicopters', NULL, NULL, 422, 538)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2672, N'Ms. Loreas College Esthetics & Nails', N'APQL', 1, N'Ms. Loreas College Esthetics & Nails', NULL, NULL, 423, 539)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1754, N'MTI Community College - Burnaby', N'AQBX', 1, N'MTI Community College', N'Burnaby', NULL, 424, 540)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2998, N'MTI Community College - North Road', N'APRL', 0, N'MTI Community College', N'North Road', NULL, 424, 541)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3618, N'MTI Community College - North Road Campus - DUPLICATE', N'APRL', 0, N'MTI Community College', N'North Road', N'Duplicate', 424, 542)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3755, N'MTI Community College - Surrey', N'APLS', 0, N'MTI Community College', N'Surrey', NULL, 424, 543)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1278, N'Murdoch University', N'VUBD', 1, N'Murdoch University', NULL, NULL, 425, 544)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1345, N'Musician''s Institute', N'MPJS', 1, N'Musician''s Institute', NULL, NULL, 426, 545)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (748, N'NAIT', N'BVAI', 1, N'NAIT', NULL, NULL, 427, 546)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (749, N'Namao Flying Club', N'BPGF', 1, N'Namao Flying Club', NULL, NULL, 428, 547)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1269, N'National Outdoor Leadership School - INACTIVE', N'MPJV', 1, N'National Outdoor Leadership School', NULL, NULL, 429, 548)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (751, N'National School of Dental Therapy - CLOSURE', N'CVAW', 0, N'National School of Dental Therapy', NULL, N'Closure', 430, 549)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (752, N'National Theatre School', N'FPAL', 1, N'National Theatre School', NULL, NULL, 431, 550)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (753, N'National University of Ireland', N'QULX', 0, N'National University of Ireland', NULL, NULL, 432, 551)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1204, N'National University of Ireland - Cork', N'QUEE', 1, N'National University of Ireland', N'Cork', NULL, 432, 552)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2612, N'Native Education & Training College', N'', 0, N'Native Education & Training College', NULL, NULL, 433, 553)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1486, N'Native Education Centre - CHANGED', N'APGG', 0, N'Native Education Centre', NULL, N'Changed Address', 434, 554)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2844, N'Native Education College', N'APGG', 1, N'Native Education College', NULL, NULL, 435, 555)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1248, N'Nav Canada - DUPLICATE', N'EVDA', 0, N'Nav Canada', NULL, N'Duplicate', 436, 556)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3559, N'Nelson Mandela Metropolitan University', N'SUBV', 1, N'Nelson Mandela Metropolitan University', NULL, NULL, 437, 557)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2436, N'New Brunswick Community College', N'GVAI', 1, N'New Brunswick Community College', NULL, NULL, 438, 558)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (754, N'New Brunswick Community College - CHANGED', N'GVAI', 0, N'New Brunswick Community College', NULL, N'Changed Address', 438, 559)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3112, N'New Brunswick Community College - Miramichi', N'GVAV', 1, N'New Brunswick Community College', N'Miramichi', NULL, 438, 560)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (755, N'New Mexico Academy of Healing - INACTIVE', N'MQDE', 0, N'New Mexico Academy of Healing', NULL, NULL, 439, 561)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3516, N'New River Community College', N'MQTR', 1, N'New River Community College', NULL, NULL, 440, 562)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2865, N'New York University', N'MUWD', 1, N'New York University', NULL, NULL, 441, 563)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (757, N'Niagara College', N'EVAP', 1, N'Niagara College', NULL, NULL, 442, 564)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (762, N'Nicola Valley Institute - CHANGED', N'AVBA', 0, N'Nicola Valley Institute of Technology', NULL, N'Changed Address', 443, 565)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3287, N'Nicola Valley Institute of Technology', N'AVBA', 1, N'Nicola Valley Institute of Technology', NULL, NULL, 443, 566)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3214, N'Nimbus School of Recording Arts', N'APXD', 1, N'Nimbus School of Recording Arts', NULL, NULL, 444, 567)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (763, N'Nipawin Bible Institute', N'CPBD', 1, N'Nipawin Bible Institute', NULL, NULL, 445, 568)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (764, N'Nipissing University', N'EUBC', 1, N'Nipissing University', NULL, NULL, 446, 569)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1660, N'Norquest College', N'BJAQ', 1, N'Norquest College', NULL, NULL, 447, 570)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1155, N'Norquest College - CLOSURE', N'BVAE', 0, N'Norquest College', NULL, N'Closure', 447, 571)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3407, N'North Idaho College', N'MJHQ', 1, N'North Idaho College', NULL, NULL, 448, 572)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (768, N'North Island College - All Campuses', N'AJAX', 1, N'North Island College', N'All Campuses', NULL, 449, 573)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (766, N'North Island College - Campbell River - DEDESIGNATED', N'AJAX', 0, N'North Island College', N'Campbell River', N'Dedesignated', 449, 574)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (767, N'North Island Community College Port Alberni - DEDESIGANTED', N'AJAX', 0, N'North Island College', N'Port Alberni', N'Dedesignated', 449, 575)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4639, N'North West Regional College', N'CJAG', 1, N'North West Regional College', NULL, NULL, 450, 576)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (905, N'Northeast Christian College', N'GPAM', 1, N'Northeast Christian College', NULL, NULL, 451, 577)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1115, N'Northern College - Haileybury', N'EVAT', 1, N'Northern College', N'Haileybury', NULL, 452, 578)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (769, N'Northern College - Kirkland', N'EVAS', 1, N'Northern College', N'Kirkland', NULL, 452, 579)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4266, N'Northern College - Timmins', N'EVAR', 1, N'Northern College', N'Timmins', NULL, 452, 580)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2803, N'Northern Institute of Massage Therapy', N'BPDS', 1, N'Northern Institute of Massage Therapy', NULL, NULL, 453, 581)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2121, N'Northern Lakes College', N'BJAR', 1, N'Northern Lakes College', NULL, NULL, 454, 582)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1577, N'Northern Lights College - Atlin', N'AJAK', 1, N'Northern Lights College', N'Atlin', NULL, 455, 583)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1434, N'Northern Lights College - Chetwynd', N'AJAK', 1, N'Northern Lights College', N'Chetwynd', NULL, 455, 584)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (770, N'Northern Lights College - Dawson Creek', N'AJAK', 0, N'Northern Lights College', N'Dawson Creek', NULL, 455, 585)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (773, N'Northern Lights College - Fort St. John', N'AJAK', 1, N'Northern Lights College', N'Fort St. John', NULL, 455, 586)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (774, N'Northern Montana College', N'MUXR', 1, N'Northern Montana College', NULL, NULL, 456, 587)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2337, N'Northern Ontario School of Medicine', N'EUBT', 1, N'Northern Ontario School of Medicine', NULL, NULL, 457, 588)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3011, N'Northland College', N'MWZQ', 1, N'Northland College', NULL, NULL, 458, 589)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2880, N'Northumberland College', N'HPEM', 1, N'Northumberland College', NULL, NULL, 459, 590)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (775, N'Northwest Baptist Theology College - DEDESIGNATED', N'APAB', 0, N'Northwest Baptist Theology College', NULL, N'Dedesignated', 460, 591)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (777, N'Northwest College - INACTIVE', N'MPEH', 0, N'Northwest College', NULL, NULL, 461, 592)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (779, N'Northwest Community College Houston - DEDESIGNATED', N'AJAL', 0, N'Northwest Community College', N'Houston', N'Dedesignated', 462, 593)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (780, N'Northwest Community College PR - CLOSED', N'AVAV', 0, N'Northwest Community College', N'Prince Rupert', N'Closure', 462, 594)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1963, N'Northwest Community College Prince Rupert - CLOSURE', N'AVAV', 0, N'Northwest Community College ', N'Prince Rupert', N'Closure', 462, 595)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (781, N'Northwest Regional College', N'CJAG', 1, N'Northwest Regional College', NULL, NULL, 463, 596)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (782, N'Northwestern School of Massage - DEDESIGNATED', N'BPEF', 0, N'Northwestern School of Massage', NULL, N'Dedesignated', 464, 597)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2720, N'Norwegian University of Life Sciences', N'QUYJ', 1, N'Norwegian University of Life Sciences', NULL, NULL, 465, 598)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2859, N'Not Designated Institution', N'YEA', 0, N'Not Designated Institution', NULL, NULL, 466, 599)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (0, N'Not Listed', N'', 1, N'Not Listed', NULL, NULL, 467, 600)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1050, N'Nova Scotia College of Art & Design - DUPLICATE', N'HUAE', 0, N'Nova Scotia College of Art & Design', NULL, N'Duplicate', 468, 601)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (785, N'Nova Scotia Community College', N'HVAA', 1, N'Nova Scotia Community College', NULL, NULL, 469, 602)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1756, N'Nova Scotia Community College - CHANGED', N'HVAP', 0, N'Nova Scotia Community College', NULL, N'Changed Address', 469, 603)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2062, N'Nova Scotia Community College - Halifax', N'HVAP', 1, N'Nova Scotia Community College', N'Halifax', NULL, 469, 604)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1745, N'Nova Scotia Community College - Halifax - CLOSURE', N'HVAI', 0, N'Nova Scotia Community College', N'Halifax', N'Closure', 469, 605)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2870, N'Nova Scotia Community College - Kingstec Campus', N'HVAL', 1, N'Nova Scotia Community College', N'Kingstec Campus', NULL, 469, 606)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4545, N'Nova Scotia Community College - Marconi', N'HVBG', 1, N'Nova Scotia Community College', N'Marconi', NULL, 469, 607)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3043, N'Nova Scotia Community College - Port Hawkesbury', N'HVBD', 1, N'Nova Scotia Community College', N'Port Hawkesbury', NULL, 469, 608)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3711, N'Nova Scotia Community College - Waterfront Campus', N'HVAC', 1, N'Nova Scotia Community College', N'Waterfront', NULL, 469, 609)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (786, N'Nova Scotia Institute of Technology - DUPLICATE', N'HVAP', 0, N'Nova Scotia Community College', NULL, N'Duplicate', 469, 610)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (787, N'Nova Southeastern University', N'MUYH', 1, N'Nova Southeastern University', NULL, NULL, 470, 611)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (784, N'NSCAD University', N'HUAE', 1, N'NSCAD University', NULL, NULL, 471, 612)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1808, N'Okanagan College', N'AJBF', 1, N'Okanagan College', NULL, NULL, 472, 613)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3638, N'Okanagan College - Penticton Campus', N'AJBF', 1, N'Okanagan College', N'Penticton', NULL, 472, 614)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4062, N'Okanagan College - Salmon Arm', N'AJBF', 1, N'Okanagan College', N'Salmon Arm', NULL, 472, 615)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3698, N'Okanagan Cosmetology Institute Ltd', N'APVG', 1, N'Okanagan Cosmetology Institute Ltd', NULL, NULL, 473, 616)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (789, N'Okanagan School of Esthetics - CLOSURE', N'APIT', 0, N'Okanagan School of Esthetics', NULL, N'Closure', 474, 617)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (788, N'Okanagan University College - CLOSURE', N'AJAT', 0, N'Okanagan University College', NULL, N'Closure', 475, 618)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (791, N'Okanagan University College Kelowna - CLOSURE', N'AJAI', 0, N'Okanagan University College', N'Kelowna', N'Closure', 475, 619)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (794, N'Okanagan University College North Kelowna  - CLOSURE', N'AJBF', 0, N'Okanagan University College', N'North Kelowna', N'Closure', 475, 620)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (793, N'Okanagan University College Penticton - CLOSURE', N'AJAQ', 0, N'Okanagan University College', N'Penticton', N'Closure', 475, 621)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (795, N'Okanagan University College Salmon Arm - CLOSURE', N'AJBF', 0, N'Okanagan University College', N'Salmon Arm', N'Closure', 475, 622)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (797, N'Okanagan Valley College of Massage Therapy', N'APPL', 1, N'Okanagan Valley College of Massage Therapy', NULL, NULL, 476, 623)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (798, N'Olds College', N'BVAJ', 1, N'Olds College', NULL, NULL, 477, 624)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4655, N'One Beauty Academy', N'BPNY', 1, N'One Beauty Academy', N'Medicine Hat', NULL, 478, 625)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4734, N'One Beauty Academy - Calgary', N'BPOM', 1, N'One Beauty Academy', N'Calgary', NULL, 478, 626)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (799, N'Ontario Bible College - CLOSURE', N'EPBP', 0, N'Ontario Bible College', NULL, N'Closure', 479, 627)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2863, N'Ontario College of Art & Design', N'EVAY', 1, N'Ontario College of Art & Design', NULL, NULL, 480, 628)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4948, N'Ontario Institute of Audio Recording Technology', N'EPGZ', 1, N'Ontario Institute of Audio Recording Technology', NULL, NULL, 481, 629)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (800, N'Ontario Institution of Information Technology - CLOSURE', N'EQGS', 0, N'Ontario Institution of Information Technology', NULL, N'Closure', 482, 630)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (802, N'Open Learning Agency - CLOSURE', N'AVAR', 0, N'Open Learning Agency', NULL, N'Closure', 483, 631)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2292, N'Oxford Brookes University', N'PVEC', 1, N'Oxford Brookes University', NULL, NULL, 484, 632)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1766, N'Pacific Audio Visual Institute', N'AQBC', 1, N'Pacific Audio Visual Institute', NULL, NULL, 485, 633)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (803, N'Pacific Design Academy', N'APFY', 1, N'Pacific Design Academy', NULL, NULL, 486, 634)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3217, N'Pacific Horticulture College', N'APIQ', 1, N'Pacific Horticulture College', NULL, NULL, 487, 635)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3361, N'Pacific Institute of Advanced Hypnotherapy', N'KKKK', 1, N'Pacific Institute of Advanced Hypnotherapy', NULL, NULL, 488, 636)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1271, N'Pacific Institute of Culinary Arts', N'AQAH', 1, N'Pacific Institute of Culinary Arts', NULL, NULL, 489, 637)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1731, N'Pacific Life Bible College', N'APAG', 1, N'Pacific Life Bible College', NULL, NULL, 490, 638)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5205, N'Pacific Professional Flight Centre Ltd.', N'', 1, N'Pacific Professional Flight Centre Ltd.', NULL, NULL, 491, 639)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2834, N'Pacific Rim College', N'APTU', 1, N'Pacific Rim College', NULL, NULL, 492, 640)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1126, N'Pacific School of Cosmetology - CLOSURE', N'APHR', 0, N'Pacific School of Cosmetology', NULL, N'Closure', 493, 641)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (805, N'Pacific Union College', N'MUZP', 1, N'Pacific Union College', NULL, NULL, 494, 642)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (806, N'Pacific University', N'MUZQ', 1, N'Pacific University', NULL, NULL, 495, 643)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (807, N'Palmer College of Chiropractic', N'MWUL', 1, N'Palmer College of Chiropractic', NULL, NULL, 496, 644)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4899, N'Paris Academy of Art - NOT A DESIGNATED INSTITUTION', N'', 0, N'Paris Academy of Art', NULL, N'Not Designated', 497, 645)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1937, N'Patal Vocational Preparation Schools', N'DPBR', 1, N'Patal Vocational Preparation Schools', NULL, NULL, 498, 646)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (809, N'Peace River Bible Institute', N'BPCH', 1, N'Peace River Bible Institute', NULL, NULL, 499, 647)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (810, N'Pensacola Christian College - DEDESIGNATED', N'MPHP', 0, N'Pensacola Christian College', NULL, N'Dedesignated', 500, 648)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (811, N'Pepperdine University - INACTIVE', N'MWAD', 0, N'Pepperdine University', NULL, NULL, 501, 649)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (812, N'Petroleum Industry Training', N'', 0, N'Petroleum Industry Training', NULL, NULL, 502, 650)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (813, N'Phillips University', N'MQPW', 1, N'Phillips University', NULL, NULL, 503, 651)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1782, N'Pima County Community College', N'MJGI', 1, N'Pima County Community College', NULL, NULL, 504, 652)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (814, N'Pitman Business College - CLOSURE', N'APBK', 0, N'Pitman Business College', NULL, N'Closure', 505, 653)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5167, N'Plymouth State College/University', N'MWAL', 1, N'Plymouth State College/University', NULL, NULL, 506, 654)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1168, N'Polaris Media Centre - INACTIVE', N'LPAF', 0, N'Polaris Media Centre', NULL, NULL, 507, 655)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3253, N'Polytechnic Univ of the Philippines', N'', 1, N'Polytechnic Univ of the Philippines', NULL, NULL, 508, 656)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3251, N'Polytechnic University', N'', 0, N'Polytechnic University', NULL, NULL, 509, 657)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1663, N'Portage College', N'BJAS', 1, N'Portage College', NULL, NULL, 510, 658)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (815, N'Portage College - CLOSURE', N'BVAD', 0, N'Portage College', NULL, N'Closure', 510, 659)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (816, N'Portland Community College', N'MJUJ', 1, N'Portland Community College', NULL, NULL, 511, 660)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (817, N'Portland State University', N'MWAO', 1, N'Portland State University', NULL, NULL, 512, 661)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4071, N'Power Sales University', N'', 1, N'Power Sales University', NULL, NULL, 513, 662)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (818, N'Prairie Bible Institute', N'BPAP', 1, N'Prairie Bible Institute', NULL, NULL, 514, 663)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1391, N'Prairie Training Institute', N'BPRY', 0, N'Prairie Training Institute', NULL, NULL, 515, 664)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1946, N'Prairie West Regional College', N'', 0, N'Prairie West Regional College', NULL, NULL, 516, 665)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2139, N'Prana Yoga College - DEDESIGNATED', N'APRW', 0, N'Prana Yoga College', NULL, N'Dedesignated', 517, 666)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1140, N'Princeton University', N'MWAU', 1, N'Princeton University', NULL, NULL, 518, 667)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (819, N'Professional Golfers Career College - INACTIVE', N'MQTJ', 0, N'Professional Golfers Career College', NULL, NULL, 519, 668)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (823, N'Professional Golfers College - INACTIVE', N'MQMK', 0, N'Professional Golfers College', NULL, NULL, 520, 669)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (821, N'Professional Institution of Massage Therapy', N'CPEE', 1, N'Professional Institution of Massage Therapy', NULL, NULL, 521, 670)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (824, N'Providence University College & Seminary', N'DPAI', 1, N'Providence University College & Seminary', NULL, NULL, 522, 671)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1917, N'Purdue University', N'MWAZ', 1, N'Purdue University', NULL, NULL, 523, 672)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5197, N'Queen Margaret University', N'PUDY', 1, N'Queen Margaret University', NULL, NULL, 524, 673)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (825, N'Queens University', N'EUAP', 1, N'Queens University', NULL, NULL, 525, 674)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4318, N'Queensland University of Technology', N'VUBA', 0, N'Queensland University of Technology', NULL, NULL, 526, 675)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2390, N'Quest University', N'APTJ', 1, N'Quest University', NULL, NULL, 527, 676)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (826, N'Radcliffe College - INACTIVE', N'MWBD', 0, N'Radcliffe College', NULL, NULL, 528, 677)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2973, N'Randolph College for the Performing Arts', N'EPTO', 1, N'Randolph College for the Performing Arts', NULL, NULL, 529, 678)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1084, N'RCMP Training Academy', N'CPII', 1, N'RCMP Training Academy', NULL, NULL, 530, 679)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (827, N'Recording Arts Canada - DEDESIGNATED', N'EPIR', 0, N'Recording Arts Canada', NULL, N'Dedesignated', 531, 680)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2428, N'Red Deer College', N'BJAH', 1, N'Red Deer College', NULL, NULL, 532, 681)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (829, N'Red Deer College - CHANGED', N'BJAH', 0, N'Red Deer College', NULL, N'Changed Address', 532, 682)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1393, N'Red River College', N'DVAG', 1, N'Red River College', NULL, NULL, 815, 683)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2026, N'Reeves College', N'BPSY', 1, N'Reeves College', NULL, NULL, 533, 684)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (831, N'Regent College', N'APAQ', 1, N'Regent College', NULL, NULL, 534, 685)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (830, N'Regent University', N'MPXX', 1, N'Regent University', NULL, NULL, 535, 686)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (833, N'Reimer Express Driver Training - DEDESIGNATED', N'DPCB', 0, N'Reimer Express Driver Training', NULL, N'Dedesignated', 536, 687)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3916, N'Reykjavik University', N'ZUCJ', 1, N'Reykjavik University', NULL, NULL, 537, 688)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1182, N'Rhodes Career College - DUPLICATE', N'APRA', 0, N'Rhodes Career College', NULL, N'Duplicate', 538, 689)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (834, N'Rhodes Wellness College', N'APRA', 1, N'Rhodes Wellness College', NULL, NULL, 539, 690)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3364, N'Rhodes Wellness College - DUPLICATE', N'APRA', 0, N'Rhodes Wellness College', NULL, N'Duplicate', 539, 691)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (835, N'Richards Beauty School', N'CPBE', 1, N'Richards Beauty School', NULL, NULL, 540, 692)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1098, N'Richmond School of Hairdressing - CLOSURE', N'APHZ', 0, N'Richmond School of Hairdressing', NULL, N'Closure', 541, 693)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3121, N'Robertson College - Calgary', N'BPTA', 1, N'Robertson College', N'Calgary', NULL, 542, 694)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3403, N'Robertson College - Winnipeg', N'DPBT', 1, N'Robertson College', N'Winnipeg', NULL, 542, 695)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (836, N'Rocky Mountain College', N'BPGS', 1, N'Rocky Mountain College', NULL, NULL, 543, 696)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (838, N'Rocky Mountain College Montana - INACTIVE', N'MWBZ', 0, N'Rocky Mountain College Montana', NULL, NULL, 544, 697)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (841, N'Roehampton University', N'PVEM', 1, N'Roehampton University', NULL, NULL, 545, 698)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5233, N'Rotorworks Inc.', N'BPSM', 1, N'Rotorworks Inc.', NULL, NULL, 546, 699)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1541, N'Rovaniemi Polytechnic - INACTIVE', N'QUXU', 0, N'Rovaniemi Polytechnic', NULL, NULL, 547, 700)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4228, N'Royal Conservatory of Music', N'EPCQ', 1, N'Royal Conservatory of Music', NULL, NULL, 548, 701)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1285, N'Royal Military College', N'EUAS', 1, N'Royal Military College', NULL, NULL, 549, 702)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (842, N'Royal Roads Military College - CLOSURE', N'APCS', 0, N'Royal Roads Military College', NULL, N'Closure', 550, 703)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (843, N'Royal Roads University', N'AUAJ', 1, N'Royal Roads University', NULL, NULL, 551, 704)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3417, N'Royal Welsh College of Music & Drama', N'PVDY', 1, N'Royal Welsh College of Music & Drama', NULL, NULL, 552, 705)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (844, N'Royal Winnipeg Ballet', N'DPAJ', 0, N'Royal Winnipeg Ballet', NULL, NULL, 553, 706)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2095, N'RSH International College of Cosmetology - New Westminster - DEDESIGNATED', N'APIB', 0, N'RSH International College of Cosmetology', N'New Westminster', N'Dedesignated', 554, 707)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (845, N'Ruby Productions Inc', N'', 0, N'Ruby Productions Inc', NULL, NULL, 555, 708)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (847, N'Ryerson University', N'EUBF', 1, N'Ryerson University', NULL, NULL, 556, 709)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1312, N'Saba University School of Medicine', N'NUBP', 1, N'Saba University School of Medicine', NULL, NULL, 557, 710)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4913, N'Saint James School of Medicine NOT DESIGNATED', N'QUWH', 0, N'Saint James School of Medicine', NULL, N'Not Designated', 558, 711)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (882, N'Saint Mary''s University', N'HUAH', 1, N'Saint Mary''s University', NULL, NULL, 559, 712)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (848, N'SAIT', N'BVAL', 1, N'SAIT', NULL, NULL, 560, 713)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (852, N'Santa Barbara City College - INACTIVE', N'MJJX', 0, N'Santa Barbara City College', NULL, NULL, 561, 714)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2700, N'Santa Monica College', N'MJJY', 1, N'Santa Monica College', NULL, NULL, 562, 715)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2114, N'Sarah Lawrence College', N'MWET', 1, N'Sarah Lawrence College', NULL, NULL, 563, 716)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (853, N'Saskatchewan Indian Federation College - CLOSURE', N'CUAN', 0, N'Saskatchewan Indian Federation College', NULL, NULL, 564, 717)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2187, N'Saskatchewan Polytechnic -  Regina', N'CVAM', 1, N'Saskatchewan Polytechnic', N'Regina', NULL, 565, 718)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (849, N'Saskatchewan Polytechnic - Moosejaw', N'CVAH', 1, N'Saskatchewan Polytechnic', N'Moosejaw', NULL, 565, 719)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1950, N'Saskatchewan Polytechnic - Prince Albert', N'CVAU', 1, N'Saskatchewan Polytechnic', N'Prince Albert', NULL, 565, 720)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (855, N'Saskatchewan Polytechnic - Prince Albert Campus', N'CVAU', 1, N'Saskatchewan Polytechnic', N'Prince Albert Campus', NULL, 565, 721)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (854, N'Saskatchewan Polytechnic - Regina Campus', N'CVAM', 1, N'Saskatchewan Polytechnic', N'Regina Campus', NULL, 565, 722)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (851, N'Saskatchewan Polytechnic - Saskatoon', N'CVAP', 1, N'Saskatchewan Polytechnic', N'Saskatoon', NULL, 565, 723)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (993, N'Saskatoon Public School Division', N'CVAL', 1, N'Saskatoon Public School Division', NULL, NULL, 566, 724)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (856, N'Sault College', N'EVBP', 1, N'Sault College', NULL, NULL, 567, 725)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2518, N'Saybrook University', N'MPWL', 0, N'Saybrook University', NULL, NULL, 568, 726)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2980, N'School of Oriental &  African Studies', N'PPDV', 1, N'School of Oriental &  African Studies', NULL, NULL, 569, 727)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3486, N'Schoolcreative', N'APUI', 0, N'Schoolcreative', NULL, NULL, 570, 728)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (857, N'Scientific Marvel School of Hairstyling', N'DPAM', 1, N'Scientific Marvel School of Hairstyling', NULL, NULL, 571, 729)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (858, N'Scottsdale Culinary Institute - INACTIVE', N'MVVK', 0, N'Scottsdale Culinary Institute', NULL, NULL, 572, 730)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (860, N'Selkirk College - Castlegar', N'AJAP', 1, N'Selkirk College', N'Castlegar', NULL, 573, 731)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2326, N'Selkirk College - Nelson', N'AJAP', 1, N'Selkirk College', N'Nelson', NULL, 573, 732)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (862, N'Selkirk College Nelson USE SELKIRK CASTLEGAR - CHANGED', N'AJAP', 0, N'Selkirk College', NULL, NULL, 573, 733)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2215, N'Seneca College - King', N'EVBQ', 1, N'Seneca College', N'King', NULL, 574, 734)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3065, N'Seneca College - Newnham', N'EVBQ', 1, N'Seneca College', N'Newnham', NULL, 574, 735)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3860, N'Seneca College - York', N'EVBQ', 1, N'Seneca College', N'York', NULL, 574, 736)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1177, N'Seneca College - York - CLOSURE', N'EVBV', 0, N'Seneca College', N'York', N'Closure', 574, 737)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (863, N'Seneca College Willowdale - DUPLICATE', N'EVBQ', 0, N'Seneca College', N'Willowdale', N'Duplicate', 574, 738)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (865, N'Sheldon Jackson College - INACTIVE', N'MPOQ', 0, N'Sheldon Jackson College', NULL, N'Inactive', 575, 739)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (867, N'Sheridan College', N'EVBR', 1, N'Sheridan College', NULL, NULL, 576, 740)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2181, N'Simon Fraser University', N'AUAE', 1, N'Simon Fraser University', NULL, NULL, 577, 741)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (869, N'Simon Fraser University - CHANGED', N'AUAE', 0, N'Simon Fraser University', NULL, N'Changed Address', 577, 742)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (870, N'Fleming College ', N'EVBU', 1, N'Fleming College', N'Peterborough', N'Chayged Peterborough', 578, 743)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2172, N'Fleming College', N'EVBT', 1, N'Fleming College', N'Lindsay', NULL, 578, 744)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (876, N'Sky Wings Aviation Academy', N'BPEC', 1, N'Sky Wings Aviation Academy', NULL, NULL, 579, 745)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (877, N'Sophia University - INACTIVE', N'UUAH', 0, N'Sophia University', NULL, NULL, 580, 746)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (879, N'Southwestern Adventist College - INACTIVE', N'MPHZ', 0, N'Southwestern Adventist College', NULL, NULL, 581, 747)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3046, N'Springbank Air Training College Ltd', N'BPSG', 1, N'Springbank Air Training College Ltd', NULL, NULL, 582, 748)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2334, N'Sprott Shaw College - East Vancouver', N'APYN', 1, N'Sprott Shaw College', N'East Vancouver', NULL, 583, 749)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1304, N'Sprott Shaw College - Kamloops', N'APYQ', 1, N'Sprott Shaw College', N'Kamloops', NULL, 583, 750)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3704, N'Sprott Shaw College - Kelowna', N'APWX', 1, N'Sprott Shaw College', N'Kelowna', NULL, 583, 751)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3383, N'Sprott Shaw College - Nanaimo', N'APWW', 1, N'Sprott Shaw College', N'Nanaimo', NULL, 583, 752)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2366, N'Sprott Shaw College - New Westminster', N'APNI', 1, N'Sprott Shaw College', N'New Westminster', NULL, 583, 753)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (880, N'Sprott Shaw College - Victoria', N'APAO', 1, N'Sprott Shaw College', N'Victoria', NULL, 583, 754)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3002, N'St. Clair College of Applied Arts & Technology', N'EVBJ', 1, N'St. Clair College of Applied Arts & Technology', NULL, NULL, 584, 755)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (471, N'St. Francis Xavier University', N'HUAG', 1, N'St. Francis Xavier University', NULL, NULL, 585, 756)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2616, N'St. John Ambulance', N'', 0, N'St. John Ambulance', NULL, NULL, 586, 757)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3569, N'St. Lawrence College Applied Arts & Technology - Cornwall', N'EVBK', 1, N'St. Lawrence College Applied Arts & Technology', N'Cornwall', NULL, 587, 758)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (881, N'St. Lawrence College Applied Arts & Technology - Kingston', N'EVBL', 1, N'St. Lawrence College Applied Arts & Technology', N'Kingston', NULL, 587, 759)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4823, N'St. Mary''s University', N'BPJB', 1, N'St. Mary''s University', NULL, NULL, 588, 760)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2774, N'St. Norbert College - INACTIVE', N'MPFK', 0, N'St. Norbert College', NULL, NULL, 589, 761)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (883, N'St. Paul Technical College - INACTIVE', N'MVJO', 0, N'St. Paul Technical College', NULL, NULL, 590, 762)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3669, N'St. Paul University', N'EUAU', 1, N'St. Paul University', NULL, NULL, 591, 763)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (884, N'St. Peters College', N'CUAI', 1, N'St. Peters College', NULL, NULL, 592, 764)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (886, N'St. Thomas University', N'GUAA', 1, N'St. Thomas University', NULL, NULL, 593, 765)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1133, N'St. Thomas University - DUPLICATE', N'GUAA', 0, N'St. Thomas University', NULL, N'Duplicate', 593, 766)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1770, N'Stanford University', N'MWGZ', 1, N'Stanford University', NULL, NULL, 594, 767)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2445, N'Stenberg College - Surrey', N'APXS', 1, N'Stenberg College', N'Surrey', NULL, 595, 768)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1073, N'Stratford Career Institute - DEDESIGNATED', N'FPEG', 0, N'Stratford Career Institute', NULL, N'Dedesignated', 596, 769)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (887, N'Strathcona Career Training Institute - CLOSURE', N'BPJX', 0, N'Strathcona Career Training Institute', NULL, N'Closure', 597, 770)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (888, N'Success & Angus Business College - CLOSURE', N'DPAH', 0, N'Success & Angus Business College', NULL, N'Closure', 598, 771)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1002, N'Summit Pacific College', N'APAH', 1, N'Summit Pacific College', NULL, NULL, 599, 772)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5498, N'Sundance College', N'BPPD', 1, N'Sundance College', NULL, NULL, 600, 773)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (889, N'Swedish University of Agricultural Science - INACTIVE', N'QUUM', 0, N'Swedish University of Agricultural Science', NULL, NULL, 601, 774)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3232, N'Syracuse University', N'MWHP', 1, N'Syracuse University', NULL, NULL, 602, 775)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (890, N'Tauernhof Bible School - INACTIVE', N'QPEK', 0, N'Tauernhof Bible School', NULL, NULL, 603, 776)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1110, N'Taylor College & Seminary', N'BPAL', 1, N'Taylor College & Seminary', NULL, NULL, 604, 777)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (765, N'Taylor College and Seminary', N'BPAL', 0, N'Taylor College & Seminary', NULL, NULL, 604, 778)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (891, N'Taylor College of  Mission & Evangelism', N'GPJA', 1, N'Taylor College of Mission & Evangelism', NULL, NULL, 605, 779)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (892, N'Technical University of BC - CLOSURE', N'AUAK', 0, N'Technical University of BC', NULL, N'Closure', 606, 780)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (893, N'Technical University of Nova Scotia - CLOSURE', N'HUAI', 0, N'Technical University of Nova Scotia', NULL, N'Closure', 607, 781)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1524, N'Teslin Tlingit Council', N'BBBB', 0, N'Teslin Tlingit Council', NULL, NULL, 608, 782)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2798, N'The Art Institute of Vancouver - Burnaby - CLOSURE', N'APCY', 0, N'The Art Institute of Vancouver', N'Burnaby', N'Closure', 609, 783)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1514, N'The Art Institute of Vancouver - CHANGED', N'APZC', 0, N'The Art Institute of Vancouver', NULL, N'Changed Address', 609, 784)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2790, N'The Art Institute of Vancouver - Culinary - CHANGED', N'APDW', 0, N'The Art Institute of Vancouver', N'Culinary', N'Changed Address', 609, 785)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1960, N'The Art Institute of Vancouver - Culinary - DEDESIGNATED', N'APDW', 0, N'The Art Institute of Vancouver', N'Culinary', N'Dedesignated', 609, 786)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4308, N'The Esthetic Institute Training Centre', N'BPPI', 1, N'The Esthetic Institute Training Centre', NULL, NULL, 610, 787)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1370, N'The Hair Art Academy - CHANGED', N'APXC', 0, N'The Hair Art Academy', NULL, N'Changed Changed', 611, 788)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1632, N'The Hair Art Academy - CLOSURE', N'APXC', 0, N'The Hair Art Academy', NULL, N'Closure', 611, 789)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2330, N'The Photography Institute', N'MMMM', 0, N'The Photography Institute', NULL, NULL, 612, 790)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1421, N'The Pilates & Physical Therapy Center of Seattle', N'RRRR', 0, N'The Pilates & Physical Therapy Center of Seattle', N'Seattle', NULL, 613, 791)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3133, N'The School of Dance', N'UUUU', 0, N'The School of Dance', NULL, NULL, 614, 792)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4551, N'The School of Toronto Dance Theatre', N'EPEF', 1, N'The School of Toronto Dance Theatre', NULL, NULL, 615, 793)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3521, N'Think Tank Training Centre', N'APTH', 1, N'Think Tank Training Centre', NULL, NULL, 616, 794)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3292, N'Thompson Rivers University', N'AUAP', 1, N'Thompson Rivers University', NULL, NULL, 617, 795)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1644, N'Thompson Rivers University - CHANGED', N'AVAR', 0, N'Thompson Rivers University', NULL, N'Changed Address', 617, 796)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (432, N'Thompson Rivers University - CHANGED1', N'AUAP', 0, N'Thompson Rivers University', NULL, N'Changed Address', 617, 797)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2541, N'Thompson Rivers University - Open Learning Division - CHANGED', N'AUAR', 0, N'Thompson Rivers University', N'Open Learning Division', N'Changed Address', 617, 798)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3794, N'Toronto College of Dental Hygiene & Auxiliaries Inc.', N'EPGW', 1, N'Toronto College of Dental Hygiene & Auxiliaries Inc.', NULL, NULL, 618, 799)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3319, N'Toronto Film School - Concord', N'EPBT', 1, N'Toronto Film School', N'Concord', NULL, 619, 800)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3842, N'Toronto Film School - Davisville', N'EQGD', 1, N'Toronto Film School', N'Davisville', NULL, 619, 801)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3527, N'Toronto Film School - Dundas', N'EQAM', 1, N'Toronto Film School', N'Dundas', NULL, 619, 802)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (894, N'Toronto School of Business - CLOSURE', N'EPUY', 0, N'Toronto School of Business', NULL, N'Closure', 620, 803)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (518, N'Tourism Training Institute - DEDESIGNATED', N'APJM', 0, N'Tourism Training Institute', NULL, N'Dedesignated', 621, 804)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (895, N'Trebas Institute - CLOSURE', N'APER', 0, N'Trebas Institute', NULL, N'Closure', 622, 805)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1726, N'Trend College - Kelowna - CLOSURE', N'APLY', 0, N'Trend College', N'Kelowna', N'Closure', 623, 806)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (897, N'Trent University', N'EUAW', 1, N'Trent University', NULL, NULL, 624, 807)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4360, N'Trillium College', N'EPAO', 1, N'Trillium College', NULL, NULL, 625, 808)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (898, N'Trinity Bible College - INACTIVE', N'MPOW', 0, N'Trinity Bible College', NULL, NULL, 626, 809)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (899, N'Trinity Western University', N'APAK', 1, N'Trinity Western University', NULL, NULL, 627, 810)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (900, N'Tutchone Air Inc. - CLOSURE', N'LPAB', 0, N'Tutchone Air Inc.', NULL, N'Closure', 628, 811)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (901, N'Umea Universitet', N'QUGH', 1, N'Umea Universitet', NULL, NULL, 629, 812)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4537, N'University of Northern British Columbia', N'AUAG', 1, N'UNBC - Northwest', N'Northwest', NULL, 630, 813)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (902, N'Union Institute - INACTIVE', N'MXBO', 0, N'Union Institute', NULL, NULL, 631, 814)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (908, N'Unity College', N'MPGL', 1, N'Unity College', NULL, NULL, 632, 815)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (911, N'Universal Career College - CLOSURE', N'CPCZ', 0, N'Universal Career College', NULL, N'Closure', 633, 816)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (912, N'Universal Career Institute - INACTIVE', N'FPDM', 0, N'Universal Career Institute', NULL, NULL, 634, 817)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5176, N'Universidad Pedro de Valdivia', N'', 0, N'Universidad Pedro de Valdivia', NULL, NULL, 635, 818)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (913, N'Universitat des Saarlandes Studentensekretariat Im', N'QUFL', 1, N'Universitat des Saarlandes Studentensekretariat Im', NULL, NULL, 636, 819)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (915, N'Universitat Trier Studentensekretariat - INACTIVE', N'QUKF', 0, N'Universitat Trier Studentensekretariat', NULL, NULL, 637, 820)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3227, N'Universite d''Orleans', N'QUEK', 0, N'Universite d''Orleans', NULL, NULL, 638, 821)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (918, N'Universite de Grenoble - INACTIVE', N'QUCJ', 0, N'Universite de Grenoble', NULL, NULL, 639, 822)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2152, N'Universite de Moncton - DO NOT USE', N'GUAB', 0, N'Universite de Moncton', NULL, N'Do Not Use', 640, 823)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (923, N'Universite de Moncton - Edmundston', N'GUAE', 1, N'Universite de Moncton', N'Edmundston', NULL, 640, 824)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (919, N'Universite de Moncton - Moncton', N'GUAB', 1, N'Universite de Moncton', N'Moncton', NULL, 640, 825)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (925, N'Universite de Montreal', N'FUAD', 1, N'Universite de Montreal', N'Montreal', NULL, 641, 826)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (926, N'Universite de Nancy - INACTIVE', N'QUEB', 0, N'Universite de Nancy', NULL, NULL, 642, 827)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3225, N'Universite de Paris - Dauphine', N'QUPE', 1, N'Universite de Paris', N'Dauphine', NULL, 643, 828)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (927, N'Universite de Poitiers', N'QUEV', 1, N'Universite de Poitiers', N'Poitiers', NULL, 644, 829)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1231, N'Universite de Sherbrooke', N'FUAL', 1, N'Universite de Sherbrooke', N'Sherbrooke', NULL, 645, 830)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (929, N'Universite du Quebec - Chicoutimi', N'FUAI', 1, N'Universite du Quebec', N'Chicoutimi', NULL, 646, 831)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3790, N'Universite du Quebec - Ecole de Technologie Superieur', N'FUAQ', 1, N'Universite du Quebec', N'Ecole de Technologie Superieur', NULL, 646, 832)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1481, N'Universite du Quebec - Montreal', N'FUAG', 1, N'Universite du Quebec', N'Montreal', NULL, 646, 833)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3179, N'Universite du Quebec - Tele Univ', N'FUBC', 1, N'Universite du Quebec', N'Tele Univ', NULL, 646, 834)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (928, N'Universite du Quebec - Trois-Rivieres', N'FUAH', 1, N'Universite du Quebec', N'Trois-Rivieres', NULL, 646, 835)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1137, N'Universite Paul Sabatier - INACTIVE', N'QULN', 0, N'Universite Paul Sabatier', NULL, NULL, 647, 836)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (930, N'Universite Ste-Anne', N'HUAF', 0, N'Universite Ste-Anne', NULL, NULL, 648, 837)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2308, N'Universitet et Linkoping', N'QULP', 1, N'Universitet et Linkoping', N'Linkoping', NULL, 649, 838)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4250, N'University Centre of the Westfjords', N'ZUAF', 0, N'University Centre of the Westfjords', NULL, NULL, 650, 839)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5561, N'University College Cork', N'QUEE', 1, N'University College Cork', N'Cork', NULL, 651, 840)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5451, N'University College Dublin', N'QUKV', 1, N'University College Dublin', N'Dublin', NULL, 652, 841)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3285, N'University College London', N'PUDB', 1, N'University College London', N'London', NULL, 653, 842)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1612, N'University College of the Cariboo - CHANGED', N'AJAC', 0, N'University College of the Cariboo', NULL, N'Changed Address', 654, 843)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (934, N'University College of the Fraser Valley - DEDESIGNATED', N'AJAD', 0, N'University College of the Fraser Valley', NULL, N'Dedesignated', 655, 844)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (935, N'University de Savoie - INACTIVE', N'QUKM', 0, N'University de Savoie', NULL, NULL, 656, 845)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1895, N'University for Peace', N'NUBW', 1, N'University for Peace', NULL, NULL, 657, 846)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (910, N'University Mayor de San Andres - INACTIVE', N'OUBG', 0, N'University Mayor de San Andres', NULL, NULL, 658, 847)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2552, N'University of Aberdeen', N'PUAA', 1, N'University of Aberdeen', N'Aberdeen', NULL, 659, 848)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2654, N'University of Alaska  -  Aleutians', N'MUVP', 0, N'University of Alaska', N'Aleutians', NULL, 660, 849)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2665, N'University of Alaska - Anchorage', N'MUXW', 1, N'University of Alaska', N'Anchorage', NULL, 660, 850)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2596, N'University of Alaska - Anchorage - CHANGED', N'MUXW', 0, N'University of Alaska', N'Anchorage', N'Changed Address', 660, 851)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (936, N'University of Alaska - Fairbanks', N'MUVP', 1, N'University of Alaska', N'Fairbanks', NULL, 660, 852)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (938, N'University of Alaska - Southeast', N'MWXH', 1, N'University of Alaska', N'Southeast', NULL, 660, 853)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3827, N'University of Alaska Anchorage - Mat-Su College', N'MUXW', 0, N'University of Alaska', N'Mat-Su College', NULL, 660, 854)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (937, N'University of Alaska Anchorage CHANGED', N'MUXW', 0, N'University of Alaska', N'Anchorage', N'Changed Address', 660, 855)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (939, N'University of Alberta', N'BUAA', 1, N'University of Alberta', NULL, NULL, 661, 856)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2204, N'University of Alberta - Augustana', N'BUAA', 1, N'University of Alberta', N'Augustana', NULL, 661, 857)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1561, N'University of Alberta - Augustana - CHANGED', N'BUAN', 0, N'University of Alberta', N'Augustana', N'Changed Address', 661, 858)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1760, N'University of Alberta - GPRC - DEDESIGNATED', N'BUAA', 0, N'University of Alberta', N'GPRC', N'Dedesignated', 661, 859)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (940, N'University of Arkansas - Fayetteville', N'MUBD', 1, N'University of Arkansas', N'Fayetteville', NULL, 662, 860)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1508, N'University of Berlin', N'', 0, N'University of Berlin', N'Berlin', NULL, 663, 861)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1881, N'University of Bern', N'QUAR', 0, N'University of Bern', N'Bern', NULL, 664, 862)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3036, N'University of Bradford', N'PUAJ', 1, N'University of Bradford', N'Bradford', NULL, 665, 863)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (941, N'University of Bridgeport', N'MUDN', 1, N'University of Bridgeport', N'Bridgeport', NULL, 666, 864)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3850, N'University of Bristol', N'PUAH', 1, N'University of Bristol', N'Bristol', NULL, 667, 865)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3094, N'University of British Columbia - Okanagan', N'AUAA', 1, N'University of British Columbia', N'Okanagan', NULL, 668, 866)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (942, N'University of British Columbia - Vancouver', N'AUAA', 1, N'University of British Columbia', N'Vancouver', NULL, 668, 867)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1695, N'University of British Columbia Okanagan - CHANGED', N'AUAA', 0, N'University of British Columbia', N'Okanagan', N'Changed Address', 668, 868)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4523, N'University of Buckingham (excludes medical school)', N'PUDN', 1, N'University of Buckingham', N'Buckingham', NULL, 669, 869)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (943, N'University of Calgary', N'BUAC', 1, N'University of Calgary', N'Calgary', NULL, 670, 870)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4599, N'University of California - Berkeley', N'MUEM', 1, N'University of California', N'Berkeley', NULL, 671, 871)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (944, N'University of California - Davis Campus', N'MUEN', 1, N'University of California', N'Davis Campus', NULL, 671, 872)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3862, N'University of California - Los Angeles Campus', N'MUEO', 1, N'University of California', N'Los Angeles Campus', NULL, 671, 873)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2650, N'University of California - Riverside - INACTIVE', N'MUEP', 0, N'University of California', N'Riverside', NULL, 671, 874)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3875, N'University of California - UCLA Extension', N'MUEO', 1, N'University of California', N'UCLA Extension', NULL, 671, 875)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2811, N'University of Canada West', N'APUK', 1, N'University of Canada West', NULL, NULL, 672, 876)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3128, N'University of Canada West - Online', N'APDH', 0, N'University of Canada West', N'Online', NULL, 672, 877)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2414, N'University of Canterbury', N'VUAE', 1, N'University of Canterbury', N'Canterbury', NULL, 673, 878)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4337, N'University of Cape Town', N'SUAD', 1, N'University of Cape Town', NULL, NULL, 674, 879)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2911, N'University of Copenhagen - DEDESIGNATED', N'QWCB', 0, N'University of Copenhagen', NULL, N'Dedesignated', 675, 880)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (945, N'University of Dundee', N'PUAO', 1, N'University of Dundee', N'Dundee', NULL, 676, 881)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (946, N'University of Edinburgh', N'PUAR', 1, N'University of Edinburgh', N'Edinburgh', NULL, 677, 882)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3263, N'University of Essex', N'PUAS', 1, N'University of Essex', N'Essex', NULL, 678, 883)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5248, N'University of Fredericton', N'GPCJ', 1, N'University of Fredericton', N'Fredericton', NULL, 679, 884)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (947, N'University of Freiburg - DUPLICATE', N'QUBY', 0, N'University of Freiburg', NULL, N'Duplicate', 680, 885)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (948, N'University of Guelph', N'EUAK', 1, N'University of Guelph', N'Guelph', NULL, 681, 886)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2421, N'University of Hawaii', N'MUMX', 1, N'University of Hawaii', N'Hawaii', NULL, 682, 887)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2996, N'University of Iceland', N'ZUAB', 1, N'University of Iceland', N'Iceland', NULL, 683, 888)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3026, N'University of Immaculate Conception', N'', 0, N'University of Immaculate Conception', NULL, NULL, 684, 889)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4276, N'University of Jamestown', N'MUOF', 1, N'University of Jamestown', N'Jamestown', NULL, 685, 890)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (949, N'University of King''s College', N'HUAC', 1, N'University of King''s College', NULL, NULL, 686, 891)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (950, N'University of King''s College - Journalism', N'HUAC', 0, N'University of King''s College', N'Journalism', NULL, 686, 892)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1621, N'University of Lapland - INACTIVE', N'ZUBQ', 0, N'University of Lapland', NULL, NULL, 687, 893)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (951, N'University of Leeds - INACTIVE', N'PUDF', 0, N'University of Leeds', NULL, NULL, 688, 894)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1517, N'University of Leipzig', N'QUMZ', 1, N'University of Leipzig', N'Leipzig', NULL, 689, 895)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (952, N'University of Lethbridge', N'BUAD', 1, N'University of Lethbridge', N'removed campus name', NULL, 690, 896)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (953, N'University of Lisbon - INACTIVE', N'QUMQ', 0, N'University of Lisbon', NULL, NULL, 691, 897)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (954, N'University of London - INACTIVE', N'PUBL', 0, N'University of London', NULL, NULL, 692, 898)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (955, N'University of London - Institute of Art', N'PUEO', 1, N'University of London', N'Institute of Art', NULL, 692, 899)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3493, N'University of London - King''s College', N'PUES', 1, N'University of London', N'King''s College', NULL, 692, 900)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3802, N'University of London International Programmes', N'PUJT', 1, N'University of London', N'International Programmes', NULL, 692, 901)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4814, N'University of Louisville', N'MUQM', 1, N'University of Louisville', N'Louisville', NULL, 693, 902)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (956, N'University of Maine', N'MWWR', 1, N'University of Maine', N'Maine', NULL, 694, 903)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (957, N'University of Manitoba', N'DUAB', 1, N'University of Manitoba', N'Manitoba', NULL, 695, 904)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4642, N'University of Melbourne', N'VUAI', 1, N'University of Melbourne', N'Melbourne', NULL, 696, 905)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (739, N'University of Monash', N'VUAJ', 1, N'University of Monash', N'Monash', NULL, 697, 906)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1736, N'Great Falls College Montana State University', N'MVGP', 1, N'University of Montana', N'College of Technology', NULL, 698, 907)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1506, N'University of Munich - DEDESIGNATED', N'MMMM', 0, N'University of Munich', NULL, N'Dedesignated', 699, 908)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (958, N'University of N. Caucases - INACTIVE', N'QUQA', 0, N'University of N. Caucases', NULL, NULL, 700, 909)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (959, N'University of New Brunswick - Fredericton', N'GUAG', 1, N'University of New Brunswick', N'Fredericton', NULL, 701, 910)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1356, N'University of New Brunswick - Saint John', N'GUAH', 1, N'University of New Brunswick', N'Saint John', NULL, 701, 911)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2503, N'University of New Hampshire', N'MUVH', 1, N'University of New Hampshire', N'Hampshire', NULL, 702, 912)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (960, N'University of New Mexico', N'MUVL', 1, N'University of New Mexico', N'Mexico', NULL, 703, 913)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (961, N'University of New South Wales', N'VUAM', 1, N'University of New South Wales', N'Wales', NULL, 704, 914)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2876, N'University of Newcastle', N'VUAK', 1, N'University of Newcastle', N'Newcastle', NULL, 705, 915)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2752, N'University of North Carolina - Chapel Hill', N'MUWI', 1, N'University of North Carolina', N'Chapel Hill', NULL, 706, 916)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (962, N'University of Northern British Columbia', N'AUAG', 1, N'University of Northern British Columbia', NULL, NULL, 707, 917)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1037, N'University of Notre Dame - INACTIVE', N'VUSQ', 0, N'University of Notre Dame', NULL, NULL, 708, 918)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3882, N'University of Ontario Institute of Technology', N'EUBS', 1, N'University of Ontario Institute of Technology', NULL, NULL, 709, 919)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (963, N'University of Oregon', N'MUZD', 1, N'University of Oregon', NULL, NULL, 710, 920)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3105, N'University of Oslo', N'QUEL', 1, N'University of Oslo', NULL, NULL, 711, 921)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3378, N'University of Ottawa', N'EUAO', 1, N'University of Ottawa', NULL, NULL, 712, 922)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (964, N'University of Ottawa - CHANGED', N'EUAO', 0, N'University of Ottawa', NULL, N'Changed Address', 712, 923)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1255, N'University of Oulu ', N'QUEM', 0, N'University of Oulu', NULL, NULL, 713, 924)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (965, N'University of Paul Valery', N'QUEQ', 1, N'University of Paul Valery', NULL, NULL, 714, 925)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3541, N'University of Phoenix', N'MWTV', 1, N'University of Phoenix', NULL, NULL, 715, 926)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2908, N'University of Pretoria', N'SUBE', 1, N'University of Pretoria', NULL, NULL, 716, 927)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (966, N'University of Prince Edward Island', N'IUAA', 1, N'University of Prince Edward Island', NULL, NULL, 717, 928)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2417, N'University of Quebec - DUPLICATE', N'FUAH', 0, N'University of Quebec', NULL, N'Duplicate', 718, 929)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1762, N'University of Queensland', N'VUAP', 1, N'University of Queensland', NULL, NULL, 719, 930)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (968, N'University of Reading', N'PUCA', 1, N'University of Reading', NULL, NULL, 720, 931)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2053, N'University of Regina', N'CUAB', 1, N'University of Regina', NULL, NULL, 721, 932)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (970, N'University of Regina - CHANGED', N'CUAB', 0, N'University of Regina', NULL, N'Changed Address', 721, 933)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2786, N'University of Salford - INACTIVE', N'PUCD', 0, N'University of Salford', NULL, NULL, 722, 934)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3071, N'University of Saskatchewan', N'CUAC', 1, N'University of Saskatchewan', NULL, NULL, 723, 935)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (971, N'University of Saskatchewan - CHANGED', N'CUAC', 0, N'University of Saskatchewan', NULL, N'Changed Address', 723, 936)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1033, N'University of Sheffield', N'PUCE', 1, N'University of Sheffield', NULL, NULL, 724, 937)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1122, N'University of Southern Queensland - INACTIVE', N'VUSK', 0, N'University of Southern Queensland', NULL, NULL, 725, 938)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1719, N'University of St. Andrews', N'PUCC', 1, N'University of St. Andrews', NULL, NULL, 726, 939)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1703, N'University of Strathclyde', N'PUCH', 1, N'University of Strathclyde', NULL, NULL, 727, 940)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1558, N'University of Sydney', N'VUAQ', 1, N'University of Sydney', NULL, NULL, 728, 941)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3396, N'University of Texas - Austin', N'MWIF', 1, N'University of Texas', N'Austin', NULL, 729, 942)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2544, N'University of the Fraser Valley', N'AUAY', 1, N'University of the Fraser Valley', NULL, NULL, 730, 943)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3914, N'University of the Highlands & Islands', N'PUAX', 1, N'University of the Highlands & Islands', NULL, NULL, 731, 944)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3080, N'University of the Pacific', N'MUZR', 1, N'University of the Pacific', NULL, NULL, 732, 945)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5132, N'university of the sourth pacific', N'', 1, N'University of the South Pacific', NULL, NULL, 733, 946)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5134, N'University of the South Pacific - Laucala', N'ZUCR', 1, N'University of the South Pacific', N'Laucala', NULL, 733, 947)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3634, N'Hartpury University', N'PVFW', 1, N'Hartpury University', N'Hartpury ', NULL, 734, 948)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2660, N'University of Toronto', N'EUAV', 1, N'University of Toronto', NULL, NULL, 735, 949)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (972, N'University of Toronto - CHANGED', N'EUAV', 0, N'University of Toronto', NULL, N'Changed Address', 735, 950)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2522, N'University of Tromso', N'QUNN', 1, N'University of Tromso', NULL, NULL, 736, 951)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (973, N'University of Victoria', N'AUAF', 1, N'University of Victoria', NULL, NULL, 737, 952)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4793, N'University of Vienna', N'QUHG', 1, N'University of Vienna', NULL, NULL, 738, 953)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3765, N'University of Virginia', N'MWKE', 1, N'University of Virginia', NULL, NULL, 739, 954)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1483, N'University of Washington', N'MWKQ', 1, N'University of Washington', NULL, NULL, 740, 955)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (974, N'University of Waterloo', N'EUAX', 1, N'University of Waterloo', NULL, NULL, 741, 956)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2573, N'University of Western Ontario', N'EUAY', 1, N'University of Western Ontario', NULL, NULL, 742, 957)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (975, N'University of Western Ontario - DO NOT USE', N'EUAY', 0, N'University of Western Ontario', NULL, N'Do NotUse', 742, 958)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3425, N'University of Western Ontario ', N'EUAY', 1, N'University of Western Ontario', N'King''s College', NULL, 742, 959)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1003, N'University of Western States', N'MWLM', 1, N'University of Western States', NULL, NULL, 743, 960)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4192, N'university of westfjords', N'', 1, N'University of Westfjords', NULL, NULL, 744, 961)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (976, N'University of Windsor', N'EUBA', 1, N'University of Windsor', NULL, NULL, 745, 962)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (977, N'University of Winnipeg', N'DUAD', 1, N'University of Winnipeg', NULL, NULL, 746, 963)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1981, N'University of York', N'PUCT', 1, N'University of York', NULL, NULL, 747, 964)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (909, N'University Stendhal - Grenoble 3 - INACTIVE', N'QUCJ', 0, N'University Stendhal', N'Grenoble 3', NULL, 748, 965)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4356, N'Unviersity of International of Business & Economics', N'UUHS', 1, N'Unviersity of International of Business & Economics', NULL, NULL, 749, 966)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2923, N'Utah State University', N'MWJR', 1, N'Utah State University', NULL, NULL, 750, 967)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3023, N'Utah Valley State College', N'MXDA', 1, N'Utah Valley State College', NULL, NULL, 751, 968)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (978, N'Utah Valley State College - DUPLICATE', N'MXDA', 0, N'Utah Valley State College', NULL, N'Duplicate', 751, 969)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2707, N'Utrecht University', N'QUHD', 1, N'Utrecht University', NULL, NULL, 752, 970)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2165, N'Vancouver Academy of Dramatic Arts', N'APRT', 1, N'Vancouver Academy of Dramatic Arts', NULL, NULL, 753, 971)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2853, N'Vancouver Acting School', N'APUI', 1, N'Vancouver Acting School', NULL, NULL, 754, 972)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2588, N'Vancouver Career College - Burnaby', N'APWR', 1, N'Vancouver Career College', N'Burnaby', NULL, 755, 973)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1039, N'Vancouver Career College - Kelowna', N'AQAZ', 1, N'Vancouver Career College', N'Kelowna', NULL, 755, 974)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1592, N'Vancouver Career College - Surrey', N'APZJ', 1, N'Vancouver Career College', N'Surrey', NULL, 755, 975)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2604, N'Vancouver Career College - Vancouver', N'APNE', 1, N'Vancouver Career College', N'Vancouver', NULL, 755, 976)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (595, N'Vancouver College of Counsellor Training', N'APIX', 1, N'Vancouver College of Counsellor Training', NULL, NULL, 756, 977)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2048, N'Vancouver College of Massage Therapy of Utopia', N'APRS', 1, N'Vancouver College of Massage Therapy of Utopia', NULL, NULL, 757, 978)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2084, N'Vancouver Community College - Broadway', N'AVAD', 1, N'Vancouver Community College', N'Broadway', NULL, 758, 979)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (981, N'Vancouver Community College - Downtown', N'AVAD', 1, N'Vancouver Community College', N'Downtown', NULL, 758, 980)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (979, N'Vancouver Community College King Ed Campus - DEDESIGNATED', N'AJAN', 0, N'Vancouver Community College', N'King Ed Campus', N'Dedesignated', 758, 981)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1059, N'Vancouver Community College Vocational Inst - CHANGED', N'AVAD', 0, N'Vancouver Community College', N'Vocational Inst', N'Changed Address', 758, 982)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1117, N'Vancouver Diving Institute - DEDESIGNATED', N'APNW', 0, N'Vancouver Diving Institute', NULL, N'Dedesignated', 759, 983)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (982, N'Vancouver Film School', N'APHO', 1, N'Vancouver Film School', NULL, NULL, 760, 984)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3503, N'Vancouver Hairdressing Academy', N'APVR', 1, N'Vancouver Hairdressing Academy', NULL, NULL, 761, 985)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3820, N'Vancouver Institute of Media Arts', N'APQJ', 1, N'Vancouver Institute of Media Arts', NULL, NULL, 762, 986)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (983, N'Vancouver Island Professional School - DEDESIGNATED', N'APVR', 0, N'Vancouver Island Professional School', NULL, N'Dedesignated', 763, 987)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2279, N'Vancouver Island University', N'AUAZ', 1, N'Vancouver Island University', NULL, NULL, 764, 988)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2965, N'Vancouver School of Bodywork & Massage', N'APUX', 1, N'Vancouver School of Bodywork & Massage', NULL, NULL, 765, 989)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2648, N'Vancouver School of Bodywork & Massage - CHANGED', N'APUX', 0, N'Vancouver School of Bodywork & Massage', NULL, N'Changed Address', 765, 990)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (984, N'Vancouver School of Theology', N'APAP', 1, N'Vancouver School of Theology', NULL, NULL, 766, 991)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (776, N'Vanguard College', N'BPBV', 1, N'Vanguard College', NULL, NULL, 767, 992)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (985, N'Vanier College', N'FJBN', 1, N'Vanier College', NULL, NULL, 768, 993)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2935, N'VCR Institute of Media Arts', N'APQJ', 1, N'VCR Institute of Media Arts', NULL, NULL, 769, 994)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (986, N'VCR Institute of Media Arts  - CHANGED', N'APQJ', 0, N'VCR Institute of Media Arts', NULL, N'Changed Address', 769, 995)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2430, N'VCR Institute of Media Arts - CHANGED1', N'APQJ', 0, N'VCR Institute of Media Arts', NULL, N'Changed Address', 769, 996)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (988, N'Vermont College of Fine Arts', N'MXCF', 1, N'Vermont College of Fine Arts', NULL, NULL, 770, 997)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3386, N'Versailles Academy of Make-Up and Esthetics', N'EPFG', 1, N'Versailles Academy of Make-Up and Esthetics', NULL, NULL, 771, 998)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5124, N'Victoria College of Art', N'APUP', 1, N'Victoria College of Art', NULL, NULL, 772, 999)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (989, N'Victoria College of Art - DEDESIGNATED', N'APAU', 0, N'Victoria College of Art', NULL, N'Dedesignated', 772, 1000)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2098, N'Victoria Conservatory of Music - DEDESIGNATED', N'APAR', 0, N'Victoria Conservatory of Music', NULL, N'Dedesignated', 773, 1001)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4349, N'Victoria Flying Club', N'APDG', 1, N'Victoria Flying Club', NULL, NULL, 774, 1002)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (991, N'Victoria Motion Picture School - DEDESIGNATED', N'APJY', 0, N'Victoria Motion Picture School', NULL, N'Dedesignated', 775, 1003)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (992, N'Virginia Polytechnical Institute', N'MVCG', 1, N'Virginia Polytechnical Institute', NULL, NULL, 776, 1004)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2937, N'Visual College of Art & Design', N'APUL', 1, N'Visual College of Art & Design', NULL, NULL, 777, 1005)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4262, N'Vital Aviation', N'GGGG', 1, N'Vital Aviation', NULL, NULL, 778, 1006)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4239, N'Vogue College', N'APZY', 1, N'Vogue College', NULL, NULL, 779, 1007)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2357, N'Walden University ', N'MXCD', 1, N'Walden University', N'Minneapolis', NULL, 780, 1008)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3628, N'Waldorf College', N'MPGP', 1, N'Waldorf College', NULL, NULL, 781, 1009)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (994, N'Washington State University - Pullman', N'MWKO', 0, N'Washington State University', N'Pullman', NULL, 782, 1010)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (995, N'Washington State University - Spokane', N'MXFT', 1, N'Washington State University', N'Spokane', NULL, 782, 1011)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (996, N'Weimar College - INACTIVE', N'MWXL', 0, N'Weimar College', NULL, NULL, 783, 1012)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1067, N'Wellington College of Remedial Massage Therapy', N'DPCK', 1, N'Wellington College of Remedial Massage Therapy', NULL, NULL, 784, 1013)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4260, N'West Coast Adventure College', N'APDU', 1, N'West Coast Adventure College', NULL, NULL, 785, 1014)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (997, N'West Coast College of Massage Therapy - New Westminister', N'APDJ', 1, N'West Coast College of Massage Therapy', N'New Westminister', NULL, 786, 1015)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1191, N'West Coast College of Massage Therapy - Victoria', N'APXU', 1, N'West Coast College of Massage Therapy', N'Victoria', NULL, 786, 1016)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4872, N'West End Academy', N'EPCI', 1, N'West End Academy', NULL, NULL, 787, 1017)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (999, N'Western Academy of Photography - CLOSURE', N'APEU', 0, N'Western Academy of Photography', NULL, N'Closure', 788, 1018)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1000, N'Western Community College - DEDESIGNATED', N'JJAB', 0, N'Western Community College', NULL, N'Dedesignated', 789, 1019)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1001, N'Western Kentucky University', N'MWLG', 1, N'Western Kentucky University', NULL, NULL, 790, 1020)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1451, N'Western Pentecostal Bible College - CHANGED', N'APAH', 0, N'Western Pentecostal Bible College', NULL, N'Changed Address', 791, 1021)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2557, N'Western Seminary - INACTIVE', N'MPGT', 0, N'Western Seminary', NULL, NULL, 792, 1022)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3945, N'Westervelt College', N'EPCG', 1, N'Westervelt College', NULL, NULL, 793, 1023)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3301, N'Westfield State University', N'MWYA', 1, N'Westfield State University', NULL, NULL, 794, 1024)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1004, N'Westminster Choir College', N'MPGV', 1, N'Westminster Choir College', NULL, NULL, 795, 1025)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1005, N'Westpoint School of Aviation - SUSPENDED', N'BPGK', 0, N'Westpoint School of Aviation', NULL, N'Suspended', 796, 1026)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3281, N'Whatcom Community College - INACTIVE', N'MVEK', 0, N'Whatcom Community College', NULL, NULL, 797, 1027)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1657, N'Whitecliffe College of Art & Design - INACTIVE', N'VPBH', 0, N'Whitecliffe College of Art & Design', NULL, NULL, 798, 1028)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1006, N'Whitehorse Flight Centre Inc. - CLOSURE', N'LPAD', 0, N'Whitehorse Flight Centre Inc.', NULL, N'Closure', 799, 1029)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1008, N'Wilfrid Laurier University', N'EUAZ', 1, N'Wilfrid Laurier University', NULL, NULL, 800, 1030)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3939, N'Willis Business College - Smiths Falls', N'EPBK', 1, N'Willis Business College', N'Smiths Falls', NULL, 801, 1031)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3924, N'Willis College - Ottawa', N'EPCH', 1, N'Willis College', N'Ottawa', NULL, 802, 1032)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1010, N'Windsong School of Healing', N'APXJ', 1, N'Windsong School of Healing', NULL, NULL, 803, 1033)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4744, N'Wollongong University', N'VUSG', 1, N'Wollongong University', NULL, NULL, 804, 1034)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3983, N'Xavier University - for Medicine', N'ZPAO', 1, N'Xavier University', NULL, NULL, 805, 1035)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1939, N'Yellowquill College', N'DPDV', 1, N'Yellowquill College', NULL, NULL, 806, 1036)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (4854, N'York St John University', N'PXAE', 1, N'York St John University', NULL, NULL, 807, 1037)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1011, N'York University', N'EUBB', 1, N'York University', NULL, NULL, 808, 1038)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3052, N'Yorkville University', N'GPKO', 1, N'Yorkville University', NULL, NULL, 809, 1039)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1012, N'Youth With A Mission', N'', 0, N'Youth With A Mission', NULL, NULL, 810, 1040)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1625, N'Youth With A Mission - Amsterdam', N'', 0, N'Youth With A Mission', N'Amsterdam', NULL, 810, 1041)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1623, N'Youth With A Mission - Montana', N'', 0, N'Youth With A Mission', N'Montana', NULL, 810, 1042)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5326, N'Yukon University', N'LUAA', 1, N'Yukon University', NULL, NULL, 811, 1061)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (475, N'Yukon College Carcross - DO NOT USE', N'LVAA', 0, N'Yukon University', N'Carcross', N'Do Not Use', 811, 1043)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (477, N'Yukon College Carmacks - DO NOT USE', N'LVAA', 0, N'Yukon University', N'Carmacks', N'Do Not Use', 811, 1044)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (478, N'Yukon College Dawson City - DO NOT USE', N'LVAA', 0, N'Yukon University', N'Dawson City', N'Changed Use', 811, 1045)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (480, N'Yukon College Downtown', N'LVAA', 0, N'Yukon University', N'Downtown', NULL, 811, 1046)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1019, N'Yukon College Faro - DO NOT USE', N'LVAA', 0, N'Yukon University', N'Faro', N'Do Not Use', 811, 1047)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (503, N'Yukon College Haines Junction - DO NOT USE', N'LVAA', 0, N'Yukon University', N'Hains Junction', N'Changed Use', 811, 1048)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1201, N'Yukon College Hse of Learning', N'LVAA', 0, N'Yukon University', N'Hse of Learning', NULL, 811, 1049)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2342, N'Yukon College KIAC - DO NOT USE (Use Yukon School of Visual Art)', N'LVAA', 0, N'Yukon University', N'KIAC', N'Do Not Use', 811, 1050)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1021, N'Yukon College Mayo - DO NOT USE', N'LVAA', 0, N'Yukon University', N'Mayo', N'Do Not Use', 811, 1051)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (514, N'Yukon College Old Crow - DO NOT USE', N'LVAA', 0, N'Yukon University', N'Old Crow', N'Changed Use', 811, 1052)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (495, N'Yukon College Pelly Crossing - DO NOT USE', N'LVAA', 0, N'Yukon University', N'Pelly Crossing', N'Changed Use', 811, 1053)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (483, N'Yukon College Ross River - DO NOT USE', N'LVAA', 0, N'Yukon University', N'Ross River', N'Changed Use', 811, 1054)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (490, N'Yukon College Teslin - CHANGED', N'LVAA', 0, N'Yukon University', N'Teslin', N'Changed Address', 811, 1055)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2714, N'Yukon College Teslin - DO NOT USE', N'LVAA', 0, N'Yukon University', N'Teslin', N'Do Not Use', 811, 1056)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (520, N'Yukon College Watson Lake - DO NOT USE', N'LVAA', 0, N'Yukon University', N'Watson Lake', N'Do Not Use', 811, 1057)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (434, N'Yukon College Whitehorse', N'LVAA', 0, N'Yukon University', N'Whitehorse', NULL, 811, 1058)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1022, N'Yukon Flight Training Centre - CLOSURE', N'LPAE', 0, N'Yukon Flight Training Centre', NULL, N'Closure', 812, 1059)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (3488, N'Yukon School of Visual Art', N'LVAA', 0, N'Yukon University', N'Yukon School of Visual Art', N'Inactive', 811, 1060)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (1023, N'Zenaba Academy of Esthetics - DEDESIGNATED', N'BPDI', 0, N'Zeneba Academy of Esthetics', NULL, N'Dedesignated', 813, 1062)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (2273, N'Zeneba Academy of Esthetics - DEDESIGNATED', N'BPGX', 0, N'Zeneba Academy of Esthetics', NULL, N'Dedesignated', 813, 1063)
GO
INSERT [dbo].[inst_camp] ([INSTITUTION_ID], [NAME], [INSTITUTION_CODE], [IS_ACTIVE_FLG], [INSTITUTION], [CAMPUS], [Status], [NEW_ID], [CAMP_ID]) VALUES (5169, N'Zurich Hochschule der Kunst', N'QWBX', 1, N'Zurich Hochschule der Kunst', NULL, NULL, 814, 1064)
GO
