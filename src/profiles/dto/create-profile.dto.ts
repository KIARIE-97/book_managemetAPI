import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
export class CreateProfileDto {
    @IsString()
    bio: string;
    
    @IsString()
    dob: string;
    
    @IsString()
    location: string;
    
    @IsNumber()
    user_id: number;

}
