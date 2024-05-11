import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty({message:"Email can't be empty"})
    email: string
    @IsString()
    @IsNotEmpty({message:"Password can't be empty"})
    password: string
}
