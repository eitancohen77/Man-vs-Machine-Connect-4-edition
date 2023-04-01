const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate')
const { spawn } = require('child_process');
const bodyParser = require('body-parser');


app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
// To make the req.body readable
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let changed_data = []
let gameLog = []

app.get('/connect4', (req, res) => {
    res.render('home')
})

app.get('/connect4/play', (req, res) => {
    res.render('game/game')
})

app.get('/connect4/bot', (req, res) => {
    res.render('stats')
})

app.post('/sendGameHistory', (req, res) => {
    const gameHistory = req.body;
    console.log(gameHistory)
    gameLog.push(gameHistory)
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