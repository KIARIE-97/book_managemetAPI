import { IsString } from "class-validator";

export class CreateCategoyDto {
   @IsString()
    name: string;
    @IsString()
    description: string;
}
