const express = require('express');
const scoresController = require('../controllers/scores');
const router = express.Router();

const isAuth = require('../middleware/is-auth');


router.get('/users/:userId', isAuth, scoresController.getScores);

router.post('/', isAuth, scoresController.postScore);

router.get('/:scoreCardId', isAuth, scoresController.getScore);

module.exports = router;