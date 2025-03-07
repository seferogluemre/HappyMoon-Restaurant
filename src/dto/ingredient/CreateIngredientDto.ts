import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateIngredientDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsBoolean()
    @IsOptional()
    is_allergen?: boolean;
}