const Course = require('../models/Course');
const User = require('../models/User');
const Leaderboard = require('../models/Leaderboard');

// Course Management
exports.createCourse = async (req, res) => {
  try {
    const course = new Course({
      ...req.body,
      userId: req.user.id
    });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Section Management
exports.addSection = async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const newSection = {
      ...req.body,
      id: Date.now().toString(),
      order: course.sections.length + 1
    };

    course.sections.push(newSection);
    await course.save();
    res.status(201).json(newSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const sectionIndex = course.sections.findIndex(
      section => section.id === req.params.sectionId
    );
    if (sectionIndex === -1) {
      return res.status(404).json({ message: 'Section not found' });
    }

    course.sections[sectionIndex] = {
      ...course.sections[sectionIndex],
      ...req.body
    };

    await course.save();
    res.json(course.sections[sectionIndex]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.sections = course.sections.filter(
      section => section.id !== req.params.sectionId
    );

    await course.save();
    res.json({ message: 'Section deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Course Enrollment
exports.enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is already enrolled
    const isEnrolled = course.enrolledUsers.some(
      enrolled => enrolled.userId.toString() === req.user.id
    );
    if (isEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

        course.enrolledUsers.push({
      userId: req.user.id,
      progress: 0,
      currentSection: 0,
      completedSections: [],
      quizScores: [],
      enrolledAt: new Date()
        });

        await course.save();
    res.json({ message: 'Enrolled successfully' });
    } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.unenrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.enrolledUsers = course.enrolledUsers.filter(
      enrolled => enrolled.userId.toString() !== req.user.id
    );

    await course.save();
    res.json({ message: 'Unenrolled successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Course Progress
exports.completeSection = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

    const userProgress = course.enrolledUsers.find(
      enrolled => enrolled.userId.toString() === req.user.id
    );
    if (!userProgress) {
      return res.status(404).json({ message: 'Not enrolled in this course' });
    }

    const sectionIndex = parseInt(req.params.sectionId);
    if (!userProgress.completedSections.includes(sectionIndex)) {
      userProgress.completedSections.push(sectionIndex);
      userProgress.progress = (userProgress.completedSections.length / course.sections.length) * 100;
    }

        await course.save();
    res.json(userProgress);
    } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const { id, sectionId } = req.params;
    const { answers } = req.body;
    const userId = req.user.id;

    // Get course and section
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const section = course.sections.id(sectionId);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    // Check if section has a quiz
    if (!section.quiz) {
      return res.status(400).json({ message: 'Section does not have a quiz' });
    }

    // Calculate score
    let score = 0;
    const totalQuestions = section.quiz.questions.length;

    for (let i = 0; i < totalQuestions; i++) {
      const question = section.quiz.questions[i];
      const userAnswer = answers[i];

      if (question.type === 'MULTIPLE_CHOICE') {
        if (userAnswer === question.correctAnswer) {
          score++;
        }
      } else if (question.type === 'TRUE_FALSE') {
        if (userAnswer === question.correctAnswer) {
          score++;
        }
      }
    }

    const percentageScore = (score / totalQuestions) * 100;
    const passed = percentageScore >= section.quiz.passingScore;

    // Update section progress
    if (passed) {
      section.completed = true;
      section.progress = 100;
      await course.save();
    }

    // Return results
    res.json({
      score: percentageScore,
      passed,
      correctAnswers: score,
      totalQuestions
    });

  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ message: 'Error submitting quiz' });
  }
};

exports.updateQuiz = async (req, res) => {
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
exports.getCourses = async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$text = { $search: search };
    }

    const courses = await Course.find(query)
      .populate('userId', 'firstName lastName username profile')
      .sort('-createdAt');
    res.json(courses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('userId', 'firstName lastName username profile');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getSections = async (req, res) => {
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

exports.getProgress = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const userProgress = course.enrolledUsers.find(
      enrolled => enrolled.userId.toString() === req.user.id
    );
    if (!userProgress) {
      return res.status(404).json({ message: 'Not enrolled in this course' });
    }

    res.json(userProgress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Course Completion
exports.completeCourse = async (req, res) => {
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