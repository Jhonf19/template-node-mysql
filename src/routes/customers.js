const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/add', (req, res) => {
    res.render('customers/add')
})

module.exports = router;