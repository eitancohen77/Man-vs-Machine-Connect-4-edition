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


app.get('/connect4', (req, res) => {
    res.render('home')
})

app.get('/connect4/play', (req, res) => {
    res.render('game/game')
})

app.get('/connect4/bot', (req, res) => {
    res.render('stats')
})



// With sendData we get the data from the client side
app.post('/sendData', (req, res) => {
    const board_data = req.body;
    // We then use pythonProcess to process this data to the transfer.py file and we send board_data
    const pythonProcess = spawn('python3', ['./trasnfer.py', JSON.stringify({'array': board_data})]);

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

app.post('/process-data', (req, res) => {
    const board_data = req.body;
    // Pass the data to a Python scr'array'tdin.end();
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

// For this we are going to need a middleware to parse this python data. So we use body-parser
app.post('/receiveManipulatedData', (req, res) => {
    const manipulatedData = req.body;

    // Storing the data inside a global variable that way I can send it to a different request
    changed_data.push(manipulatedData)
    console.log('From the server side recieved from python file: ' + JSON.stringify(changed_data, null, 2));
    res.send('Data from python recieved')
});
app.get('/move', (req, res) => {
    console.log(`FROM THE SERVER ${changed_data}`)
    res.json(changed_data.pop())
})
app.listen(3000, () => {
    console.log('Serving on Port 3000')
})