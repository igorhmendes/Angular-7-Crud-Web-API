CREATE TABLE [dbo].[Users]
(
	[Id] INT IDENTITY(1,1) PRIMARY KEY NOT NULL, 
    [FirstName] NVARCHAR(50) NULL, 
    [LastName] NVARCHAR(50) NULL, 
    [Username] NVARCHAR(50) NOT NULL, 
    [PasswordHash] VARBINARY(200) NOT NULL, 
    [PasswordSalt] VARBINARY(200) NOT NULL
)
