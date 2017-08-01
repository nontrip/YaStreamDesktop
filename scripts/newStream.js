import React from 'react';
import ReactDOM from 'react-dom';
import NewStreamMain from '../views/newStream/newStreamMain.jsx'

const $ = require('./jquery.js')
const {ipcRenderer} = require('electron')
const remote = require('electron').remote
const fs = require('fs')

let autoAlert = 'no'
let goals

$.ajax({
    url: 'https://yastream.win/api/Goals?streamer_id=' + localStorage.ya_account +'&status=all',
    type: 'GET',
    async: false,
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Token', localStorage.Token)
    },
    success: function(data){
        goals = data
    },
    error: function(error){
        console.log(error)
    }
})
window.onload = function(){
    ReactDOM.render(<NewStreamMain />, document.getElementsByClassName('container')[0])
    for (let i=0; i<goals.length; i++){
            $('#goal').append(new Option(goals[i].name, goals[i].name))
        }
    $('input[type="range"]').on("change mousemove", function () {
    var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));

    $(this).css('background-image',
                '-webkit-gradient(linear, left top, right top, '
                + 'color-stop(' + val + ', #f3c647), '
                + 'color-stop(' + val + ', #979797)'
                + ')'
                );
    })

    document.getElementsByClassName('getQR')[0].onclick = () => {
        if ($('#link').val().length > 0) {
            fs.writeFileSync('qrcodelink.txt', $('#link').val())
            let qrWindow = new remote.BrowserWindow({
            width: 270,
            height: 285,
            resizable: false,
            fullscreenable: false,
            show: false
            })
            qrWindow.loadURL('file://' + __dirname + '/../HTMLs/qrCode.html');
            qrWindow.on('closed', () => {
                qrWindow = null;
            })
            qrWindow.once('ready-to-show', () => {
                qrWindow.show()
            })
        }
    }

    document.getElementById('donatAuto').onclick = () => {
        if (autoAlert == 'no'){
            autoAlert = 'yes'
        } else {
            autoAlert = 'no'
        }
    }

    document.getElementsByClassName('start')[0].onclick = () => {
        fs.writeFileSync('autoAlert.txt', autoAlert)
        if ($('#goal').val() != 'Без цели'){
            console.log($('#goal').val())
            fs.writeFileSync('goalToOpen.txt', $('#goal').val())
        }
        let date = new Date()
        let day = date.getDate()
        if (day<10){
            day = '0'+day
        }
        let month = date.getMonth()
        month++
        if (month<10){
            month = '0'+month
        }
        let year = date.getFullYear()
        let time = String(date).split(' ')[4]
        let push = day + '.' + month + '.' + year + ' ' + time
        let data = {
            streamer_id: localStorage.ya_account,
            name: document.getElementById('name').value,
            url: document.getElementById('link').value,
            start_date: push,
            channel: document.getElementById('channel').value
        }
        localStorage.setItem('streamName', document.getElementById('name').value)
        $.ajax({
            url: 'http://yastream.win/api/Streams_online',
            type: 'POST',
            async: true,
            data: JSON.stringify(data),
            beforeSend: function (xhr){
                xhr.setRequestHeader('Token', localStorage.Token);
                xhr.setRequestHeader('Content-Type', 'application/json');
            },
                success: function (response) {
                    console.log(response)
                    ipcRenderer.send('start-stream', 'to-stream')
                },
                error: function (error){
                    console.log(JSON.parse(error.responseText));
                }
            })
    }
}