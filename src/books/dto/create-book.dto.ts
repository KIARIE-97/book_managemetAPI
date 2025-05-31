import { IsBoolean, IsNumber, isNumber, IsString } from "class-validator";

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  publicationYear: string;

  @IsBoolean()
  is_available: boolean;

  @IsNumber()
  category_id: number; //  link the book to a category

  @IsNumber()
  author_id: number; // link the author to a book
}
