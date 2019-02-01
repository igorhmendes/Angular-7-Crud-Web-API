CREATE TABLE [dbo].[Employees] (
    [Id]        INT           IDENTITY (1, 1) NOT NULL,
    [Name]      VARCHAR (256) NOT NULL,
    [Email]     VARCHAR (100) NOT NULL,
    [Address]   VARCHAR (100) NULL, 
    [ContactNo] BIGINT        NULL
);


