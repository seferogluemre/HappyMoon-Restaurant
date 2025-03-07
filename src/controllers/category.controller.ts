import { Request, Response } from 'express';
import category_repository, { QueryProps } from '../repositories/category.repository'
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateCategoryDTO } from '../dto/category/UpdateCategoryDto';
import { CreateCategoryDTO } from '../dto/category/CreateCategoryDto';

// Category List
export const listCategories = async (req: Request<{}, {}, {}, QueryProps>, res: Response) => {
    try {
        const categories = await category_repository.getCategories(req.query);
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
            res.status(200).json(category)
        } else {
            res.status(404).json({ message: "Kategori bulunamadı" })
        }
    } catch (error) {
        res.status(404).json({ message: (error as Error).message })
        return;
    }
}

// Create Category Controller
export const addCategory = async (req: Request, res: Response) => {
    try {
        const categoryDto = plainToInstance(CreateCategoryDTO, req.body)

        const errors = await validate(categoryDto)

        if (errors.length > 0) {
            return res.status(400).json({
                message: "Validasyon hatası lütfen alanları kontrol ediniz",
                errors: errors.map(err => err.constraints),
            });
        }

        const createdCategory = await category_repository.createCategory({
            ...categoryDto,
        })

        res.status(201).json({ message: "Kategori başarıyla oluşturuldu", data: createdCategory });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: (error as Error).message })
    }
};

// Update Category Controller
export const editCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(1))) {
            return res.status(400).json({ message: "Geçerli bir ürün ID'si giriniz." });
        }

        const categoryDto = plainToInstance(UpdateCategoryDTO, req.body)

        const errors = await validate(categoryDto)

        if (errors.length > 0) {
            return res.status(400).json({
                message: "Validasyon hatası lütfen alanları kontrol ediniz",
                errors: errors.map(err => err.constraints),
            });
        }

        const existingCategory = await category_repository.getCategoryById(Number(id));
        if (!existingCategory) {
            return res.status(404).json({ message: "Güncellenecek ürün bulunamadı." });
        }

        const updatedCategory = await category_repository.updateCategory(Number(id), {
            ...categoryDto,
            category_id: Number(categoryDto.category_id) ? Number(categoryDto.category_id) : null,
        });

        return res.status(200).json({ message: "Kategori başarıyla güncellendi", data: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
        return;
    }
}

// Delete Category Controller
export const removeCategory = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const deletedCategory = await category_repository.deleteCategory(id)
        res.status(201).json({ message: "Kategori Başarıyla kaldırıldı" })
    } catch (error) {
        res.status(404).json({ message: (error as Error).message })
        return;
    }
}