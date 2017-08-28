import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../views/player/header.jsx'
import PlayerMain from '../views/player/playerMain.jsx'

let full = true
let donats
let current = 0
let total = 0.0
let checker = false
let sett = false
let settings = null

const $ = require('./jquery.js')
const remote = require('electron').remote
const { Tray } = require('electron').remote
const BrowserWindow = remote.BrowserWindow
const { ipcRenderer } = require('electron')
const moment = require('moment')

$.ajax({
    url: 'https://yastream.win/api/donations/GetAllDonations?type=streamer&id=' + localStorage.ya_account + '&stream_id=' + localStorage.liveStream_id,
    type: 'GET',
    async: false,
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Token', localStorage.Token)
    },
    success: function(data) {
        donats = data
        if (donats.length == 0) {
            donats = false
        }
        console.log(donats)
        if (donats){
            donats.forEach(function(item) {
                total = Math.round(item.amount + total * 100) / Math.pow(10, 2);
            })
        }
    },
    error: function(error) {
        console.log(error)
    }
})

window.onload = function() {
    ipcRenderer.on('settingsClosed', () => {
        sett = false
        document.getElementsByClassName('settings')[0].childNodes[0].src = '../images/settingsdark.png'
    })
    ipcRenderer.send('inStream')
    ReactDOM.render(<Header total={total} name={localStorage.streamName} />, document.getElementsByClassName('header')[0])
    ReactDOM.render( <PlayerMain full={full} donats={donats} />, document.getElementsByClassName('main')[0])
    let tray = new Tray(__dirname + '/../images/turn-off.png')
    tray.on('click', () => {
        tray.destroy()
        ipcRenderer.send('end-stream')
    })

    document.getElementsByClassName('header-right')[0].childNodes[0].onclick = () => {
        if (full) {
            document.getElementsByClassName('header-right')[0].childNodes[0].src = '../images/hamb.png'
            full = false
            ReactDOM.render( <PlayerMain full={full} donat={donats[current]} />, document.getElementsByClassName('main')[0])
        } else {
            document.getElementsByClassName('header-right')[0].childNodes[0].src = '../images/hambActive.png'
            full = true
            ReactDOM.render(<PlayerMain full={full} donats={donats} />, document.getElementsByClassName('main')[0])
        }
    }

    document.getElementsByClassName('settings')[0].childNodes[0].onclick = () => {
        if (sett) {
            sett = false
            ipcRenderer.send('close-inStream-settings')
            document.getElementsByClassName('settings')[0].childNodes[0].src = '../images/settingsdark.png'
        } else {
            sett = true
            ipcRenderer.send('show-inStream-settings')
            document.getElementsByClassName('settings')[0].childNodes[0].src = '../images/settings.png'
        }
        ipcRenderer.send('show')
    }
    
    $(document).on('click', '.next', function() {
        current++
        if (current == donats.length) {
            current = 0
        }
        ReactDOM.render(<PlayerMain full={full} donat={donats[current]} />, document.getElementsByClassName('main')[0])
    }) 
    
    $(document).on('click', '.reply', function() {
        let textArea = this.parentElement.parentElement.parentElement.childNodes[2]
        let text = textArea.value
        if (!(this.classList.contains('replied')) && text){
            let id = this.classList[0]
            this.classList.add('replied')
            textArea.disabled = true
            this.style.cursor = 'default'
            let doneIcon = this.parentElement.childNodes[1].childNodes[0]
            doneIcon.src = '../images/doneYellow.png'

            donats.forEach((item) => {
                if (item.operation_id == id){
                    item.answer = text
                    $.ajax({
                        url: 'https://yastream.win/api/donations',
                        type: 'PUT',
                        beforeSend: function(xhr) {
                                xhr.setRequestHeader('Content-Type', 'application/json')
                                xhr.setRequestHeader('Token', localStorage.Token)
                            },
                        data: JSON.stringify(item),
                        success: function(response) {
                            console.log(response)
                        }
                    }) 
                }
            })
        }
    })

    var socket
    var st2 = "ws://yastream.win/DonationHandler.ashx";

    if (typeof(WebSocket) !== 'undefined') {
        socket = new WebSocket(st2);
    } else {
        socket = new MozWebSocket(st2);
    }
    socket.onopen = function() {
        socket.send('{ "account" : "' + localStorage.ya_account + '", "token": "' + localStorage.Token + '"}');
    };

                                        socket.onmessage = function(event, msg) {
                                            if (!checker) {
                                                checker = true
                                            } else {
                                                var donation = JSON.parse(event.data)
                                                console.log(event.data)
                                                donats.push(donation)
                                                total = Math.round(donation.amount + total * 100) / Math.pow(10, 2);
                                                ReactDOM.render( < Header total = { total } name = { localStorage.streamName }/>, document.getElementsByClassName('header')[0])
                                                console.log(donats)
                                                    donation.status = "showed"
                                                    donation.date = moment().format('YYYY-MM-DD HH:mm:ss')
                                                    ReactDOM.render( < PlayerMain full = { full } donats = { donats }/>, document.getElementsByClassName('main')[0])
                                                    ipcRenderer.send('show-donation', donation) 
                                                    ipcRenderer.send('update-goal', donation.amount) 
                                                    console.log(donation)
                                                    $.ajax({
                                                            url: 'https://yastream.win/api/donations',
                                                            type: 'PUT',
                                                            async: true,
                                                            data: JSON.stringify(donation),
                                                            beforeSend: function(xhr) {
                                                                xhr.setRequestHeader('Content-Type', 'application/json')
                                                                xhr.setRequestHeader('Token', localStorage.Token)
                                                            },
                                                            success: function(data) {
                                                                console.log(data)
                                                            },
                                                            error: function(error) {
                                                                console.log(error)
                                                            }
                                                        })
                                                    }
                                                    if (!donats) {
                                                        donats = []
                                                    }
                                                };
                                                ipcRenderer.send('settings-window', sett)
                                                socket.onclose = function(event) {
                                                    console.log('ws is closed')
                                                };
                                            }

                                            remote.getCurrentWindow().on('closed', () => {
                                                localStorage.removeItem('streamName')
                                            })