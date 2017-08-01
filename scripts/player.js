import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../views/player/header.jsx'
import PlayerMain from '../views/player/playerMain.jsx'

let full = true
let donats
let current = 0
let total = 0
let checker = false

const $ = require('./jquery.js')
const remote = require('electron').remote

$.ajax({
    url: 'https://yastream.win/api/donations/GetAllDonations?type=streamse&id=' + localStorage.ya_account,
    type: 'GET',
    async: false,
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Token', localStorage.Token)
    },
    success: function(data){
        donats = data
        if (donats.length == 0) {
           donats = false
        }
        console.log(donats)
    },
    error: function(error){
        console.log(error)
    }
})

window.onload = function(){
    console.log(localStorage.streamName)
    ReactDOM.render(<Header total={total} name={localStorage.streamName}/>, document.getElementsByClassName('header')[0])
    ReactDOM.render(<PlayerMain full={full} donats={donats}/>, document.getElementsByClassName('main')[0])

    document.getElementsByClassName('header-right')[0].childNodes[0].onclick = () => {
        if (full){
            document.getElementsByClassName('header-right')[0].childNodes[0].src = '../images/hamb.png'
            full = false
            ReactDOM.render(<PlayerMain full={full} donat={donats[current]}/>, document.getElementsByClassName('main')[0])
        } else {    
            document.getElementsByClassName('header-right')[0].childNodes[0].src = '../images/hambActive.png'
            full = true
            ReactDOM.render(<PlayerMain full={full} donats={donats}/>, document.getElementsByClassName('main')[0])
        }
    }
    $(document).on('click', '.next', function(){
        current++
        if (current == donats.length){
            current = 0
        }
        ReactDOM.render(<PlayerMain full={full} donat={donats[current]}/>, document.getElementsByClassName('main')[0])
    })
    $(document).on('reply', '.next', function(){
        current++
        if (current == donats.length){
            current = 0
        }
        ReactDOM.render(<PlayerMain full={full} donat={donats[current]}/>, document.getElementsByClassName('main')[0])
    })

    var socket
    var st2 = "ws://yastream.win/DonationHandler.ashx";

    if (typeof(WebSocket) !== 'undefined') {
        socket = new WebSocket(st2);
    } else {
        socket = new MozWebSocket(st2);
    }
    socket.onopen = function() {
        socket.send('{ "account" : "'+ localStorage.ya_account +'", "token": "'+localStorage.Token+'"}');
    };

    socket.onmessage = function(event, msg) {
        console.log(event.data)
        if (!checker){
            checker = true
        } else {
            console.log(event.data)
            donats.push(event.data)
            total += event.data.amount*100
            ReactDOM.render(<Header total={total} name={localStorage.streamName}/>, document.getElementsByClassName('header')[0])
            ReactDOM.render(<PlayerMain full={full} donats={donats}/>, document.getElementsByClassName('main')[0])
        }
       if (!donats) {
           donats = []
       }
    };

    socket.onclose = function(event) {
        alert('124s');
    };
}

remote.getCurrentWindow().on('closed', () => {
    localStorage.removeItem('streamName')
    //POST ЗАПРОС НА УДАЛЕНИЕ СТРИМА ИЗ ОНЛАЙН СТРИМС
})