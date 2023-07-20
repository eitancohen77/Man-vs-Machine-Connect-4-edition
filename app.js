const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate')
const { spawn } = require('child_process');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Player = require('./models/players')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const AppError = require('./error/AppError');
const DATABASE_URL = 'mongodb://127.0.0.1:27017/connect4'
const connect4Routes = require('./routes/connect4Router')
const loginRoutes = require('./routes/loginRouter')
const registerRouters = require('./routes/registerRouter')

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
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
const sessionOptions = { secret: 'mysecret', resave: false, saveUninitialized: false }
app.use(session(sessionOptions));
app.use(flash());
app.use(cookieParser())

// Rendering flash messages amongst all routes
app.use((req, res, next) => {
    res.locals.userTaken = req.flash('userTaken')
    res.locals.retry = req.flash('retry');
    next()
})

app.use('/connect4', connect4Routes);

app.use('/login', loginRoutes);

app.use('/register', registerRouters);

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/connect4')
})

/* app.get('/secret', (req, res) => {
    if (req.session.user_id) { // If they are logged in:
        res.send('THIS IS SECRET YOU CANNOT SEE ME')
    } else { // otherwise they are not logged in and I will redirect them to the logged in page:
        res.send('Sorry. login first to see the secret')
    }
}) */

app.post('/customize', (req, res) => {
    let { color, opponentColor } = req.body
    console.log(`Request deconstruct ${req.body}`)
    console.log(`Opponenet Color deconstruct ${opponentColor}.`)
    res.cookie('playerColor', color, { maxAge: 31536000000, httpOnly: true });
    res.cookie('opponentColor', opponentColor, { maxAge: 31536000000, httpOnly: true });
    console.log(req.cookies)
    res.redirect('/connect4')
})

app.post('/sendGameHistory', async (req, res) => {
    const user = await Player.updateOne({ _id: req.session.user_id }, { $push: { stats: req.body } })
    console.log(user)
})

// With process-data we get the data from the client side, send it to a python file
// have python run calculations on that data and send back what it thinks to the server
// (this file), which will then send it back to the original javascript file all in one request
app.post('/process-data', (req, res) => {
    const board_data = req.body;
    // Here we are telling it to send the json data to transfer.py, 
    const pythonProcess = spawn('python', ['./trasnfer.py', JSON.stringify({ 'array': board_data })]);

    pythonProcess.stdout.on('data', output => {
        // Send the manipulated data back to the client
        console.log('Python script output:', typeof (output), output);
        res.json(JSON.parse(output));
    });

    pythonProcess.stderr.on('data', error => {
        // Handle errors
        console.error('Python script error:', error.toString());
        res.status(500).send('An error occurred while processing the data.');
    });
});

app.all('*', (req, res, next) => {
    next(new AppError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = 'Something went wrong';
    res.status(status).render('error', { err });
});

app.listen(3000, () => {
    console.log('Serving on Port 3000')
})