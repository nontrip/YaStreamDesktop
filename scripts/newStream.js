import React from 'react';
import ReactDOM from 'react-dom';
import NewStreamMain from '../views/newStream/newStreamMain.jsx'

const $ = require('./jquery.js')
const { ipcRenderer } = require('electron')
const remote = require('electron').remote
const fs = require('fs')

let autoAlert = 'no'
let goals

$.ajax({
    url: 'https://yastream.win/api/Goals?streamer_id=' + localStorage.ya_account + '&status=all',
    type: 'GET',
    async: false,
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Token', localStorage.Token)
    },
    success: function(data) {
        goals = data
    },
    error: function(error) {
        console.log(error)
    }
})

window.onload = function() {
    ReactDOM.render( < NewStreamMain / > , document.getElementsByClassName('container')[0])
    $('#name').val(localStorage.liveStream_name)
    $('#channel').val(localStorage.liveStream_channel)
    $('#link').val(localStorage.liveStream_url)
    for (let i = 0; i < goals.length; i++) {
        $('#goal').append(new Option(goals[i].name, goals[i].name))
    }
    $('input[type="range"]').on("change mousemove", function() {
        var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));

        $(this).css('background-image',
            '-webkit-gradient(linear, left top, right top, ' +
            'color-stop(' + val + ', #f3c647), ' +
            'color-stop(' + val + ', #979797)' +
            ')'
        );
        let result = this.parentElement.childNodes[2].innerHTML
        let max = this.parentElement.childNodes[1].max
        result = result.split(' ')
        result[0] = Math.round(val * max)
        result = result.join(' ')
        this.parentElement.childNodes[2].innerHTML = result
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
        if (autoAlert == 'no') {
            autoAlert = 'yes'
        } else {
            autoAlert = 'no'
        }
    }

    document.getElementsByClassName('return')[0].onclick = () => {
        remote.getCurrentWindow().close()
    }
    console.log(localStorage.liveStream)
    if (localStorage.liveStream == 'true') {
        ipcRenderer.send('start-stream', 'to-stream')
        $("div.start").html("<p>Завершить</p>")
        document.getElementsByClassName('start')[0].onclick = started
    } else {
        document.getElementsByClassName('start')[0].onclick = () => {
            if (!validation()) {
                let notValid = []
                let inputs = document.getElementsByClassName('valid')
                for (let i = 0; i < inputs.length; i++) {
                    if (inputs[i].value == '') {
                        notValid.push(inputs[i])
                    }
                }
                for (let i = 0; i < notValid.length; i++) {
                    changeColor(notValid[i].id)
                }
            } else {
                fs.writeFileSync('autoAlert.txt', autoAlert)
                if ($('#goal').val() != 'Без цели') {
                    fs.writeFileSync('goalToOpen.txt', $('#goal').val())
                }
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
                let data = {
                    streamer_id: localStorage.ya_account,
                    name: document.getElementById('name').value,
                    url: document.getElementById('link').value,
                    start_date: push,
                    channel: document.getElementById('channel').value
                }
                localStorage.setItem('liveStream_startdate', data.start_date)
                localStorage.setItem('streamName', document.getElementById('name').value)
                localStorage.setItem('liveStream', true)
                ipcRenderer.send('start-stream', 'to-stream')
                $.ajax({
                    url: 'http://yastream.win/api/Streams_online',
                    type: 'POST',
                    async: true,
                    data: JSON.stringify(data),
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Token', localStorage.Token);
                        xhr.setRequestHeader('Content-Type', 'application/json');
                    },
                    success: function(response) {
                        console.log(response)
                        ipcRenderer.send('start-stream', 'to-stream')
                        localStorage.setItem('liveStream_id', response)
                    },
                    error: function(error) {
                        console.log(JSON.parse(error.responseText));
                    }
                })
                $("div.start").html("<p>Завершить</p>")
                document.getElementsByClassName('start')[0].onclick = started
            }
        }
    }
}

let changeColor = (inputName) => {
    document.getElementById(inputName).style.backgroundColor = 'red'
    setTimeout(function() {
        document.getElementById(inputName).style.backgroundColor = 'rgba(0,0,0,0)'
    }, 1500)
}

let validation = () => {
    let name = document.getElementById('name').value
    let url = document.getElementById('link').value
    let channel = document.getElementById('channel').value
    if (name && url && channel) {
        return true
    } else {
        return false
    }
}

function started() {
    console.log('10')
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
    let data = {
        streamer_id: localStorage.ya_account,
        name: document.getElementById('name').value,
        url: document.getElementById('link').value,
        start_date: localStorage.liveStream_startdate,
        end_date: push,
        channel: document.getElementById('channel').value
    }
    console.log(JSON.stringify(data))
    $.ajax({
        url: 'https://yastream.win/api/Streams_online',
        type: 'PUT',
        async: false,
        data: JSON.stringify(data),
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Token', localStorage.Token);
            xhr.setRequestHeader('Content-Type', 'application/json');
        },
        success: function() {
            localStorage.setItem('liveStream', false)
            remote.getCurrentWindow().close()
        },
        error: function(error) {
            console.log(error);
        }
    })
}