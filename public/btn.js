const socket = io.connect('http://localhost:3000/')

const btn = document.getElementById('btn')

btn.addEventListener('click', () => {
 socket.emit('press',{
     num: 1
 });
})