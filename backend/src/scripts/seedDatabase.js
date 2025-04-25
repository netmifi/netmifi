const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const Leaderboard = require('../models/Leaderboard');
const bcrypt = require('bcrypt');

const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123',
    role: 'student',
    level: 1,
    xp: 0,
    rank: 'novice',
    profile: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    interests: ['programming', 'web development']
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'instructor',
    level: 5,
    xp: 2500,
    rank: 'intermediate',
    profile: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
    interests: ['data science', 'machine learning']
  },
  {
    firstName: 'Admin',
    lastName: 'User',
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    level: 10,
    xp: 5000,
    rank: 'master',
    profile: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    interests: ['administration', 'management']
  }
];

const courses = [
  {
    title: 'Introduction to Web Development',
    category: 'Programming',
    description: 'Learn the basics of web development including HTML, CSS, and JavaScript',
    price: 49.99,
    thumbnail: 'https://source.unsplash.com/random/800x600/?webdevelopment',
    slugUrl: 'intro-web-dev',
    difficulty: 'beginner',
    estimatedDuration: 120,
    sections: [
      {
        id: '1',
        title: 'HTML Basics',
        type: 'video',
        contentUrl: 'https://example.com/videos/html-basics',
        description: 'Learn the fundamentals of HTML',
        duration: 30,
        order: 1,
        quizzes: [
          {
            question: 'What does HTML stand for?',
            options: [
              'Hyper Text Markup Language',
              'High Tech Modern Language',
              'Hyper Transfer Markup Language',
              'Home Tool Markup Language'
            ],
            correctAnswer: 'Hyper Text Markup Language',
            explanation: 'HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages.',
            points: 10
          }
        ],
        xpReward: 100
      },
      {
        id: '2',
        title: 'CSS Fundamentals',
        type: 'interactive',
        contentUrl: 'https://example.com/interactive/css-fundamentals',
        description: 'Master the basics of CSS styling',
        duration: 45,
        order: 2,
        quizzes: [
          {
            question: 'Which CSS property is used to change the text color?',
            options: [
              'text-color',
              'color',
              'font-color',
              'text-style'
            ],
            correctAnswer: 'color',
            explanation: 'The color property is used to set the text color in CSS.',
            points: 10
          }
        ],
        xpReward: 150
      }
    ],
    tags: ['web development', 'html', 'css', 'beginner']
  },
  {
    title: 'Advanced JavaScript Concepts',
    category: 'Programming',
    description: 'Deep dive into advanced JavaScript concepts and patterns',
    price: 79.99,
    thumbnail: 'https://source.unsplash.com/random/800x600/?javascript',
    slugUrl: 'advanced-js',
    difficulty: 'intermediate',
    estimatedDuration: 180,
    sections: [
      {
        id: '1',
        title: 'Closures and Scope',
        type: 'video',
        contentUrl: 'https://example.com/videos/closures',
        description: 'Understanding JavaScript closures and scope',
        duration: 40,
        order: 1,
        quizzes: [
          {
            question: 'What is a closure in JavaScript?',
            options: [
              'A function that has access to variables in its outer scope',
              'A way to close the browser window',
              'A method to end loops',
              'A type of variable declaration'
            ],
            correctAnswer: 'A function that has access to variables in its outer scope',
            explanation: 'A closure is a function that has access to variables in its outer scope, even after the outer function has returned.',
            points: 15
          }
        ],
        xpReward: 200
      }
    ],
    tags: ['javascript', 'advanced', 'programming']
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Leaderboard.deleteMany({});

    // Create users
    const createdUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return User.create({
          ...user,
          password: hashedPassword
        });
      })
    );

    // Create courses
    const createdCourses = await Promise.all(
      courses.map(async (course) => {
        return Course.create({
          ...course,
          userId: createdUsers[1]._id // Assign to instructor
        });
      })
    );

    // Create initial leaderboard
    await Leaderboard.create({
      type: 'global',
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      entries: createdUsers.map(user => ({
        userId: user._id,
        username: user.username,
        profileImage: user.profile,
        score: user.xp,
        level: user.level,
        rank: user.rank,
        xp: user.xp,
        completedCourses: 0,
        quizAccuracy: 0,
        streak: 0,
        lastActive: new Date()
      })),
      status: 'active'
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 