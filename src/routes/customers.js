const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/add', (req, res) => {
    res.render('customers/add')
})

router.get('/', async (req, res) => {
    const customers = await db.query('SELECT * FROM customers');
    res.render('customers/list', { customers });
})

router.post('/add', async (req, res) => {
    const { name } = req.body;
    const customer = {
        name,
        state: 1
    };

    // console.log(customer.name);
    await db.query('INSERT INTO customers set ?', [customer]);
    res.redirect('/customers')
})

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const customer = await db.query('DELETE FROM customers WHERE ID = ?', [id]);
    console.log(customer);
    res.redirect('/customers');
    
})


module.exports = router;