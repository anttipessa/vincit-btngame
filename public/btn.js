const socket = io.connect('http://localhost:3000/')

const btn = document.getElementById('btn')
const points = document.getElementById('points');
const info = document.getElementById('info');
const button = document.createElement("input");
let score = 20;

function restart() {
    btn.style.display = "none";
    button.type = "button";
    button.value = "Restart Game?"
    button.addEventListener("click", () => reset());
    info.appendChild(button)
}

function reset() {
    score = 20;
    refreshpoints()
    btn.style.display = "block";
    info.removeChild(button)
}

function refreshpoints() {
    points.innerHTML = '';
    points.innerHTML += '<p><strong>' + score + '</strong></p>';
}

btn.addEventListener('click', () => {
    info.innerHTML = '';
    score = score - 1;
    setCookie("player", score, 3)
    refreshpoints()
    socket.emit('press', {
        score
    });
})

// socket.on('points', function (data) {
//     points.innerHTML = '';
//     info.innerHTML = '';
//     points.innerHTML += '<p><strong>' + data + '</strong></p>';

// });

socket.on('small', function (data) {
    score = score + data;
    setCookie("player", score, 3)
    info.innerHTML = '';
    info.innerHTML += '<p><strong> You win 5 points</strong></p>';
    refreshpoints()
});

socket.on('restart', function () {
    restart()

});

function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookieValue() {
    var b = document.cookie.match('(^|[^;]+)\\s*' + "player" + '\\s*=\\s*([^;]+)');
    value = b ? b.pop() : '';
    points.innerHTML += '<p><strong>' + value + '</strong></p>'
}



