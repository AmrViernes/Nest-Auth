import { Expose } from "class-transformer";
import { UserEntity } from "src/users/entities/user.entity";

export class ReportDto {
    @Expose()
    id: string;

    @Expose()
    make: string;
  
    @Expose()
    model: string;
  
    @Expose()
    year: number;
  
    @Expose()
    kilometers: number;
  
    @Expose()
    lat: number;
  
    @Expose()
    lang: number;
  
    @Expose()
    price: number;

    @Expose()
    approved: boolean

    @Expose()
    user: UserEntity
}