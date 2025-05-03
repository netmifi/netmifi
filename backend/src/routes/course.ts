import express from 'express';
import { auth } from '../middleware/auth';
import { Course } from '../models/Course';
import { upload } from '../utils/upload';
import { IQuizQuestion, ISection } from '../types/course';

const router = express.Router();

// Create a new course
router.post('/', auth, upload.single('thumbnail'), async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            difficulty,
            targetAudience,
            prerequisites,
            sections,
            estimatedDuration,
            price,
            isFree
        } = req.body;

        // Validate required fields
        if (!title || !description || !category || !sections) {
            return res.status(400).json({
                state: 'error',
                message: 'Missing required fields'
            });
        }

        // Parse sections from string to JSON
        let parsedSections: ISection[];
        try {
            parsedSections = JSON.parse(sections);
        } catch (error) {
            return res.status(400).json({
                state: 'error',
                message: 'Invalid sections format'
            });
        }

        // Validate sections
        if (!Array.isArray(parsedSections) || parsedSections.length === 0) {
            return res.status(400).json({
                state: 'error',
                message: 'Course must have at least one section'
            });
        }

        // Create course
        const course = await Course.create({
            title,
            description,
            category,
            difficulty,
            targetAudience: JSON.parse(targetAudience || '[]'),
            prerequisites: JSON.parse(prerequisites || '[]'),
            sections: parsedSections,
            thumbnail: req.file?.path,
            estimatedDuration: parseInt(estimatedDuration) || 0,
            price: parseFloat(price) || 0,
            isFree: isFree === 'true',
            instructor: req.user.id,
            status: 'draft'
        });

        res.status(201).json({
            state: 'success',
            message: 'Course created successfully',
            data: course
        });
    } catch (error) {
        console.error('Course creation error:', error);
        res.status(500).json({
            state: 'error',
            message: 'Failed to create course'
        });
    }
});

// Get all published courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find({ status: 'published' })
            .populate('instructor', 'name email')
            .sort({ createdAt: -1 });

        res.json({
            state: 'success',
            data: courses
        });
    } catch (error) {
        console.error('Get courses error:', error);
        res.status(500).json({
            state: 'error',
            message: 'Failed to fetch courses'
        });
    }
});

// Get a single course
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('instructor', 'name email')
            .populate('reviews.user', 'name');

        if (!course) {
            return res.status(404).json({
                state: 'error',
                message: 'Course not found'
            });
        }

        res.json({
            state: 'success',
            data: course
        });
    } catch (error) {
        console.error('Get course error:', error);
        res.status(500).json({
            state: 'error',
            message: 'Failed to fetch course'
        });
    }
});

// Get instructor's courses
router.get('/instructor/my-courses', auth, async (req, res) => {
    try {
        const courses = await Course.find({ instructor: req.user.id })
            .sort({ createdAt: -1 });

        res.json({
            state: 'success',
            data: courses
        });
    } catch (error) {
        console.error('Get instructor courses error:', error);
        res.status(500).json({
            state: 'error',
            message: 'Failed to fetch courses'
        });
    }
});

// Update a course
router.put('/:id', auth, upload.single('thumbnail'), async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                state: 'error',
                message: 'Course not found'
            });
        }

        // Check if user is the instructor
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                state: 'error',
                message: 'Not authorized to update this course'
            });
        }

        const updates = { ...req.body };
        if (req.file) {
            updates.thumbnail = req.file.path;
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        );

        res.json({
            state: 'success',
            message: 'Course updated successfully',
            data: updatedCourse
        });
    } catch (error) {
        console.error('Update course error:', error);
        res.status(500).json({
            state: 'error',
            message: 'Failed to update course'
        });
    }
});

// Delete a course
router.delete('/:id', auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                state: 'error',
                message: 'Course not found'
            });
        }

        // Check if user is the instructor
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                state: 'error',
                message: 'Not authorized to delete this course'
            });
        }

        await course.remove();

        res.json({
            state: 'success',
            message: 'Course deleted successfully'
        });
    } catch (error) {
        console.error('Delete course error:', error);
        res.status(500).json({
            state: 'error',
            message: 'Failed to delete course'
        });
    }
});

// Add a review to a course
router.post('/:id/reviews', auth, async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                state: 'error',
                message: 'Course not found'
            });
        }

        // Check if user has already reviewed
        const existingReview = course.reviews.find(
            review => review.user.toString() === req.user.id
        );

        if (existingReview) {
            return res.status(400).json({
                state: 'error',
                message: 'You have already reviewed this course'
            });
        }

        const review = {
            user: req.user.id,
            rating,
            comment,
            createdAt: new Date()
        };

        course.reviews.push(review);

        // Update course rating
        const totalRating = course.reviews.reduce((sum, review) => sum + review.rating, 0);
        course.rating = totalRating / course.reviews.length;

        await course.save();

        res.status(201).json({
            state: 'success',
            message: 'Review added successfully',
            data: review
        });
    } catch (error) {
        console.error('Add review error:', error);
        res.status(500).json({
            state: 'error',
            message: 'Failed to add review'
        });
    }
});

// Get course analytics
router.get('/:id/analytics', auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                state: 'error',
                message: 'Course not found'
            });
        }

        // Check if user is the instructor
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                state: 'error',
                message: 'Not authorized to view analytics'
            });
        }

        res.json({
            state: 'success',
            data: course.analytics
        });
    } catch (error) {
        console.error('Get analytics error:', error);
        res.status(500).json({
            state: 'error',
            message: 'Failed to fetch analytics'
        });
    }
});

// Update student progress
router.post('/:id/progress', auth, async (req, res) => {
    try {
        const { sectionId, quizScore, timeSpent } = req.body;
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                state: 'error',
                message: 'Course not found'
            });
        }

        // Find or create student progress
        let progress = course.studentProgress.find(
            p => p.userId.toString() === req.user.id
        );

        if (!progress) {
            progress = {
                userId: req.user.id,
                completedSections: [],
                quizScores: {},
                lastAccessed: new Date(),
                totalTimeSpent: 0,
                completionPercentage: 0
            };
            course.studentProgress.push(progress);
        }

        // Update progress
        if (sectionId && !progress.completedSections.includes(sectionId)) {
            progress.completedSections.push(sectionId);
        }

        if (quizScore) {
            progress.quizScores[sectionId] = quizScore;
        }

        progress.totalTimeSpent += timeSpent || 0;
        progress.lastAccessed = new Date();
        progress.completionPercentage = 
            (progress.completedSections.length / course.sections.length) * 100;

        // Update analytics
        course.analytics.averageTimeSpent = 
            course.studentProgress.reduce((sum, p) => sum + p.totalTimeSpent, 0) / 
            course.studentProgress.length;

        course.analytics.averageQuizScore = 
            course.studentProgress.reduce((sum, p) => {
                const scores = Object.values(p.quizScores);
                return sum + (scores.reduce((s, v) => s + v, 0) / scores.length);
            }, 0) / course.studentProgress.length;

        course.analytics.completionRateBySection[sectionId] = 
            course.studentProgress.filter(p => p.completedSections.includes(sectionId)).length / 
            course.studentProgress.length;

        await course.save();

        res.json({
            state: 'success',
            message: 'Progress updated successfully',
            data: progress
        });
    } catch (error) {
        console.error('Update progress error:', error);
        res.status(500).json({
            state: 'error',
            message: 'Failed to update progress'
        });
    }
});

// Get student progress
router.get('/:id/progress', auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                state: 'error',
                message: 'Course not found'
            });
        }

        const progress = course.studentProgress.find(
            p => p.userId.toString() === req.user.id
        );

        if (!progress) {
            return res.status(404).json({
                state: 'error',
                message: 'Progress not found'
            });
        }

        res.json({
            state: 'success',
            data: progress
        });
    } catch (error) {
        console.error('Get progress error:', error);
        res.status(500).json({
            state: 'error',
            message: 'Failed to fetch progress'
        });
    }
});

// Schedule course sessions
router.post('/:id/schedule', auth, async (req, res) => {
    try {
        const { sessions } = req.body;
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                state: 'error',
                message: 'Course not found'
            });
        }

        // Check if user is the instructor
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                state: 'error',
                message: 'Not authorized to schedule sessions'
            });
        }

        course.schedule = {
            type: 'scheduled',
            sessions: sessions.map((session: any) => ({
                date: new Date(session.date),
                duration: session.duration,
                title: session.title,
                description: session.description
            }))
        };

        await course.save();

        res.json({
            state: 'success',
            message: 'Sessions scheduled successfully',
            data: course.schedule
        });
    } catch (error) {
        console.error('Schedule sessions error:', error);
        res.status(500).json({
            state: 'error',
            message: 'Failed to schedule sessions'
        });
    }
});

export default router; 