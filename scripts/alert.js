import React from 'react';
import ReactDOM from 'react-dom';
import NewStreamMain from '../views/newStream/newStreamMain.jsx'

const $ = require('./jquery.js')
const remote = require('electron').remote

require('electron').ipcRenderer.on('show-donation', (event, donate) => {
    var audio = new Audio('../music/mihail.mp3');
    audio.play();
    remote.getCurrentWindow().show()
    var $el = document.createElement('p');
    $el.style.width = '400px'

    $el.innerHTML = '<a>' + donate.sender + '</a> прислал донат <br>на сумму: ' + donate.amount / 100 + ' руб.<br>' + donate.text_data;
    messages.innerHTML = '';
    messages.appendChild($el);
    setTimeout(
        function() {
            audio.pause();
            audio.currentTime = 0;
            remote.getCurrentWindow().hide()
        },
        15000)
});
window.onload = function() {
    setTimeout(
        function() {
            remote.getCurrentWindow().hide()
        },
        10000)
}