import express from "express";
import { uploadFile, getFile } from "../controllers/uploadController";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload file route
router.post("/upload", upload.single("file"), uploadFile);

// Get file route
router.get("/uploads/:id", getFile);

export default router; 