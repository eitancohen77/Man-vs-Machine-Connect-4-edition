function createBoard() {
    let gameContainer = document.createElement('div');
    gameContainer.classList.add('gameContainer')
    gameContainer.setAttribute('id', 'gameContainer');
    let displayGame = document.getElementById('displayGame'); 
    for (let i = 0; i < 42; i++) {
        console.log(i)
        let circle = document.createElement('div');
        circle.classList.add('circlePosition')
        circle.setAttribute('id', i.toString());
        gameContainer.appendChild(circle)
    }
    displayGame.append(gameContainer)
} 

function deleteBoard() {
    let gameContainer = document.getElementById('gameContainer');
    gameContainer.remove();
    document.getElementById('moveCounter').textContent = 0
}

function createEnvironment() {
    let displayGame = document.getElementById('displayGame'); 
    if (displayGame.childElementCount == 0) {
        createBoard();
    } else {
       deleteBoard();
        createBoard(); 
    }
}

function forwardMove(data, game) {
    let moveCount = parseInt(document.getElementById('moveCounter').textContent);   
    const gameOne = data[game]
    if (moveCount < gameOne.moves.length) {
        const position = gameOne.moves[moveCount].position
        let circle = document.getElementById(`${position}`);
        if (gameOne.moves[moveCount].plays === 1) {
            circle.style.backgroundColor = 'red'
        } else {
            circle.style.backgroundColor = 'yellow'
        }
        moveCount++;
        document.getElementById('moveCounter').textContent = moveCount
    }
    /* for (let i of data) {
        console.log(i.winner)
        let winner = document.createElement('div');
        winner.classList.add('winner')
        winner.textContent = i.winner
        container.appendChild(winner)
    }     */
}

function backwardMove(data, game) {
    let moveCount = parseInt(document.getElementById('moveCounter').textContent);
    moveCount--;
    const gameOne = data[game]
    if (moveCount >= 0) {
        const position = gameOne.moves[moveCount].position
        let circle = document.getElementById(`${position}`);
        circle.style.backgroundColor = 'white'
        document.getElementById('moveCounter').textContent = moveCount
    }
        /* for (let i of data) {
        console.log(i.winner)
        let winner = document.createElement('div');
        winner.classList.add('winner')
        winner.textContent = i.winner
        container.appendChild(winner)
    }     */
}