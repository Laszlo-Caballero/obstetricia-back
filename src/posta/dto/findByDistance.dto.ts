import { IsLatitude, IsLongitude, IsNumber, IsPositive } from 'class-validator';

export class FindByDistanceDto {
  @IsLatitude()
  lat: string;

  @IsLongitude()
  lng: string;

  @IsNumber()
  @IsPositive()
  distance: number;
}
