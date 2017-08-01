import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../views/history/header.jsx'
import HistoryMain from '../views/history/historyMain.jsx';
import HistoryStreamsMain from '../views/history/historyStreamsMain.jsx';
import AnsweredInfo from '../views/history/answeredInfo.jsx'
import Empty from '../views/common/empty.jsx';
import ToAnswer from '../views/history/toAnswer.jsx'

const $ = require('./jquery.js')

let donats = true
let streams = true

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
    },
    error: function(error){
        console.log(error)
    }
})

$.ajax({
    url: 'https://yastream.win/api/Streams_offline?streamer_id=' + localStorage.ya_account,
    type: 'GET',
    async: false,
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Token', localStorage.Token)
    },
    success: function(data){
        streams = data
        if (streams.length == 0) {
            streams = false
        }
    },
    error: function(error){
        console.log(error)
    }
})

window.onload = function(){
    ReactDOM.render(<Header />, document.getElementsByClassName('header')[0])
    ReactDOM.render(<HistoryMain donats={donats} donats_list={donats}/>, document.getElementsByClassName('main')[0])

    let listItems = document.getElementsByTagName('li')
    let donatsBtn = listItems.item(0)
    let streamsBtn = listItems.item(1)

    let imgs = document.getElementsByTagName('img')
    
    for (var i=0, button; button=imgs.item(i); i++) {
        button.onclick = function() {
            let parent = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
            let note = null
            if (this.classList.contains('rotate')) {
                this.classList.remove("rotate");
                for (var i = 0; i < parent.childNodes.length; i++) {
                if (parent.childNodes[i].className == "answered") {
                    note = parent.childNodes[i];
                    note.classList.remove("answered");
                    note.className = "to-answer"
                    break;
                }        
            }
            ReactDOM.render(<Empty />, note)
            } else if (this.classList.contains('to-rotate')){
            this.className += " rotate";
            for (var i = 0; i < parent.childNodes.length; i++) {
                if (parent.childNodes[i].className == "to-answer") {
                    note = parent.childNodes[i];
                    note.className = "answered";
                    break;
                }        
            }
            ReactDOM.render(<AnsweredInfo />, note)
        }
    }
    }

    let closeAnswer = []

    let canAnswer = document.getElementsByClassName('canAnswer')
    for (var i=0, btn; btn=canAnswer[i]; i++) {
        btn.onclick = function(){
            console.log(1)
            let parent = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
            let note = null
            let id = this.parentElement.classList[0]
            for (var i = 0; i < parent.childNodes.length; i++) {
                if (parent.childNodes[i].className == "to-answer") {
                    note = parent.childNodes[i];
                    note.className = "answered";
                    break;
                }        
            }
           /* $.ajax({
                url: 'http://streambeta.azurewebsites.net/api/donations?id=' + id,
                type: 'GET',
                async: false,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content-Type', 'application/json')
                    xhr.setRequestHeader('Token', localStorage.Token)
                },
                success: function(data){
                    
                },
                error: function(error){
                    console.log(error)
                }
            })*/
            ReactDOM.render(<ToAnswer />, note)
            let btnClose = parent.childNodes[2].childNodes[0].childNodes[2].childNodes[1]
            let parentDiv = btnClose.parentElement.parentElement.parentElement
            btnClose.onclick = function() {
               parentDiv.className = "to-answer"
               ReactDOM.render(<Empty />, note)
            }
            //parent.childNodes[2].childNodes[0].childNodes[2].childNodes[1].onclick = function(){

            //}
        }
        
    }



    donatsBtn.onclick = () => {
        ReactDOM.render(<HistoryMain donats={donats} donats_list={donats}/>, document.getElementsByClassName('main')[0])
        streamsBtn.classList.remove('active')
        donatsBtn.classList.add('active')
    }

    streamsBtn.onclick = () => {
        ReactDOM.render(<HistoryStreamsMain tranlations={streams}/>, document.getElementsByClassName('main')[0])
        donatsBtn.classList.remove('active')
        streamsBtn.classList.add('active')
    }
}