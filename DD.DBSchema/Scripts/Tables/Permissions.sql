CREATE TABLE [dbo].[Permissions]
(
	[Id] INT PRIMARY KEY IDENTITY (1, 1) NOT NULL, 
    [Name] INT NOT NULL
)

GO

CREATE UNIQUE INDEX [UX_Permissions_Name] ON [dbo].[Permissions] ([Name])
