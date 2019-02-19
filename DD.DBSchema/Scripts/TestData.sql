-- Insert Roles
INSERT INTO [dbo].[Roles] ([Name])
SELECT 'Admin'
WHERE NOT EXISTS (select * from dbo.Roles where Name = 'Admin');

INSERT INTO [dbo].[Roles] ([Name])
SELECT 'CommonUser'
WHERE NOT EXISTS (select * from dbo.Roles where Name = 'CommonUser');

-- Insert Permissions
INSERT INTO [dbo].[Permissions] ([Name])
SELECT 1 /* CreateUser  */
WHERE NOT EXISTS (select * from dbo.Permissions where Name = 1 /* CreateUser  */);

INSERT INTO [dbo].[Permissions] ([Name])
SELECT 4 /* ViewUser */
WHERE NOT EXISTS (select * from dbo.Permissions where Name = 4); /* ViewUser */

INSERT INTO [dbo].[Permissions] ([Name])
SELECT 3 /* UpdateUser */
WHERE NOT EXISTS (select * from dbo.Permissions where Name = 3); /* UpdateUser */

INSERT INTO [dbo].[Permissions] ([Name])
SELECT 2 /* DeleteUser */
WHERE NOT EXISTS (select * from dbo.Permissions where Name = 2); /* DeleteUser */

-- Insert RolePermissions
INSERT INTO [dbo].[RolePermissions] 
SELECT Id, (select Id from Roles where name = 'Admin')
FROM Permissions
WHERE Name in (1,4,3, 2) 
	AND NOT EXISTS (SELECT RoleId, PermissionId from RolePermissions where RoleId = (select Id from Roles where name = 'Admin'))

INSERT INTO [dbo].[RolePermissions] 
SELECT Id, (select Id from Roles where name = 'CommonUser')
FROM Permissions
WHERE Name in (1,4,3)
	AND NOT EXISTS (SELECT RoleId, PermissionId from RolePermissions where RoleId = (select Id from Roles where name = 'CommonUser'))

-- Insert Default User (Admin, 123456)
INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Username], [PasswordHash], [PasswordSalt])
     VALUES
           ('Admin',
		    'Test',
		    'admin@test.com',
		    0x4EF45424868321ED641EDF92CFAC173F0FB223CCFE1FE586F778087854C563DC099AD857668A0733FF11CEB0E488FA60A053E6B29A36A83395DD57B5C5829F79,
		    0x12A2108127694700B11F3E552EA143515FAE217ABE505CB5BA47AD125CB1AE9B63D00FFDCC87AF790D5025FBEDC5EA1B999AF8960328B4EF5F9B7C60FB290F1EDBDEEFB944ACA169ADFA6D2BA7156470E5E3748E87684EF782F47645DDF3B87E394A66BDED68FC8E80FF4E1FE2FEC35D1E8A7457865CB6141344BC9CA522A801
		   )

-- Insert Default User as Admin
INSERT INTO [dbo].[UserRoles] ([UserId], [RoleId])
     VALUES
           ((SELECT Id FROM Users WHERE FirstName = 'Admin'),
			(SELECT Id FROM Roles WHERE Name = 'Admin')
		   )
