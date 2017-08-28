import React from 'react';
import ReactDOM from 'react-dom';
import AlertSettingsMain from '../views/alertSettings/alertSettingsMain.jsx'

const $ = require('./jquery.js')
const remote = require('electron').remote
const BrowserWindow = remote.BrowserWindow

let previewWindow = null

window.onload = function(){
    ReactDOM.render(<AlertSettingsMain />, document.getElementsByClassName('container')[0]);
    $('#input-height').text(50)
    $('input[type="range"]').on("change mousemove input", function () {
    var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
    $('#input-height').text(Math.round(val*100))
    $(this).css('background-image',
                '-webkit-gradient(linear, left top, right top, '
                + 'color-stop(' + val + ', #f3c647), '
                + 'color-stop(' + val + ', #979797)'
                + ')'
    )
            let num = Math.floor(100*val)
            $('.max').text(num + ' px')
    })

    $('.color').on('change', function() {
        console.log(1)
    })

    document.getElementsByClassName('button')[0].onclick = () => {
        previewWindow = new BrowserWindow({
                width: 270,
                height: 265,
                resizable: false,
                fullscreenable: false,
                show: false,
                autoHideMenuBar: true,
                useContentSize: true
            })
            previewWindow.loadURL('file://' + __dirname + '/../HTMLs/qrCode.html');
            previewWindow.on('closed', () => {
                previewWindow = null;
            })
            previewWindow.once('ready-to-show', () => {
                previewWindow.show()
            })
    }

    /*document.getElementsByClassName('button')[1].onclick = () => {
        if ($('#indi-color').val() == ''){
            localStorage.setItem('goalsSettings_indiColor', 'rgb(243, 198, 71)')
        } else {
            localStorage.setItem('goalsSettings_indiColor', $('#indi-color').val())
        }
        if ($('#indiBack-color').val() == ''){
            localStorage.setItem('goalsSettings_indiBackColor', 'rgb(41, 41, 44)')
        } else {
            localStorage.setItem('goalsSettings_indiBackColor', $('#indiBack-color').val())
        }
        if ($('#font-color').val() == ''){
            localStorage.setItem('goalsSettings_fontColor', 'rgb(0, 0, 0)')
        } else {
            localStorage.setItem('goalsSettings_fontColor',  $('#font-color').val())
        }
        if ($('#back-color').val() == ''){
            localStorage.setItem('goalsSettings_backColor', 'rgba(0, 0, 0, 0)')
        } else {
            localStorage.setItem('goalsSettings_backColor', $('#back-color').val())
        }
        localStorage.setItem('goalsSettings_indiHeight', $('#input-height').text())
        localStorage.setItem('goalsSettings_showHeading', $('#showHeading').val())
        localStorage.setItem('goalsSettings_showAmount', $('#showAmount').val())
        localStorage.setItem('goalsSettings_showLimits', $('#showLimits').val())
        localStorage.setItem('HasGoalSettings', 'True')
        remote.getCurrentWindow().close()
    }*/

    let returnBtn = document.getElementsByClassName('return')[0]

    returnBtn.onclick = () => {
        remote.getCurrentWindow().close()
    }

    returnBtn.onmouseover = function(){
        this.childNodes[0].childNodes[0].src = '../images/arrowActive.png'
    }

    returnBtn.onmouseleave = function(){
        this.childNodes[0].childNodes[0].src = '../images/bitmap.png'
    }

}