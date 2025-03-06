import { Router } from "express";
import { addCategory } from "src/controllers/category.controller";

const router = Router();

router.post('/', addCategory)


export default router;