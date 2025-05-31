import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateAuthorDto {
  @IsString()
  name: string;
  @IsString()
  bio: string;
  @IsDateString()
  birthdate: string;

}
