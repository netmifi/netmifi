const { handleFindUser, handleCheckUserAuth } = require('@/controllers/userController');
const express = require('express');
const verifyJwt = require('../middlewares/verifyJwt');

const router = express.Router();
router.get('/get-user', (req, res) => res.json('hello'))
router.get('/check-user', verifyJwt, handleCheckUserAuth);
router.post('/find-user', handleFindUser);

module.exports = router;