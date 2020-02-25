import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import io from 'socket.io-client';
import './Btn.css';

const ENDPOINT = '/' // change this to localhost:3000 to run locally
let socket = io(ENDPOINT);

const Btn = () => {

    const [count, setCount] = useState(localStorage.getItem("score") || 20);
    const [click, setClick] = useState(0);
    const [info, setInfo] = useState('');

    useEffect(() => {
        if (click) {
            socket.emit('press', {
            });
            socket.on('no win', function (data) {
                setInfo(<p><strong> Next prize in {Math.abs(data)} clicks.</strong></p>)
            });
            socket.on('small', function (data) {
                setCount(count + data)
                setInfo(<p><strong> You win 5 points!</strong></p>)
            });
            socket.on('medium', function (data) {
                setCount(count + data)
                setInfo(<p><strong> You win 40 points!</strong></p>)
            });
            socket.on('big', function (data) {
                setCount(count + data)
                setInfo(<p><strong> You win 250 points!</strong></p>)
            });
        }// eslint-disable-next-line
    }, [click]);

    useEffect(() => {
        localStorage.setItem("score", count)
    }, [count]);

    function clickEvent() {
        setCount(count - 1)
        setClick(click + 1)
    }

    if (count <= 0) {
        return (
            <div>
                <Button size="large" variant="contained" color="primary" id="click" onClick={() => setCount(20)}>Try again?</Button>
                <div id="info">{info}</div>
            </div>)
    } else {
        return (
            <div>
                <div id="points">{count}</div>
                <Button size="large" variant="contained" color="secondary" id="click" onClick={() => clickEvent()}>Click</Button>
                <div id="info">{info}</div>
            </div>
        )
    }

}

export default Btn;