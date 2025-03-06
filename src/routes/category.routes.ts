import { Router } from "express";

import { addCategory, getCategory, listCategories } from "src/controllers/category.controller";

const router = Router();

router.get('/', listCategories)
router.get('/:id', getCategory)
router.post('/', addCategory);

export default router;
