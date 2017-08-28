import React from 'react';
import ReactDOM from 'react-dom';
import DonationGoalsMain from '../views/donationGoals/donationGoalsMain.jsx'

const $ = require('./jquery.js')
const { ipcRenderer } = require('electron')
const remote = require('electron').remote
const BrowserWindow = remote.BrowserWindow
const storage = require('electron-json-storage');


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
        if (goals.length == 0) {
            goals = false
        }
    },
    error: function(error) {
        console.log(error)
    }
})

window.onload = function() {

        ipcRenderer.on('new-goal', () => {
                    ReactDOM.render(<DonationGoalsMain goals = {goals} />, document.getElementsByClassName('container')[0])
                })

                    ReactDOM.render(<DonationGoalsMain goals={goals}/>, document.getElementsByClassName('container')[0])
                    document.getElementsByClassName('add').item(0).onclick = () => {
                        ipcRenderer.send('show-newGoal')
                    }
                    document.getElementsByClassName('return')[0].onclick = () => {
                        remote.getCurrentWindow().close()
                    }
                    let goals_links = document.getElementsByClassName('goal')


                    for (var i = 0, button; button = goals_links.item(i); i++) {
                        button.onclick = function() {
                            let status = this.childNodes[0].classList[0]
                            let date = this.childNodes[0].classList[1]
                            let naming = this.childNodes[0].childNodes[0].innerHTML
                            let amount = this.childNodes[0].childNodes[1].innerHTML.split('>')[5].split('<')[0]
                            let progress = this.childNodes[0].childNodes[1].innerHTML.split('>')[1].split('<')[0]
                            let top = remote.getCurrentWindow()
                            let str = status + ' ' + date + ' ' + '"' + naming + '"' + ' ' + amount + ' ' + progress
                            console.log(str)
                            storage.set('goal', str, function(error) {
                                if (error) throw error;
                            });
                            let child = new BrowserWindow({
                                parent: top, 
                                modal: true, 
                                show: false, 
                                height: 360, 
                                width: 660, 
                                frame: false,
                                resizable: false
                            })
                            child.loadURL('file://' + __dirname + '/../HTMLs/goalInfo.html')
                            child.on('ready-to-show', () => {
                                child.show()
                            })
                            child.on('closed', () => {
                                child = null
                            })
                        }
                    }

                    let returnBtn = document.getElementsByClassName('return')[0]

                    $('.return').on('click', function() {
                        remote.getCurrentWindow().close()
                    })

                    $('.return').on('mouseover', function() {
                        this.childNodes[0].childNodes[0].src = '../images/arrowActive.png'
                    })

                    $('.return').on('mouseleave', function() {
                        this.childNodes[0].childNodes[0].src = '../images/bitmap.png'
                    })

                }