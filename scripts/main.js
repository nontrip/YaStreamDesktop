import React from 'react';
import ReactDOM from 'react-dom';
import MainMain from '../views/main/mainMain.jsx';

const { ipcRenderer } = require('electron')
const remote = require('electron').remote
const fs = require('fs')
const $ = require('./jquery.js')

window.onload = function() {
        $.ajax({
            url: 'https://money.yandex.ru/api/account-info',
            type: 'POST',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + encodeURIComponent(localStorage.access_token));
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            },
            success: function(response) {
                localStorage.setItem('ya_account', response.account)
                localStorage.setItem('balance', response.balance)
              
            },
            error: function(error) {
                console.log(JSON.parse(error.responseText));
            }
        })
        
        $.ajax({
                        url: 'https://yastream.win/api/Streams_online?streamer_id=' + localStorage.ya_account,
                        type: 'GET',
                        async: false,
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('Content-Type', 'application/json')
                            xhr.setRequestHeader('Token', localStorage.Token)
                        },
                        success: function(data) {
                            if (data){
                                data.start_date=data.start_date.replace('T', ' ')
                                localStorage.setItem('liveStream_name', data.name)
                                localStorage.setItem('liveStream_id', data.stream_id)
                                localStorage.setItem('liveStream_url', data.url)
                                localStorage.setItem('liveStream_channel', data.channel)
                                localStorage.setItem('liveStream_startdate', data.start_date)
                                localStorage.setItem('liveStream', true)
                            }
                            if (!data) {
                                localStorage.setItem('liveStream', false)
                            }
                        },
                        error: function(error) {
                            localStorage.setItem('liveStream', false)
                        }
                    })

        ReactDOM.render(<MainMain stream={localStorage.liveStream} balance={localStorage.balance} number={localStorage.ya_account} />, document.getElementsByClassName('container')[0])

            let active = true

            let links = document.getElementsByTagName('li')

            let newStream = links.item(0)
            let history = links.item(1)
            let goals = links.item(2)
            let settings = links.item(3)
            let logout = links.item(4)

            remote.getCurrentWindow().on('show', () => {
                if (localStorage.liveStream == 'true') {
                    newStream.innerHTML = 'Текущий стрим'
                } else {
                    newStream.innerHTML = 'Новый стрим'
                }
            })

            newStream.onclick = () => {
                if (active) {
                    if (localStorage.liveStream == 'false') {
                        ipcRenderer.send('show-chooseSrc')
                    } else {
                        ipcRenderer.send('start-stream')
                    }
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
                }
            }

            logout.onclick = () => {
                remote.app.quit()
            }

            ipcRenderer.on('settings-closed', (event, arg) => {
                active = arg
            })
        }