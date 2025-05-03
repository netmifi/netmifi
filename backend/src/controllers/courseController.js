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
    const { answers } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const section = course.sections.find(s => s.id === req.params.sectionId);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    let score = 0;
    let totalPoints = 0;

    section.quizzes.forEach((quiz, index) => {
      totalPoints += quiz.points;
      if (answers[index] === quiz.correctAnswer) {
        score += quiz.points;
      }
    });

    const userProgress = course.enrolledUsers.find(
      enrolled => enrolled.userId.toString() === req.user.id
    );
    if (!userProgress) {
      return res.status(404).json({ message: 'Not enrolled in this course' });
    }

    const quizScore = {
      sectionId: req.params.sectionId,
      score: (score / totalPoints) * 100,
      attempts: (userProgress.quizScores.find(qs => qs.sectionId === req.params.sectionId)?.attempts || 0) + 1,
      lastAttempt: new Date()
    };

    const existingScoreIndex = userProgress.quizScores.findIndex(
      qs => qs.sectionId === req.params.sectionId
    );

    if (existingScoreIndex !== -1) {
      userProgress.quizScores[existingScoreIndex] = quizScore;
    } else {
      userProgress.quizScores.push(quizScore);
    }

    await course.save();
    res.json(quizScore);
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