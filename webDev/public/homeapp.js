const cards = document.querySelectorAll('.card')

document.querySelector('.card1').addEventListener('mouseover', function() {
    const para = document.querySelector('.para');
    para.textContent = 'Play against Baby Bot.'
    para.classList.add('highlight');

    const botDescription = document.querySelector('.botDescription');
    botDescription.textContent = 'Looks may be deceiving. -"GooGooGahGah"'
    botDescription.classList.add('highlight');
})
document.querySelector('.card2').addEventListener('mouseover', function() {
    const para = document.querySelector('.para');
    para.textContent = 'Play against a Puppy'
    para.classList.add('highlight');

    const botDescription = document.querySelector('.botDescription');
    botDescription.textContent = '"WOOF"'
    botDescription.classList.add('highlight');
})
document.querySelector('.card3').addEventListener('mouseover', function() {
    const para = document.querySelector('.para');
    para.textContent = 'Play against Ava'
    para.classList.add('highlight');

    const botDescription = document.querySelector('.botDescription');
    botDescription.textContent = '"Hi!"'
    botDescription.classList.add('highlight');
})
document.querySelector('.card4').addEventListener('mouseover', function() {
    const para = document.querySelector('.para');
    para.textContent = 'Play against Sommer'
    para.classList.add('highlight');

    const botDescription = document.querySelector('.botDescription');
    botDescription.textContent = '"Omg, can we play already?"'
    botDescription.classList.add('highlight');
})
document.querySelector('.card5').addEventListener('mouseover', function() {
    const para = document.querySelector('.para');
    para.textContent = 'Play against Einstein'
    para.classList.add('highlight');

    const botDescription = document.querySelector('.botDescription');    botDescription.textContent = '"3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679"'
    botDescription.classList.add('highlight');
})
document.querySelector('.card6').addEventListener('mouseover', function() {
    const para = document.querySelector('.para');
    para.textContent = 'This is the baby 6 bot'
    para.classList.add('highlight');
})

function removeHighlight() {
    document.querySelector('.col > .para').classList.remove('highlight');
    document.querySelector('.col > .botDescription').classList.remove('highlight');

}
cards.forEach(card => {
    card.addEventListener('mouseleave', function() {
        const para = document.querySelector('.para');
        para.classList.remove('highlight')
        const botDescription = document.querySelector('.botDescription');
        botDescription.classList.remove('highlight')

    })
});