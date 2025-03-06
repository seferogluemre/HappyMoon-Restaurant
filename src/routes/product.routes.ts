import { Router } from "express";
import { listProducts, removeProduct, getProduct, createProduct, editProduct } from "src/controllers/product.controller";

const router = Router();

router.get('/', listProducts)
router.get('/:id', getProduct)
router.post('/', createProduct)
router.patch('/:id', editProduct)
router.delete('/:id', removeProduct)

export default router;