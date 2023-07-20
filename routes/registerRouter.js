const express = require('express');
const router = express.Router()
const Player = require('../models/players')
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/', async (req, res) => {
    const { password, username } = req.body
    userTaken = await Player.findOne({ username })
    // If there isnt a user with that name we can continue:
    if (userTaken == null) {
        const hash = await bcrypt.hash(password, 12);
        const user = new Player({
            username,
            password: hash
        })
        await user.save()
        res.redirect('/login')
        // If there is a user already with that name, we want to alert
        // a flash to let the end-user that the username is already taken
        // and he should try a new one
    } else {
        req.flash('userTaken', 'Username already taken')
        res.redirect('/register')
    }
})

module.exports = router