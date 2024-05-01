import { Transform } from 'class-transformer';
import {
    IsLatitude,
    IsLongitude,
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    Min
  } from 'class-validator';
  
  export class GetEstimateDto {
    @IsString()
    @IsNotEmpty()
    make: string;
  
    @IsString()
    @IsNotEmpty()
    model: string;
  
    @Transform(({value}) => parseInt(value))
    @IsNumber()
    @Min(1930)
    @Max(new Date().getFullYear())
    year: number;
  
    @Transform(({value}) => parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(1000000)
    kilometers: number;
  
    @Transform(({value}) => parseFloat(value))
    @IsNumber()
    @IsLatitude()
    lat: number;
  
    @Transform(({value}) => parseFloat(value))
    @IsNumber()
    @IsLongitude()
    lang: number;
  }
  