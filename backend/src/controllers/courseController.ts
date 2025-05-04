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

async function populateTestCourse(courseId: string) {
    try {
        const db = getDb();
        const coursesCollection = db.collection('courses');
        const sectionsCollection = db.collection('sections');
        const quizzesCollection = db.collection('quizzes');

        // Create sections with different content
        const sections = [
            {
                title: "Introduction to Web Development",
                description: "Learn the basics of web development",
                order: 1,
                courseId: courseId,
                videoUrl: "https://example.com/video1.mp4",
                duration: 1200, // 20 minutes
                hasQuiz: false
            },
            {
                title: "HTML Fundamentals",
                description: "Master the building blocks of web pages",
                order: 2,
                courseId: courseId,
                videoUrl: "https://example.com/video1.mp4",
                duration: 1800, // 30 minutes
                hasQuiz: true
            },
            {
                title: "CSS Styling",
                description: "Make your websites beautiful",
                order: 3,
                courseId: courseId,
                videoUrl: "https://example.com/video1.mp4",
                duration: 2400, // 40 minutes
                hasQuiz: true
            },
            {
                title: "JavaScript Basics",
                description: "Add interactivity to your websites",
                order: 4,
                courseId: courseId,
                videoUrl: "https://example.com/video1.mp4",
                duration: 3000, // 50 minutes
                hasQuiz: false
            },
            {
                title: "Advanced JavaScript",
                description: "Take your JavaScript skills to the next level",
                order: 5,
                courseId: courseId,
                videoUrl: "https://example.com/video1.mp4",
                duration: 3600, // 60 minutes
                hasQuiz: true
            }
        ];

        // Insert sections
        const insertedSections = await sectionsCollection.insertMany(sections);

        // Create quizzes for sections that have them
        const quizzes = [
            {
                sectionId: insertedSections.insertedIds[1], // HTML Fundamentals
                title: "HTML Quiz",
                description: "Test your HTML knowledge",
                questions: [
                    {
                        question: "What does HTML stand for?",
                        options: [
                            "Hyper Text Markup Language",
                            "High Tech Modern Language",
                            "Hyper Transfer Markup Language",
                            "Home Tool Markup Language"
                        ],
                        correctAnswer: 0,
                        explanation: "HTML stands for Hyper Text Markup Language"
                    },
                    {
                        question: "Which tag is used to create a hyperlink?",
                        options: [
                            "<link>",
                            "<a>",
                            "<href>",
                            "<url>"
                        ],
                        correctAnswer: 1,
                        explanation: "The <a> tag is used to create hyperlinks"
                    }
                ],
                passingScore: 70,
                timeLimit: 600 // 10 minutes
            },
            {
                sectionId: insertedSections.insertedIds[2], // CSS Styling
                title: "CSS Quiz",
                description: "Test your CSS knowledge",
                questions: [
                    {
                        question: "What does CSS stand for?",
                        options: [
                            "Computer Style Sheets",
                            "Creative Style Sheets",
                            "Cascading Style Sheets",
                            "Colorful Style Sheets"
                        ],
                        correctAnswer: 2,
                        explanation: "CSS stands for Cascading Style Sheets"
                    },
                    {
                        question: "Which property is used to change the text color?",
                        options: [
                            "text-color",
                            "font-color",
                            "color",
                            "text-style"
                        ],
                        correctAnswer: 2,
                        explanation: "The 'color' property is used to change text color"
                    }
                ],
                passingScore: 70,
                timeLimit: 600
            },
            {
                sectionId: insertedSections.insertedIds[4], // Advanced JavaScript
                title: "Advanced JavaScript Quiz",
                description: "Test your advanced JavaScript knowledge",
                questions: [
                    {
                        question: "What is a closure in JavaScript?",
                        options: [
                            "A function that returns another function",
                            "A function that has access to its outer function's scope",
                            "A way to close a program",
                            "A type of loop"
                        ],
                        correctAnswer: 1,
                        explanation: "A closure is a function that has access to its outer function's scope"
                    },
                    {
                        question: "What is the purpose of 'use strict'?",
                        options: [
                            "To make JavaScript run faster",
                            "To enforce stricter parsing and error handling",
                            "To enable modern JavaScript features",
                            "To disable certain JavaScript features"
                        ],
                        correctAnswer: 1,
                        explanation: "'use strict' enforces stricter parsing and error handling"
                    }
                ],
                passingScore: 70,
                timeLimit: 600
            }
        ];

        // Insert quizzes
        await quizzesCollection.insertMany(quizzes);

        // Update course with total duration
        const totalDuration = sections.reduce((sum, section) => sum + section.duration, 0);
        await coursesCollection.updateOne(
            { _id: new ObjectId(courseId) },
            { $set: { totalDuration } }
        );

        return { success: true, message: "Test course populated successfully" };
    } catch (error) {
        console.error("Error populating test course:", error);
        throw error;
    }
} 