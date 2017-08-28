import React from 'react';
import ReactDOM from 'react-dom';
import NewGoalMain from '../views/newGoal/newGoalMain.jsx';

const { ipcRenderer } = require('electron')
const $ = require('./jquery.js')
const remote = require('electron').remote
const moment = require('moment')


window.onload = function() {
    ReactDOM.render( <NewGoalMain /> , document.getElementsByClassName('container')[0]);
    document.getElementsByClassName('return')[0].onclick = () => {
        remote.getCurrentWindow().close()
    }
    document.getElementsByClassName('btn').item(0).onclick = () => {
        if (document.getElementsByTagName('input')[0].value && typeof(parseInt(document.getElementsByTagName('input')[1].value)) == 'number'){
            let body1 = {
                "streamer_id": localStorage.ya_account,
                "name": document.getElementsByTagName('input')[0].value,
                "start_date": moment().format('YYYY-MM-DD HH:mm:ss'),
                "amount": document.getElementsByTagName('input')[1].value * 100,
                "progress": 0,
                "status": "created"
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

}