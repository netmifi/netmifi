const express = require('express');
const router = express.Router();
const verifyJwt = require('../middlewares/verifyJwt');
const verifyRoles = require('../middlewares/verifyRole');

// Destructure XP controller methods
const { updateUserXP, viewUserXP } = require('../controllers/userController');

// Update user XP
router.post(
    '/xp/update',
    verifyJwt('strict'),
    updateUserXP
);

// View user XP
router.get(
    '/xp/view',
    verifyJwt('strict'),
    viewUserXP
);

module.exports = router;
