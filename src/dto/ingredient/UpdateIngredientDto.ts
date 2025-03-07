import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateIngredientDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsBoolean()
    @IsOptional()
    is_allergen?: boolean;

    @IsNumber()
    @IsOptional()
    category_id?: number;
}