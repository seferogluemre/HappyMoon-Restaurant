import { Router } from "express";
import { listIngredients, getIngredient, addIngredient, editIngredient, removeIngredient } from "src/controllers/ingredient.controller";

const router = Router();

router.get('/', listIngredients)
router.get('/:id', getIngredient)
router.post('/', addIngredient)
router.patch('/:id', editIngredient)
router.delete('/:id', removeIngredient)



export default router;