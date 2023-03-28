const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate')
const { spawn } = require('child_process');


app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
// To make the req.body readable
app.use(express.json())



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


app.post('/sendData', (req, res) => {
    const board_data = req.body;
    const pythonProcess = spawn('python3', ['./trasnfer.py', JSON.stringify(board_data)]);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python script output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python script error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python script exited with code ${code}`);
        res.json({ message: 'Data received' });
    });
})