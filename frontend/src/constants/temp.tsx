import {
  AboutUsSvg,
  ContactUsSvg,
  CoursesSvg,
  EmailMarketingSvg,
} from "@/assets/svg";

import { profile } from "@/assets/images";
import { Blog, Clip, PurchasedCourse } from "@/types";
import { ReactNode } from "react";

// Type definitions
interface Instructor {
  id: string;
  name: string;
  area: string;
  profile: string;
  courses: number;
  students: number;
  certificates: number;
  averageRating: number;
  isFollowing: boolean;
  isVerified: boolean;
  date: string;
}

interface Section {
  lectures: ReactNode;
  duration: ReactNode;
  id: string;
  title: string;
  learningObjectives: string[];
  summary: {
    textbook: string;
    storytelling: string;
    narrationScript: string;
  };
  videoTimestamp: {
    start: number;
    end: number;
  };
  videoUrl: string;
  audioUrl: string;
  interactiveElements: {
    type: string;
    content: {
      question: string;
      options?: string[];
      correctAnswer?: string;
      explanation: string;
    };
  }[];
  quizQuestions: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
  xpReward: number;
}

interface Course {
  instructorBio: string;
  id: string;
  slug: string;
  type: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  category: string;
  thumbnail: string;
  title: string;
  videoURL: string;
  instructorId: string;
  instructorName: string;
  instructorProfileImage: string;
  instructorProfileURL: string;
  isVerified: boolean;
  isFollowing: boolean;
  date: string;
  views: number;
  description: string;
  learningPatterns: string[];
  learningObjectives: string[];
  requirements: string[];
  sections: Section[];
}

const tempInstructors: Instructor[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Mary Moe",
    area: "Content Production",
    profile: CoursesSvg,
    courses: 25,
    students: 74500,
    certificates: 2591,
    averageRating: 4.0,
    isFollowing: true,
    isVerified: true,
    date: "3 months ago",
  },
  {
    id: "716e4567-e85b-12d3-a456-426614174000",
    name: "Angela Martins",
    area: "Product Management",
    profile: profile,
    courses: 85,
    students: 87500,
    certificates: 45691,
    averageRating: 4.8,
    isFollowing: true,
    isVerified: true,
    date: "3 months ago",
  },
  {
    id: "dm4567-e89b-12d3-a456-426614174002",
    name: "David Malan",
    area: "Computer Science",
    profile: "https://cs.harvard.edu/malan",
    courses: 10,
    students: 6200000,
    certificates: 100000,
    averageRating: 4.9,
    isFollowing: true,
    isVerified: true,
    date: "1 month ago",
  },
  {
    id: "rg4567-e89b-12d3-a456-426614174003",
    name: "React Guru",
    area: "Frontend Development",
    profile: "https://reactjsguru.com",
    courses: 50,
    students: 500000,
    certificates: 25000,
    averageRating: 4.8,
    isFollowing: true,
    isVerified: true,
    date: "2 weeks ago",
  },
  {
    id: "700db807-163c-4b54-99db-caea83cd68fb",
    name: "Esther Amadi",
    area: "product research",
    profile: "/avatars/esther-amadi.png",
    courses: 4,
    students: 2300,
    certificates: 123,
    averageRating: 4.6,
    isFollowing: true,
    isVerified: true,
    date: "3 months ago",
  },
  {
    id: "49c01555-67c6-493b-ba7b-479bd05ac753",
    name: "Angela Martins",
    area: "frontend engineering",
    profile: "/avatars/angela-martins.png",
    courses: 5,
    students: 14400,
    certificates: 2570,
    averageRating: 4.7,
    isFollowing: true,
    isVerified: true,
    date: "3 months ago",
  },
  {
    id: "ee666a11-588e-4718-8aac-83e2c00b4c14",
    name: "Okonkwo Mesla",
    area: "ui/ux design",
    profile: "/avatars/okonkwo-mesla.png",
    courses: 4,
    students: 2165,
    certificates: 89,
    averageRating: 3.7,
    isFollowing: true,
    isVerified: true,
    date: "3 months ago",
  },
  {
    id: "e8d0f2c9-d6f8-48a4-923e-c699382e0a57",
    name: "Keith Mensah",
    area: "technical writing",
    profile: "/avatars/keith-mensah.png",
    courses: 4,
    students: 14300,
    certificates: 685,
    averageRating: 4.4,
    isFollowing: true,
    isVerified: true,
    date: "3 months ago",
  },
  {
    id: "18ff0c0a-e753-4b9b-8215-eb72b18a39f9",
    name: "Lee Chong",
    area: "product marketing",
    profile: "/avatars/lee-chong.png",
    courses: 3,
    students: 1360,
    certificates: 89,
    averageRating: 3.6,
    isFollowing: true,
    isVerified: true,
    date: "3 months ago",
  },
  {
    id: "react-001",
    name: "Maximilian Schwarzmüller",
    area: "react development",
    profile: "/avatars/max-schwarz.png",
    courses: 8,
    students: 225000,
    certificates: 11200,
    averageRating: 4.8,
    isFollowing: false,
    isVerified: true,
    date: "6 months ago",
  },
  {
    id: "fcc-001",
    name: "Free CodeCamp",
    area: "fullstack development",
    profile: "/avatars/fcc-logo.png",
    courses: 20,
    students: 1200000,
    certificates: 210000,
    averageRating: 4.9,
    isFollowing: false,
    isVerified: true,
    date: "2 years ago",
  },
];

const tempCourses: Course[] = [
  {
    id: "6528fe75a49e4d8f7c1a1018",
    slug: "react-for-beginners",
    type: "free",
    price: 0,
    oldPrice: 0,
    rating: 4.7,
    reviews: 120000,
    category: "programming",
    thumbnail: "https://img.youtube.com/vi/bMknfKXIFA8/maxresdefault.jpg",
    title: "React JS Full Course - freeCodeCamp",
    videoURL: "https://www.youtube.com/watch?v=bMknfKXIFA8",
    instructorId: "6528fe75a49e4d8f7c1a9002",
    instructorName: "Free CodeCamp",
    instructorProfileImage:
      "https://yt3.ggpht.com/ytc/AKedOLQGx1K8g3Xjv3Z5U1z9Q3z5U1z9Q3z5U1z9Q3z5=s88-c-k-c0x00ffffff-no-rj",
    instructorProfileURL: "https://www.youtube.com/c/Freecodecamp",
    isVerified: true,
    isFollowing: true,
    date: "1 year ago",
    description:
      "Learn React from scratch in this comprehensive course. Perfect for beginners looking to master modern frontend development.",
    learningPatterns: ["video", "interactive", "written", "gamification"],
    learningObjectives: [
      "Understand React fundamentals and component-based architecture",
      "Master state management and hooks in React applications",
      "Build real-world applications with React and modern tooling",
      "Learn best practices for React development and deployment",
    ],
    requirements: [
      "Basic knowledge of HTML, CSS, and JavaScript",
      "Familiarity with ES6+ syntax",
      "Node.js and npm installed on your computer",
      "A code editor (VS Code recommended)",
    ],
    sections: [
      {
        id: "section-1",
        title: "Introduction to React",
        learningObjectives: [
          "Understand what React is and why it's popular",
          "Set up your development environment",
          "Create your first React component",
        ],
        summary: {
          textbook:
            "React is a JavaScript library for building user interfaces. It was developed by Facebook and has become one of the most popular frontend frameworks. In this section, we'll set up our development environment and create our first React component.",
          storytelling:
            "Imagine you're building a house. Just as you need a solid foundation and building blocks, React provides the foundation and components to build modern web applications. Let's start by laying our foundation.",
          narrationScript:
            "Welcome to React! In this section, we'll explore what makes React special and why it has revolutionized web development. Think of React components as LEGO blocks - they're reusable, modular, and can be combined to create complex structures.",
        },
        videoTimestamp: {
          start: 0,
          end: 1200,
        },
        videoUrl: "https://youtu.be/wDchsz8nmbo",
        audioUrl: "https://example.com/react-intro-audio.mp3",
        interactiveElements: [
          {
            type: "quiz",
            content: {
              question: "What is React primarily used for?",
              options: [
                "Building user interfaces",
                "Database management",
                "Server configuration",
                "Mobile app development",
              ],
              correctAnswer: "Building user interfaces",
              explanation:
                "React is primarily a JavaScript library for building user interfaces. While it can be used in mobile development through React Native, its main purpose is UI development.",
            },
          },
          {
            type: "drag-and-drop",
            content: {
              question: "Match the React concepts with their descriptions",
              options: ["Component", "Props", "State", "JSX"],
              correctAnswer:
                "Component:Reusable UI piece,Props:Data passed to components,State:Internal component data,JSX:HTML-like syntax in JavaScript",
              explanation:
                "These are the fundamental concepts in React that you'll use throughout your development journey.",
            },
          },
        ],
        quizQuestions: [
          {
            question: "What is a React component?",
            options: [
              "A reusable piece of UI",
              "A database table",
              "A CSS file",
              "A JavaScript variable",
            ],
            correctAnswer: "A reusable piece of UI",
            explanation:
              "Components are the building blocks of React applications. They are reusable pieces of UI that can contain their own content, logic, and styling.",
          },
          {
            question:
              "Which tool is commonly used to create a new React project?",
            options: [
              "create-react-app",
              "new-react-project",
              "start-react",
              "init-react",
            ],
            correctAnswer: "create-react-app",
            explanation:
              "create-react-app is the official tool for creating new React projects with a pre-configured build setup.",
          },
        ],
        xpReward: 100
      },
      {
        id: "section-2",
        title: "Components and Props",
        learningObjectives: [
          "Understand component composition",
          "Learn how to pass and use props",
          "Master component reusability",
        ],
        summary: {
          textbook:
            "Components are the core building blocks of React applications. They accept inputs called props and return React elements that describe what should appear on the screen. Props allow you to pass data from parent to child components.",
          storytelling:
            "Think of components as different departments in a company. Just like departments communicate and share resources, components communicate through props to build a complete application.",
          narrationScript:
            "Components are like LEGO blocks that we can customize and reuse. Props are like instructions that come with each block, telling it how to look and behave.",
        },
        videoTimestamp: {
          start: 1201,
          end: 2400,
        },
        videoUrl: "https://youtu.be/wDchsz8nmbo",
        audioUrl: "https://example.com/react-components-audio.mp3",
        interactiveElements: [
          {
            type: "click-to-reveal",
            content: {
              question: "Component Lifecycle",
              options: ["Mounting", "Updating", "Unmounting"],
              explanation:
                "Click each phase to learn more about the component lifecycle.",
            },
          },
          {
            type: "flashcards",
            content: {
              question: "Props vs State",
              options: [
                "Props: Read-only data passed to components",
                "State: Mutable data managed within a component",
              ],
              explanation:
                "Understanding the difference between props and state is crucial for React development.",
            },
          },
        ],
        quizQuestions: [
          {
            question: "What is the correct way to pass a prop to a component?",
            options: [
              "<Component propName={value} />",
              "<Component {propName=value} />",
              "<Component propName='value' />",
              "All of the above",
            ],
            correctAnswer: "<Component propName={value} />",
            explanation:
              "Props are passed to components using JSX attributes. For JavaScript values, use curly braces {}.",
          },
          {
            question: "Can you modify props inside a component?",
            options: [
              "Yes, anytime",
              "No, props are read-only",
              "Only in class components",
              "Only with special permissions",
            ],
            correctAnswer: "No, props are read-only",
            explanation:
              "Props are read-only in React. If you need mutable state, use the useState hook or state in class components.",
          },
        ],
        xpReward: 150
      }
    ]
  },
  {
    id: "6528fe75a49e4d8f7c1a1002",
    slug: "python-for-beginners-full-course",
    type: "free",
    price: 0,
    oldPrice: 0,
    rating: 4.6,
    reviews: 3200000,
    category: "programming",
    thumbnail: "https://img.youtube.com/vi/eWRfhZUzrAc/maxresdefault.jpg",
    title: "Python for Beginners – Full Course [Programming Tutorial]",
    videoURL: "https://www.youtube.com/watch?v=eWRfhZUzrAc",
    instructorId: "UC8butISFwT-Wl7EV0hUK0BQ",
    instructorName: "freeCodeCamp.org",
    instructorProfileImage:
      "https://yt3.ggpht.com/ytc/AKedOLT-UC8butISFwT-Wl7EV0hUK0BQ=s88-c-k-c0x00ffffff-no-rj",
    instructorProfileURL: "https://www.youtube.com/c/Freecodecamp",
    isVerified: true,
    isFollowing: false,
    date: "2 years ago",
    description:
      "Learn the Python programming language in this full course for beginners! You will learn the fundamentals of Python and code two Python projects.",
    learningPatterns: ["video"],
    learningObjectives: [
      "Understand Python syntax and data types",
      "Write control flow and functions",
      "Build simple Python applications",
    ],
    requirements: ["No prior programming experience"],
    sections: [],
  },
  {
    id: "6528fe75a49e4d8f7c1a1017",
    slug: "knife-skills-culinary-course",
    type: "free",
    price: 0,
    oldPrice: 0,
    rating: 4.8,
    reviews: 510000,
    category: "culinary",
    thumbnail: "https://img.youtube.com/vi/7vBkaOykdJs/maxresdefault.jpg",
    title: "Knife Skills: A Beginner’s Guide for Home Cooks",
    videoURL: "https://www.youtube.com/watch?v=7vBkaOykdJs",
    instructorId: "UC8jq0cDgkRz_8RWCW4N0e8Q",
    instructorName: "America's Test Kitchen",
    instructorProfileImage: "https://yt3.ggpht.com/ytc/AKedOLQKnifeSkillChef=s88-c-k-c0x00ffffff-no-rj",
    instructorProfileURL: "https://www.youtube.com/c/AmericasTestKitchen",
    isVerified: true,
    isFollowing: false,
    date: "2.2 years ago",
    description: "Learn to handle, sharpen, and use kitchen knives with confidence and safety.",
    learningPatterns: ["video"],
    learningObjectives: [
      "Hold a knife correctly",
      "Master basic cuts: dice, julienne, chiffonade",
      "Knife maintenance and safety"
    ],
    requirements: [],
    sections: []
  },
    {
    id: "6528fe75a49e4d8f7c1a1018",
    slug: "basic-electronics-course",
    type: "free",
    price: 0,
    oldPrice: 0,
    rating: 4.5,
    reviews: 330000,
    category: "electronics",
    thumbnail: "https://img.youtube.com/vi/HOFp8bHTN30/maxresdefault.jpg",
    title: "Basic Electronics Tutorial for Beginners",
    videoURL: "https://www.youtube.com/watch?v=HOFp8bHTN30",
    instructorId: "UCsXVk37bltHxD1rDPwtNM8Q",
    instructorName: "All About Circuits",
    instructorProfileImage: "https://yt3.ggpht.com/ytc/AKedOLTElectroAvatar=s88-c-k-c0x00ffffff-no-rj",
    instructorProfileURL: "https://www.youtube.com/c/AllAboutCircuits",
    isVerified: true,
    isFollowing: false,
    date: "1.9 years ago",
    description: "A solid intro to voltage, current, resistance, Ohm's law, and basic circuits.",
    learningPatterns: ["video"],
    learningObjectives: [
      "Understand how electricity flows",
      "Learn how to read a circuit diagram",
      "Use multimeters and breadboards"
    ],
    requirements: [],
    sections: []
  },
    {
    id: "6528fe75a49e4d8f7c1a1019",
    slug: "master-public-speaking-course",
    type: "free",
    price: 0,
    oldPrice: 0,
    rating: 4.6,
    reviews: 880000,
    category: "communication",
    thumbnail: "https://img.youtube.com/vi/UyN3ns4XJ7Q/maxresdefault.jpg",
    title: "Master the Art of Public Speaking",
    videoURL: "https://www.youtube.com/watch?v=UyN3ns4XJ7Q",
    instructorId: "UC7TTtOQKkUjvazwG-v9BD_w",
    instructorName: "Skillopedia",
    instructorProfileImage: "https://yt3.ggpht.com/ytc/AKedOLTSkillopedia=s88-c-k-c0x00ffffff-no-rj",
    instructorProfileURL: "https://www.youtube.com/c/Skillopedia",
    isVerified: true,
    isFollowing: false,
    date: "3.7 years ago",
    description: "A practical, psychology-backed course on public speaking, confidence, and stage presence.",
    learningPatterns: ["video"],
    learningObjectives: [
      "Overcome stage fright",
      "Structure persuasive talks",
      "Use voice and body language effectively"
    ],
    requirements: [],
    sections: []
  },
  {
    id: "6528fe75a49e4d8f7c1a1003",
    slug: "nodejs-and-expressjs-full-course",
    type: "free",
    price: 0,
    oldPrice: 0,
    rating: 4.5,
    reviews: 3800000,
    category: "programming",
    thumbnail: "https://img.youtube.com/vi/Oe421EPjeBE/maxresdefault.jpg",
    title: "Node.js and Express.js - Full Course",
    videoURL: "https://www.youtube.com/watch?v=Oe421EPjeBE",
    instructorId: "UC8butISFwT-Wl7EV0hUK0BQ",
    instructorName: "freeCodeCamp.org",
    instructorProfileImage:
      "https://yt3.ggpht.com/ytc/AKedOLT-UC8butISFwT-Wl7EV0hUK0BQ=s88-c-k-c0x00ffffff-no-rj",
    instructorProfileURL: "https://www.youtube.com/c/Freecodecamp",
    isVerified: true,
    isFollowing: false,
    date: "4 years ago",
    description:
      "Node.js and Express.js - Full Course. Covers building REST APIs, middleware, routing, and best practices.",
    learningPatterns: ["video"],
    learningObjectives: [
      "Set up Node.js development environment",
      "Create RESTful APIs with Express",
      "Handle middleware and routing",
    ],
    requirements: ["Basic JavaScript knowledge"],
    sections: [],
  },
  {
    id: "6528fe75a49e4d8f7c1a1004",
    slug: "learn-html-full-tutorial-for-beginners",
    type: "free",
    price: 0,
    oldPrice: 0,
    rating: 4.4,
    reviews: 2500000,
    category: "programming",
    thumbnail: "https://img.youtube.com/vi/kUMe1FH4CHE/maxresdefault.jpg",
    title: "Learn HTML – Full Tutorial for Beginners",
    videoURL: "https://www.youtube.com/watch?v=kUMe1FH4CHE",
    instructorId: "UC8butISFwT-Wl7EV0hUK0BQ",
    instructorName: "freeCodeCamp.org",
    instructorProfileImage:
      "https://yt3.ggpht.com/ytc/AKedOLT-UC8butISFwT-Wl7EV0hUK0BQ=s88-c-k-c0x00ffffff-no-rj",
    instructorProfileURL: "https://www.youtube.com/c/Freecodecamp",
    isVerified: true,
    isFollowing: false,
    date: "3 years ago",
    description:
      "Learn HTML in this complete course for beginners. This is an all-in-one beginner tutorial to help you learn web development skills.",
    learningPatterns: ["video"],
    learningObjectives: [
      "Understand HTML tags and structure",
      "Build semantic web pages",
      "Embed media and links",
    ],
    requirements: ["No prerequisites"],
    sections: [],
  },
  {
    id: "6528fe75a49e4d8f7c1a1005",
    slug: "css-tutorial-full-course",
    type: "free",
    price: 0,
    oldPrice: 0,
    rating: 4.4,
    reviews: 1800000,
    category: "programming",
    thumbnail: "https://img.youtube.com/vi/OXGznpKZ_sA/maxresdefault.jpg",
    title: "CSS Tutorial – Full Course for Beginners",
    videoURL: "https://www.youtube.com/watch?v=OXGznpKZ_sA",
    instructorId: "UC8butISFwT-Wl7EV0hUK0BQ",
    instructorName: "freeCodeCamp.org",
    instructorProfileImage:
      "https://yt3.ggpht.com/ytc/AKedOLT-UC8butISFwT-Wl7EV0hUK0BQ=s88-c-k-c0x00ffffff-no-rj",
    instructorProfileURL: "https://www.youtube.com/c/Freecodecamp",
    isVerified: true,
    isFollowing: false,
    date: "3 years ago",
    description:
      "In this in-depth course, you will learn about all the key features of CSS. This is the most comprehensive CSS course we've published to date.",
    learningPatterns: ["video"],
    learningObjectives: [
      "Master CSS selectors and properties",
      "Use Flexbox and Grid layouts",
      "Create responsive designs",
    ],
    requirements: ["Basic HTML knowledge"],
    sections: [],
  },
  {
    id: "6528fe75a49e4d8f7c1a1006",
    slug: "sql-tutorial-for-beginners",
    type: "free",
    price: 0,
    oldPrice: 0,
    rating: 4.5,
    reviews: 1200000,
    category: "programming",
    thumbnail: "https://img.youtube.com/vi/-fW2X7fh7Yg/maxresdefault.jpg",
    title:
      "SQL Tutorial for Beginners (and Technical Interview Questions Solved)",
    videoURL: "https://www.youtube.com/watch?v=-fW2X7fh7Yg",
    instructorId: "UC8butISFwT-Wl7EV0hUK0BQ",
    instructorName: "freeCodeCamp.org",
    instructorProfileImage:
      "https://yt3.ggpht.com/ytc/AKedOLT-UC8butISFwT-Wl7EV0hUK0BQ=s88-c-k-c0x00ffffff-no-rj",
    instructorProfileURL: "https://www.youtube.com/c/Freecodecamp",
    isVerified: true,
    isFollowing: false,
    date: "2 years ago",
    description:
      "SQL Tutorial for Beginners (and Technical Interview Questions Solved). Covers SELECT, JOINs, aggregations and more.",
    learningPatterns: ["video"],
    learningObjectives: [
      "Write basic and complex SQL queries",
      "Understand JOINs and subqueries",
      "Optimize queries for performance",
    ],
    requirements: ["Basic understanding of databases"],
    sections: [],
  },
  {
    id: "6528fe75a49e4d8f7c1a1007",
    slug: "learn-git-full-course-for-beginners",
    type: "free",
    price: 0,
    oldPrice: 0,
    rating: 4.3,
    reviews: 1000000,
    category: "programming",
    thumbnail: "https://img.youtube.com/vi/zTjRZNkhiEU/maxresdefault.jpg",
    title: "Learn Git – Full Course for Beginners",
    videoURL: "https://www.youtube.com/watch?v=zTjRZNkhiEU",
    instructorId: "UC8butISFwT-Wl7EV0hUK0BQ",
    instructorName: "freeCodeCamp.org",
    instructorProfileImage:
      "https://yt3.ggpht.com/ytc/AKedOLT-UC8butISFwT-Wl7EV0hUK0BQ=s88-c-k-c0x00ffffff-no-rj",
    instructorProfileURL: "https://www.youtube.com/c/Freecodecamp",
    isVerified: true,
    isFollowing: false,
    date: "1 year ago",
    description:
      "Learn Git – Full Course for Beginners. Covers cloning, branching, merging, rebasing and GitHub workflows.",
    learningPatterns: ["video"],
    learningObjectives: [
      "Initialize and clone repositories",
      "Work with branches and merges",
      "Collaborate via GitHub",
    ],
    requirements: ["No prerequisites"],
    sections: [],
  },
  {
    id: "6528fe75a49e4d8f7c1a1008",
    slug: "docker-tutorial-for-beginners",
    type: "free",
    price: 0,
    oldPrice: 0,
    rating: 4.2,
    reviews: 500000,
    category: "programming",
    thumbnail: "https://img.youtube.com/vi/fqMOX6JJhGo/maxresdefault.jpg",
    title: "Docker Tutorial for Beginners [FULL COURSE in 3 Hours]",
    videoURL: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
    instructorId: "UC4U5tNjQ7h3vq1jXyHpefdQ",
    instructorName: "TechWorld with Nana",
    instructorProfileImage:
      "https://yt3.ggpht.com/ytc/AKedOLT-UC4U5tNjQ7h3vq1jXyHpefdQ=s88-c-k-c0x00ffffff-no-rj",
    instructorProfileURL: "https://www.youtube.com/c/TechWorldwithNana",
    isVerified: true,
    isFollowing: false,
    date: "6 years ago",
    description:
      "A Full DevOps Course on How to Run Applications in Containers. Covers images, containers, Dockerfiles, and Compose.",
    learningPatterns: ["video"],
    learningObjectives: [
      "Understand Docker architecture",
      "Write Dockerfiles and compose files",
      "Manage container lifecycles",
    ],
    requirements: ["Basic Linux/CLI knowledge"],
    sections: [],
  },
  {
    id: "6528fe75a49e4d8f7c1a1009",
    slug: "typescript-full-course-for-beginners",
    type: "free",
    price: 0,
    oldPrice: 0,
    rating: 4.5,
    reviews: 800000,
    category: "programming",
    thumbnail: "https://img.youtube.com/vi/gieEQFIfgYc/maxresdefault.jpg",
    title:
      "TypeScript Full Course for Beginners | Complete All-in-One Tutorial",
    videoURL: "https://www.youtube.com/watch?v=gieEQFIfgYc",
    instructorId: "UC8butISFwT-Wl7EV0hUK0BQ",
    instructorName: "freeCodeCamp.org",
    instructorProfileImage:
      "https://yt3.ggpht.com/ytc/AKedOLT-UC8butISFwT-Wl7EV0hUK0BQ=s88-c-k-c0x00ffffff-no-rj",
    instructorProfileURL: "https://www.youtube.com/c/Freecodecamp",
    isVerified: true,
    isFollowing: false,
    date: "2 years ago",
    description:
      "TypeScript Full Course for Beginners. Covers types, interfaces, classes, and generics in TS.",
    learningPatterns: ["video"],
    learningObjectives: [
      "Use TypeScript types and interfaces",
      "Implement classes and inheritance",
      "Leverage generics and advanced TS features",
    ],
    requirements: ["Basic JavaScript knowledge"],
    sections: [],
  },
  {
    id: "6528fe75a49e4d8f7c1a1010",
    slug: "cs50-full-computer-science-course",
    type: "free",
    price: 0,
    oldPrice: 0,
    rating: 4.8,
    reviews: 1000000,
    category: "computer-science",
    thumbnail: "https://img.youtube.com/vi/8mAITcNt710/maxresdefault.jpg",
    title: "CS50 – Harvard University's Introduction to Computer Science",
    videoURL: "https://www.youtube.com/watch?v=8mAITcNt710",
    instructorId: "UCcabW7890RKJzL968QWEykA",
    instructorName: "CS50",
    instructorProfileImage:
      "https://yt3.ggpht.com/ytc/AKedOLT-UCcabW7890RKJzL968QWEykA=s88-c-k-c0x00ffffff-no-rj",
    instructorProfileURL:
      "https://www.youtube.com/channel/UCcabW7890RKJzL968QWEykA",
    isVerified: true,
    isFollowing: false,
    date: "2 years ago",
    description:
      "Learn the basics of computer science from Harvard University. This is CS50, an introduction to the intellectual enterprises of computer science and the art of programming.",
    learningPatterns: ["video"],
    learningObjectives: [
      "Understand basic algorithms and data structures",
      "Write programs in C, Python, SQL and JavaScript",
      "Explore memory, security and web development",
    ],
    requirements: ["No prerequisites"],
    sections: [],
  },  {
    id: "6528fe75a49e4d8f7c1a1011",
    slug: "angular-for-beginners-course",
    type: "free",
    price: 0,
    oldPrice: 0,
    rating: 4.6,
    reviews: 1700000,
    category: "programming",
    thumbnail: "https://img.youtube.com/vi/JWhRMyyF7nc/maxresdefault.jpg",
    title: "Angular for Beginners Course [Full Front End Tutorial with TypeScript]",
    videoURL: "https://www.youtube.com/watch?v=JWhRMyyF7nc",
    instructorId: "UC8butISFwT-Wl7EV0hUK0BQ",
    instructorName: "freeCodeCamp.org",
    instructorProfileImage: "https://yt3.ggpht.com/ytc/AKedOLT-UC8butISFwT-Wl7EV0hUK0BQ=s88-c-k-c0x00ffffff-no-rj",
    instructorProfileURL: "https://www.youtube.com/c/Freecodecamp",
    isVerified: true,
    isFollowing: false,
    date: "1.7 years ago", // published ~1.7 years ago :contentReference[oaicite:0]{index=0}
    description: "An 18-hour deep dive into Angular and TypeScript, perfect for building real-world front-end apps.",
    learningPatterns: ["video"],
    learningObjectives: [
      "Set up Angular projects with the CLI",
      "Build and compose Angular components",
      "Use services, routing, and Forms"
    ],
    requirements: [
      "Basic HTML/CSS/JavaScript",
      "Familiarity with ES6+ syntax"
    ],
    sections: []
  }, {
      id: "6528fe75a49e4d8f7c1a1017",
      slug: "knife-skills-culinary-course",
      type: "free",
      price: 0,
      oldPrice: 0,
      rating: 4.8,
      reviews: 510000,
      category: "culinary",
      thumbnail: "https://img.youtube.com/vi/7vBkaOykdJs/maxresdefault.jpg",
      title: "Knife Skills: A Beginner’s Guide for Home Cooks",
      videoURL: "https://www.youtube.com/watch?v=7vBkaOykdJs",
      instructorId: "UC8jq0cDgkRz_8RWCW4N0e8Q",
      instructorName: "America's Test Kitchen",
      instructorProfileImage: "https://yt3.ggpht.com/ytc/AKedOLQKnifeSkillChef=s88-c-k-c0x00ffffff-no-rj",
      instructorProfileURL: "https://www.youtube.com/c/AmericasTestKitchen",
      isVerified: true,
      isFollowing: false,
      date: "2.2 years ago",
      description: "Learn to handle, sharpen, and use kitchen knives with confidence and safety.",
      learningPatterns: ["video"],
      learningObjectives: [
        "Hold a knife correctly",
        "Master basic cuts: dice, julienne, chiffonade",
        "Knife maintenance and safety"
      ],
      requirements: [],
      sections: []
    },
      {
      id: "6528fe75a49e4d8f7c1a1018",
      slug: "basic-electronics-course",
      type: "free",
      price: 0,
      oldPrice: 0,
      rating: 4.5,
      reviews: 330000,
      category: "electronics",
      thumbnail: "https://img.youtube.com/vi/HOFp8bHTN30/maxresdefault.jpg",
      title: "Basic Electronics Tutorial for Beginners",
      videoURL: "https://www.youtube.com/watch?v=HOFp8bHTN30",
      instructorId: "UCsXVk37bltHxD1rDPwtNM8Q",
      instructorName: "All About Circuits",
      instructorProfileImage: "https://yt3.ggpht.com/ytc/AKedOLTElectroAvatar=s88-c-k-c0x00ffffff-no-rj",
      instructorProfileURL: "https://www.youtube.com/c/AllAboutCircuits",
      isVerified: true,
      isFollowing: false,
      date: "1.9 years ago",
      description: "A solid intro to voltage, current, resistance, Ohm's law, and basic circuits.",
      learningPatterns: ["video"],
      learningObjectives: [
        "Understand how electricity flows",
        "Learn how to read a circuit diagram",
        "Use multimeters and breadboards"
      ],
      requirements: [],
      sections: []
    },
      {
      id: "6528fe75a49e4d8f7c1a1019",
      slug: "master-public-speaking-course",
      type: "free",
      price: 0,
      oldPrice: 0,
      rating: 4.6,
      reviews: 880000,
      category: "communication",
      thumbnail: "https://img.youtube.com/vi/UyN3ns4XJ7Q/maxresdefault.jpg",
      title: "Master the Art of Public Speaking",
      videoURL: "https://www.youtube.com/watch?v=UyN3ns4XJ7Q",
      instructorId: "UC7TTtOQKkUjvazwG-v9BD_w",
      instructorName: "Skillopedia",
      instructorProfileImage: "https://yt3.ggpht.com/ytc/AKedOLTSkillopedia=s88-c-k-c0x00ffffff-no-rj",
      instructorProfileURL: "https://www.youtube.com/c/Skillopedia",
      isVerified: true,
      isFollowing: false,
      date: "3.7 years ago",
      description: "A practical, psychology-backed course on public speaking, confidence, and stage presence.",
      learningPatterns: ["video"],
      learningObjectives: [
        "Overcome stage fright",
        "Structure persuasive talks",
        "Use voice and body language effectively"
      ],
      requirements: [],
      sections: []
    },
  {
    id: "6528fe75a49e4d8f7c1a1012",
    slug: "vue-js-crash-course",
    type: "free",
    price: 0,
    oldPrice: 0,
    rating: 4.5,
    reviews: 1182161,
    category: "programming",
    thumbnail: "https://img.youtube.com/vi/Wy9q22isx3U/maxresdefault.jpg",
    title: "Vue JS Crash Course (2019)",
    videoURL: "https://www.youtube.com/watch?v=Wy9q22isx3U",
    instructorId: "UC29ju8bIPH5as8OGnQzwJyA",
    instructorName: "Traversy Media",
    instructorProfileImage: "https://yt3.ggpht.com/ytc/AKedOLQy06...=s88-c-k-c0x00ffffff-no-rj",
    instructorProfileURL: "https://www.youtube.com/c/TraversyMedia",
    isVerified: true,
    isFollowing: false,
    date: "6.3 years ago", // published ~6.3 years ago :contentReference[oaicite:1]{index=1}
    description: "Learn Vue.js fundamentals—components, directives, lifecycle hooks—in under 1 hour.",
    learningPatterns: ["video"],
    learningObjectives: [
      "Understand Vue reactivity and data binding",
      "Create and compose Vue components",
      "Use Vue Router and Vuex basics"
    ],
    requirements: [
      "JavaScript fundamentals",
      "Basic HTML/CSS"
    ],
    sections: []
  },
  {
    id: "6528fe75a49e4d8f7c1a1013",
    slug: "python-django-full-course",
    type: "free",
    price: 0,
    oldPrice: 0,
    rating: 4.7,
    reviews: 4900000,
    category: "programming",
    thumbnail: "https://img.youtube.com/vi/F5mRW0jo-U4/maxresdefault.jpg",
    title: "Python Django Web Framework – Full Course for Beginners",
    videoURL: "https://www.youtube.com/watch?v=F5mRW0jo-U4",
    instructorId: "UC8butISFwT-Wl7EV0hUK0BQ",
    instructorName: "freeCodeCamp.org",
    instructorProfileImage: "https://yt3.ggpht.com/ytc/AKedOLT-UC8butISFwT-Wl7EV0hUK0BQ=s88-c-k-c0x00ffffff-no-rj",
    instructorProfileURL: "https://www.youtube.com/c/Freecodecamp",
    isVerified: true,
    isFollowing: false,
    date: "6.3 years ago", // published ~6.3 years ago :contentReference[oaicite:2]{index=2}
    description: "A complete 4-hour introduction to building web apps with Django, covering models, views, templates, and auth.",
    learningPatterns: ["video"],
    learningObjectives: [
      "Define Django models and migrations",
      "Build views and templates",
      "Implement user authentication"
    ],
    requirements: [
      "Basic Python knowledge",
      "Familiarity with databases"
    ],
    sections: []
  },
  {
    id: "6528fe75a49e4d8f7c1a1014",
    slug: "build-flutter-app-with-dart",
    type: "free",
    price: 0,
    oldPrice: 0,
    rating: 4.6,
    reviews: 2100000,
    category: "mobile-development",
    thumbnail: "https://img.youtube.com/vi/x0uinJvhNxI/maxresdefault.jpg",
    title: "Build a Flutter App with Google's Flutter & Dart",
    videoURL: "https://www.youtube.com/watch?v=x0uinJvhNxI",
    instructorId: "UCwXdFgeE9KYzlDdR7TG9cMw",
    instructorName: "Flutter",
    instructorProfileImage: "https://yt3.ggpht.com/ytc/AKedOLT-UCwXdFgeE9KYzlDdR7TG9cMw=s88-c-k-c0x00ffffff-no-rj",
    instructorProfileURL: "https://www.youtube.com/c/FlutterDev",
    isVerified: true,
    isFollowing: false,
    date: "5.8 years ago", // published ~5.8 years ago :contentReference[oaicite:3]{index=3}
    description: "A step-by-step 5-hour tutorial to build cross-platform Flutter apps using Dart.",
    learningPatterns: ["video"],
    learningObjectives: [
      "Build layouts with Widgets",
      "Manage state in Flutter",
      "Deploy to Android and iOS"
    ],
    requirements: [
      "Basic programming concepts",
      "Familiarity with OOP"
    ],
    sections: []
  },
  {
    id: "6528fe75a49e4d8f7c1a1015",
    slug: "kubernetes-full-course-beginners",
    type: "free",
    price: 0,
    oldPrice: 0,
    rating: 4.4,
    reviews: 820000,
    category: "devops",
    thumbnail: "https://img.youtube.com/vi/X48VuDVv0do/maxresdefault.jpg",
    title: "Kubernetes Tutorial for Beginners [FULL COURSE in 4 Hours]",
    videoURL: "https://www.youtube.com/watch?v=X48VuDVv0do",
    instructorId: "UC4AWMdvWDQyQZmJd0nzfvtA",
    instructorName: "The Net Ninja",
    instructorProfileImage: "https://yt3.ggpht.com/ytc/AKedOLT-UC4AWMdvWDQyQZmJd0nzfvtA=s88-c-k-c0x00ffffff-no-rj",
    instructorProfileURL: "https://www.youtube.com/c/TheNetNinja",
    isVerified: true,
    isFollowing: false,
    date: "4.5 years ago", // published ~4.5 years ago :contentReference[oaicite:4]{index=4}
    description: "Hands-on 4-hour Kubernetes course: pods, services, deployments, and real-world demos.",
    learningPatterns: ["video"],
    learningObjectives: [
      "Deploy and scale containers",
      "Manage config maps and secrets",
      "Use Helm and Operators"
    ],
    requirements: [
      "Docker basics",
      "Linux command-line"
    ],
    sections: []
  },
    {
      id: "6528fe75a49e4d8f7c1a1016",
      slug: "personal-finance-101-course",
      type: "free",
      price: 0,
      oldPrice: 0,
      rating: 4.7,
      reviews: 920000,
      category: "personal-finance",
      thumbnail: "https://img.youtube.com/vi/vXU8kUjv6Kw/maxresdefault.jpg",
      title: "Personal Finance 101: Everything You Need to Know",
      videoURL: "https://www.youtube.com/watch?v=vXU8kUjv6Kw",
      instructorId: "UCpKoN-9wP9Qg3xKeQ9N8b7w",
      instructorName: "Two Cents",
      instructorProfileImage: "https://yt3.ggpht.com/ytc/AKedOLQTwoCentsImage=s88-c-k-c0x00ffffff-no-rj",
      instructorProfileURL: "https://www.youtube.com/c/TwoCentsPBS",
      isVerified: true,
      isFollowing: false,
      date: "3.4 years ago",
      description: "A practical crash course covering budgeting, saving, investing, and building wealth.",
      learningPatterns: ["video"],
      learningObjectives: [
        "Create a working budget",
        "Understand credit scores and debt",
        "Basics of investing and saving for retirement"
      ],
      requirements: [],
      sections: []
    },
     
      {
      id: "6528fe75a49e4d8f7c1a1020",
      slug: "time-management-mastery-course",
      type: "free",
      price: 0,
      oldPrice: 0,
      rating: 4.4,
      reviews: 260000,
      category: "productivity",
      thumbnail: "https://img.youtube.com/vi/oTugjssqOT0/maxresdefault.jpg",
      title: "Time Management Mastery in 1 Hour",
      videoURL: "https://www.youtube.com/watch?v=oTugjssqOT0",
      instructorId: "UC3fXjUFIw43nQ5U0YBd1nWg",
      instructorName: "Productivity Guy",
      instructorProfileImage: "https://yt3.ggpht.com/ytc/AKedOLProductivityGuy=s88-c-k-c0x00ffffff-no-rj",
      instructorProfileURL: "https://www.youtube.com/c/ProductivityGuy",
      isVerified: true,
      isFollowing: false,
      date: "4.1 years ago",
      description: "Learn to plan, prioritize, and execute with focus using proven productivity techniques.",
      learningPatterns: ["video"],
      learningObjectives: [
        "Apply the Eisenhower Matrix",
        "Use Pomodoro and batching",
        "Avoid burnout and task overload"
      ],
      requirements: [],
      sections: []
    },
      {
      id: "6528fe75a49e4d8f7c1a1021",
      slug: "beginner-guitar-course",
      type: "free",
      price: 0,
      oldPrice: 0,
      rating: 4.9,
      reviews: 1200000,
      category: "music",
      thumbnail: "https://img.youtube.com/vi/5mg8t6niF24/maxresdefault.jpg",
      title: "Learn to Play Guitar for Absolute Beginners",
      videoURL: "https://www.youtube.com/watch?v=5mg8t6niF24",
      instructorId: "UCcIZivxjU3Od7JrHJVgXCRA",
      instructorName: "Justin Guitar",
      instructorProfileImage: "https://yt3.ggpht.com/ytc/AKedOLJustGuitar=s88-c-k-c0x00ffffff-no-rj",
      instructorProfileURL: "https://www.youtube.com/user/JustinSandercoe",
      isVerified: true,
      isFollowing: false,
      date: "6.2 years ago",
      description: "An easy and fun step-by-step course for anyone picking up a guitar for the first time.",
      learningPatterns: ["video"],
      learningObjectives: [
        "Basic chords and strumming",
        "Simple rhythm patterns",
        "Play your first song"
      ],
      requirements: ["Acoustic or electric guitar"],
      sections: []
    }
];

const tempBlogs: Blog[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    category: "Technology",
    thumbnail: ContactUsSvg,
    title: "The Future of Web Development",
    body: "In this blog post, we will explore the latest trends and technologies shaping the future of web development...",
    posterName: "John Doe",
    posterProfileImage: CoursesSvg,
    posterProfileURL: "https://www.example.com/johndoe",
    isVerified: false,
    isFollowing: true,
    isLiked: true,
    likes: 120,
    comments: {
      count: 25,
      comments: [
        {
          id: "13245-tu672-91890-u1h721gew7",
          comment: "This is a very nice course",
          isLiked: true,
          commenter: {
            id: "178gbd3-4094nyu-teb53b3",
            username: "marvis travail",
            profile: profile,
            isVerified: true,
          },
          likes: 7,
          date: "7 hours ago",
          replies: {
            count: 4,
            replies: [
              {
                id: "158793-ifujuds-6784-euyvw",
                reply: "Thanks, hope you enjoyed it",
                commentId: "13415-gt83rghwriuoes-574289",
                isLiked: true,
                likes: 400,
                date: "8 minutes ago",
                replier: {
                  id: "31267fdgvx-71tsyewew-7239b1",
                  username: "Rick Tochukwu",
                  profile: AboutUsSvg,
                  isVerified: true,
                },
                replyTo: {
                  id: "13245-tu672-91890-u1h721gew7",
                  username: "marvis travail",
                  profile: profile,
                },
              },
            ],
          },
        },
      ],
    },
    views: 8790,
    date: "1 year ago",
  },
  {
    id: "789a0123-4567-89ab-cdef-123456789000",
    category: "Travel",
    thumbnail: CoursesSvg,
    title: "Exploring the Hidden Gems of Italy",
    body: "Italy is known for its iconic landmarks, but there are also many hidden gems waiting to be discovered...",
    posterName: "Jane Smith",
    posterProfileImage: "https://via.placeholder.com/100x100",
    posterProfileURL: "https://www.example.com/janesmith",
    isLiked: false,
    likes: 87,
    isVerified: false,
    isFollowing: false,
    comments: {
      count: 14,
      comments: [
        {
          id: "13245-tu672-91890-u1h721gew7",
          comment:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni dolorem, dicta maiores vel sequi adipisci necessitatibus hic iure quibusdam facilis sint harum corporis minima itaque ad assumenda sed cumque numquam optio? Qui quisquam eveniet quod quis quasi veniam magnam rem nemo. Quos unde illum laborum architecto optio reiciendis possimus expedita!  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni dolorem, dicta maiores vel sequi adipisci necessitatibus hic iure quibusdam facilis sint harum corporis minima itaque ad assumenda sed cumque numquam optio? Qui quisquam eveniet quod quis quasi veniam magnam rem nemo. Quos unde illum laborum architecto optio reiciendis possimus expedita! Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni dolorem, dicta maiores vel sequi adipisci necessitatibus hic iure quibusdam facilis sint harum corporis minima itaque ad assumenda sed cumque numquam optio? Qui quisquam eveniet quod quis quasi veniam magnam rem nemo. Quos unde illum laborum architecto optio reiciendis possimus expedita!",
          isLiked: true,
          commenter: {
            id: "178gbd3-4094nyu-teb53b3",
            username: "king mane",
            profile: profile,
            isVerified: true,
          },
          likes: 7,
          date: "7 hours ago",
          replies: {
            count: 4,
            replies: [
              {
                id: "158793-ifujuds-6784-euyvw",
                reply: "Thanks, hope you enjoyed it",
                commentId: "13415-gt83rghwriuoes-574289",
                isLiked: true,
                likes: 400,
                date: "8 minutes ago",
                replier: {
                  id: "31267fdgvx-71tsyewew-7239b1",
                  username: "Rick Tochukwu",
                  profile: AboutUsSvg,
                  isVerified: true,
                },
                replyTo: {
                  id: "13245-tu672-91890-u1h721gew7",
                  username: "marvis travail",
                  profile: profile,
                },
              },
            ],
          },
        },
        {
          id: "13245-tu672-91890-u1h721gew7",
          comment: "This is a very nice course",
          isLiked: true,
          commenter: {
            id: "178gbd3-4094nyu-teb53b3",
            username: "marvis travail",
            profile: profile,
            isVerified: true,
          },
          likes: 7,
          date: "7 hours ago",
          replies: {
            count: 4,
            replies: [
              {
                id: "158793-ifujuds-6784-euyvw",
                reply: "Thanks, hope you enjoyed it",
                commentId: "13415-gt83rghwriuoes-574289",
                isLiked: true,
                likes: 400,
                date: "8 minutes ago",
                replier: {
                  id: "31267fdgvx-71tsyewew-7239b1",
                  username: "Rick Tochukwu",
                  profile: AboutUsSvg,
                  isVerified: true,
                },
                replyTo: {
                  id: "13245-tu672-91890-u1h721gew7",
                  username: "marvis travail",
                  profile: profile,
                },
              },
            ],
          },
        },
        {
          id: "13245-tu672-91890-u1h721gew7",
          comment: "This is a very nice course",
          isLiked: true,
          commenter: {
            id: "178gbd3-4094nyu-teb53b3",
            username: "marvis travail",
            profile: profile,
            isVerified: true,
          },
          likes: 7,
          date: "7 hours ago",
          replies: {
            count: 4,
            replies: [
              {
                id: "158793-ifujuds-6784-euyvw",
                reply: "Thanks, hope you enjoyed it",
                commentId: "13415-gt83rghwriuoes-574289",
                isLiked: true,
                likes: 400,
                date: "8 minutes ago",
                replier: {
                  id: "31267fdgvx-71tsyewew-7239b1",
                  username: "Rick Tochukwu",
                  profile: AboutUsSvg,
                  isVerified: true,
                },
                replyTo: {
                  id: "13245-tu672-91890-u1h721gew7",
                  username: "marvis travail",
                  profile: profile,
                },
              },
              {
                id: "158793-ifujuds-6784-euyvw",
                reply: "Thanks, hope you enjoyed it",
                commentId: "13415-gt83rghwriuoes-574289",
                isLiked: true,
                likes: 400,
                date: "8 minutes ago",
                replier: {
                  id: "31267fdgvx-71tsyewew-7239b1",
                  username: "Rick Tochukwu",
                  profile: AboutUsSvg,
                  isVerified: true,
                },
                replyTo: {
                  id: "13245-tu672-91890-u1h721gew7",
                  username: "marvis travail",
                  profile: profile,
                },
              },
              {
                id: "158793-ifujuds-6784-euyvw",
                reply: "Thanks, hope you enjoyed it",
                commentId: "13415-gt83rghwriuoes-574289",
                isLiked: true,
                likes: 400,
                date: "8 minutes ago",
                replier: {
                  id: "31267fdgvx-71tsyewew-7239b1",
                  username: "Rick Tochukwu",
                  profile: AboutUsSvg,
                  isVerified: true,
                },
                replyTo: {
                  id: "13245-tu672-91890-u1h721gew7",
                  username: "marvis travail",
                  profile: profile,
                },
              },
            ],
          },
        },
      ],
    },
    views: 90,
    date: "6 months ago",
  },
  {
    id: "fedcba09-8765-4321-abcd-efghijklmnop",
    category: "Food",
    thumbnail: CoursesSvg,
    title: "The Best Vegan Recipes for Beginners",
    body: "Going vegan doesn't have to be difficult! This blog post features delicious and easy vegan recipes...",
    posterName: "Sarah Lee",
    posterProfileImage: profile,
    posterProfileURL: "https://www.example.com/sarahlee",
    isVerified: true,
    isFollowing: true,
    isLiked: false,
    likes: 152,
    comments: {
      count: 38,
      comments: [
        {
          id: "13245-tu672-91890-u1h721gew7",
          comment: "This is a very nice course",
          isLiked: true,
          commenter: {
            id: "178gbd3-4094nyu-teb53b3",
            username: "marvis travail",
            profile: profile,
            isVerified: false,
          },
          likes: 7,
          date: "7 hours ago",
          replies: {
            count: 4,
            replies: [
              {
                id: "158793-ifujuds-6784-euyvw",
                reply: "Thanks, hope you enjoyed it",
                commentId: "13415-gt83rghwriuoes-574289",
                isLiked: true,
                likes: 400,
                date: "8 minutes ago",
                replier: {
                  id: "31267fdgvx-71tsyewew-7239b1",
                  username: "Rick Tochukwu",
                  profile: AboutUsSvg,
                  isVerified: true,
                },
                replyTo: {
                  id: "13245-tu672-91890-u1h721gew7",
                  username: "marvis travail",
                  profile: profile,
                },
              },
            ],
          },
        },
      ],
    },
    views: 189,
    date: "3 months ago",
  },
  {
    id: "01234567-89ab-cdef-fedc-ba0987654321",
    category: "Lifestyle",
    thumbnail: AboutUsSvg,
    title: "Building a Minimacollection Wardrobe",
    body: "Decluttering your closet can be a liberating experience. Learn tips on creating a minimacollection wardrobe...",
    posterName: "Michael Chen",
    posterProfileImage: EmailMarketingSvg,
    posterProfileURL: "https://www.example.com/michaelchen",
    isVerified: true,
    isFollowing: false,
    isLiked: true,
    likes: 98,
    comments: {
      count: 19,
      comments: [
        {
          id: "13245-tu672-91890-u1h721gew7",
          comment: "This is a very nice course",
          isLiked: true,
          commenter: {
            id: "178gbd3-4094nyu-teb53b3",
            username: "marvis travail",
            profile: profile,
            isVerified: true,
          },
          likes: 7,
          date: "7 hours ago",
          replies: {
            count: 4,
            replies: [
              {
                id: "158793-ifujuds-6784-euyvw",
                reply: "Thanks, hope you enjoyed it",
                commentId: "13415-gt83rghwriuoes-574289",
                isLiked: true,
                likes: 400,
                date: "8 minutes ago",
                replier: {
                  id: "31267fdgvx-71tsyewew-7239b1",
                  username: "Rick Tochukwu",
                  profile: AboutUsSvg,
                  isVerified: true,
                },
                replyTo: {
                  id: "13245-tu672-91890-u1h721gew7",
                  username: "marvis travail",
                  profile: profile,
                },
              },
            ],
          },
        },
      ],
    },
    views: 678,
    date: "8 months ago",
  },
  {
    id: "cbacdef0-1234-5678-9abc-fedcba098765",
    category: "Business",
    thumbnail: "https://via.placeholder.com/150x150",
    title: "The Power of Effective Communication in the Workplace",
    body: "Communication is key to success in any business. This blog post explores strategies for effective communication...",
    posterName: "David Miller",
    posterProfileImage: AboutUsSvg,
    posterProfileURL: "https://www.example.com/davidmiller",
    isVerified: true,
    isFollowing: true,
    isLiked: false,
    likes: 115,
    comments: {
      count: 27,
      comments: [
        {
          id: "13245-tu672-91890-u1h721gew7",
          comment: "This is a very nice course",
          isLiked: true,
          commenter: {
            id: "178gbd3-4094nyu-teb53b3",
            username: "marvis travail",
            profile: profile,
            isVerified: true,
          },
          likes: 7,
          date: "7 hours ago",
          replies: {
            count: 4,
            replies: [
              {
                id: "158793-ifujuds-6784-euyvw",
                reply: "Thanks, hope you enjoyed it",
                commentId: "13415-gt83rghwriuoes-574289",
                isLiked: true,
                likes: 400,
                date: "8 minutes ago",
                replier: {
                  id: "31267fdgvx-71tsyewew-7239b1",
                  username: "Rick Tochukwu",
                  profile: AboutUsSvg,
                  isVerified: true,
                },
                replyTo: {
                  id: "13245-tu672-91890-u1h721gew7",
                  username: "marvis travail",
                  profile: profile,
                },
              },
            ],
          },
        },
      ],
    },
    views: 218,
    date: "4 months ago",
  },
  {
    id: "fec0ba98-7654-3210-fedc-ba0987654321",
    category: "Photography",
    thumbnail: "https://via.placeholder.com/150x150",
    title: "Capturing Stunning Landscapes: Photography Tips for Beginners",
    body: "The world is full of breathtaking landscapes waiting to be captured. This blog post provides tips for beginners...",
    posterName: "Sarah Lee",
    posterProfileImage: "https://via.placeholder.com/100x100",
    posterProfileURL: "https://www.example.com/sarahlee",
    isVerified: true,
    isFollowing: false,
    isLiked: true,
    likes: 178,
    comments: {
      count: 42,
      comments: [
        {
          id: "13245-tu672-91890-u1h721gew7",
          comment: "This is a very nice course",
          isLiked: true,
          commenter: {
            id: "178gbd3-4094nyu-teb53b3",
            username: "marvis travail",
            profile: profile,
            isVerified: true,
          },
          likes: 7,
          date: "7 hours ago",
          replies: {
            count: 4,
            replies: [
              {
                id: "158793-ifujuds-6784-euyvw",
                reply: "Thanks, hope you enjoyed it",
                commentId: "13415-gt83rghwriuoes-574289",
                isLiked: true,
                likes: 400,
                date: "8 minutes ago",
                replier: {
                  id: "31267fdgvx-71tsyewew-7239b1",
                  username: "Rick Tochukwu",
                  profile: AboutUsSvg,
                  isVerified: true,
                },
                replyTo: {
                  id: "13245-tu672-91890-u1h721gew7",
                  username: "marvis travail",
                  profile: profile,
                },
              },
            ],
          },
        },
      ],
    },
    views: 654,
    date: "2 years ago",
  },
  {
    id: "98765432-0123-4567-89ab-cdef01234567",
    category: "Health & Fitness",
    thumbnail: "https://via.placeholder.com/150x150",
    title: "Developing a Sustainable Exercise Routine",
    body: "Exercise is essential for a healthy lifestyle, but consistency is key. Learn tips for building a sustainable routine...",
    posterName: "Emily Jones",
    posterProfileImage: "https://via.placeholder.com/100x100",
    posterProfileURL: "https://www.example.com/emilyjones",
    isVerified: true,
    isFollowing: true,
    isLiked: false,
    likes: 132,
    comments: {
      count: 31,
      comments: [
        {
          id: "13245-tu672-91890-u1h721gew7",
          comment: "This is a very nice course",
          isLiked: true,
          commenter: {
            id: "178gbd3-4094nyu-teb53b3",
            username: "marvis travail",
            profile: profile,
            isVerified: true,
          },
          likes: 7,
          date: "7 hours ago",
          replies: {
            count: 4,
            replies: [
              {
                id: "158793-ifujuds-6784-euyvw",
                reply: "Thanks, hope you enjoyed it",
                commentId: "13415-gt83rghwriuoes-574289",
                isLiked: true,
                likes: 400,
                date: "8 minutes ago",
                replier: {
                  id: "31267fdgvx-71tsyewew-7239b1",
                  username: "Rick Tochukwu",
                  profile: AboutUsSvg,
                  isVerified: true,
                },
                replyTo: {
                  id: "13245-tu672-91890-u1h721gew7",
                  username: "marvis travail",
                  profile: profile,
                },
              },
            ],
          },
        },
      ],
    },
    views: 2158,
    date: "9 months ago",
  },
  {
    id: "21098765-4321-0fed-cba9-876543210123",
    category: "Music",
    thumbnail: "https://via.placeholder.com/150x150",
    title: "The History of Jazz Music: From Its Roots to Modern Day",
    body: "Jazz music is a rich and vibrant genre with a long history. This blog post explores the evolution of jazz...",
    posterName: "William Brown",
    posterProfileImage: "https://via.placeholder.com/100x100",
    posterProfileURL: "https://www.example.com/williambrown",
    isVerified: true,
    isFollowing: true,
    isLiked: true,
    likes: 85,
    comments: {
      count: 17,
      comments: [
        {
          id: "13245-tu672-91890-u1h721gew7",
          comment: "This is a very nice course",
          isLiked: true,
          commenter: {
            id: "178gbd3-4094nyu-teb53b3",
            username: "marvis travail",
            profile: profile,
            isVerified: true,
          },
          likes: 7,
          date: "7 hours ago",
          replies: {
            count: 4,
            replies: [
              {
                id: "158793-ifujuds-6784-euyvw",
                reply: "Thanks, hope you enjoyed it",
                commentId: "13415-gt83rghwriuoes-574289",
                isLiked: true,
                likes: 400,
                date: "8 minutes ago",
                replier: {
                  id: "31267fdgvx-71tsyewew-7239b1",
                  username: "Rick Tochukwu",
                  profile: AboutUsSvg,
                  isVerified: true,
                },
                replyTo: {
                  id: "13245-tu672-91890-u1h721gew7",
                  username: "marvis travail",
                  profile: profile,
                },
              },
            ],
          },
        },
      ],
    },
    views: 4163,
    date: "7 months ago",
  },
  {
    id: "3210fedc-ba98-7654-3210-fedcba098765",
    category: "Entertainment",
    thumbnail: "https://via.placeholder.com/150x150",
    title: "The Best Board Games for Family Game Night",
    body: "Board games are a fantastic way to connect with family and friends. This blog post recommends some of the best board games...",
    posterName: "Olivia Rodriguez",
    posterProfileImage: "https://via.placeholder.com/100x100",
    posterProfileURL: "https://www.example.com/oliviarodriguez",
    isVerified: true,
    isFollowing: true,
    isLiked: false,
    likes: 101,
    comments: {
      count: 24,
      comments: [
        {
          id: "13245-tu672-91890-u1h721gew7",
          comment: "This is a very nice course",
          isLiked: true,
          commenter: {
            id: "178gbd3-4094nyu-teb53b3",
            username: "marvis travail",
            profile: profile,
            isVerified: true,
          },
          likes: 7,
          date: "7 hours ago",
          replies: {
            count: 4,
            replies: [
              {
                id: "158793-ifujuds-6784-euyvw",
                reply: "Thanks, hope you enjoyed it",
                commentId: "13415-gt83rghwriuoes-574289",
                isLiked: true,
                likes: 400,
                date: "8 minutes ago",
                replier: {
                  id: "31267fdgvx-71tsyewew-7239b1",
                  username: "Rick Tochukwu",
                  profile: AboutUsSvg,
                  isVerified: true,
                },
                replyTo: {
                  id: "13245-tu672-91890-u1h721gew7",
                  username: "marvis travail",
                  profile: profile,
                },
              },
            ],
          },
        },
      ],
    },
    views: 4890,
    date: "5 months ago",
  },
  {
    id: "43210987-6543-210f-edc0-ba9876543210",
    category: "Science",
    thumbnail: "https://via.placeholder.com/150x150",
    title: "The Wonders of the Natural World: Exploring Biodiversity",
    body: "Our planet is teeming with diverse life forms. This blog post explores the concept of biodiversity...",
    posterName: "Christopher Lee",
    posterProfileImage: "https://via.placeholder.com/100x100",
    posterProfileURL: "https://www.example.com/christopherlee",
    isVerified: true,
    isFollowing: false,
    isLiked: true,
    likes: 147,
    comments: {
      count: 35,
      comments: [
        {
          id: "13245-tu672-91890-u1h721gew7",
          comment: "This is a very nice course",
          isLiked: true,
          commenter: {
            id: "178gbd3-4094nyu-teb53b3",
            username: "marvis travail",
            profile: profile,
            isVerified: true,
          },
          likes: 7,
          date: "7 hours ago",
          replies: {
            count: 4,
            replies: [
              {
                id: "158793-ifujuds-6784-euyvw",
                reply: "Thanks, hope you enjoyed it",
                commentId: "13415-gt83rghwriuoes-574289",
                isLiked: true,
                likes: 400,
                date: "8 minutes ago",
                replier: {
                  id: "31267fdgvx-71tsyewew-7239b1",
                  username: "Rick Tochukwu",
                  profile: AboutUsSvg,
                  isVerified: true,
                },
                replyTo: {
                  id: "13245-tu672-91890-u1h721gew7",
                  username: "marvis travail",
                  profile: profile,
                },
              },
            ],
          },
        },
      ],
    },
    views: 790,
    date: "10 months ago",
  },
];

const tempClips: Clip[] = [
  {
    id: "clip-001",
    title: "What is Affiliate Marketing?",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://placehold.co/300x500",
    duration: 60,
    instructorName: "John Doe",
    instructorProfileImage: "https://via.placeholder.com/100x100",
    instructorProfileURL: "https://example.com/johndoe",
    progress: 20,
    rating: 4.2,
    userRating: 3.5,
    isVerified: true,
    isFollowing: false,
    isFavorite: false,
    collection: ["marketing", "money", "digital"],
    date: "2 weeks ago",
  },
  {
    id: "clip-002",
    title: "Best Tools for Writers in 2024",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "https://placehold.co/300x500",
    duration: 90,
    instructorName: "Micheal Canvas",
    instructorProfileImage: "https://via.placeholder.com/100x100",
    instructorProfileURL: "https://example.com/michael-canvas",
    progress: 5,
    rating: 4.6,
    userRating: 4.0,
    isVerified: true,
    isFollowing: true,
    isFavorite: false,
    collection: ["writing", "tools"],
    date: "4 days ago",
  },
  {
    id: "clip-003",
    title: "JavaScript Event Loop Explained",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://placehold.co/300x500",
    duration: 75,
    instructorName: "Sarah Flux",
    instructorProfileImage: "https://via.placeholder.com/100x100",
    instructorProfileURL: "https://example.com/sarah-flux",
    progress: 80,
    rating: 4.8,
    userRating: 4.5,
    isVerified: true,
    isFollowing: true,
    isFavorite: true,
    collection: ["javascript", "frontend", "dev"],
    date: "1 month ago",
  },
  {
    id: "clip-004",
    title: "3 Ways to Monetize a Blog",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "https://placehold.co/300x500",
    duration: 45,
    instructorName: "Liam Codes",
    instructorProfileImage: "https://via.placeholder.com/100x100",
    instructorProfileURL: "https://example.com/liam-codes",
    progress: 10,
    rating: 4.0,
    userRating: 3.8,
    isVerified: false,
    isFollowing: false,
    isFavorite: false,
    collection: ["blog", "monetization", "seo"],
    date: "6 days ago",
  },
  {
    id: "clip-005",
    title: "What's New in React 19",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://placehold.co/300x500",
    duration: 50,
    instructorName: "React Guru",
    instructorProfileImage: "https://via.placeholder.com/100x100",
    instructorProfileURL: "https://example.com/react-guru",
    progress: 100,
    rating: 4.9,
    userRating: 5.0,
    isVerified: true,
    isFollowing: true,
    isFavorite: true,
    collection: ["react", "frontend", "dev"],
    date: "1 day ago",
  },
  {
    id: "clip-006",
    title: "5 Tips for Better UI Design",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "https://placehold.co/300x500",
    duration: 70,
    instructorName: "Design Queen",
    instructorProfileImage: "https://via.placeholder.com/100x100",
    instructorProfileURL: "https://example.com/design-queen",
    progress: 40,
    rating: 4.7,
    userRating: 4.2,
    isVerified: true,
    isFollowing: true,
    isFavorite: false,
    collection: ["ui", "ux", "design"],
    date: "3 weeks ago",
  },
  {
    id: "clip-007",
    title: "How Hackers Exploit Public Wi-Fi",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://placehold.co/300x500",
    duration: 80,
    instructorName: "CyberKnight",
    instructorProfileImage: "https://via.placeholder.com/100x100",
    instructorProfileURL: "https://example.com/cyberknight",
    progress: 60,
    rating: 4.5,
    userRating: 4.3,
    isVerified: true,
    isFollowing: false,
    isFavorite: true,
    collection: ["security", "wifi", "hacking"],
    date: "5 days ago",
  },
  {
    id: "clip-008",
    title: "AI & You: Tools That Make You Smarter",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "https://placehold.co/300x500",
    duration: 65,
    instructorName: "Dr. Ada Byte",
    instructorProfileImage: "https://via.placeholder.com/100x100",
    instructorProfileURL: "https://example.com/ada-byte",
    progress: 35,
    rating: 4.8,
    userRating: 4.6,
    isVerified: true,
    isFollowing: true,
    isFavorite: false,
    collection: ["ai", "productivity", "tools"],
    date: "1 week ago",
  },
  {
    id: "clip-009",
    title: "API Security for Backend Developers",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://placehold.co/300x500",
    duration: 95,
    instructorName: "Node Ninja",
    instructorProfileImage: "https://via.placeholder.com/100x100",
    instructorProfileURL: "https://example.com/node-ninja",
    progress: 15,
    rating: 4.3,
    userRating: 4.0,
    isVerified: true,
    isFollowing: false,
    isFavorite: false,
    collection: ["backend", "api", "security"],
    date: "3 days ago",
  },
  {
    id: "clip-010",
    title: "Building Mobile Apps with Flutter",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "https://placehold.co/300x500",
    duration: 100,
    instructorName: "Flutter King",
    instructorProfileImage: "https://via.placeholder.com/100x100",
    instructorProfileURL: "https://example.com/flutter-king",
    progress: 0,
    rating: 4.6,
    userRating: 0.0,
    isVerified: true,
    isFollowing: false,
    isFavorite: false,
    collection: ["flutter", "mobile", "crossplatform"],
    date: "12 hours ago",
  },
];

const tempPurchasedCourses: PurchasedCourse[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    subject: "affiliate marketing",
    thumbnail: CoursesSvg,
    title: "The Ultimate JavaScript Course",
    progress: 40,
    instructorName: "John Doe",
    instructorProfileImage: "https://via.placeholder.com/100x100",
    instructorProfileURL: "https://www.example.com/johndoe",
    rating: 4.4,
    userRating: 3.5,
    isVerified: true,
    isFollowing: true,
    isFavorite: false,
    collection: [],
    date: "2 years ago",
  },
  {
    id: "153e4867-e79b-45d3-a456-426614178900",
    subject: "technical writing",
    thumbnail: AboutUsSvg,
    title: "Technical Writing: From amature to advanced",
    progress: 10,
    instructorName: "Micheal Canvas",
    instructorProfileImage: "https://via.placeholder.com/100x100",
    instructorProfileURL: "https://www.example.com/michael-canvas",
    rating: 4.4,
    userRating: 3.5,
    isVerified: true,
    isFollowing: true,
    isFavorite: false,
    collection: ["writing"],
    date: "7 months ago",
  },
  {
    id: "148e4967-e99b-12d3-a706-425814174000",
    subject: "technical writing",
    thumbnail: AboutUsSvg,
    title: "content creation: how to create contents like a pro",
    progress: 80,
    instructorName: "Brain Jotter",
    instructorProfileImage: "https://via.placeholder.com/100x100",
    instructorProfileURL: "https://www.example.com/brain-jotter",
    rating: 5,
    userRating: 4,
    isVerified: true,
    isFollowing: false,
    isFavorite: true,
    collection: ["content creation", "extra courses"],
    date: "7 months ago",
  },
  {
    id: "323e4867-e79b-12d3-a456-426614174567",
    subject: "technical writing",
    thumbnail: AboutUsSvg,
    title: "Technical Writing: From amature to advanced",
    progress: 10,
    instructorName: "Micheal Canvas",
    instructorProfileImage: "https://via.placeholder.com/100x100",
    instructorProfileURL: "https://www.example.com/michael-canvas",
    rating: 4.4,
    userRating: 3.5,
    isVerified: true,
    isFollowing: true,
    isFavorite: false,
    collection: ["writing", "watched"],
    date: "7 months ago",
  },
  {
    id: "263e4867-e99b-11d3-a706-528814374800",
    subject: "technical writing",
    thumbnail: AboutUsSvg,
    title: "content creation: how to create contents like a pro",
    progress: 80,
    instructorName: "Brain Jotter",
    instructorProfileImage: "https://via.placeholder.com/100x100",
    instructorProfileURL: "https://www.example.com/brain-jotter",
    rating: 5,
    userRating: 4,
    isVerified: true,
    isFollowing: false,
    isFavorite: true,
    collection: ["content creation"],
    date: "7 months ago",
  },
  {
    id: "353e4867-e02b-12d3-a456-426614174900",
    subject: "technical writing",
    thumbnail: AboutUsSvg,
    title: "Technical Writing: From amature to advanced",
    progress: 10,
    instructorName: "Micheal Canvas",
    instructorProfileImage: "https://via.placeholder.com/100x100",
    instructorProfileURL: "https://www.example.com/michael-canvas",
    rating: 4.4,
    userRating: 3.5,
    isVerified: true,
    isFollowing: true,
    isFavorite: false,
    collection: [],
    date: "7 months ago",
  },
  {
    id: "263e4867-e99b-12d3-a706-425814174000",
    subject: "technical writing",
    thumbnail: AboutUsSvg,
    title: "content creation: how to create contents like a pro",
    progress: 80,
    instructorName: "Brain Jotter",
    instructorProfileImage: "https://via.placeholder.com/100x100",
    instructorProfileURL: "https://www.example.com/brain-jotter",
    rating: 5,
    userRating: 4,
    isVerified: true,
    isFollowing: false,
    isFavorite: true,
    collection: [],
    date: "7 months ago",
  },
];

// Temporary leaderboard data
export const tempLeaderboard = {
  id: "leaderboard-001",
  type: "global",
  title: "Global Learning Leaderboard",
  entries: [
    {
      userId: "user-001",
      username: "Alex Johnson",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      score: 1250,
      level: 5,
      rank: "Pro",
      xp: 1250,
      completedCourses: 8,
      quizAccuracy: 92,
      streak: 7,
      lastActive: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      userId: "user-002",
      username: "Sarah Williams",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      score: 980,
      level: 4,
      rank: "Ace",
      xp: 980,
      completedCourses: 6,
      quizAccuracy: 88,
      streak: 5,
      lastActive: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    },
    {
      userId: "user-003",
      username: "Michael Brown",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      score: 750,
      level: 3,
      rank: "Star",
      xp: 750,
      completedCourses: 4,
      quizAccuracy: 85,
      streak: 3,
      lastActive: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    },
    {
      userId: "user-004",
      username: "Emily Davis",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      score: 620,
      level: 3,
      rank: "Star",
      xp: 620,
      completedCourses: 3,
      quizAccuracy: 82,
      streak: 2,
      lastActive: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    },
    {
      userId: "user-005",
      username: "David Wilson",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      score: 450,
      level: 2,
      rank: "Elite",
      xp: 450,
      completedCourses: 2,
      quizAccuracy: 78,
      streak: 1,
      lastActive: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
    },
    {
      userId: "user-006",
      username: "Jessica Taylor",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
      score: 320,
      level: 2,
      rank: "Elite",
      xp: 320,
      completedCourses: 2,
      quizAccuracy: 75,
      streak: 1,
      lastActive: new Date(Date.now() - 1000 * 60 * 300), // 5 hours ago
    },
    {
      userId: "user-007",
      username: "Robert Martinez",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
      score: 180,
      level: 1,
      rank: "Unstoppable",
      xp: 180,
      completedCourses: 1,
      quizAccuracy: 70,
      streak: 1,
      lastActive: new Date(Date.now() - 1000 * 60 * 360), // 6 hours ago
    },
    {
      userId: "user-008",
      username: "Lisa Anderson",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      score: 100,
      level: 1,
      rank: "Unstoppable",
      xp: 100,
      completedCourses: 1,
      quizAccuracy: 65,
      streak: 1,
      lastActive: new Date(Date.now() - 1000 * 60 * 420), // 7 hours ago
    },
    {
      userId: "user-009",
      username: "James Thompson",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
      score: 50,
      level: 1,
      rank: "Champion",
      xp: 50,
      completedCourses: 0,
      quizAccuracy: 0,
      streak: 0,
      lastActive: new Date(Date.now() - 1000 * 60 * 480), // 8 hours ago
    },
    {
      userId: "user-010",
      username: "Patricia Garcia",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=patricia",
      score: 20,
      level: 1,
      rank: "Titan",
      xp: 20,
      completedCourses: 0,
      quizAccuracy: 0,
      streak: 0,
      lastActive: new Date(Date.now() - 1000 * 60 * 540), // 9 hours ago
    },
  ],
  status: "active",
  startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
  endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
};

// Current user entry that will be updated during the course learning process
export const currentUserEntry = {
  userId: "current-user",
  username: "You",
  profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=current",
  score: 150,
  level: 1,
  rank: "Rookie",
  xp: 150,
  completedCourses: 0,
  quizAccuracy: 0,
  streak: 0,
  lastActive: new Date(),
};

// Function to update the current user's XP and other stats
export const updateCurrentUserXP = (xpToAdd: number) => {
  currentUserEntry.xp += xpToAdd;
  currentUserEntry.score = currentUserEntry.xp;
  currentUserEntry.lastActive = new Date();

  // Update level based on XP
  if (currentUserEntry.xp >= 1000) {
    currentUserEntry.level = 5;
    currentUserEntry.rank = "Pro";
  } else if (currentUserEntry.xp >= 800) {
    currentUserEntry.level = 4;
    currentUserEntry.rank = "Ace";
  } else if (currentUserEntry.xp >= 600) {
    currentUserEntry.level = 3;
    currentUserEntry.rank = "Star";
  } else if (currentUserEntry.xp >= 400) {
    currentUserEntry.level = 2;
    currentUserEntry.rank = "Elite";
  } else if (currentUserEntry.xp >= 200) {
    currentUserEntry.level = 1;
    currentUserEntry.rank = "Unstoppable";
  } else if (currentUserEntry.xp >= 100) {
    currentUserEntry.level = 1;
    currentUserEntry.rank = "Champion";
  } else {
    currentUserEntry.level = 1;
    currentUserEntry.rank = "Titan";
  }

  // Update completed courses if XP is high enough
  if (currentUserEntry.xp >= 300) {
    currentUserEntry.completedCourses = Math.floor(currentUserEntry.xp / 300);
  }

  // Update quiz accuracy based on XP
  if (currentUserEntry.xp > 0) {
    currentUserEntry.quizAccuracy = Math.min(
      95,
      Math.floor(60 + currentUserEntry.xp / 20)
    );
  }

  // Update streak
  currentUserEntry.streak = Math.min(10, Math.floor(currentUserEntry.xp / 100));

  // Add the current user to the leaderboard if not already there
  const existingIndex = tempLeaderboard.entries.findIndex(
    (entry) => entry.userId === currentUserEntry.userId
  );
  if (existingIndex >= 0) {
    tempLeaderboard.entries[existingIndex] = { ...currentUserEntry };
  } else {
    tempLeaderboard.entries.push({ ...currentUserEntry });
  }

  // Sort entries by score
  tempLeaderboard.entries.sort((a, b) => b.score - a.score);

  return currentUserEntry;
};

export {
  tempCourses,
  tempBlogs,
  tempPurchasedCourses,
  tempInstructors,
  tempClips,
};
