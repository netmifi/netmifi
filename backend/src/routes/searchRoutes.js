const { handleSearchSuggestion  } = require('@/controllers/searchController')
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

/**
 * Auto-Suggestions Endpoint
 * Returns unique suggestions based on course titles, instructor names,
 * and an exact match against a list of predefined categories.
 */
router.get('/suggestion',  handleSearchSuggestion);

/**
 * Full Search Results Endpoint
 * Returns course documents where the query matches in the title,
 * instructor, or category fields.
 */
router.get('/query', );

module.exports = router;
