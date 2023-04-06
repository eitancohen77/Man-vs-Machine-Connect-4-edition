
document.querySelector('.card1').addEventListener('mouseover', function() {
    const para = document.querySelector('.para');
    para.textContent = 'This is the baby 1 bot'
    para.classList.add('highlight');
})
document.querySelector('.card2').addEventListener('mouseover', function() {
    const para = document.querySelector('.para');
    para.textContent = 'This is the baby 2 bot'
    para.classList.add('highlight');
})
document.querySelector('.card3').addEventListener('mouseover', function() {
    const para = document.querySelector('.para');
    para.textContent = 'This is the baby 3 bot'
    para.classList.add('highlight');
})
document.querySelector('.card4').addEventListener('mouseover', function() {
    const para = document.querySelector('.para');
    para.textContent = 'This is the baby 4 bot'
    para.classList.add('highlight');
})
document.querySelector('.card5').addEventListener('mouseover', function() {
    const para = document.querySelector('.para');
    para.textContent = 'This is the baby 5 bot'
    para.classList.add('highlight');
})
document.querySelector('.card6').addEventListener('mouseover', function() {
    const para = document.querySelector('.para');
    para.textContent = 'This is the baby 6 bot'
    para.classList.add('highlight');
})

function removeHighlight() {
    document.querySelector('.col > .para').classList.remove('highlight');

}

document.querySelector('.card').addEventListener('mouseleave', function() {
    removeHighlight();
  });