const express = require('express');
const router = express.Router()
const Player = require('../models/players')
const requireLogin = require('../utils/requireLogin')

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/play', requireLogin, async (req, res) => {
    const user = await Player.findById({ _id: req.session.user_id });
    const { username } = user
    const { playerColor, opponentColor } = req.cookies
    res.render('game', { username, playerColor, opponentColor })
})

router.get('/bot', requireLogin, async (req, res) => {
    const user = await Player.findById({ _id: req.session.user_id });
    const { stats } = user;
    res.render('botStats', { stats })
})

router.get('/stats', requireLogin, async (req, res) => {
    const players = await Player.findById({ _id: req.session.user_id });
    const { stats } = players
    res.render('stats', { stats })
})

router.get('/customization', requireLogin, (req, res) => {
    let color = 'red'
    let opponentColor = 'yellow'
    if (req.cookies && req.cookies.playerColor) {
        color = req.cookies.playerColor;
    }
    if (req.cookies && req.cookies.opponentColor) {
        opponentColor = req.cookies.opponentColor;
    }
    console.log(`Color from the GET customization request: ${color}`)
    res.render('customization', { color, opponentColor })
})

module.exports = router