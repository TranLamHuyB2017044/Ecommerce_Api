const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const userRouter = require('./app/routes/user.route');
const authRouter = require('./app/routes/auth.route');
const productRouter = require('./app/routes/product.route');
const cors = require('cors');

app.use(express.json())
app.use(cors());


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to Database !');
    })
    .catch(err => console.log(err))



    
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/product', productRouter)


app.listen(5000, () => {
    console.log(`Server running at http://localhost:${5000}`);
});