import React from 'react';
import ReactDOM from 'react-dom';
import NewStreamMain from '../views/newStream/newStreamMain.jsx'

const $ = require('./jquery.js')
const { ipcRenderer } = require('electron')
const remote = require('electron').remote
const storage = require('electron-json-storage');


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
    $("div.update").on('click', update)
    $("div.update").hide();
    $('#name').val(localStorage.liveStream_name)
    $('#name').on('change', function() {
        if (localStorage.liveStream == 'true') {
            $("div.update").show();
        }
    })
    $('#channel').val(localStorage.liveStream_channel)
    $('#link').val(localStorage.liveStream_url)
    $('#channel').on('change', function() {
        if (localStorage.liveStream == 'true') {
            $("div.update").show();
        }
    })
    $('#link').on('change', function() {
        if (localStorage.liveStream == 'true') {
            $("div.update").show();
        }
    })
    for (let i = 0; i < goals.length; i++) {
        $('#goal').append(new Option(goals[i].name, goals[i].name))
    }

    if (localStorage.liveStream_goal) {
        storage.set('goalToOpen', localStorage.liveStream_goal, function(error) {
            if (error) throw error;
        });
        $('#goal').val(localStorage.liveStream_goal)
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
    $('input[type="range"]').on("change", function() {
        if (localStorage.liveStream == 'true') {
            $("div.update").show();
        }
    })
    document.getElementsByClassName('getQR')[0].onclick = () => {

        if ($('#link').val().length > 0) {
            storage.set('qrcodelink', $('#link').val(), function(error) {
                if (error) throw error;
            });
            let qrWindow = new remote.BrowserWindow({
                width: 270,
                height: 265,
                resizable: false,
                fullscreenable: false,
                show: false,
                autoHideMenuBar: true,
                useContentSize: true
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
        document.getElementsByClassName('start')[0].onclick = endstream
        document.getElementsByClassName('start')[1].onclick = endstream
    } else {
        $("div.update").hide();
        document.getElementsByClassName('start')[0].onclick = startstream
        document.getElementsByClassName('start')[1].onclick = startstream
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

function startstream() {

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
        storage.set('autoAlert', autoAlert, function(error) {
            if (error) throw error;
        });

        if ($('#goal').val() != 'Без цели') {
            localStorage.setItem('liveStream_goal', $('#goal').val())
            storage.set('goalToOpen', localStorage.liveStream_goal, function(error) {
                if (error) throw error;
            });
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
        localStorage.setItem('liveStream_name', document.getElementById('name').value)
        localStorage.setItem('liveStream_url', data.url)
        localStorage.setItem('liveStream_channel', data.channel)
        localStorage.setItem('liveStream', true)

        ipcRenderer.send('start-stream', 'to-stream')
        $.ajax({
            url: 'https://yastream.win/api/Streams_online',
            type: 'POST',
            async: false,
            data: JSON.stringify(data),
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Token', localStorage.Token);
                xhr.setRequestHeader('Content-Type', 'application/json');
            },
            success: function(response) {
                console.log(response)
                localStorage.setItem('liveStream_id', response)
                $("div.start").html("<p>Завершить</p>")
                document.getElementsByClassName('start')[0].onclick = endstream
                document.getElementsByClassName('start')[1].onclick = endstream
                var map = {};
                let i = 0;
                var map = {};
                $('input[type="range"]').each(function() {
                    map[i] = $(this).val();
                    i++;
                });
                let settings = {
                    stream_id: parseInt(localStorage.liveStream_id),
                    text_l: parseInt(map[0]),
                    voice_l: parseInt(map[1]),
                    min_sum: parseInt(map[2])
                }
                localStorage.setItem('liveStream_settings', settings);
                console.log(settings);
                $.ajax({
                    url: 'https://yastream.win/api/streams_settings?streamer_id=' + localStorage.ya_account,
                    type: 'POST',
                    async: false,
                    data: JSON.stringify(settings),
                    beforeSend: function(xhr) {

                        xhr.setRequestHeader('Token', localStorage.Token);
                        xhr.setRequestHeader('Content-Type', 'application/json');
                    },
                    success: function(response) {
                        ipcRenderer.send('start-stream', 'to-stream')
                        console.log(response)
                    },
                    error: function(error) {
                        console.log(error);
                    }
                })
            },
            error: function(error) {
                console.log(JSON.parse(error.responseText));
            }
        })
    }
}


function endstream() {
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
    console.log(localStorage.liveStream_startdate)
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
            storage.remove('goalToOpen', function(error) {
                if (error) throw error;
            });

            remote.getCurrentWindow().close()
        },
        error: function(error) {
            console.log(error);
        }
    })
}


function update() {

    let data = {
        streamer_id: localStorage.ya_account,
        name: document.getElementById('name').value,
        url: document.getElementById('link').value,
        start_date: localStorage.liveStream_startdate,
        channel: document.getElementById('channel').value
    }

    if (data.name != localStorage.liveStream_name || data.url != localStorage.liveStream_url || data.channel != localStorage.liveStream_channel) {
        localStorage.setItem('liveStream_name', document.getElementById('name').value)
        localStorage.setItem('liveStream_url', data.url)
        localStorage.setItem('liveStream_channel', data.channel)

        $.ajax({
            url: 'https://yastream.win/api/Streams_online',
            type: 'PUT',
            async: true,
            data: JSON.stringify(data),
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Token', localStorage.Token);
                xhr.setRequestHeader('Content-Type', 'application/json');
            },
            success: function(response) {
                console.log(response)
                $("div.update").hide();
            },
            error: function(error) {
                console.log(error);
            }
        })
    }
    var map = {};
    let i = 0;
    var map = {};
    $('input[type="range"]').each(function() {
        map[i] = $(this).val();
        i++;
    });
    let settings = {
        stream_id: parseInt(localStorage.liveStream_id),
        text_l: parseInt(map[0]),
        voice_l: parseInt(map[1]),
        min_sum: parseInt(map[2])
    }
    $.ajax({
        url: 'https://yastream.win/api/streams_settings?streamer_id=' + localStorage.ya_account,
        type: 'PUT',
        async: false,
        data: JSON.stringify(settings),
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Token', localStorage.Token);
            xhr.setRequestHeader('Content-Type', 'application/json');
        },
        success: function(response) {
            console.log(response)
            $("div.update").hide()
        },
        error: function(error) {
            console.log(error);
        }
    })
}