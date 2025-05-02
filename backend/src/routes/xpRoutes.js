const express = require('express');
const router = express.Router();
const verifyJwt = require('../middlewares/verifyJwt');
const verifyRoles = require('../middlewares/verifyRole');
// const authMiddleware = require('../middlewares/authMiddleware');
// Update user XP
router.post('/xp/update', require('../controllers/userController').updateUserXP);
router.get('/xp/view', require('../controllers/userController').viewUserXP);

module.exports = router;