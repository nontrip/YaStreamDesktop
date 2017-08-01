const fs = require('fs')
const $ = require('./jquery.js')
let goal

let checker = fs.readFileSync('goalToOpen.txt', 'utf8')

$.ajax({
    url: 'https://yastream.win/api/Goals?streamer_id=' + localStorage.ya_account +'&status=all',
    type: 'GET',
    async: false,
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Token', localStorage.Token)
    },
    success: function(data){
        console.log(data)
        for (let i=0; i<data.length; i++){
            if (data[i].name == checker) {
                goal = data[i]
                console.log(goal)
            }
        }
    },
    error: function(error){
        console.log(error)
    }
})



window.onload = function(){
        fs.writeFile('goalToOpen.txt', '')
     document.getElementsByClassName('goal')[0].innerHTML = goal.name
     document.getElementsByClassName('p-right')[0].innerHTML = goal.amount
     let percents = goal.progress/(goal.amount/100)
     console.log(percents + '%')
     let str = goal.progress*100 + ' руб. / ' + percents + '%'
     document.getElementsByClassName('sum_h1')[0].innerHTML = str

    if (localStorage.HasGoalSettings){
        document.getElementsByClassName('goal')[0].style.display = localStorage.goalsSettings_showHeading
        document.getElementsByClassName('goal')[0].style.color = localStorage.goalsSettings_fontColor
        document.getElementsByClassName('numbers')[0].style.color = localStorage.goalsSettings_fontColor
        document.getElementsByClassName('uplay')[0].style.height = localStorage.goalsSettings_indiHeight
        document.getElementsByClassName('inlay')[0].style.height = localStorage.goalsSettings_indiHeight
        document.getElementsByClassName('inlay')[0].style.width = percents + '%'
        document.getElementsByClassName('sum')[0].style.height = localStorage.goalsSettings_indiHeight
        document.getElementsByClassName('sum')[0].style.fontSize = localStorage.goalsSettings_indiHeight-15
        document.getElementsByClassName('sum')[0].style.display = localStorage.goalsSettings_showAmount
        document.getElementsByClassName('house')[0].style.backgroundColor = localStorage.goalsSettings_BackColor
        document.getElementsByClassName('uplay')[0].style.backgroundColor = localStorage.goalsSettings_indiBackColor
        document.getElementsByClassName('inlay')[0].style.backgroundColor = localStorage.goalsSettings_indiColor
        document.getElementsByClassName('numbers')[0].style.display = localStorage.goalsSettings_showLimits
    } else {
        document.getElementsByClassName('inlay')[0].style.width = percents + '%'
        document.getElementsByClassName('goal')[0].style.display = 'block'
        document.getElementsByClassName('uplay')[0].style.height = '50px'
        document.getElementsByClassName('inlay')[0].style.height = '50px'
        document.getElementsByClassName('sum')[0].style.height = '50px'
        document.getElementsByClassName('sum')[0].style.display = 'block'
        document.getElementsByClassName('house')[0].style.backgroundColor = 'none'
        document.getElementsByClassName('uplay')[0].style.backgroundColor = '#29292c'
        document.getElementsByClassName('inlay')[0].style.backgroundColor = '#f3c647'
        document.getElementsByClassName('numbers')[0].style.display = 'flex'
    }
}