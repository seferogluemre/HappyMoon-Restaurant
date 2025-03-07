import { Request, Response } from 'express';
import product_repository from '../repositories/product.repository'

// List Products Controller
export const listProducts = async (req: Request, res: Response) => {
    try {
        const products = await product_repository.getProducts();
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
        const body = req.body;
        const createdProduct = await product_repository.createProduct(body)
        res.status(201).json({ message: "Ürün oluşturuldu", data: createdProduct })
    } catch (error) {
        res.status(404).json({ message: (error as Error).message })
        return;
    }
}

// Update Product Controller
export const editProduct = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const body = req.body;
        const updatedProduct = await product_repository.updateProduct(id, body)
        res.status(201).json({ data: updatedProduct })
    } catch (error) {
        res.status(404).json({ message: (error as Error).message })
        return;
    }
}

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