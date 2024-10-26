import { signUp } from "@/controllers/authController";
import { Router } from "express";

const router = Router();

router.post('/sign-up', signUp);
export default router;