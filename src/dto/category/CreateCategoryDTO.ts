import { IsString, IsOptional, IsNotEmpty } from "class-validator";

export class CreateCategoryDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsOptional()
    description!: string;
}
