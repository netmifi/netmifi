import { handleSignIn, handleSignUp, handleLogout, handleInstructorApplication } from "@/controllers/authController";
import { verifyJwt } from "@/middlewares/verifyJwt";
import express from "express";

const router = express.Router();

router.post('/sign-up', handleSignUp);
router.post('/sign-in', handleSignIn);
router.post('/instructor-application', verifyJwt, handleInstructorApplication);
router.delete('/logout', handleLogout);

export default router;