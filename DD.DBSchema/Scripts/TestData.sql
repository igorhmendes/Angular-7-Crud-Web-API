-- Insert Roles
INSERT INTO [dbo].[Roles] ([Name])
SELECT 'Admin'
WHERE NOT EXISTS (select * from dbo.Roles where Name = 'Admin');

INSERT INTO [dbo].[Roles] ([Name])
SELECT 'CommonUser'
WHERE NOT EXISTS (select * from dbo.Roles where Name = 'CommonUser');

-- Insert Permissions
INSERT INTO [dbo].[Permissions] ([Name])
SELECT 'CreateUser'
WHERE NOT EXISTS (select * from dbo.Permissions where Name = 'CreateUser');

INSERT INTO [dbo].[Permissions] ([Name])
SELECT 'ViewUser'
WHERE NOT EXISTS (select * from dbo.Permissions where Name = 'ViewUser');

INSERT INTO [dbo].[Permissions] ([Name])
SELECT 'UpdateUser'
WHERE NOT EXISTS (select * from dbo.Permissions where Name = 'UpdateUser');

INSERT INTO [dbo].[Permissions] ([Name])
SELECT 'DeleteUser'
WHERE NOT EXISTS (select * from dbo.Permissions where Name = 'DeleteUser');

-- Insert RolePermissions
INSERT INTO [dbo].[RolePermissions] 
SELECT Id, (select Id from Roles where name = 'Admin')
FROM Permissions
WHERE Name in ('CreateUser','ViewUser','UpdateUser', 'DeleteUser') 
	AND NOT EXISTS (SELECT RoleId, PermissionId from RolePermissions where RoleId = (select Id from Roles where name = 'Admin'))

INSERT INTO [dbo].[RolePermissions] 
SELECT Id, (select Id from Roles where name = 'CommonUser')
FROM Permissions
WHERE Name in ('CreateUser','ViewUser','UpdateUser')
	AND NOT EXISTS (SELECT RoleId, PermissionId from RolePermissions where RoleId = (select Id from Roles where name = 'CommonUser'))



