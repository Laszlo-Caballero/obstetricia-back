IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'obstetricia')
BEGIN
    CREATE DATABASE obstetricia;
    PRINT '✅ Base de datos obstetricia creada';
END
ELSE
BEGIN
    PRINT 'ℹ️ Base de datos obstetricia ya existe';
END
GO
