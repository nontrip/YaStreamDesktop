import React from 'react';
import ReactDOM from 'react-dom';
import MainMain from '../views/main/mainMain.jsx';

const { ipcRenderer } = require('electron')
const remote = require('electron').remote
const fs = require('fs')
const $ = require('./jquery.js')

window.onload = function() {
        ReactDOM.render( < MainMain balance = { localStorage.balance } number = { localStorage.ya_account }
            />, document.getElementsByClassName('container')[0])

            let active = true

            let links = document.getElementsByTagName('li')

            let newStream = links.item(0)
            let history = links.item(1)
            let goals = links.item(2)
            let settings = links.item(3)
            let logout = links.item(4)

            newStream.onclick = () => {
                if (active) {
                    $.ajax({
                        url: 'https://yastream.win/api/Streams_online?streamer_id=' + localStorage.ya_account,
                        type: 'GET',
                        async: false,
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('Content-Type', 'application/json')
                            xhr.setRequestHeader('Token', localStorage.Token)
                        },
                        success: function(data) {
                            localStorage.setItem('liveStream_name', data.name)
                            localStorage.setItem('liveStream_url', data.url)
                            localStorage.setItem('liveStream_channel', data.channel)
                            localStorage.setItem('liveStream_startdate', data.start_date)
                            localStorage.setItem('liveStream', true)
                            if (!data) {
                                ipcRenderer.send('show-chooseSrc')
                                localStorage.setItem('liveStream', false)
                            } else {
                                ipcRenderer.send('show-newStreamFromMain')
                            }
                        },
                        error: function(error) {
                            ipcRenderer.send('show-chooseSrc')
                            localStorage.setItem('liveStream', false)
                        }
                    })

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