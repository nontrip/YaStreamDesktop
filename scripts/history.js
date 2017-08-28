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
    url: 'https://yastream.win/api/donations/GetAllDonations?type=streamer&id=' + localStorage.ya_account,
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
        console.log(streams)
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

    let init = () => {
        let canAnswer = document.getElementsByClassName('canAnswer')
        let arrows = document.getElementsByClassName('arrow')

        for (var i=0, button; button = canAnswer.item(i); i++) {
            button.onclick = function() {
                let parent = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
                ReactDOM.render(<ToAnswer />, parent.childNodes[2])
            }
        }

        $(document).on('click', '.closeAnswer', function() {
            ReactDOM.render(<Empty />, this.parentElement.parentElement.parentElement)
        })

        $(document).on('click', '.submitAnswer', function(){
            let parent = this.parentElement.parentElement.parentElement.parentElement.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0]
            const id = parent.classList[0]
            let inputText = this.parentElement.previousSibling.value
            donats.forEach((item) => {
                if (item.operation_id == id){
                    item.answer = inputText
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
            ReactDOM.render(<Empty />, this.parentElement.parentElement.parentElement)
            ReactDOM.render(<HistoryMain donats={donats} donats_list={donats}/>, document.getElementsByClassName('main')[0])
            init()
        })

        for (var i=0, button; button = arrows.item(i); i++) {
            button.onclick = function() {
                let parent = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
                if ((!this.classList.contains('rotated'))) {
                    const id = this.parentElement.classList[0]
                    let text
                    donats.forEach((item) => {
                        if (item.operation_id == id){
                            text = item.answer
                        }
                    })
                    this.classList.add('rotated')
                    ReactDOM.render(<AnsweredInfo text={text}/>, parent.childNodes[2])
                } else {
                    this.classList.remove('rotated')
                    ReactDOM.render(<Empty />, parent.childNodes[2])
                }
            }
        }
    }

    init()

    donatsBtn.onclick = () => {
        ReactDOM.render(<HistoryMain donats={donats} donats_list={donats}/>, document.getElementsByClassName('main')[0])
        streamsBtn.classList.remove('active')
        donatsBtn.classList.add('active')
        init()
    }

    streamsBtn.onclick = () => {
        ReactDOM.render(<HistoryStreamsMain tranlations={streams}/>, document.getElementsByClassName('main')[0])
        donatsBtn.classList.remove('active')
        streamsBtn.classList.add('active')
    }
}