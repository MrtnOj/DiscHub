const Score = require('../models/score');

exports.getScores = (req, res, next) => {
    Score.find({})
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
    const score = new Score({ courseName: courseName, playerScores: playerScores, user: userId, date: new Date() });
    score
        .save()
        .then(result => {
            console.log('Score Posted!');
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
}