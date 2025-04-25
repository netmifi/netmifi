const { handleSearchSuggestion, handleQuery } = require('@/controllers/searchController')
const express = require('express');
const mongoose = require('mongoose');
const verifyJwt = require('../middlewares/verifyJwt');
const { handleDeleteHistory } = require('../controllers/searchController');
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
router.get('/query', verifyJwt('pass'), handleQuery);
/**
 * Full Search Results Endpoint
 * Returns course documents where the query matches in the title,
 * instructor, or category fields.
 */
router.get('/delete-history', verifyJwt('strict'), handleDeleteHistory);

module.exports = router;
