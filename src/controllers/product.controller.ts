import product_repository, { QueryPropsProduct } from '../repositories/product.repository'
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateProductDTO } from 'src/dto/product/CreateProductDto';
import { UpdateProductDTO } from 'src/dto/product/UpdateProductDto';
import { Request, Response } from 'express';



// List Products Controller
export const listProducts = async (req: Request<{}, {}, {}, QueryPropsProduct>, res: Response) => {
    try {
        const products = await product_repository.getProducts(req.query);
        res.status(200).json({ data: products })
    } catch (error) {
        res.status(404).json({ message: (error as Error).message })
        return;
    }
}

// Get Product Controller
export const getProduct = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const product = await product_repository.getProductById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(404).json({ message: (error as Error).message })
        return;
    }
}

// Create Product Controller
export const createProduct = async (req: Request, res: Response) => {
    try {
        const productDto = plainToInstance(CreateProductDTO, req.body);

        const errors = await validate(productDto);

        if (errors.length > 0) {
            return res.status(400).json({
                message: "Validasyon hatası lütfen alanları kontrol ediniz",
                errors: errors.map(err => err.constraints),
            });
        }

        const createdProduct = await product_repository.createProduct({
            ...productDto,
            category_id: Number(productDto.category_id) ?? null,
        });

        res.status(201).json({ message: "Ürün oluşturuldu", data: createdProduct });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const editProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "Geçerli bir ürün ID'si giriniz." });
        }

        const productDto = plainToInstance(UpdateProductDTO, req.body);

        const errors = await validate(productDto);
        if (errors.length > 0) {
            return res.status(400).json({
                message: "Validasyon hatası lütfen alanları kontrol ediniz",
                errors: errors.map(err => err.constraints),
            });
        }

        const existingProduct = await product_repository.getProductById(Number(id));
        if (existingProduct) {
            return res.status(404).json({ message: "Güncellenecek ürün bulunamadı." });
        }

        const updatedProduct = await product_repository.updateProduct(Number(id), {
            ...productDto,
            category_id: productDto.category_id ? Number(Number(productDto.category_id)) : null,
        });

        return res.status(200).json({ message: "Ürün başarıyla güncellendi", data: updatedProduct });
    } catch (error) {
        return res.status(500).json({ message: "Sunucu hatası", error: (error as Error).message });
    }
};

// Remove Product Controller
export const removeProduct = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const deletedProduct = await product_repository.deleteProduct(id)
        res.status(201).json({ message: "Ürün Başarıyla Kaldırıldı" })
    } catch (error) {
        res.status(404).json({ message: (error as Error).message })
        return;
    }
}