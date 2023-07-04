const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const userRouter = require('./app/routes/user.route');

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to Database !');
    })
    .catch(err => console.log(err))

app.get('/api/test', (req, res) => {
    res.send('hello world')
})
app.use('/api/user', userRouter)


app.listen(5000, () => {
    console.log(`Server running at http://localhost:${5000}`);
});