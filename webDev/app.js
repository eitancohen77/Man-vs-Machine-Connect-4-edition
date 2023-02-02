$(document).ready(function() {
    circles = document.getElementsByClassName('circle')
    let count = 0;
    let counter = -1;

    // What this code does is it loops through the entire div of circles and gives each one a sequential id
    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        circle.setAttribute('id', count);
        circle.setAttribute('taken', false);
        count++;

        circle.addEventListener('click', function() {
            let id = parseInt(circle.getAttribute('id')) % 7
            let topCircle = document.getElementById(id);
            console.log(topCircle.style.backgroundColor + ' tpp id number is ' + topCircle.getAttribute('id'))
            while (id < 42 && topCircle.getAttribute('taken') === 'false') {
                console.log(topCircle);
                circle = topCircle;
                id += 7
                topCircle = document.getElementById(id);
            }
            if ((circle.getAttribute('taken')) === 'false' && counter == -1) {
                circle.style.backgroundColor = 'red';
                circle.setAttribute('taken', true);
                counter *= -1;
            }
            else if ((circle.getAttribute('taken')) === 'false' && counter == 1) {
                circle.style.backgroundColor = 'yellow';
                circle.setAttribute('taken', true);
                counter *= -1;
            } 
        });
    }
});

