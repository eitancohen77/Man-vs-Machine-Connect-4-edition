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
    let boardArray = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]
    waitTurn = true

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
            if (player === 1 && gameOver === false && waitTurn == true) {
                waitTurn = false
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

                // Save Data of Games
                position = {
                    plays: 1,
                    position: id
                }
                game.push(position);
                

                const fallingCircle = createFallingCirlce(col, horizontalPosition, verticalPosition, 'red')
                setTimeout(() => {
                    circle.style.backgroundColor = 'red';
                    fallingCircle.remove()
                    circle.setAttribute('taken', 1);
                    
                    if (checkWinner(boardArray, player, row, col)) {
                        gameOver = displayWinner('red', winnerText)
                        gameHistory = {
                            id: Math.random(),
                            winner: 1,
                            game: game
                        }
                        game = []
                        sendGameHistoryToServer(gameHistory)

                    }
                    count_to_tie++;
                    player *= -1;

                    // Switching turns
                    if (player === -1 && gameOver === false && count_to_tie < 42) {         
                        process_data(boardArray).then((returnedData) => {
                            console.log('Returned Data:', returnedData);
                            row = returnedData['row']       // Gets back the row information of the random move
                            const col = returnedData['col'] // Gets back the column information 
                            boardArray[row][col] = -1
                            let id = (row * 7) + col; // getting the id value in numbers (0-41)
        
                            position = {
                                plays: player,
                                position: id
                            }
                            game.push(position);
        
                            let circle = document.getElementById(id.toString())
                            // Falling circle
                            const fallingCircle = createFallingCirlce(col, horizontalPosition, verticalPosition, 'yellow')
                            setTimeout(() => {
                                circle.style.backgroundColor = 'yellow';
                                fallingCircle.remove()
                                circle.setAttribute('taken', 2);
                                
                                if (checkWinner(boardArray, player, row, col)) {
                                    gameOver = displayWinner('yellow', winnerText)
                                    console.log('Yellow' + player)
                                    gameHistory = {
                                        id: Math.random(),
                                        winner: -1,
                                        game: game
                                    }
                                    game = []
                                    sendGameHistoryToServer(gameHistory)

                                }

                                waitTurn = true
                                count_to_tie++;
                                player *= -1;

                                if (gameOver === false && count_to_tie === 42) {
                                    gameOver = displayWinner('white', winnerText)
                    
                                    // Save data of Game
                                    gameHistorys.push({
                                        id: Math.random(),
                                        winner: 0,
                                        game: game
                                    })
                                    sendGameHistoryToServer(gameHistory)
                                    game = []
                                } 
                            }, 750 - (verticalPosition[col] * 50)); 
                        });
                    } 
                 }, 700);
            }      
        }); 
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
        waitTurn = true
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

async function process_data(data) {
    try {
        const response = await fetch('/process-data', {
            method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result);

        return result;
    } catch(error) {
        console.log('Error:', error);
        return null
    }
}

function createFallingCirlce(col, horizontalPosition, verticalPosition, color){
    const dropPosition = 516
    const fallingCircle = document.createElement('div');
    fallingCircle.style.backgroundColor = color
    fallingCircle.classList.add('fallingCircle');
    fallingCircle.style.setProperty('left', `${horizontalPosition[col]}px`)
    fallingCircle.style.setProperty('--drop-position', `${dropPosition - verticalPosition[col] * 85}px`);
    verticalPosition[col] += 1;
    hover_grid.appendChild(fallingCircle);
    fallingCircle.classList.add('fall');
    return fallingCircle
}
function displayWinner(playerColor, winnerText) {
    winnerText.textContent = `${playerColor} WINS!!!!!!!!`
    winnerText.style.color = playerColor
    console.log(`${playerColor} wins`)
    return true
}

function sendGameHistoryToServer(gameHistory) {
    fetch('/sendGameHistory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameHistory)
    })
    .then(res => res.json())
    .then(gameHistory => {
        console.log('Sent GameLog', gameHistory);
    })
    .catch((err) => {
        console.log('Error', err)
    })
}