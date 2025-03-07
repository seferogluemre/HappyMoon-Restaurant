import { Router } from "express";

import { addCategory, editCategory, removeCategory, getCategory, listCategories } from "src/controllers/category.controller";

const router = Router();

router.get('/', listCategories)
router.get('/:id', getCategory)
router.post('/', addCategory);
router.patch('/:id', editCategory);
router.delete('/:id', removeCategory)

export default router;
