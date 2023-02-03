$(document).ready(function() {
    circles = document.getElementsByClassName('circle')
    let count = 0;
    let player = -1;
    let gameOver = false

    // What this code does is it loops through the entire div of circles and gives each one a sequential id
    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        circle.setAttribute('id', count);
        circle.setAttribute('taken', 0);
        count++;

        
        
        circle.addEventListener('click', function() {
            if (gameOver === false) {
                let id = parseInt(circle.getAttribute('id')) % 7
                let topCircle = document.getElementById(id);
                while (id < 42 && topCircle.getAttribute('taken') === '0') {
                    circle = topCircle;
                    id += 7
                    topCircle = document.getElementById(id);
                }
                id -= 7;
                
                if ((circle.getAttribute('taken')) === '0' && player === -1) {
                    circle.style.backgroundColor = 'red';
                    circle.setAttribute('taken', 1);

                    // Make a function that takes in the color red and checks if there is 4 reds criss, cross, horizontal, vertical
                    if (checkWinner('red', id)) {
                        console.log('red wins');
                        gameOver = true;
                    }
                    player *= -1;
                }
                else if ((circle.getAttribute('taken')) === '0' && player === 1) {
                    circle.style.backgroundColor = 'yellow';
                    circle.setAttribute('taken', 2);
        
                    if (checkWinner('yellow', id)) {
                        console.log('yellow wins')
                        gameOver = true;
                    }
                    player *= -1;
                } 
            }
        });       
    }
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