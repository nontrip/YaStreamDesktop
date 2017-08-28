import React from 'react';
import ReactDOM from 'react-dom';
import ChooseSrcMain from '../views/chooseSrc/chooseSrcMain.jsx';

const { ipcRenderer } = require('electron')
const remote = require('electron').remote

var twitch = new twitchAPI.apiRequests()

window.onload = function() {
    ReactDOM.render( <ChooseSrcMain /> , document.getElementsByClassName('container')[0])

    let sources = document.querySelector("ul").children
    for (var i = 0, source; source = sources[i]; i++) {
        source.onclick = function() {
            localStorage.setItem('source', this.className)
            if (this.className == "twitch") {
                if (!localStorage.twitch_access_token) {
                    twitch.getToken(function() {
                        twitch.getChannelInfo();
                        ipcRenderer.send('show-newStream');
                    })
                } else {
                    twitch.getChannelInfo();
                    ipcRenderer.send('show-newStream');
                }
            } else {
                ipcRenderer.send('show-newStream')
            }
        }
    }

    document.getElementsByClassName('return')[0].onclick = () => {
        remote.getCurrentWindow().close()
    }
     document.getElementsByClassName('another')[0].onclick = () => {
        localStorage.setItem('source', 'another')
        ipcRenderer.send('show-newStream');
    }
    
    document.getElementsByClassName('buttons')[0].childNodes[0].onmouseover = function(){
        this.childNodes[0].childNodes[0].src = '../images/arrowActive.png'
    }

    document.getElementsByClassName('buttons')[0].childNodes[0].onmouseout = function(){
        this.childNodes[0].childNodes[0].src = '../images/bitmap.png'
    }
}