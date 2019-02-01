CREATE TABLE [dbo].[RolePermissions] (
    [PermissionId] INT NOT NULL,
    [RoleId]       INT NOT NULL,
    CONSTRAINT [PK_dbo.RolePermissions] PRIMARY KEY CLUSTERED ([PermissionId] ASC, [RoleId] ASC),
    CONSTRAINT [FK_dbo.RolePermissions_dbo.Permissions_PermissionId] FOREIGN KEY ([PermissionId]) REFERENCES [dbo].[Permissions] ([Id]),
    CONSTRAINT [FK_dbo.RolePermissions_dbo.Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles] ([Id])
);


GO



