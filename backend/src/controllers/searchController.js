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
      $limit: 15
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
      $limit: 10
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
      $limit: 15
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
      $limit: 10
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
    const q = req.query.q || '';
    const limit = parseInt(req.query.limit) || 15; // Optional limit for suggestions/pagination
    const type = req.query.type; // Optional: Filter by type ('course' or 'instructor')
    console.log(q);
    if (q.length < 2) {
      res.status(400).json({
        message: "Search query must not be less than two characters",
        state: queryState.error,
        data: undefined,
      });
      return
    }

    // db.users.find({...}).explain("executionStats")

    const cacheKey = `suggestions:${q}:${type || "all"}`
    // const cachedSuggestions = await cache.get(cacheKey)

    // if (cachedSuggestions) {
    //   return res.status(200).json(JSON.parse(cachedSuggestions))
    // }

    let suggestions = []

    // Get suggestions based on type or from all collections
    if (type === "course") {
      suggestions = await getCourseSuggestions(q)
    } else if (type === "instructor") {
      suggestions = await getInstructorSuggestions(q)
    } else {
      // Get suggestions from all collections
      const [courseSuggestions, instructorSuggestions] = await Promise.all([
        getCourseSuggestions(q),
        getInstructorSuggestions(q),
      ])

      // Combine and deduplicate suggestions
      suggestions = [...courseSuggestions, ...instructorSuggestions]
      suggestions = [...new Set(suggestions)]

      // Limit to top 10 suggestions
      suggestions = suggestions.slice(0, limit)
    }

    // Cache the suggestions
    // await cache.set(cacheKey, JSON.stringify(suggestions), 60 * 5) // Cache for 5 minutes

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
async function searchCourses(query, skip, limit=15) {
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
        sampleCourses: { $slice: ['$courses', 0, 7] }
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
  try {
    const {
      q,
      coursePage = 1,
      instructorPage = 1,
      courseLimit = 10,
      instructorLimit = 10
    } = req.query;

    console.log(q,
      coursePage,
      instructorPage,
      courseLimit,
      instructorLimit)

    // if (!q || q.length < 2) {
    //   res.status(400).json({
    //     message: "Search query must not be less than two characters",
    //     state: queryState.error,
    //     data: undefined,
    //   });
    //   return
    // }

    // Calculate skip values for pagination
    const courseSkip = (parseInt(coursePage) - 1) * parseInt(courseLimit);
    const instructorSkip = (parseInt(instructorPage) - 1) * parseInt(instructorLimit);

    // Perform searches in parallel
    const [courseResults, instructorResults] = await Promise.all([
      searchCourses(q, courseSkip, parseInt(courseLimit)),
      searchInstructors(q, instructorSkip, parseInt(instructorLimit))
    ]);

    // Return structured response with separate pagination info
    return res.status(200).json({
      message: 'query successful',
      state: queryState.success,
      data: {
        courses: {
          results: courseResults.results,
          totalPages: Math.ceil(courseResults.count / parseInt(courseLimit)),
          currentPage: parseInt(coursePage),
          totalResults: courseResults.count,
          hasMore: courseResults.count > (courseSkip + courseResults.results.length)
        },
        instructors: {
          results: instructorResults.results,
          totalPages: Math.ceil(instructorResults.count / parseInt(instructorLimit)),
          currentPage: parseInt(instructorPage),
          totalResults: instructorResults.count,
          hasMore: instructorResults.count > (instructorSkip + instructorResults.results.length)
        }
      },
      query: q
    });
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

const loadMoreResults = async (req, res) => {
  try {
    const { q, category, page = 1, limit = 10 } = req.query;

    if (!q || q.length < 2) {
      res.status(400).json({
        message: "Search query must not be less than two characters",
        state: queryState.error,
        data: undefined,
      });
      return
    }

    if (!category || !['courses', 'instructors'].includes(category)) {
      res.status(400).json({
        message: 'Valid category is required (courses or instructors)',
        state: queryState.error,
        data: undefined,
      });
      return
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    let results, count;

    if (category === 'courses') {
      const courseResults = await searchCourses(q, skip, parseInt(limit));
      results = courseResults.results;
      count = courseResults.count;
    } else {
      const instructorResults = await searchInstructors(q, skip, parseInt(limit));
      results = instructorResults.results;
      count = instructorResults.count;
    }

    return res.status(200).json({
      message: 'query successful',
      state: queryState.success,
      data: results,
      totalPages: Math.ceil(count / parseInt(limit)),
      currentPage: parseInt(page),
      totalResults: count,
      hasMore: count > (skip + results.length)
    });
  } catch (error) {
    console.error(`Error loading more ${req.query.category}:`, error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  handleSearchSuggestion,
  handleQuery,
  loadMoreResults
}