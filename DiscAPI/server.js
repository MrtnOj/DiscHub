const express = require('express');
const mongoose = require('mongoose');

const coursesRouter = require('./routes/courses');
const scoresRouter = require('./routes/scores');
const authRouter = require('./routes/auth');
const mongoURI = require('./config/keys').mongoURI;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/courses', coursesRouter);
app.use('/scores', scoresRouter);
app.use('/auth', authRouter);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data })
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(mongoURI)
.then(result => {
    app.listen(8080);
})
.catch(err => {
    console.log(err);
});