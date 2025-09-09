--Añadir la geolocation
alter table posta add [GeoLocation] GEOGRAPHY
go;


--- Eliminar datos vacios
delete from posta where lat = '' or lng = '';

---Actualizar Tabla
update posta set [GeoLocation] = geography::STPointFromText('POINT(' + CAST(lng 
AS nvarchar(255)) + ' ' + 
                CAST(lat AS nvarchar(255)) + ')', 4326)
GO;


--Crear el store procedure
CREATE PROCEDURE find_by_distance
@Distance int, 
@LAT varchar(255),
@LNG varchar(255)
as
begin
	declare @origin GEOGRAPHY;
	Set @origin = GEOGRAPHY::STGeomFromText('POINT(' + CAST(@LNG 
				AS nvarchar(255)) + ' ' + 
                CAST(@LAT AS nvarchar(255)) + ')', 4326);
    SELECT *,GeoLocation.STDistance(@Origin) Distance FROM posta
	WHERE @Origin.STDistance(GeoLocation) <= @Distance;
end
go

exec find_by_distance @Distance=2000,@Lat='-8.094947', @LNG='-79.049472';


--Trigger para parsear 
CREATE TRIGGER ParseLatLng
ON posta
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE p
    SET p.GeoLocation = geography::STPointFromText(
                           'POINT(' + CAST(i.lng AS nvarchar(255)) + ' ' + CAST(i.lat AS nvarchar(255)) + ')',
                           4326
                       )
    FROM posta p
    INNER JOIN INSERTED i ON p.postaId = i.postaId
    WHERE i.lat IS NOT NULL AND i.lng IS NOT NULL
          AND LTRIM(RTRIM(CAST(i.lat AS nvarchar(255)))) <> ''
          AND LTRIM(RTRIM(CAST(i.lng AS nvarchar(255)))) <> '';
END
GO



