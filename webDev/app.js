$(document).ready(function() {
    circles = document.getElementsByClassName('circle')
    let count = 0;
    let counter = -1;

    // What this code does is it loops through the entire div of circles and gives each one a sequential id
    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        circle.setAttribute('id', count);
        count++;

        circle.addEventListener('click', function() {
            if (parseInt(circle.getAttribute('id')) >= 0 && counter == -1) {
                circle.style.backgroundColor = 'red';
                counter *= -1;
            }
            else if (parseInt(circle.getAttribute('id')) >= 0 && counter == 1) {
                circle.style.backgroundColor = 'yellow';
                counter *= -1;
            }
        });
    }
});

