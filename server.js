const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const path = require('path');

const coursesRouter = require('./routes/courses');
const scoresRouter = require('./routes/scores');
const authRouter = require('./routes/auth');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('api/courses', coursesRouter);
app.use('api/scores', scoresRouter);
app.use('api/auth', authRouter);

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

//server static files if in production

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'reactDisc', 'build')));

    app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'reactDisc', 'build', 'index.html'))
})
}


const mongoString = process.env.MONGO_URI;
const port = process.env.PORT || 8080;

mongoose.connect(mongoString)
.then(result => {
    console.log('connected to db');
    app.listen(port);
})
.catch(err => {
    console.log(err);
});