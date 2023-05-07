const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate')
const { spawn } = require('child_process');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Player = require('./models/players')
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookieParser = require('cookie-parser')


mongoose.connect('mongodb://localhost:27017/connect4', { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "CONNECTION ERROR"));
db.once("open", () => {
    console.log("CONNECTION OPEN")
})

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
// To make the req.body readable
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const sessionOptions = { secret: 'mysecret', resave: false, saveUninitialized: false}
app.use(session( sessionOptions));
app.use(cookieParser())

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) { 
        return res.redirect('/login')// If they are not logged in it will redirect them to the logged in page:
    }
    next();// If they are logged in:
}

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async(req, res) => {
    const {password, username} = req.body
    const hash = await bcrypt.hash(password, 12);
    const user = new Player ({
        username,
        password: hash
    })
    await user.save()
    res.redirect('/login')
})

app.get('/connect4', (req, res) => {
    res.render('home')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async(req, res) => {
    const { username, password } = req.body
    const user = await Player.findOne({ username })
    const validPassword = await bcrypt.compare(password, user.password)
    if (req.cookies == null) {
        res.cookie('playerColor', 'red', { maxAge: 31536000000, httpOnly: true });
    }
    if (validPassword) { // Checks if it exisits
        req.session.user_id = user._id // Each username has a built in ID from mongoose. We are taking that ID and mapping it to a session id 
        res.redirect('/connect4/customization')
    } else {
        res.send("Password or Username Incorrect")
    }
})

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/connect4')
})

app.get('/secret', (req, res) => {
    if (req.session.user_id) { // If they are logged in:
        res.send('THIS IS SECRET YOU CANNOT SEE ME')
    } else { // otherwise they are not logged in and I will redirect them to the logged in page:
        res.send('Sorry. login first to see the secret')
    }
})


app.get('/connect4/play', requireLogin, async(req, res) => {
    const user = await Player.findById({_id: req.session.user_id});
    const { username } = user
    const { playerColor } = req.cookies
    res.render('game', {username, playerColor})
})

app.get('/connect4/bot', requireLogin, async(req, res) => {
    const user = await Player.findById({_id: req.session.user_id});
    const { stats } = user;
    res.render('botStats', { stats })
})

app.get('/connect4/stats', requireLogin, async(req, res) => {
    const players = await Player.findById({_id: req.session.user_id});
    const { stats } = players
    res.render('stats', { stats })
})

app.get('/connect4/customization', requireLogin, (req, res) => {
    let color = 'red'
    if (req.cookies && req.cookies.playerColor) {
        color = req.cookies.playerColor;
    }
    console.log(`Color from the GET customization request: ${color}`)
    res.render('customization', { color })
})

app.post('/customize', (req, res) => {
    const { color } = req.body
    console.log(req.cookies)
    console.log(color)
    res.cookie('playerColor', color, { maxAge: 31536000000, httpOnly: true });
    console.log(req.cookies)
    res.redirect('/connect4')
})

app.post('/sendGameHistory', async(req, res) => {
    const user = await Player.updateOne({_id: req.session.user_id}, { $push: {stats: req.body }})
    console.log(user)
})

// With process-data we get the data from the client side, send it to a python file
// have python run calculations on that data and send back what it thinks to the server
// (this file), which will then send it back to the original javascript file all in one request
app.post('/process-data', (req, res) => {
    const board_data = req.body;
    // Here we are telling it to send the json data to transfer.py, 
    const pythonProcess = spawn('python3', ['./trasnfer.py', JSON.stringify({'array': board_data})]);
    
    pythonProcess.stdout.on('data', output => {
      // Send the manipulated data back to the client
        console.log('Python script output:', output.toString());
        res.json(JSON.parse(output));
    });

    pythonProcess.stderr.on('data', error => {
        // Handle errors
        console.error('Python script error:', error.toString());
        res.status(500).send('An error occurred while processing the data.');
    });
});

app.listen(3000, () => {
    console.log('Serving on Port 3000')
})