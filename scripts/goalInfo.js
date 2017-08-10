import React from 'react';
import ReactDOM from 'react-dom';
import GoalInfoMain from '../views/goalInfo/goalInfoMain.jsx';

const remote = require('electron').remote
const storage = require('electron-json-storage');


window.onload = function() {

        let data
        storage.get('goal', function(error, dat) {
                if (error) throw error;
                data = dat;
                console.log(data);
                let length = data.split(' ').length
                let namingLength = data.split('"')[1].split('"')[0].length
                let info = {
                    status: data.split(' ')[0],
                    date: data.split(' ')[1],
                    naming: data.split('"')[1].split('"')[0],
                    amount: data.split(' ')[length - 1]
                }
                if (info.naming.length > 20) {
                    info.naming = info.naming.split('')
                    let removed = info.naming.splice(18, namingLength - 18)
                    info.naming = info.naming.join('')
                    info.naming += '...'
                }
                ReactDOM.render( < GoalInfoMain goalInfo = { info }
                    />, document.getElementsByClassName('container')[0]);

                    document.getElementsByClassName('return')[0].onclick = () => {
                        remote.getCurrentWindow().close()
                    }
                });

        }