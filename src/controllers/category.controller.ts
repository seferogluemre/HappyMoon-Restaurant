import { Request, Response } from 'express';
import category_repository from '../repositories/category.repository'


// Category List
export const listCategories = async (req: Request, res: Response) => {
    try {
        const categories = await category_repository.getCategories();
        res.status(200).json({ data: categories })
    } catch (error) {
        res.status(404).json({ message: (error as Error).message })
        return;
    }
}

// Show Category Controller
export const getCategory = async (req: Request<{ id: number }, {}, {}>, res: Response) => {
    try {
        const id = +req.params.id;
        const category = await category_repository.getCategoryById(id)
        if (category) {
            res.status(200).json({ data: category })
            return;
        } else {
            res.status(404).json({ message: "Kategori bulunamadı" })
            return;
        }
    } catch (error) {
        res.status(404).json({ message: (error as Error).message })
        return;
    }
}

// Create Category Controller
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

