const categories = require("../constants/categories");
const { queryState } = require("../constants/queryState");
const User = require("../models/User");
const Course = require("../models/Course");
const Instructor = require("../models/Instructor");


// ------------------- SEARCH SUGGESTION
/**
 * Get course suggestions
 */
async function getCourseSuggestions(query) {
  // Get course title suggestions
  const courseSuggestions = await Course.aggregate([
    {
      $match: {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } }
        ]
      }
    },
    {
      $limit: 5
    },
    {
      $project: {
        _id: 0,
        suggestion: '$title'
      }
    }
  ]);

  // Get category suggestions
  const categorySuggestions = await Course.aggregate([
    {
      $match: {
        category: { $regex: query, $options: 'i' }
      }
    },
    {
      $group: {
        _id: '$category'
      }
    },
    {
      $limit: 3
    },
    {
      $project: {
        _id: 0,
        suggestion: '$_id'
      }
    }
  ]);

  // Combine and extract just the suggestion strings
  return [
    ...courseSuggestions.map(item => item.suggestion),
    ...categorySuggestions.map(item => item.suggestion)
  ];
}

/**
 * Get instructor suggestions
 */
async function getInstructorSuggestions(query) {
  // Get instructor name suggestions
  const instructorSuggestions = await User.aggregate([
    {
      $match: {
        'roles.Instructor': { $exists: true },
        $or: [
          { firstName: { $regex: query, $options: 'i' } },
          { lastName: { $regex: query, $options: 'i' } },
          { username: { $regex: query, $options: 'i' } }
        ]
      }
    },
    {
      $limit: 5
    },
    {
      $project: {
        _id: 0,
        suggestion: {
          $concat: ['$firstName', ' ', '$lastName']
        }
      }
    }
  ]);

  // Get niche suggestions
  const nicheSuggestions = await Instructor.aggregate([
    {
      $match: {
        niche: { $regex: query, $options: 'i' }
      }
    },
    {
      $group: {
        _id: '$niche'
      }
    },
    {
      $limit: 3
    },
    {
      $project: {
        _id: 0,
        suggestion: '$_id'
      }
    }
  ]);

  // Combine and extract just the suggestion strings
  return [
    ...instructorSuggestions.map(item => item.suggestion),
    ...nicheSuggestions.map(item => item.suggestion)
  ];
}

const handleSearchSuggestion = async (req, res) => {

  try {
    const q = req.query.q;
    const limit = parseInt(req.query.limit) || 15; // Optional limit for suggestions/pagination
    const type = req.query.type; // Optional: Filter by type ('course' or 'instructor')

    if (!q || q.length < 2) {
      res.status(405).json({
        message: "Search query must not be less than two characters",
        state: queryState.blocked,
        data: undefined,
      });
      return
    }

    let suggestions = [];

    // Get suggestions based on type or from all collections
    if (type === 'course') {
      suggestions = await getCourseSuggestions(q);
    } else if (type === 'instructor') {
      suggestions = await getInstructorSuggestions(q);
    } else {
      // Get suggestions from all collections
      const [courseSuggestions, instructorSuggestions] = await Promise.all([
        getCourseSuggestions(q),
        getInstructorSuggestions(q)
      ]);

      // Combine and deduplicate suggestions
      suggestions = [...courseSuggestions, ...instructorSuggestions];
      suggestions = [...new Set(suggestions)];

      // Limit to top 10 suggestions
      suggestions = suggestions.slice(0, limit);
    }

    console.log('SUGGESTION', suggestions);
    res.status(200).json({
      message: 'query successful',
      state: queryState.success,
      data: suggestions,
    });

  } catch (error) {
    console.error('Error getting search suggestions:', error);
    res.status(405).json({
      message: error.message,
      state: queryState.error,
      data: undefined,
    });
    return
  }
}

// ---------------------  SEARCHING
/**
 * Search for courses
 */
async function searchCourses(query, skip, limit = 10) {
  // Use text search for courses
  const results = await Course.aggregate([
    {
      $match: {
        $text: { $search: query }
      }
    },
    {
      $addFields: {
        score: { $meta: "textScore" }
      }
    },
    {
      $sort: { score: -1 }
    },
    {
      $skip: skip
    },
    {
      $limit: limit
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'instructor'
      }
    },
    {
      $unwind: {
        path: '$instructor',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: 1,
        id: '$_id',
        title: 1,
        description: 1,
        price: 1,
        oldPrice: 1,
        category: 1,
        thumbnail: 1,
        slugUrl: 1,
        score: 1,
        instructorName: {
          $concat: ['$instructor.firstName', ' ', '$instructor.lastName']
        },
        instructorUsername: '$instructor.username',
        instructorProfile: '$instructor.profile'
      }
    }
  ]);

  const count = await Course.countDocuments({
    $text: { $search: query }
  });

  return { results, count };
}

/**
 * Search for instructors (combining User and Instructor data)
 */
async function searchInstructors(query, skip, limit) {
  // This is more complex as we need to search both User and Instructor collections
  const results = await User.aggregate([
    {
      // First find users who have the Instructor role
      $match: {
        'roles.Instructor': { $exists: true },
        $or: [
          { $text: { $search: query } }, // Text search in User collection
          { firstName: { $regex: query, $options: 'i' } },
          { lastName: { $regex: query, $options: 'i' } },
          { username: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } }
        ]
      }
    },
    {
      $addFields: {
        score: { $meta: "textScore" }
      }
    },
    {
      // Look up the instructor details
      $lookup: {
        from: 'instructors',
        localField: '_id',
        foreignField: 'userId',
        as: 'instructorDetails'
      }
    },
    {
      $unwind: {
        path: '$instructorDetails',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      // Also look up courses by this instructor
      $lookup: {
        from: 'courses',
        localField: '_id',
        foreignField: 'userId',
        as: 'courses'
      }
    },
    {
      $sort: { score: -1 }
    },
    {
      $skip: skip
    },
    {
      $limit: limit
    },
    {
      $project: {
        _id: 1,
        id: '$_id',
        firstName: 1,
        lastName: 1,
        username: 1,
        profile: 1,
        about: 1,
        handles: 1,
        score: 1,
        niche: '$instructorDetails.niche',
        status: '$instructorDetails.status',
        courseCount: { $size: '$courses' },
        // Include a sample of courses (first 3)
        sampleCourses: { $slice: ['$courses', 0, 3] }
      }
    }
  ]);

  // Count instructors matching the query
  const count = await User.countDocuments({
    'roles.Instructor': { $exists: true },
    $or: [
      { $text: { $search: query } },
      { firstName: { $regex: query, $options: 'i' } },
      { lastName: { $regex: query, $options: 'i' } },
      { username: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } }
    ]
  });

  return { results, count };
}

const handleQuery = async (req, res) => {
  const query = req.query.q;

  console.log(query)
  if (!query) {
    return res.status(400).json({ error: 'Query parameter "q" is required.' });
  }

  try {
    // Build a case-insensitive regex for partial matches
    const regex = new RegExp(query, 'i');

    // Search across title, instructor, and category fields.
    // For category, we use exact matching against the hard-coded list.
    const searchResults = await Course.find({
      $or: [
        { title: { $regex: regex } },
        { instructor: { $regex: regex } },
        { category: { $regex: regex } }
      ]
    })
      .limit(20)
      .lean();

    res.json({ results: searchResults });
  } catch (error) {
    console.error('Search error:', error);
    res.status(405).json({
      message: error.message,
      state: queryState.error,
      data: undefined,
    });
    return
  }
}

module.exports = {
  handleSearchSuggestion,
  handleQuery
}