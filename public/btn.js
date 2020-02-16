const socket = io.connect('http://localhost:3000/')

const btn = document.getElementById('btn')
const points = document.getElementById('points');
const info = document.getElementById('info');

btn.addEventListener('click', () => {
    socket.emit('press', {
        num: 1
    });
})

socket.on('points', function (data) {
    points.innerHTML = '';
    info.innerHTML = '';
    points.innerHTML += '<p><strong>' + data + '</strong></p>';
    setCookie("player", data, 3)
});

socket.on('restart', function (data) {
    info.innerHTML = '';
    points.innerHTML = '';
    info.innerHTML += '<p><strong> You win 5 points</strong></p>';
    points.innerHTML += '<p><strong>' + data + '</strong></p>';
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookieValue() {
    var b = document.cookie.match('(^|[^;]+)\\s*' + "player" + '\\s*=\\s*([^;]+)');
    b = b ? b.pop() : '';
     points.innerHTML += '<p><strong>' + b + '</strong></p>'
}



