const Course = require('../models/Course');
const User = require('../models/User');
const Leaderboard = require('../models/Leaderboard');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { calculateXP } = require('../utils/xpCalculator');

// Course Management
const createCourse = async (req, res) => {
  try {
    const { title, description, category, price, thumbnail, xpReward } = req.body;
    
    // Upload thumbnail to cloudinary
    const thumbnailResult = await uploadToCloudinary(thumbnail, 'course-thumbnails');
    
    const course = new Course({
      title,
      description,
      instructor: req.user._id,
      category,
      price,
      thumbnail: thumbnailResult.secure_url,
      xpReward
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.thumbnail) {
      const thumbnailResult = await uploadToCloudinary(updates.thumbnail, 'course-thumbnails');
      updates.thumbnail = thumbnailResult.secure_url;
    }

    const course = await Course.findOneAndUpdate(
      { _id: id, instructor: req.user._id },
      { $set: updates },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found or unauthorized' });
    }

    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findOneAndUpdate(
      { _id: id, instructor: req.user._id },
      { $set: { isDisabled: true } },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found or unauthorized' });
    }

    res.json({ message: 'Course disabled successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Section Management
const addSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, videoUrl, duration, order, quiz } = req.body;

    const course = await Course.findOne({ _id: id, instructor: req.user._id });
    if (!course) {
      return res.status(404).json({ message: 'Course not found or unauthorized' });
    }

    const newSection = {
      title,
      content,
      videoUrl,
      duration,
      order,
      quiz
    };

    course.sections.push(newSection);
    await course.save();

    res.status(201).json(course.sections[course.sections.length - 1]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSection = async (req, res) => {
  try {
    const { id, sectionId } = req.params;
    const updates = req.body;

    const course = await Course.findOne({ _id: id, instructor: req.user._id });
    if (!course) {
      return res.status(404).json({ message: 'Course not found or unauthorized' });
    }

    const sectionIndex = course.sections.findIndex(s => s._id.toString() === sectionId);
    if (sectionIndex === -1) {
      return res.status(404).json({ message: 'Section not found' });
    }

    course.sections[sectionIndex] = { ...course.sections[sectionIndex].toObject(), ...updates };
    await course.save();

    res.json(course.sections[sectionIndex]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSection = async (req, res) => {
  try {
    const { id, sectionId } = req.params;

    const course = await Course.findOne({ _id: id, instructor: req.user._id });
    if (!course) {
      return res.status(404).json({ message: 'Course not found or unauthorized' });
    }

    course.sections = course.sections.filter(s => s._id.toString() !== sectionId);
    await course.save();

    res.json({ message: 'Section deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Course Enrollment
const enrollCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    
    if (!course || course.isDisabled) {
      return res.status(404).json({ message: 'Course not found or disabled' });
    }

    const isAlreadyEnrolled = course.enrolledStudents.some(
      enrollment => enrollment.student.toString() === req.user._id.toString()
    );

    if (isAlreadyEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    course.enrolledStudents.push({
      student: req.user._id,
      progress: {
        completedSections: [],
        lastAccessed: new Date(),
        completed: false
      }
    });

    await course.save();
    res.json({ message: 'Successfully enrolled in the course' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const unenrollCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.enrolledStudents = course.enrolledStudents.filter(
      enrollment => enrollment.student.toString() !== req.user._id.toString()
    );

    await course.save();
    res.json({ message: 'Successfully unenrolled from the course' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Course Progress
const completeSection = async (req, res) => {
  try {
    const { id, sectionId } = req.params;
    const course = await Course.findById(id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const enrollment = course.enrolledStudents.find(
      e => e.student.toString() === req.user._id.toString()
    );

    if (!enrollment) {
      return res.status(404).json({ message: 'Not enrolled in this course' });
    }

    if (!enrollment.progress.completedSections.includes(sectionId)) {
      enrollment.progress.completedSections.push(sectionId);
      enrollment.progress.lastAccessed = new Date();
      
      // Check if all sections are completed
      if (enrollment.progress.completedSections.length === course.sections.length) {
        enrollment.progress.completed = true;
        // Award XP to the user
        const user = await User.findById(req.user._id);
        user.xp += course.xpReward;
        await user.save();
      }

      await course.save();
    }

    res.json({ message: 'Section marked as completed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const submitQuiz = async (req, res) => {
  try {
    const { id, sectionId } = req.params;
    const { answers } = req.body;
    
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const section = course.sections.find(s => s._id.toString() === sectionId);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    let score = 0;
    section.quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    const passThreshold = Math.ceil(section.quiz.questions.length * 0.7);
    const passed = score >= passThreshold;

    res.json({ score, passed });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateQuiz = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const section = course.sections.find(s => s.id === req.params.sectionId);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    // Verify instructor
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }

    section.quiz = req.body;
    await course.save();

    res.json(section.quiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Course Retrieval
const getCourses = async (req, res) => {
  try {
    const { category, instructor, search, page = 1, limit = 10 } = req.query;
    const query = { isDisabled: false, isPublished: true };

    if (category) query.category = category;
    if (instructor) query.instructor = instructor;
    if (search) {
      query.$text = { $search: search };
    }

    const courses = await Course.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('instructor', 'name email')
      .sort({ createdAt: -1 });

    const total = await Course.countDocuments(query);

    res.json({
      courses,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id)
      .populate('instructor', 'name email')
      .populate('enrolledStudents.student', 'name email');

    if (!course || course.isDisabled) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSections = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course.sections);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const enrollment = course.enrolledStudents.find(
      e => e.student.toString() === req.user._id.toString()
    );

    if (!enrollment) {
      return res.status(404).json({ message: 'Not enrolled in this course' });
    }

    res.json(enrollment.progress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Course Completion
const completeCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Get course
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if all sections are completed
    const allSectionsCompleted = course.sections.every(section => section.completed);
    if (!allSectionsCompleted) {
      return res.status(400).json({ message: 'All sections must be completed before marking course as complete' });
    }

    // Update course completion status
    course.completed = true;
    course.completedAt = new Date();
    await course.save();

    // Return success response
    res.json({
      message: 'Course completed successfully',
      courseId: course._id,
      completedAt: course.completedAt
    });

  } catch (error) {
    console.error('Error completing course:', error);
    res.status(500).json({ message: 'Error completing course' });
  }
};

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  addSection,
  updateSection,
  deleteSection,
  enrollCourse,
  unenrollCourse,
  completeSection,
  submitQuiz,
  completeCourse,
  updateQuiz,
  getCourses,
  getCourse,
  getSections,
  getProgress
};