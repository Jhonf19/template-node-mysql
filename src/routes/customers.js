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
    req.flash('success', 'Cliente agregado');
    res.redirect('/customers')
})

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM customers WHERE id = ?', [id]);
    res.redirect('/customers');
    
})

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const customer = await db.query('SELECT * FROM customers WHERE id = ?', [id]);
    console.log(customer);
    res.render('customers/edit', { customer: customer[0] });
    
})

router.post('/edit', async (req, res) => {
    const { id, name } = req.body;
    const customer = { name, state: 1 };
    await db.query('UPDATE customers set ? WHERE id = ?', [customer, id]);
    res.redirect('/customers');
    
})
module.exports = router;