const express = require('express');
const router = express.Router()
const Player = require('../models/players')
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', async (req, res) => {
    const { username, password } = req.body
    const user = await Player.findOne({ username })
    if (user == null) {
        req.flash('retry', 'Username or Password Incorrect');
        res.redirect('/login')
    } else {
        const validPassword = await bcrypt.compare(password, user.password)
        if (req.cookies == null) {
            res.cookie('playerColor', 'red', { maxAge: 31536000000, httpOnly: true });
        }
        if (validPassword) { // Checks if it exisits
            req.session.user_id = user._id // Each username has a built in ID from mongoose. We are taking that ID and mapping it to a session id 
            res.redirect('/connect4')
        } else {
            req.flash('retry', "Username or Password Incorrect")
            res.redirect('/login')
        }
    }
})

module.exports = router