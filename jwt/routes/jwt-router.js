import { Router } from "express";
import { jwtController } from "../controllers/jwt-controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.get('/', jwtController.index);
router.get('/dashboard', authMiddleware, jwtController.dashboard);
router.post('/login', jwtController.login);

export const jwtRouter = router;