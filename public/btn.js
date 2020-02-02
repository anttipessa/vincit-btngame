const socket = io.connect('http://localhost:3000/')

const btn = document.getElementById('btn')
const points = document.getElementById('points');

btn.addEventListener('click', () => {
 socket.emit('press',{
     num: 1
 });
})

socket.on('points', function(data){
    points.innerHTML = '';
    points.innerHTML += '<p><strong>' + data + '</strong></p>';
});

socket.on('restart', function(){
    points.innerHTML = '';
    points.innerHTML += '<p><strong> Time to restart? </strong></p>';
    location.reload()
});