import React from 'react';
import ReactDOM from 'react-dom';
import ChooseSrcMain from '../views/chooseSrc/chooseSrcMain.jsx';

const {ipcRenderer} = require('electron')
const remote = require('electron').remote

window.onload = function(){
    ReactDOM.render(<ChooseSrcMain />, document.getElementsByClassName('container')[0]);
    
    let sources = document.querySelector("ul").children

    for (var i=0, source; source=sources[i]; i++) {
        source.onclick = function(){
            localStorage.setItem('source', this.className)
            if (i = 0) {
                if (!localStorage.twitch_token) {
                    
                }
            }
            ipcRenderer.send('show-newStream')
        }
    }

    document.getElementsByClassName('return')[0].onclick = () => {
        remote.getCurrentWindow().close()
    }
}