import React from 'react';
import ReactDOM from 'react-dom';
import NewGoalMain from '../views/newGoal/newGoalMain.jsx';

const { ipcRenderer } = require('electron')
const $ = require('./jquery.js')
const remote = require('electron').remote


window.onload = function() {
    ReactDOM.render( < NewGoalMain / > , document.getElementsByClassName('container')[0]);
    document.getElementsByClassName('return')[0].onclick = () => {
        remote.getCurrentWindow().close()
    }
    document.getElementsByClassName('btn').item(0).onclick = () => {
        let date = new Date()
        let day = date.getDate()
        if (day < 10) {
            day = '0' + day
        }
        let month = date.getMonth()
        month++
        if (month < 10) {
            month = '0' + month
        }
        let year = date.getFullYear()
        let time = String(date).split(' ')[4]
        let push = day + '.' + month + '.' + year + ' ' + time
        let body1 = {
            "streamer_id": localStorage.ya_account,
            "name": document.getElementsByTagName('input')[0].value,
            "start_date": push,
            "amount": document.getElementsByTagName('input')[1].value * 100,
            "progress": 0,
            "status": "started"
        }
        $.ajax({
            url: 'https://yastream.win/api/Goals',
            type: 'POST',
            data: JSON.stringify(body1),
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Token', localStorage.Token);
                xhr.setRequestHeader('Content-Type', 'application/json');
            },
            success: function(response) {
                console.log(response)
                ipcRenderer.sendSync('return-to-goals')
            },
            error: function(error) {
                console.log(JSON.parse(error.responseText));
            }
        })
    }

}