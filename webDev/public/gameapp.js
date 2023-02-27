$(document).ready(function() {
    circles = document.getElementsByClassName('circle')
    let countId = 0;
    let player = 1; // FOR JOE!!!: This variable controls which turn it is. It does this by acting as a clock, switching from -1 to 1
    let gameOver = false 
    const restart = document.querySelector('#restart')
    let winnerText = document.querySelector('#winner')
    let count = 0;
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
        circle.addEventListener('mouseout', function(event) {
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
                const modId = id;
                let topCircle = document.getElementById(id);
                while (id < 42 && topCircle.getAttribute('taken') === '0') {
                    circle = topCircle;
                    id += 7
                    topCircle = document.getElementById(id);
                }
                id -= 7;
                console.log(id)
                
                let level = Math.floor(id/7);
                boardArray[level][modId] = 1;

                circle.style.backgroundColor = 'white'
                // Save Data of Games
                position = {
                    plays: 1,
                    position: id
                }
                game.push(position);
                
                const fallingCircle = document.createElement('div');
                fallingCircle.classList.add('fallingCircle');
                fallingCircle.style.setProperty('left', `${horizontalPosition[modId]}px`)
                fallingCircle.style.setProperty('--drop-position', `${dropPosition - verticalPosition[modId] * 85}px`);
                verticalPosition[modId] += 1;
                hover_grid.appendChild(fallingCircle);
                fallingCircle.classList.add('fall');
                setTimeout(() => {
                    circle.style.backgroundColor = 'red';
                    fallingCircle.remove()
                    circle.setAttribute('taken', 1);

                    // Make a function that takes in the color red and checks if there is 4 reds criss, cross, horizontal, vertical
                    if (checkWinner('red', id)) {
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
                    count++;
                    player *= -1;
                    if (player === -1 && gameOver === false) {
                        let rand = 7
                        let levelCounter = 5
                        while (rand === 7) {
                            rand = Math.floor(Math.random() * 7);
                            let i = boardArray[levelCounter][rand]
                            while (i !== 0 && levelCounter > 0) {
                                levelCounter--
                                i = boardArray[levelCounter][rand]
                                console.log(levelCounter)
                            } 
                            if (boardArray[levelCounter][rand] !== 0 && levelCounter === 0) {
                                console.log('rerun')
                                rand = 7
                                levelCounter = 5
                            }
                        }
                        boardArray[levelCounter][rand] = -1
                        let id = (levelCounter * 7) + rand;
    
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
    
                            if (checkWinner('yellow', id)) {
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
                            count++;
                            player *= -1;
                        }, 750 - (verticalPosition[rand] * 50)); 
                    } 
                 }, 700);
                
            }
            if (gameOver === false && count === 42) {
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
            if (count === 42) {
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
                    count++;
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
        count = 0;
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

function checkWinner(color, id) {
    return (horizontalDFS(color, id) || verticalDFS(color, id) || crissDFS(color, id) || crossDFS(color, id))
}

function horizontalDFS(color, id) {
    let rightValue = 0;
    let leftValue = -1;
    let modNum = id % 7
    let max = 6 - modNum + id;
    let min = id - modNum;

    let holdId = id
    // Check Right value
    while (holdId <= max) {
        let circle = document.getElementById(holdId);
        if (circle.style.backgroundColor === color) {
            rightValue += 1
            holdId += 1;
        } else {
            break;
        }
    }

    // Check the left Value
    holdId = id
    while (holdId >= min) {
        circle = document.getElementById(holdId)
        if (circle.style.backgroundColor === color) {
            leftValue += 1
            holdId -= 1;
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

function verticalDFS(color, id) {
    let downValue = 0;

    /* while (row <= 5 && row >= 0) {
        if (boardArray[row][col] === color) {
            downValue += 1;
            row += 1;
        } else {
            break;
        }
        if (downValue >= 4) {
            return true;
        } else {
            return false
        }
    } */

    while (id <= 41) {
        let circle = document.getElementById(id)
        if (circle.style.backgroundColor === color) {
            downValue += 1
            id += 7;
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

function crissDFS(color, id) {
    let modId =  id % 7;
    let rightValue = -1;
    let leftValue = 0;

    let holdModId = modId;
    let holdId = id;
    while (holdId >= 0 && holdModId <= 6) {
        let circle = document.getElementById(holdId);
        if (circle.style.backgroundColor == color) {
            rightValue += 1;
            holdId -= 6;
            holdModId += 1;
        } else {
            break;
        }
    }

    holdModId = modId;
    holdId = id;
    while (holdId <= 41 && holdModId >= 0) {
        circle = document.getElementById(holdId)
        if (circle.style.backgroundColor == color) {
            leftValue += 1;
            holdId += 6;
            holdModId -= 1;
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

function crossDFS(color, id) {
    let modId =  id % 7;
    let rightValue = -1;
    let leftValue = 0;

    let holdModId = modId;
    let holdId = id;
    while (holdId <= 41 && holdModId <= 6) {
        let circle = document.getElementById(holdId);
        if (circle.style.backgroundColor == color) {
            rightValue += 1;
            holdId += 8;
            holdModId += 1;
        } else {
            break;
        }
    }

    holdModId = modId;
    holdId = id;
    while (holdId >= 0 && holdModId >= 0) {
        circle = document.getElementById(holdId)
        if (circle.style.backgroundColor == color) {
            leftValue += 1;
            holdId -= 8;
            holdModId -= 1;
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