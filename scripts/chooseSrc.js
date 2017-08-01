import React from 'react';
import ReactDOM from 'react-dom';
import ChooseSrcMain from '../views/chooseSrc/chooseSrcMain.jsx';

const {ipcRenderer} = require('electron')
//const remote = require('electron').remote

window.onload = function(){
    ReactDOM.render(<ChooseSrcMain />, document.getElementsByClassName('container')[0]);
    
    let sources = document.querySelector("ul").children

    for (var i=0, source; source=sources[i]; i++) {
        source.onclick = function(){
            localStorage.setItem('source', this.className)
            ipcRenderer.send('show-newStream')
            //remote.getCurrentWindow().hide()
        }
    }
}