import { IsString, IsOptional, IsNumber, IsNotEmpty } from "class-validator";

export class UpdateProductDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNumber()
    @IsOptional()
    price!: number;

    @IsString()
    @IsOptional()
    description!: string;

    @IsNumber()
    @IsOptional()
    category_id?: number;
}
