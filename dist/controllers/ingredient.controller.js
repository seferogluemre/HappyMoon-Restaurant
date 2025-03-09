import ingredients_repositories from "../repositories/ingredient.repository";
import { plainToInstance } from 'class-transformer';
import { CreateIngredientDto } from 'src/dto/ingredient/CreateIngredientDto';
import { validate } from 'class-validator';
import { UpdateIngredientDto } from 'src/dto/ingredient/UpdateIngredientDto';
export const listIngredients = async (req, res) => {
    try {
        const ingredients = await ingredients_repositories.getIngredients();
        if (ingredients.length > 0) {
            res.status(200).json(ingredients);
        }
        else {
            res.status(200).json(ingredients);
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
        return;
    }
};
export const getIngredient = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const ingredient = await ingredients_repositories.getIngredientById(id);
        if (ingredient) {
            res.status(200).json(ingredient);
        }
        else {
            res.status(404).json({ message: "Malzeme bulunamadı" });
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
        return;
    }
};
export const addIngredient = async (req, res) => {
    try {
        const ingredientDto = plainToInstance(CreateIngredientDto, req.body);
        const errors = await validate(ingredientDto);
        if (errors.length > 0) {
            res.status(400).json({
                message: "Validasyon hatası lütfen alanları kontrol ediniz",
                errors: errors.map(err => err.constraints),
            });
        }
        const createdIngredient = await ingredients_repositories.createIngredient({
            ...ingredientDto,
        });
        res.status(201).json({ message: "Malzeme başarıyla oluşturuldu", data: createdIngredient });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
        return;
    }
};
export const editIngredient = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(404).json({
                message: "Geçerli bir Malzeme ID'si giriniz."
            });
        }
        const ingredientDto = plainToInstance(UpdateIngredientDto, req.body);
        const errors = await validate(ingredientDto);
        if (errors.length > 0) {
            return res.status(400).json({
                message: "Validasyon hatası lütfen alanları kontrol ediniz",
                error: errors.map(err => err.constraints)
            });
        }
        const existingIngredient = await ingredients_repositories.getIngredientById(Number(id));
        if (!existingIngredient) {
            return res.status(404).json({ message: "Güncellenecek Malzeme bulunamadı." });
        }
        const updatedIngredient = await ingredients_repositories.updateIngredient(Number(id), {
            category_id: Number(ingredientDto.category_id) ? Number(ingredientDto.category_id) : null,
            ...ingredientDto,
        });
        return res.status(200).json({ message: "Malzeme başarıyla güncellendi", data: updatedIngredient });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
        return;
    }
};
export const removeIngredient = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const deletedIngredient = await ingredients_repositories.deleteIngredient(id);
        res.status(201).json({ message: "Malzeme Başarıyla Kaldırıldı" });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
        return;
    }
};
//# sourceMappingURL=ingredient.controller.js.map