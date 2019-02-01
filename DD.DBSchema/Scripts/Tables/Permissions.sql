CREATE TABLE [dbo].[Permissions]
(
	[Id] INT PRIMARY KEY IDENTITY (1, 1) NOT NULL, 
    [Name] NVARCHAR(50) NULL
)

GO

CREATE UNIQUE INDEX [UX_Permissions_Name] ON [dbo].[Permissions] ([Name])
