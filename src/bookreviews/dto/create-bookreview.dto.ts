import { IsNumber, IsString } from "class-validator";

export class CreateBookreviewDto {
  @IsNumber()
  rating: number;

  @IsString()
  content: string;

  @IsNumber()
  profile_id: number; // Assuming this is the ID of the profile associated with the book review
}
