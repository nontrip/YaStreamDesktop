import React from 'react';
import ReactDOM from 'react-dom';
import MainMain from '../views/main/mainMain.jsx';

const {ipcRenderer} = require('electron')
const remote = require('electron').remote
const fs = require('fs')
const $ = require('./jquery.js')

$.ajax({
    url: 'http://streambeta.azurewebsites.net/api/Goals?streamer_id=' + localStorage.ya_account +'&status=all',
    type: 'GET',
    async: true,
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Token', localStorage.Token)
    },
    success: function(data){
        localStorage.setItem('hasActiveGoal', 'True')
    },
    error: function(error){
        console.log(error)
    }
})


window.onload = function(){
  ReactDOM.render(<MainMain balance={localStorage.balance} number={localStorage.ya_account}/>, document.getElementsByClassName('container')[0])

  let active = true
  
  let links = document.getElementsByTagName('li')

  let newStream = links.item(0)
  let history = links.item(1)
  let goals = links.item(2)
  let settings = links.item(3)
  let logout = links.item(4)

  newStream.onclick = () => {
    if (active) {
      ipcRenderer.send('show-chooseSrc')
    }
  }

  history.onclick = () => {
    if (active) {
      ipcRenderer.send('show-history')
    }
  }

  goals.onclick = () => {
    if (active) {
      ipcRenderer.send('show-goals')
    }
  }

  settings.onclick = () => {
    if (active) {
      active = ipcRenderer.sendSync('show-settings')
      console.log(active)
    }
  }

  logout.onclick = () => {
    remote.app.quit()
  }

  ipcRenderer.on('settings-closed', (event, arg) => {
    active = arg
    console.log(active)
  })
}

