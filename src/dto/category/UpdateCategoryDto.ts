import { IsString, IsOptional, IsNotEmpty, IsNumber } from "class-validator";

export class UpdateCategoryDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsOptional()
    description!: string;

    @IsNumber()
    @IsOptional()
    category_id?: number;
}
