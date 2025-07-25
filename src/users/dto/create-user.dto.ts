import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
    
    @IsBoolean()
    @IsNotEmpty()
    is_active: boolean;
   
}
