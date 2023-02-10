const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate')

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))

app.get('/connect4', (req, res) => {
    res.render('home')
})

app.get('/connect4/play', (req, res) => {
    res.render('game/game')
})

app.get('/connect4/bot', (req, res) => {
    res.render('stats')
})

app.listen(3000, () => {
    console.log('Serving on Port 3000')
})