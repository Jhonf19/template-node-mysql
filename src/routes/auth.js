const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/isauth');
router.get('/signin',isNotLoggedIn, (req, res) => {
    res.render('auth/signin')
})

router.get('/home', isLoggedIn, (req, res) => {
    res.render('home')
})

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
})


router.post('/signin',isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/home',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
})


module.exports = router;