import { Request, Response } from "express";
import category_repository from '../repositories/category.repository'

export const addCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const newCategory = await category_repository.createCategory({ name, description });
        res.status(201).json({
            message: 'Kategori Oluşturuldu',
            data: newCategory
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: (error as Error).message })
    }
};