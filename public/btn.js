const PORT = process.env.PORT || 3000;
const socket = io.connect(PORT)

const btn = document.getElementById('btn')
const points = document.getElementById('points');
const info = document.getElementById('info');
const button = document.createElement("input");

let score;

function restart() {
    info.innerHTML = '';
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
    socket.emit('press', {
        score
    });
})

 socket.on('no win', function (data) {
    setCookie("player", score, 3)
    refreshpoints()
    console.log(data)
    info.innerHTML += '<p><strong> Next prize in '+Math.abs(data)+' clicks.</strong></p>';
     if(score==0){
         restart()
     }
 });

socket.on('small', function (data) {
    score = score + data;
    setCookie("player", score, 3)
    info.innerHTML = '';
    info.innerHTML += '<p><strong> You win 5 points!</strong></p>';
    refreshpoints()
});

socket.on('medium', function (data) {
    score = score + data;
    setCookie("player", score, 3)
    info.innerHTML = '';
    info.innerHTML += '<p><strong> You win 40 points!</strong></p>';
    refreshpoints()
});


socket.on('big', function (data) {
    score = score + data;
    setCookie("player", score, 3)
    info.innerHTML = '';
    info.innerHTML += '<p><strong> You win 250 points!</strong></p>';
    refreshpoints()
});


function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(name) {
    let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function getScore(){
    let cookie=getCookie("player")
    if( cookie === null){
        score = 20;
    }else{
        score=cookie;
        if(score == 0){
            restart()
        }
    }
    points.innerHTML += '<p><strong>' + score + '</strong></p>'
}


