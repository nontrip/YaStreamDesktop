import React from 'react';
import ReactDOM from 'react-dom';
import NewStreamMain from '../views/newStream/newStreamMain.jsx'

const $ = require('./jquery.js')
const { ipcRenderer } = require('electron')
const remote = require('electron').remote
const storage = require('electron-json-storage');
const moment = require('moment');
const { clipboard } = require('electron')

var FormData = require('form-data');
var fs = require('fs');
var request = require('request')

const { dialog } = require('electron').remote

let autoAlert = 'yes'
let goals
let animate = false

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

require('electron').ipcRenderer.on('end-stream', (event) => {
    console.log('close')
    endstream();
})

window.onload = function() {
    ReactDOM.render( < NewStreamMain / > , document.getElementsByClassName('container')[0])
    $("div.update").on('click', update)
    $("div.update").hide();
    setDefaultData();
    if (localStorage.liveStream_settings_text_l) {
        $('.text_inp').val(localStorage.liveStream_settings_text_l)
        $('.voice_inp').val(localStorage.liveStream_settings_voice_l)
        $('.money_inp').val(localStorage.liveStream_settings_min_sum / 100)
        $('.text_inp').css('background-image', '-webkit-gradient(linear, left top, right top, ' + 'color-stop(' + localStorage.liveStream_settings_text_l / 300 + ', #f3c647), ' + 'color-stop(' + localStorage.liveStream_settings_text_l / 300 + ', #979797)' + ')');
        $('.voice_inp').css('background-image', '-webkit-gradient(linear, left top, right top, ' + 'color-stop(' + localStorage.liveStream_settings_voice_l / 60 + ', #f3c647), ' + 'color-stop(' + localStorage.liveStream_settings_voice_l / 60 + ', #979797)' + ')');
        $('.money_inp').css('background-image', '-webkit-gradient(linear, left top, right top, ' + 'color-stop(' + localStorage.liveStream_settings_min_sum / 50000 + ', #f3c647), ' + 'color-stop(' + localStorage.liveStream_settings_min_sum / 50000 + ', #979797)' + ')');
        let resText = document.getElementsByClassName('text_inp')[0].max * ($('.text_inp').val() / document.getElementsByClassName('text_inp')[0].max) + ' симв.'
        $('.text_inp').next().text(resText)
        let resVoice = document.getElementsByClassName('voice_inp')[0].max * ($('.voice_inp').val() / document.getElementsByClassName('voice_inp')[0].max) + ' сек.'
        $('.voice_inp').next().text(resVoice)
        let resMoney = document.getElementsByClassName('money_inp')[0].max * ($('.money_inp').val() / document.getElementsByClassName('money_inp')[0].max) + ' руб.'
        $('.money_inp').next().text(resMoney)
    }
    $('input[type=file]').on('change', function() {
        this.parentElement.childNodes[0].childNodes[0].src = this.files[0].path
        console.log(this.parentElement.childNodes[0].childNodes[0].src)
    })

    $('#name').on('change', function() {
        if (localStorage.liveStream == 'true') {
            $("div.update").show();
        }
    })
    $('#channel').on('change', function() {
        if (localStorage.liveStream == 'true') {
            $("div.update").show();
        }
    })
    $('#link').on('change', function() {
        if (localStorage.liveStream == 'true') {
            $("div.update").show();
        }
        yastream.SearchOnlineStream_url($('#link').val(), true, function(data, error) {
            if (data !== null) {
                checkurl();
            }
            if ($('#link').val().indexOf("https://www.twitch.tv/") !== -1) {
                getTwitchData($('#link').val().replace('https://www.twitch.tv/', ''))
            }
        });
        if ($('#link').val().indexOf("https://www.twitch.tv/") !== -1) {
            getTwitchData($('#link').val().replace('https://www.twitch.tv/', ''))
        }
    })
    if (goals) {
        for (let i = 0; i < goals.length; i++) {
            $('#goal').append(new Option(goals[i].name, goals[i].name))
        }
    }

    if (localStorage.liveStream_goal) {
        storage.set('goalToOpen', localStorage.liveStream_goal, function(error) {
            if (error) console.log(error);
        });
        $('#goal').val(localStorage.liveStream_goal)
    }

    $('input[type="range"]').on("change mousemove input", function() {
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

    document.getElementsByClassName('getLink')[0].onclick = () => {

        if ($('#link').val().length > 0) {
            clipboard.writeText("https://yastream.win/home/donation?url=" + $('#link').val())
            if (!animate) {
                animate = true
                $('.pop-up').html('<p>Ссылка скопироана в буфер обмена</p>');
                $('.pop-up').animate({
                    'margin-top': 0
                }, 500)
                setTimeout(() => {
                    $('.pop-up').animate({ 'margin-top': -44 }, 500, () => animate = false)
                }, 1300)
            }
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
        var fl = yastream.SearchOnlineStream_url($('#link').val(), false, function(data, error) {
            if (data !== null) {
                checkurl();
                return false
            }
            else {
                return true
            }
        });
        return false
    } else {
        return false
    }
}
function checkurl()
{
    if (!animate) {
        animate = true
        $('.pop-up').html('<p>По данной ссылке уже запущен прием донатов</p>');
        $('.pop-up').animate({
            'margin-top': 0
        }, 500)
        setTimeout(() => {
            $('.pop-up').animate({
                'margin-top': -44
            }, 500, () => animate = false)
        }, 1300)
    }
    $('#link').val('')
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
        let data = {
            streamer_id: localStorage.ya_account,
            name: document.getElementById('name').value,
            url: document.getElementById('link').value,
            start_date: moment().format('YYYY-MM-DD HH:mm:ss'),
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
                })
                let settings = {
                    stream_id: parseInt(localStorage.liveStream_id),
                    text_l: parseInt(map[0]),
                    voice_l: parseInt(map[1]),
                    min_sum: parseInt(map[2]) * 100
                }
                localStorage.setItem('liveStream_settings_text_l', settings.text_l);
                localStorage.setItem('liveStream_settings_voice_l', settings.voice_l);
                localStorage.setItem('liveStream_settings_min_sum', settings.min_sum);
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
                        console.log(response)
                        upload_images();
                        ipcRenderer.send('start-stream', 'to-stream')
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
    let data = {
        streamer_id: localStorage.ya_account,
        name: document.getElementById('name').value,
        url: document.getElementById('link').value,
        start_date: localStorage.liveStream_startdate,
        end_date: moment().format('YYYY-MM-DD HH:mm:ss'),
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
            ipcRenderer.send('end-stream')
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

function setDefaultData() {
    if (localStorage.source == 'twitch') {
        storage.get('liveStream_data', function(error, data) {
            if (error) throw error;
            console.log(data)
            $('#channel').val(data.channel)
            $('#name').val(data.name)
            $('#link').val(data.link)
            if (data.logo != null) $('#logo').attr('src', data.logo)
            if (data.preview != null) $('#preview').attr('src', data.preview)
        });
    } else {
        $('#name').val(localStorage.liveStream_name)
        $('#channel').val(localStorage.liveStream_channel)
        $('#link').val(localStorage.liveStream_url)

        console.log('1')

        storage.get('liveStream_logo', function(error, data) {
            if (error) console.log(error);
            console.log(data)
            $('#logo').attr('src', data.logo);
        });
        storage.get('liveStream_preview', function(error, data) {
            if (error) console.log(error);
            $('#preview').attr('src', data.preview);
        });
    }
}

function upload_images() {
    console.log($('#logo').attr('src'))

    if ($('#logo').attr('src') != "../images/addLogo.png") {
        var formData;
        if ($('#logo').attr('src').indexOf('http') >= 0) {
            var r = request($('#logo').attr('src'))
            formData = {
                file: r
            }
        } else {
            formData = {
                file: fs.createReadStream($('#logo').attr('src'))
            }
        }

        var options = {
            url: 'https://yastream.win/api/images?stream_id=' + localStorage.liveStream_id + '&streamer_id=' + localStorage.ya_account + '&type=logo',
            headers: {
                "Token": localStorage.Token
            },
            formData: formData
        };

        request.post(options, function(err, httpResponse, body) {
            if (err) {
                return console.error('upload failed:', err);
            }
            $('#logo').attr('src', 'https://yastream.win/api/images?id=' + localStorage.liveStream_id + '&type=logo');
            storage.set('liveStream_logo', {
                logo: $('#logo').attr('src')
            });
            console.log('Upload successful!  Server responded with:', body);
        });
    }
    if ($('#preview').attr('src') != "../images/addPreview.png") {
        var formData;
        if ($('#preview').attr('src').indexOf('http') >= 0) {
            var file;
            var r = request($('#preview').attr('src'))
            formData = {
                file: r
            }
        } else {
            formData = {
                file: fs.createReadStream($('#preview').attr('src'))
            }
        }

        var options = {
            url: 'https://yastream.win/api/images?stream_id=' + localStorage.liveStream_id + '&streamer_id=' + localStorage.ya_account + '&type=preview',
            headers: {
                "Token": localStorage.Token
            },
            formData: formData
        };

        request.post(options, function(err, httpResponse, body) {
            if (err) {
                return console.error('upload failed:', err);
            }
            
            $('#preview').attr('src', 'https://yastream.win/api/images?id=' + localStorage.liveStream_id + '&type=preview');
            storage.set('liveStream_preview', {
                preview: $('#preview').attr('src')
            });
            console.log('Upload successful!  Server responded with:', body);
        });
    }
}

function getTwitchData(link) {
    $.ajax({
        url: 'https://api.twitch.tv/kraken/streams?channel=' + link + '&limit=1&stream_type=live',
        type: 'GET',
        async: true,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Client-ID', 'kfst7tyjg0jf3qx8hvc1y29ccf89kp');
        },
        success: function(response) {
            console.log(response)
            if (response.streams.length != 0 && response.channel.url == $('#link').val()) {
                $('#channel').val(response.channel.display_name)
                $('#name').val(response.channel.status)
                if (data.logo != null) document.getElementsByClassName('ul-right')[0].childNodes[0].childNodes[0].src = response.streams[0].channel.logo
                if (data.preview != null) document.getElementsByClassName('ul-right')[0].childNodes[1].childNodes[0].src = response.streams[0].channel.video_banner
            }
        },
        error: function(error) {
            console.log(error);
        }
    })
}