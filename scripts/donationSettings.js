import React from 'react';
import ReactDOM from 'react-dom';
import DonationSettingsMain from '../views/donationSettings/donationSettingsMain.jsx'

const $ = require('./jquery.js')
const {ipcRenderer} = require('electron')
const remote = require('electron').remote

window.onload = function(){
    ReactDOM.render(<DonationSettingsMain />, document.getElementsByClassName('container')[0]);

    let syntes = false
    let color = 'rgba(0, 0, 0, 0)'
    $('#color-picker').on('change', function(){
        color = $(this).val()
    })
     var val = ($('input[type="range"]').val() - $('input[type="range"]').attr('min')) / ($('input[type="range"]').attr('max') - $('input[type="range"]').attr('min'));
        $('#inputHeight').val(60*val)

    $('input[type="range"]').on("change mousemove input", function () {
    var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));

    $(this).css('background-image',
                '-webkit-gradient(linear, left top, right top, '
                + 'color-stop(' + val + ', #f3c647), '
                + 'color-stop(' + val + ', #979797)'
                + ')'
                );
            let num = 60*val
            if (num == 31.000000000000004){
                num = 31
            } 
            $('.max').text(num + ' сек.')
    })

    $('input[type="checkbox"]').on('click', function(){
        if (!syntes){
            syntes = true
        } else {
            syntes = false
        }
    })
    /*
    document.getElementsByClassName('btn-save')[0].onclick = () => {
        localStorage.setItem('syntes', syntes)
        localStorage.setItem('alertLengthSec', $('#inputHeight').val())
        localStorage.setItem('patternAlert', $('.text input').val())
        if ($('#color-picker').val() == ""){
            localStorage.setItem('alertBackColor', 'rgba(0,0,0,0)')
        } else {
            localStorage.setItem('alertBackColor', $('#color-picker').val())
        }
        ipcRenderer.send('donationSettings-closed')
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