const { handleFindUser, handleCheckUserAuth, updateProfile, updateNewPassword, changeTheme } = require('@/controllers/userController');
const express = require('express');
const verifyJwt = require('../middlewares/verifyJwt');
const router = express.Router();

router.get('/get-user', (req, res) => res.json('hello'))
router.get('/check-user', verifyJwt, handleCheckUserAuth);
router.post('/find-user', handleFindUser);
router.put('/update-profile', verifyJwt, updateProfile);
router.put('/update-password', verifyJwt, updateNewPassword);
router.put('/change-theme', verifyJwt, changeTheme);

module.exports = router;