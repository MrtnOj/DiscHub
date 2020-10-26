const Score = require('../models/score');

exports.getScores = (req, res, next) => {
    const userId = req.params.userId;
    Score.find({ user: userId })
        .then(scores => {
            console.log(scores);
            res.json(scores);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postScore = (req, res, next) => {
    const courseName = req.body.courseName;
    const playerScores = req.body.playerScores;
    const userId = req.body.userId;
    const players = req.body.players;
    const score = new Score({ courseName: courseName, players: players, playerScores: playerScores, user: userId, date: new Date() });
    score
        .save()
        .then(result => {
            console.log('Score Posted!');
            console.log(result);
            res.status(200).json({ result })
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getScore = (req, res, next) => {
    const scoreCardId = req.params.scoreCardId;
    console.log(scoreCardId);
    Score.findById(scoreCardId)
        .then(scoreCard => {
            if (!scoreCard) {
                const error = new Error('Could not find scorecard.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message: 'Post fetched.', scoreCard: scoreCard})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}