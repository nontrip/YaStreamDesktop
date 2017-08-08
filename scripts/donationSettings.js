import React from 'react';
import ReactDOM from 'react-dom';
import DonationSettingsMain from '../views/donationSettings/donationSettingsMain.jsx'

const $ = require('./jquery.js')
const {ipcRenderer} = require('electron')

window.onload = function(){
    ReactDOM.render(<DonationSettingsMain />, document.getElementsByClassName('container')[0]);
    
    let syntes = false
    let color = 'rgba(0, 0, 0, 0)'
    $('#color-picker').on('change', function(){
        color = $(this).val()
    })
     var val = ($('input[type="range"]').val() - $('input[type="range"]').attr('min')) / ($('input[type="range"]').attr('max') - $('input[type="range"]').attr('min'));
        $('#inputHeight').val(60*val)

    $('input[type="range"]').on("change mousemove", function () {
    var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));

    $(this).css('background-image',
                '-webkit-gradient(linear, left top, right top, '
                + 'color-stop(' + val + ', #f3c647), '
                + 'color-stop(' + val + ', #979797)'
                + ')'
                );
            $('#inputHeight').text(60*val)
    })

    $('input[type="checkbox"]').on('click', function(){
        syntes = true
    })

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
    }
}