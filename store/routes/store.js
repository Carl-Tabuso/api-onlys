import { Router } from "express";
import { productController } from "../controllers/product-controller.js";

const router = Router();

router.route('/')
    .get(productController.index)
    .post(productController.store);

router.route('/:id')
    .get(productController.show)
    .patch(productController.update)
    .delete(productController.destroy);

export const storeRouter = router;