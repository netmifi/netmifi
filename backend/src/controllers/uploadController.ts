import { Request, Response } from "express";
import multer from "multer";
import { GridFSBucket } from "mongodb";
import { getDb } from "../config/db";
import { ObjectId } from "mongodb";

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
});

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const db = getDb();
    const bucket = new GridFSBucket(db, {
      bucketName: "uploads",
    });

    const fileType = req.body.type || "file";
    const filename = `${Date.now()}-${req.file.originalname}`;

    // Create a write stream to GridFS
    const uploadStream = bucket.openUploadStream(filename, {
      metadata: {
        type: fileType,
        contentType: req.file.mimetype,
      },
    });

    // Write the file buffer to GridFS
    uploadStream.end(req.file.buffer);

    // Wait for the upload to complete
    uploadStream.on("finish", () => {
      // Get the file URL
      const fileUrl = `/api/uploads/${uploadStream.id}`;
      
      res.status(200).json({
        message: "File uploaded successfully",
        url: fileUrl,
        fileId: uploadStream.id.toString(),
      });
    });

    uploadStream.on("error", (error) => {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Error uploading file" });
    });
  } catch (error) {
    console.error("Error in upload controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFile = async (req: Request, res: Response) => {
  try {
    const fileId = req.params.id;
    const db = getDb();
    const bucket = new GridFSBucket(db, {
      bucketName: "uploads",
    });

    const file = await bucket.find({ _id: new ObjectId(fileId) }).toArray();
    if (!file || file.length === 0) {
      return res.status(404).json({ error: "File not found" });
    }

    // Set appropriate content type
    res.set("Content-Type", file[0].contentType || "application/octet-stream");

    // Stream the file to the response
    const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));
    downloadStream.pipe(res);

    downloadStream.on("error", (error) => {
      console.error("Error streaming file:", error);
      res.status(500).json({ error: "Error streaming file" });
    });
  } catch (error) {
    console.error("Error in getFile controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}; 