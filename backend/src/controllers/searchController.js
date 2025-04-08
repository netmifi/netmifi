const categories = require("../constants/categories");
const { queryState } = require("../constants/queryState");
const Course = require("../models/Course");
const Instructor = require("../models/Instructor");

const handleSearchSuggestion = async (req, res) => {
  const query = req.query.q;
  const limit = parseInt(req.query.limit) || 10; // Optional limit for suggestions/pagination
  const type = req.query.type; // Optional: Filter by type ('course' or 'instructor')

  if (!query) {
    res.status(405).json({
      message: "Search query is required",
      state: queryState.blocked,
      data: undefined,
    });
    return
  }

  try {

    // --- Search Queries ---
    // We use $text search and project a relevance score
    const textSearchQuery = { $text: { $search: query } };
    const scoreProjection = { score: { $meta: 'textScore' } };

    let coursePromise;
    let instructorPromise

    // Conditionally run queries based on type filter or run both
    if (!type || type === 'course') {
      coursePromise = await Course.find(textSearchQuery)
        .select('title category _id') // Select only needed fields
        .limit(limit)
        .lean() // Use lean for faster results (plain JS objects)
        .exec(); // Returns a promise
    } else {
      coursePromise = Promise.resolve([]); // Resolve immediately if not searching courses
    }

    if (!type || type === 'instructor') {
      instructorPromise = await Instructor.find(textSearchQuery)
        .select('fullName _id') // Select only needed fields
        .limit(limit)
        .lean()
        .exec(); // Returns a promise
    } else {
      instructorPromise = Promise.resolve([]); // Resolve immediately if not searching instructors
    }

    // Execute searches in parallel
    const [courseResults, instructorResults] = await Promise.all([
      coursePromise,
      instructorPromise
    ]);

    const combinedResults = [
      ...courseResults.map(doc => ({ ...doc, type: 'course' })), // Add type identifier
      ...instructorResults.map(doc => ({ ...doc, type: 'instructor' }))
    ];

    combinedResults.sort((a, b) => b.score - a.score);
    const finalResults = combinedResults.slice(0, limit);
    console.log(finalResults, combinedResults, textSearchQuery, scoreProjection, courseResults, instructorResults)
    res.status(200).json({
      message: "Query returned",
      state: queryState.success,
      data: finalResults,
    });


    // const suggestionsSet = new Set();

    // // 1. Check if query exactly matches one of the hard-coded categories (case-insensitive)
    // categories.forEach(cat => {
    //   if (cat.toLowerCase() === query.toLowerCase()) {
    //     suggestionsSet.add(cat);
    //   }
    // });

    // // Create a case-insensitive regex to match the beginning of a string
    // const regex = new RegExp('^' + query, 'i');

    // console.log(regex);

    // // 2. Find matching course titles
    // const titleResults = await Course.find({ title: { $regex: regex } })
    //   .select('title -_id')
    //   .limit(5)
    //   .lean();

    // titleResults.forEach(item => suggestionsSet.add(item.title));

    // // 3. Find matching instructor names
    // const instructorResults = await Instructor.find({ fullName: { $regex: regex } })
    //   .select('fullName -_id')
    //   .limit(5)
    //   .lean();

    // instructorResults.forEach(item => suggestionsSet.add(item.instructor));

    // // Convert the Set to a sorted array
    // const suggestions = Array.from(suggestionsSet).sort();

    // res.status(200).json({
    //   message: "Query returned",
    //   state: queryState.success,
    //   data: suggestions,
    // });


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