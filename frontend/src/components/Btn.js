import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import io from 'socket.io-client';
const ENDPOINT = 'localhost:3000'
let socket = io(ENDPOINT);

const Btn = () => {

    const [count, setCount] = useState(localStorage.getItem("score") || 20);
    const [click, setClick] = useState(0);
    const [info, setInfo] = useState('');

    useEffect(() => {
        if (click) {
            socket.emit('press', {
            });
            socket.on('small', function (data) {
                setCount(count + data)
                setInfo(<p><strong> You win 5 points!</strong></p>)
            });
            socket.on('no win', function (data) {
                setInfo(<p><strong> Next prize in {Math.abs(data)} clicks.</strong></p>)
            });
            socket.on('medium', function (data) {
                setCount(count + data)
                setInfo(<p><strong> You win 40 points!</strong></p>)
            });
            socket.on('big', function (data) {
                setCount(count + data)
                setInfo(<p><strong> You win 250 points!</strong></p>)
            });
            localStorage.setItem("score", count)
        }
    }, [click]);

    function clickEvent() {
        setCount(count - 1)
        setClick(click + 1)
    }

    if (count <= 0) {
        return (
            <div>
                <Button size="large" variant="contained" color="secondary" disabled onClick={() => clickEvent()}>Click Me</Button>
                <br></br>
                <Button size="large" variant="contained" color="primary" onClick={() => setCount(20)}>Try again?</Button>
                <div>{info}</div>
            </div>)

    } else {
        return (
            <div>
                <div>{count}</div>
                <Button size="large" variant="contained" color="secondary" onClick={() => clickEvent()}>Click</Button>
                <div>{info}</div>
            </div>
        )
    }

}

export default Btn;