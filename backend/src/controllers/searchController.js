const categories = require("../constants/categories");
const { queryState } = require("../constants/queryState");
const User = require("../models/User");
const Course = require("../models/Course");
const Instructor = require("../models/Instructor");
const ACCESS_LEVELS = require("../constants/accessLevels");

const INSTRUCTOR_ROLE = ACCESS_LEVELS.Instructor;

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
async function searchCourses(query, skip, limit = 15) {
  // Use text search for courses
  try {
    // Split the query into words for better matching
    const queryWords = query.split(/\s+/).filter((word) => word.length > 0)

    // For single word queries, we can use regex directly
    if (queryWords.length === 1) {
      // First, let's get a sample course to debug the userId field
      const sampleCourse = await Course.findOne({}).lean()
      console.log("Sample course userId:", sampleCourse ? sampleCourse.userId : "No courses found")

      if (sampleCourse && sampleCourse.userId) {
        // Check if the userId is a valid ObjectId
        console.log("userId type:", typeof sampleCourse.userId)
        console.log("Is userId ObjectId?", mongoose.Types.ObjectId.isValid(sampleCourse.userId))

        // Try to find the corresponding user
        const user = await User.findById(sampleCourse.userId).lean()
        console.log("Found user for sample course:", user ? `${user.firstName} ${user.lastName}` : "No user found")
      }

      // Now proceed with the search
      const regexResults = await Course.aggregate([
        {
          $match: {
            $or: [
              { title: { $regex: query, $options: "i" } },
              { description: { $regex: query, $options: "i" } },
              { category: { $regex: query, $options: "i" } },
              { subcategory: { $regex: query, $options: "i" } },
            ],
          },
        },
        {
          $sort: { title: 1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        // Debug the userId field before lookup
        {
          $addFields: {
            userIdType: { $type: "$userId" },
            userIdStr: { $toString: "$userId" },
          },
        },
        // Convert string userId to ObjectId if needed
        {
          $addFields: {
            userIdObj: {
              $cond: {
                if: { $eq: ["$userIdType", "string"] },
                then: { $toObjectId: "$userId" },
                else: "$userId",
              },
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userIdObj",
            foreignField: "_id",
            as: "instructor",
          },
        },
        {
          $unwind: {
            path: "$instructor",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            id: "$_id",
            title: 1,
            description: 1,
            price: 1,
            oldPrice: 1,
            category: 1,
            thumbnail: 1,
            slugUrl: 1,
            // Debug fields
            userIdType: 1,
            userIdStr: 1,
            userIdObj: 1,
            // Instructor fields
            instructorName: {
              $cond: {
                if: {
                  $and: [{ $ifNull: ["$instructor.firstName", false] }, { $ifNull: ["$instructor.lastName", false] }],
                },
                then: { $concat: ["$instructor.firstName", " ", "$instructor.lastName"] },
                else: "Unknown Instructor",
              },
            },
            instructorUsername: "$instructor.username",
            instructorProfile: "$instructor.profile",
          },
        },
      ])

      // Log the first few results to debug
      if (regexResults.length > 0) {
        console.log("Sample search result:", JSON.stringify(regexResults[0], null, 2))
      } else {
        console.log("No search results found")
      }

      const count = await Course.countDocuments({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
        ],
      })

      console.log(`Found ${regexResults.length} courses using regex search for "${query}"`)

      // Clean up the results before returning
      const cleanResults = regexResults.map((result) => {
        // Remove debug fields
        const { userIdType, userIdStr, userIdObj, ...cleanResult } = result
        return cleanResult
      })

      return { results: cleanResults, count }
    }

    // For multi-word queries, try to match each word
    const regexConditions = queryWords.flatMap((word) => [
      { title: { $regex: word, $options: "i" } },
      { description: { $regex: word, $options: "i" } },
      { category: { $regex: word, $options: "i" } },
    ])

    const regexResults = await Course.aggregate([
      {
        $match: {
          $or: regexConditions,
        },
      },
      {
        $sort: { title: 1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      // Debug the userId field before lookup
      {
        $addFields: {
          userIdType: { $type: "$userId" },
          userIdStr: { $toString: "$userId" },
        },
      },
      // Convert string userId to ObjectId if needed
      {
        $addFields: {
          userIdObj: {
            $cond: {
              if: { $eq: ["$userIdType", "string"] },
              then: { $toObjectId: "$userId" },
              else: "$userId",
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userIdObj",
          foreignField: "_id",
          as: "instructor",
        },
      },
      {
        $unwind: {
          path: "$instructor",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          id: "$_id",
          title: 1,
          description: 1,
          price: 1,
          oldPrice: 1,
          category: 1,
          thumbnail: 1,
          slugUrl: 1,
          instructorName: {
            $cond: {
              if: {
                $and: [{ $ifNull: ["$instructor.firstName", false] }, { $ifNull: ["$instructor.lastName", false] }],
              },
              then: { $concat: ["$instructor.firstName", " ", "$instructor.lastName"] },
              else: "Unknown Instructor",
            },
          },
          instructorUsername: "$instructor.username",
          instructorProfile: "$instructor.profile",
        },
      },
    ])

    const count = await Course.countDocuments({
      $or: regexConditions,
    })

    console.log(`Found ${regexResults} courses using multi-word regex search for "${query}"`)
    return { results: regexResults, count }
  } catch (error) {
    console.error("Error searching courses:", error)
    return { results: [], count: 0 }
  }
}
/**
 * Search for instructors (combining User and Instructor data)
 */
async function searchInstructors(query, skip, limit) {
  try {
    // Split the query into words (likely first name and last name)
    const queryWords = query.split(/\s+/).filter((word) => word.length > 0)

    // For single word queries, we can use regex directly
    if (queryWords.length === 1) {
      const results = await User.aggregate([
        {
          $match: {
            "roles.Instructor": INSTRUCTOR_ROLE, // Use the numeric role value
            $or: [
              { firstName: { $regex: query, $options: "i" } },
              { lastName: { $regex: query, $options: "i" } },
              { username: { $regex: query, $options: "i" } },
              { email: { $regex: query, $options: "i" } },
            ],
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $project: {
            _id: 1,
            id: "$_id",
            firstName: 1,
            lastName: 1,
            username: 1,
            profile: 1,
            about: 1,
            handles: 1,
          },
        },
      ])

      const count = await User.countDocuments({
        "roles.Instructor": INSTRUCTOR_ROLE, // Use the numeric role value
        $or: [
          { firstName: { $regex: query, $options: "i" } },
          { lastName: { $regex: query, $options: "i" } },
          { username: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
        ],
      })

      console.log(`Found ${results.length} instructors using regex search for "${query}"`)
      return { results, count }
    }

    // For multi-word queries (like "John Doe"), try different matching strategies

    // Strategy 1: Match first word as firstName, second word as lastName
    if (queryWords.length === 2) {
      const firstNameLastNameResults = await User.aggregate([
        {
          $match: {
            "roles.Instructor": INSTRUCTOR_ROLE, // Use the numeric role value
            firstName: { $regex: queryWords[0], $options: "i" },
            lastName: { $regex: queryWords[1], $options: "i" },
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $project: {
            _id: 1,
            id: "$_id",
            firstName: 1,
            lastName: 1,
            username: 1,
            profile: 1,
            about: 1,
            handles: 1,
          },
        },
      ])

      if (firstNameLastNameResults.length > 0) {
        const count = await User.countDocuments({
          "roles.Instructor": INSTRUCTOR_ROLE, // Use the numeric role value
          firstName: { $regex: queryWords[0], $options: "i" },
          lastName: { $regex: queryWords[1], $options: "i" },
        })

        console.log(
          `Found ${firstNameLastNameResults.length} instructors matching firstName="${queryWords[0]}", lastName="${queryWords[1]}"`,
        )
        return { results: firstNameLastNameResults, count }
      }

      // Try the reverse (last name, first name)
      const lastNameFirstNameResults = await User.aggregate([
        {
          $match: {
            "roles.Instructor": INSTRUCTOR_ROLE, // Use the numeric role value
            firstName: { $regex: queryWords[1], $options: "i" },
            lastName: { $regex: queryWords[0], $options: "i" },
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $project: {
            _id: 1,
            id: "$_id",
            firstName: 1,
            lastName: 1,
            username: 1,
            profile: 1,
            about: 1,
            handles: 1,
          },
        },
      ])

      if (lastNameFirstNameResults.length > 0) {
        const count = await User.countDocuments({
          "roles.Instructor": INSTRUCTOR_ROLE, // Use the numeric role value
          firstName: { $regex: queryWords[1], $options: "i" },
          lastName: { $regex: queryWords[0], $options: "i" },
        })

        console.log(
          `Found ${lastNameFirstNameResults.length} instructors matching firstName="${queryWords[1]}", lastName="${queryWords[0]}"`,
        )
        return { results: lastNameFirstNameResults, count }
      }
    }

    // Strategy 2: Match any word in any field
    const regexConditions = queryWords.flatMap((word) => [
      { firstName: { $regex: word, $options: "i" } },
      { lastName: { $regex: word, $options: "i" } },
      { username: { $regex: word, $options: "i" } },
      { email: { $regex: word, $options: "i" } },
    ])

    const results = await User.aggregate([
      {
        $match: {
          "roles.Instructor": INSTRUCTOR_ROLE, // Use the numeric role value
          $or: regexConditions,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          _id: 1,
          id: "$_id",
          firstName: 1,
          lastName: 1,
          username: 1,
          profile: 1,
          about: 1,
          handles: 1,
        },
      },
    ])

    const count = await User.countDocuments({
      "roles.Instructor": INSTRUCTOR_ROLE, // Use the numeric role value
      $or: regexConditions,
    })

    console.log(`Found ${results.length} instructors using multi-word regex search for "${query}"`)
    return { results, count }
  } catch (error) {
    console.error("Error searching instructors:", error)
    return { results: [], count: 0 }
  }
}

const handleQuery = async (req, res) => {
  try {
    const { q, type, page = 1, limit = 10 } = req.query

    if (!q) {
      return res.status(400).json({ message: "Search query is required" })
    }

    console.log(`Performing search for "${q}" with type=${type || "all"}, page=${page}, limit=${limit}`)

    // if (!q || q.length < 2) {
    //   res.status(400).json({
    //     message: "Search query must not be less than two characters",
    //     state: queryState.error,
    //     data: undefined,
    //   });
    //   return
    // }

    // Calculate skip values for pagination
    const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit)
    let results = []
    let count = 0

    // If type is specified, only search that type
    if (type) {
      switch (type.toLowerCase()) {
        case "course":
          console.log(`Searching only courses for "${q}"`)
          const courseResults = await searchCourses(q, skip, Number.parseInt(limit))
          results = courseResults.results
          count = courseResults.count
          break
        case "instructor":
          console.log(`Searching only instructors for "${q}"`)
          const instructorResults = await searchInstructors(q, skip, Number.parseInt(limit))
          results = instructorResults.results
          count = instructorResults.count
          break
        default:
          return res.status(400).json({ message: "Invalid search type" })
      }
    } else {
      // Perform a global search across all collections
      console.log(`Performing global search for "${q}"`)
      const [courseResults, instructorResults] = await Promise.all([
        searchCourses(q, 0, Math.floor(Number.parseInt(limit) / 2)),
        searchInstructors(q, 0, Math.floor(Number.parseInt(limit) / 2)),
      ])

      console.log(
        `Global search found ${courseResults.results.length} courses and ${instructorResults.results.length} instructors`,
      )

      // Combine and sort results by relevance
      results = [
        ...courseResults.results.map((item) => ({ ...item, type: "course" })),
        ...instructorResults.results.map((item) => ({ ...item, type: "instructor" })),
      ]

      // Sort by score (if available) or default order
      results = results.sort((a, b) => (b.score || 0) - (a.score || 0))

      // Apply pagination to combined results
      results = results.slice(skip, skip + Number.parseInt(limit))
      count = courseResults.count + instructorResults.count
    }

    const response = {
      results,
      totalPages: Math.ceil(count / Number.parseInt(limit)),
      currentPage: Number.parseInt(page),
      totalResults: count,
    }

    console.log(`Returning ${results.length} results (${count} total) for "${q}"`)
    return res.status(200).json({
      message: 'query successful',
      status: queryState.success,
      data: response
    })
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