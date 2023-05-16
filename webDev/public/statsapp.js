function createLogic(data, game) {
    createEnvironment()
    let forward = document.getElementById(`forward${game}`);
    forward.style.display = 'block'
    let backward = document.getElementById(`backward${game}`);
    backward.style.display = 'block'
    let displayGame = document.getElementById('displayGame');
    let moveSet = document.createElement('div');
    moveSet.classList.add('moveSet')
    moveSet.appendChild(backward) 
    moveSet.appendChild(forward)
    displayGame.appendChild(moveSet) 
    let gameNumber = document.getElementById('gameNumber')
    gameNumber.textContent = `Game Number ${game + 1}`
    gameNumber.style.display = 'block'
}

function createBoard() {
    let gameContainer = document.createElement('div');
    gameContainer.classList.add('gameContainer')
    gameContainer.setAttribute('id', 'gameContainer');
    let displayGame = document.getElementById('displayGame'); 
    for (let i = 0; i < 42; i++) {
        let circle = document.createElement('div');
        circle.classList.add('circlePosition')
        circle.setAttribute('id', i.toString());
        gameContainer.appendChild(circle)
    }
    displayGame.append(gameContainer)
} 

function deleteBoard() {
    document.getElementById('moveCounter').textContent = 0
    let moves = document.getElementsByClassName('gameMove')
    for (let i = 0; i < moves.length; i++) {
        moves[i].style.display = 'none'
    }
    let gameContainer = document.getElementById('gameContainer');
    gameContainer.remove(); 
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
    // Takes in the value of which game to register, and creates a forward function
    // for said game.
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
}

const forward = document.getElementById('forward')