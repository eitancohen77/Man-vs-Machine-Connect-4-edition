$(document).ready(function() {
    circles = document.getElementsByClassName('circle')
    let countId = 0;
    let player = 1; // FOR JOE!!!: This variable controls which turn it is. It does this by acting as a clock, switching from -1 to 1
    let gameOver = false 
    const restart = document.querySelector('#restart')
    let winnerText = document.querySelector('#winner')
    let count_to_tie = 0;
    let gameHistorys = [];
    let game = [];
    let position = {}
    const horizontalPosition = [43, 127, 212, 297, 382, 467, 552];
    let verticalPosition = [0, 0, 0, 0, 0, 0, 0];
    let dropPosition = 516;
    let boardArray = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]

    // What this code does is it loops through the entire div of circles and gives each one a sequential id
    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        circle.setAttribute('id', countId);
        circle.setAttribute('taken', 0);
        countId++;
        
        
        circle.addEventListener('mouseover', function() {
            if (gameOver === false) {
                circle.style.cursor = 'pointer';
                let id = parseInt(circle.getAttribute('id')) % 7
                if (boardArray[0][id] === 0) { // In case it wants to delete already placed divs.
                    let topCircle = document.getElementById(id);
                    while (id < 42 && topCircle.getAttribute('taken') === '0') {
                        circle = topCircle;
                        id += 7
                        topCircle = document.getElementById(id);
                    }
                    circle.style.transition = 'background-color 0.15s ease-in-out'
                    circle.style.backgroundColor = 'red'      
                }  
            }   
        })
        circle.addEventListener('mouseout', function() {
            if (gameOver === false) {
                let id = parseInt(circle.getAttribute('id')) % 7
                if (boardArray[0][id] === 0) { // In case it wants to delete already placed divs.
                    let topCircle = document.getElementById(id);
                    while (id < 42 && topCircle.getAttribute('taken') === '0') {
                        circle = topCircle;
                        id += 7
                        topCircle = document.getElementById(id);
                    }

                    circle.style.backgroundColor = 'white'
                    circle.style.cursor = 'default'
                }
            }
        })       
     
        circle.addEventListener('click', function() {        
            if (/* (circle.getAttribute('taken')) === '0' &&  */player === 1 && gameOver === false) {
                let id = parseInt(this.getAttribute('id')) % 7;
                const col = id;
                let topCircle = document.getElementById(id);
                while (id < 42 && topCircle.getAttribute('taken') === '0') {
                    circle = topCircle;
                    id += 7
                    topCircle = document.getElementById(id);
                }
                id -= 7;
                
                
                let row = Math.floor(id/7);
                boardArray[row][col] = 1;
                //console.log(boardArray)

                circle.style.backgroundColor = 'white'
                // Save Data of Games
                position = {
                    plays: 1,
                    position: id
                }
                game.push(position);
                
                const fallingCircle = document.createElement('div');
                fallingCircle.classList.add('fallingCircle');
                fallingCircle.style.setProperty('left', `${horizontalPosition[col]}px`)
                fallingCircle.style.setProperty('--drop-position', `${dropPosition - verticalPosition[col] * 85}px`);
                verticalPosition[col] += 1;
                hover_grid.appendChild(fallingCircle);
                fallingCircle.classList.add('fall');
                setTimeout(() => {
                    circle.style.backgroundColor = 'red';
                    fallingCircle.remove()
                    circle.setAttribute('taken', 1);

                    // Make a function that takes in the color red and checks if there is 4 reds criss, cross, horizontal, vertical
                    if (checkWinner(boardArray, 1, row, col)) {
                        winnerText.textContent = 'RED WINS!!!!!!!!'
                        winnerText.style.color = 'red'
                        console.log('red wins');
                        gameOver = true;

                        //Save data of game
                        gameHistorys.push({
                            id: Math.random(),
                            winner: 1,
                            game: game
                        })
                        game = []

                    }
                    count_to_tie++;

                    // Switching turns
                    player *= -1;
                    if (player === -1 && gameOver === false) {

                        // This returns a 'suitable' move
                        // Here the transfer would occur. I am going to change it to try and get data from a python file:
                        
                        let rand = 7
                        let row = 5
                        while (rand === 7) {
                            rand = Math.floor(Math.random() * 7);
                            let i = boardArray[row][rand]
                            while (i !== 0 && row > 0) {
                                row--
                                i = boardArray[row][rand]
                                console.log(row)
                            } 
                            if (boardArray[row][rand] !== 0 && row === 0) {
                                console.log('rerun')
                                rand = 7
                                row = 5
                            }
                        }
                        
                        
                        sendDataToServer(boardArray)
                        boardArray[row][rand] = -1
                        let id = (row * 7) + rand; // getting the id value in numbers (0-41)
    
                        position = {
                            plays: 1,
                            position: id
                        }
                        game.push(position);
    
    
                        let circle = document.getElementById(id.toString())
                        // Falling circle
                        const fallingCircle = document.createElement('div');
                        fallingCircle.style.backgroundColor = 'yellow'
                        fallingCircle.style.setProperty('left', `${horizontalPosition[rand]}px`)
                        fallingCircle.classList.add('fallingCircle');
                        fallingCircle.style.setProperty('--drop-position', `${dropPosition - verticalPosition[rand] * 85}px`);
                        verticalPosition[rand] += 1;
                        hover_grid.appendChild(fallingCircle);
                        fallingCircle.classList.add('fall');
                        setTimeout(() => {
                            circle.style.backgroundColor = 'yellow';
                            fallingCircle.remove()
                            circle.setAttribute('taken', 2);
    
                            if (checkWinner(boardArray, -1, row, rand)) {
                                winnerText.textContent = 'YELLOW WINS!!!!!!!!'
                                winnerText.style.color = 'yellow'
                                console.log('yellow wins')
                                gameOver = true;
    
                                //Save data of game
                                gameHistorys.push({
                                    id: Math.random(),
                                    winner: 1,
                                    game: game
                                })
                                game = []
                            }

                            /* 
                            // Here we are going to create the same as the one on top, but we are going to check using the 2D array
                            if (checkWinner(boardArray, -1)) {
                                . . . 
                            }
                            */

                            count_to_tie++;
                            player *= -1;
                        }, 750 - (verticalPosition[rand] * 50)); 
                    } 
                 }, 700);
                
            }
            if (gameOver === false && count_to_tie === 42) {
                winnerText.textContent = 'DRAW!'
                winnerText.style.color = 'white'
                gameOver = true;

                // Save data of Game
                gameHistorys.push({
                    id: Math.random(),
                    winner: 0,
                    game: game
                })
                game = []
            } 
            
        }); 
        if (gameOver === false) {
            if (count_to_tie === 42) {
                winnerText.textContent = 'DRAW!'
                winnerText.style.color = 'white'
                gameOver = true;

                // Save data of Game
                gameHistorys.push({
                    id: Math.random(),
                    winner: 0,
                    game: game
                })
                game = []
            } else if (player === -1) {
                let rand = 7
                let levelCounter = 5
                while (rand === 7) {
                    rand = Math.floor(Math.random() * 7);
                    console.log(rand)
                    let i = 1
                    while (i === 0 || levelCounter >= boardArray.length) {
                        i = boardArray[levelCounter][rand]
                        levelCounter--
                    } 
                    if (boardArray[levelCounter][rand] !== 0 && levelCounter === 0) {
                        rand = 7
                        levelCounter = 5
                    }
                }

                boardArray[levelCounter][rand] = -1
                let id = (levelCounter * 7) + rand;
                console.log(boardArray)
                console.log(id)

                position = {
                    plays: 1,
                    position: id
                }
                game.push(position);


                let circle = document.getElementById(id.toString())
                // Falling circle
                /* const fallingCircle = document.createElement('div');
                fallingCircle.style.backgroundColor = 'yellow'
                fallingCircle.style.setProperty('left', `${horizontalPosition[rand]}px`)
                fallingCircle.classList.add('fallingCircle');
                fallingCircle.style.setProperty('--drop-position', `${dropPosition - verticalPosition[rand] * 85}px`);
                verticalPosition[rand] += 1;
                hover_grid.appendChild(fallingCircle);
                fallingCircle.classList.add('fall');
                setTimeout(() => { */
                    circle.style.backgroundColor = 'yellow';
                    /* fallingCircle.remove() */
                    circle.setAttribute('taken', 2);

                    /* if (checkWinner('yellow', id)) {
                        winnerText.textContent = 'YELLOW WINS!!!!!!!!'
                        winnerText.style.color = 'yellow'
                        console.log('yellow wins')
                        gameOver = true;

                        //Save data of game
                        gameHistorys.push({
                            id: Math.random(),
                            winner: 1,
                            game: game
                        })
                        game = []
                    } */
                    count_to_tie++;
                    player *= -1;
                /* }, 750 - (verticalPosition[rand] * 50));  */

            }
        }             
    }
    
    // Reset the board
    restart.addEventListener('click', function() {
        console.log(gameHistorys)
        for (let i = 0; i < circles.length; i++) {
            let circle = circles[i];
            circle.style.backgroundColor = 'white';
            circle.setAttribute('taken', 0);
        }
        winnerText.textContent = ''
        winnerText.style.color = 'black'
        count_to_tie = 0;
        player = 1;
        gameOver = false
        verticalPosition = [0, 0, 0, 0, 0, 0, 0];
        boardArray = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ]
    });
});

function checkWinner(boardArray, player, rowPosition, columnPosition) {
    return (horizontalDFS(boardArray, player, rowPosition, columnPosition) || verticalDFS(boardArray, player, rowPosition, columnPosition) || crissDFS(boardArray, player, rowPosition, columnPosition) || crossDFS(boardArray, player, rowPosition, columnPosition))
} 
function horizontalDFS(boardArray, player, playedMoveRow, playedMoveColumn) {
    let rightValue = 0, leftValue = -1;
    let currentRow = playedMoveRow, currentColumn = playedMoveColumn;

    // Check right value
    while (currentColumn <= 6) {
        if (boardArray[currentRow][currentColumn] === player) {
            rightValue += 1;
            currentColumn += 1;
        } else {
            break;
        }
    }

    currentColumn = playedMoveColumn
    while (currentColumn >= 0) {
        if (boardArray[currentRow][currentColumn] === player) {
            leftValue += 1;
            currentColumn -= 1;
        } else {
            break;
        }
    }
    if (rightValue + leftValue >= 4) {
        return true;
    } else {
        return false
    }
}
function verticalDFS(boardArray, player, playedMoveRow, playedMoveColumn) {
    let downValue = 0;
    while (playedMoveRow <= 5) {
        if (boardArray[playedMoveRow][playedMoveColumn] === player) {
            downValue += 1;
            playedMoveRow += 1
        } else { 
            break; 
        }
    } 
    if (downValue >= 4) {
        return true;
    } else {
        return false
    }
}
function crissDFS(boardArray, player, playedMoveRow, playedMoveColumn) {
    let currentColumn = playedMoveColumn, currentRow = playedMoveRow, rightValue = -1, leftValue = 0;
    while (currentColumn <= 6 && currentRow <= 5) {
        if (boardArray[currentRow][currentColumn] === player) {
            rightValue += 1;
            currentRow += 1;
            currentColumn += 1;
        } else {
            break;
        }
    } 
    currentColumn = playedMoveColumn, currentRow = playedMoveRow;
    while (currentColumn >= 0 && currentRow >= 0) {
        if (boardArray[currentRow][currentColumn] === player) {
            leftValue += 1;
            currentRow -= 1;
            currentColumn -=1;
        } else {
            break;
        }
    }
    if (rightValue + leftValue >= 4) {
        return true;
    } else {
        return false
    }
}
function crossDFS(boardArray, player, playedMoveRow, playedMoveColumn) {
    let currentColumn = playedMoveColumn, currentRow = playedMoveRow, rightValue = -1, leftValue = 0;
    while (currentColumn <= 6 && currentRow >= 0) {
        if (boardArray[currentRow][currentColumn] === player) {
            rightValue += 1;
            currentRow -= 1;
            currentColumn += 1;
        } else {
            break;
        }
    }

    currentColumn = playedMoveColumn, currentRow = playedMoveRow
    while (currentColumn >= 0 && currentRow <= 5) {
        if (boardArray[currentRow][currentColumn] === player) {
            leftValue += 1;
            currentRow += 1;
            currentColumn -= 1;
        } else {
            break;
        }
    }
    if (rightValue + leftValue >= 4) {
        return true;
    } else {
        return false
    }

}

function sendDataToServer(data) {
    fetch('/sendData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({array: data}),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}