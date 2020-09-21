const Course = require('../models/courses');

exports.getCourses = (req, res, next) => {
    Course.find({})
        .then(courses => {
            console.log(courses);
            res.json(courses);
        })
        .catch(err => {
            console.log(err);
        });
}
