import { IsString, IsNumber, IsOptional, IsNotEmpty } from "class-validator";

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNumber()
    @IsNotEmpty()
    price!: number;

    @IsString()
    @IsOptional()
    description!: string;


    @IsNumber()
    @IsOptional()
    category_id?: number;
}
