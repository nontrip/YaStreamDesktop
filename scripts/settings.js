import React from 'react';
import ReactDOM from 'react-dom';
import SettingsMain from '../views/settings/settingsMain.jsx';

const { ipcRenderer } = require('electron')
const remote = require('electron').remote
const storage = require('electron-json-storage');
var twitch = new twitchAPI.apiRequests();
var yandex = new yandexAPI.apiRequests();


window.onload = function() {
        ReactDOM.render(<SettingsMain points={['Настройки отображения доната', 'Настройки отображения цели', 'Выход из аккаунта']} />, document.getElementsByClassName('container')[0]);

            let buttons = document.getElementsByTagName('li')

            let donatSettings = buttons.item(0)
            let goalSettings = buttons.item(1)
            let logout = buttons.item(2)

            let back = document.getElementsByClassName('up-layer')[0].childNodes[0]

            back.onmouseover = function() {
                this.childNodes[0].src = '../images/arrowActive.png'
                this.style.color = '#efbc38'
            }

            back.onmouseleave = function() {
                this.childNodes[0].src = '../images/bitmap.png'
                this.style.color = '#979797'
            }

            back.onclick = () => {
                remote.getCurrentWindow().close()
            }

            donatSettings.onclick = () => {
                ipcRenderer.send('show-donationSettings')
            }

            goalSettings.onclick = () => {
                ipcRenderer.send('show-alertSettings')
            }

            logout.onclick = () => {
                if (localStorage.twitch_access_token) {
                    twitch.revokeToken();
                }
                if (localStorage.access_token) {
                    yandex.revokeToken(false)
                }
                localStorage.clear()
                storage.clear(function(error) {
                    if (error) throw error;
                    ipcRenderer.send('show-auto-from-settings')
                })
            }
        }