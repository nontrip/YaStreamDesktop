import React from 'react';
import ReactDOM from 'react-dom';
import AlertSettingsMain from '../views/alertSettings/alertSettingsMain.jsx'

const $ = require('./jquery.js')

window.onload = function(){
    ReactDOM.render(<AlertSettingsMain />, document.getElementsByClassName('container')[0]);
    $('#input-height').val(50)
    $('input[type="range"]').on("change mousemove", function () {
    var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
    $('#input-height').val(Math.round(val*100))
    $(this).css('background-image',
                '-webkit-gradient(linear, left top, right top, '
                + 'color-stop(' + val + ', #f3c647), '
                + 'color-stop(' + val + ', #979797)'
                + ')'
                );
    })

    document.getElementsByClassName('button')[1].onclick = () => {
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
        localStorage.setItem('goalsSettings_indiHeight', $('#input-height').val())
        localStorage.setItem('goalsSettings_showHeading', $('#showHeading').val())
        localStorage.setItem('goalsSettings_showAmount', $('#showAmount').val())
        localStorage.setItem('goalsSettings_showLimits', $('#showLimits').val())
        localStorage.setItem('HasGoalSettings', 'True')
    }

}