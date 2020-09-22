const express = require('express');
const scoresController = require('../controllers/scores');
const router = express.Router();

const isAuth = require('../middleware/is-auth');


router.get('/', scoresController.getScores);

router.post('/', scoresController.postScore);

router.get('/:scoreCardId', scoresController.getScore);

module.exports = router;