const Course = require('../models/Course');

// Enroll a user in a course
const handleEnrollCourse = async (req, res) => {
    try {
        const userEmail = req.user.email; // Using user's email instead of ID
        const { courseId } = req.body;

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the user is already enrolled in the course
        const isUserEnrolled = course.enrolledUsers.some(user => user.email === userEmail);
        if (isUserEnrolled) {
            return res.status(400).json({ message: 'User is already enrolled in this course' });
        }

        // Add the user to the enrolledUsers array
        course.enrolledUsers.push({
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            username: req.user.username,
            email: userEmail
        });

        await course.save();

        res.status(200).json({ message: 'Successfully enrolled in the course', enrolledUsers: course.enrolledUsers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Cancel a user's enrollment in a course
const handleCancelEnrollment = async (req, res) => {
    try {
        const userEmail = req.user.email; // Using user's email instead of ID
        const { courseId } = req.body;

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the user is enrolled in the course
        const userIndex = course.enrolledUsers.findIndex(user => user.email === userEmail);
        if (userIndex === -1) {
            return res.status(400).json({ message: 'User is not enrolled in this course' });
        }

        // Remove the user from the enrolledUsers array
        course.enrolledUsers.splice(userIndex, 1);
        await course.save();

        res.status(200).json({ message: 'Successfully canceled enrollment', enrolledUsers: course.enrolledUsers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    handleEnrollCourse,
    handleCancelEnrollment
};