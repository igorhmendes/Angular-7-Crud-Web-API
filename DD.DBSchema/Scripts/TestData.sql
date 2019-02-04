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



