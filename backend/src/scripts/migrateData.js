const mongoose = require('mongoose');
const Course = require('../models/courseModel');
const User = require('../models/userModel');
require('dotenv').config();

const migrateData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('Connected to MongoDB');

        // Get all existing courses
        const courses = await Course.find({});
        console.log(`Found ${courses.length} courses to migrate`);

        for (const course of courses) {
            // Update course schema
            const updatedCourse = {
                ...course.toObject(),
                isPublished: true,
                isDisabled: false,
                xpReward: Math.floor(Math.random() * 500) + 100, // Random XP between 100-600
                enrolledStudents: course.enrolledStudents || [],
                reviews: course.reviews || []
            };

            // Update sections
            if (course.sections) {
                updatedCourse.sections = course.sections.map(section => ({
                    ...section.toObject(),
                    quiz: section.quiz || null
                }));
            }

            // Save updated course
            await Course.findByIdAndUpdate(course._id, updatedCourse);
            console.log(`Migrated course: ${course.title}`);
        }

        console.log('Migration completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

migrateData(); 