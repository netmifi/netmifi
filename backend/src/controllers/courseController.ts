import { Request, Response } from "express";
import { getDb } from "../config/db";
import { ObjectId } from "mongodb";
import { GridFSBucket } from "mongodb";

export const createCourse = async (req: Request, res: Response) => {
  try {
    const db = getDb();
    const coursesCollection = db.collection("courses");

    const {
      title,
      description,
      category,
      language,
      price,
      duration,
      level,
      prerequisites,
      learningOutcomes,
      targetAudience,
      thumbnail,
      introVideo,
    } = req.body;

    // Create the course document
    const course = {
      title,
      description,
      category,
      language,
      price: Number(price),
      duration: Number(duration),
      level,
      prerequisites: Array.isArray(prerequisites) ? prerequisites : [prerequisites],
      learningOutcomes: Array.isArray(learningOutcomes) ? learningOutcomes : [learningOutcomes],
      targetAudience,
      thumbnail,
      introVideo,
      instructorId: req.user._id, // Assuming you have user authentication middleware
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "draft",
    };

    // Insert the course into the database
    const result = await coursesCollection.insertOne(course);

    // If there are file URLs, update the course with the actual course ID
    if (thumbnail || introVideo) {
      const bucket = new GridFSBucket(db, {
        bucketName: "uploads",
      });

      if (thumbnail) {
        const fileId = thumbnail.split("/").pop();
        if (fileId) {
          await bucket.updateOne(
            { _id: new ObjectId(fileId) },
            { $set: { "metadata.courseId": result.insertedId.toString() } }
          );
        }
      }

      if (introVideo) {
        const fileId = introVideo.split("/").pop();
        if (fileId) {
          await bucket.updateOne(
            { _id: new ObjectId(fileId) },
            { $set: { "metadata.courseId": result.insertedId.toString() } }
          );
        }
      }
    }

    res.status(201).json({
      message: "Course created successfully",
      courseId: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}; 