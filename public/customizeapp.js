function updateColor(color) {
    const customForm = document.getElementById('customForm');
    // If the user decides to switch its color, we need to remove
    // the previous inpt value so we remove all of its child nodes.
    console.log(customForm.childNodes)
    let hiddenInput = document.getElementById('inputIDValue');
    if (!hiddenInput) {
        hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'color';
        hiddenInput.setAttribute('id', 'inputIDValue')
    }

    hiddenInput.value = color;
    customForm.appendChild(hiddenInput);


    // Add an affect for when the color has been selected:
    // First we need to remove the previously affected selected color
    colorDivs = document.querySelectorAll('.colorDiv')
    colorDivs.forEach(color => {
        color.classList.remove('selectedColor')
    })
    colorDiv = document.getElementById(`color${color}`);
    colorDiv.classList.add('selectedColor')
}

function updateOpponentColor(opponentColor) {
    console.log(opponentColor)
    const customForm = document.getElementById('customForm');

    console.log(customForm.childNodes)
    let hiddenInput = document.getElementById('opponentColorValue');
    if (!hiddenInput) {
        hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'opponentColor';
        hiddenInput.setAttribute('id', 'opponentColorValue')
    }
    hiddenInput.value = opponentColor;
    customForm.appendChild(hiddenInput);


    colorDivs = document.querySelectorAll('.opponentColorDiv')
    colorDivs.forEach(color => {
        color.classList.remove('selectedColor')
    })
    colorDiv = document.getElementById(`opponentcolor${opponentColor}`);
    colorDiv.classList.add('selectedColor')
}
