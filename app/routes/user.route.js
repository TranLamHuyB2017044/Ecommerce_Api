const express = require('express');
const router = express.Router();

router.route('/user1')
    .get((req, res) =>{
        res.send('Welcome user!');
    })




module.exports = router