import { Request, Response } from 'express';
import ingredients_repositories from "../repositories/ingredient.repository";


// List Ingredients Controller
export const listIngredients = async (req: Request, res: Response) => {
    try {
        const ingredients = await ingredients_repositories.getIngredients();
        if (ingredients.length > 0) {
            res.status(200).json(ingredients)
        } else {
            res.status(200).json(ingredients)
        }
    } catch (error) {
        res.status(404).json({ message: (error as Error).message })
        return;
    }
}

// Get Ingredient Controller
export const getIngredient = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const ingredient = await ingredients_repositories.getIngredientById(id)
        if (ingredient) {
            res.status(200).json(ingredient)
        } else {
            res.status(404).json({ message: "Malzeme bulunamadı" })
        }
    } catch (error) {
        res.status(404).json({ message: (error as Error).message })
        return;
    }
}

// Create Ingredient Controller
export const addIngredient = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const createdIngredient = await ingredients_repositories.createIngredient(body)
        if (createdIngredient) {
            res.status(201).json({ message: "Malzeme Oluşturuldu", data: createdIngredient })
        } else {
            res.status(404).json({ message: "Malzeme Oluşturulurken Hata Oluştu" })
        }
    } catch (error) {
        res.status(404).json({ message: (error as Error).message })
        return;
    }
}

// Update Ingredient Controller 
export const editIngredient = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const body = req.body;
        const updatedIngredient = await ingredients_repositories.updateIngredient(id, body)
        res.status(201).json({ data: updatedIngredient })
    } catch (error) {
        res.status(404).json({ message: (error as Error).message })
        return;
    }
}

// Delete Ingredient Controller
export const removeIngredient = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const deletedIngredient = await ingredients_repositories.deleteIngredient(id)
        res.status(201).json({ message: "Malzeme Başarıyla Kaldırıldı" })
    } catch (error) {
        res.status(404).json({ message: (error as Error).message })
        return;
    }
}