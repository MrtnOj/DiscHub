const express = require('express');
const coursesController = require('../controllers/courses');
const router = express.Router();


router.get('/', coursesController.getCourses);

module.exports = router;