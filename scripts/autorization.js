import React from 'react';
import ReactDOM from 'react-dom';
import MainAuto from '../views/autorization/mainAuto.jsx';

const {ipcRenderer} = require('electron')
const remote = require('electron').remote
const BrowserWindow = remote.BrowserWindow
const {shell} = require('electron')
const path = require('path')
const url = require('url')
const $ = require('./jquery.js')
const fs = require('fs');

window.onload = function(){
    ReactDOM.render(<MainAuto />, document.getElementsByClassName('container')[0])

    let links = document.getElementsByTagName('li')

    let enter = links.item(0)
    let registration = links.item(1)
    let exit = links.item(2)

    enter.onclick = () => {
        if (!localStorage.Token) {
            /* Yandex.oauth */
        let authWindow
            var querystring = require('querystring');
    var https = require("https");
    var clientId = '880A4ADB0EEA4DABAA6B65ECCB91B71A47EBBFD54F129B7A47CC65D0322FD7B6';
    var scope = ['account-info', 'operation-history', 'operation-details'];
    var authUrl = 'https://money.yandex.ru/oauth';
    var apiUrl = 'https://money.yandex.ru/api';
    var redirect_url = 'https://bkjjipopfjknbeabnlelfhplklgjfcaf.chromiumapp.org';
    var githubUrl = 'https://money.yandex.ru/oauth/authorize?';
    var authUrl = githubUrl + 'client_id=' + clientId +
        '&redirect_uri=' + redirect_url +
        '&scope=' + scope.join(" ") +
        '&response_type=' + 'code';
 
    authWindow = new BrowserWindow({
        width: 730,
        height: 750,
        type: 'splash',
        webPreferences: {
            nodeIntegration: false
        }
    });
 
    authWindow.on('closed', function() {
        authWindow = null;
    });
authWindow.webContents.on('will-navigate', function (event, url) {
    console.log(url)
  let code = url.split('=')[1]

    $.post("https://yastream.win/api/oauth",
    {
  "code": code,
  "client_id": clientId,
  "grant_type": "authorization_code",
  "redirect_uri": "https://bkjjipopfjknbeabnlelfhplklgjfcaf.chromiumapp.org",
  "type": "yandex_money",
  "streamer" : "yes"
},
    function(data){
        localStorage.setItem('Token', data.pass)
        $.ajax({
            url: 'https://money.yandex.ru/api/account-info',
            type: 'POST',
            beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', 'Bearer ' + encodeURIComponent(data.access_token));
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            },
    success: function (response) {
        authWindow.destroy()
        localStorage.setItem('ya_account', response.account)
        localStorage.setItem('balance', response.balance)
        fs.writeFile('log.txt', 'yes')
        ipcRenderer.send('show-main-from-auto')
    },
    error: function (error){
        console.log(JSON.parse(error.responseText));
    }
});

    });

    });
 
authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
  let code = newUrl.split('=')[1]
    console.log(code)
    $.post("https://yastream.win/api/oauth",
    {
  "code": code,
  "client_id": clientId,
  "grant_type": "authorization_code",
  "redirect_uri": "https://bkjjipopfjknbeabnlelfhplklgjfcaf.chromiumapp.org",
  "type": "yandex_money",
  "streamer" : "yes"
},
    function(data){
        localStorage.setItem('Token', data.pass)
        $.ajax({
            url: 'https://money.yandex.ru/api/account-info',
            type: 'POST',
            beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', 'Bearer ' + encodeURIComponent(data.access_token));
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            },
    success: function (response) {
        authWindow.destroy()
        localStorage.setItem('ya_account', response.account)
        localStorage.setItem('balance', response.balance)
        fs.writeFile('log.txt', 'yes')
        ipcRenderer.send('show-main-from-auto')
    },
    error: function (error){
        console.log(JSON.parse(error.responseText));
    }
});

    });
});
 
    authWindow.loadURL(authUrl);
        

} else {
            ipcRenderer.send('show-main-from-auto')
        }


        /* Twitch.oauth */
 /*
  let authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    'node-integration': false
  });
 
var config = {
    clientId: 'esta9xhmvrp2tqomciy39usd79xpev',
    authorizationUrl: 'https://api.twitch.tv/kraken/oauth2/authorize?',
    redirectUri: 'http://localhost',
    scope: 'viewing_activity_read',
    response_type: 'code'
};
 
  const windowParams = {
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
        nodeIntegration: false
    }
  }
 
  let authUrl = config.authorizationUrl +
  'client_id=' + config.clientId +
  '&redirect_uri=' + config.redirectUri +
  '&response_type=' + config.response_type +
  '&scope=' + config.scope
   authWindow.loadURL(authUrl);
   authWindow.show();
 
authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
  console.log(oldUrl);
  console.log(newUrl);
  handleCallback(newUrl);
});
 
  let handleCallback = function(newUrl){
    console.log(newUrl)
    let raw_code = newUrl;
    let raw_code1 = raw_code.split('=');
    let raw_code2 = raw_code1[1].split('&');
    let result = raw_code2[0];
    console.log(result);
    
    $.post("http://streambeta.azurewebsites.net/api/oauth",
    {
  "code": result,
  "scope": [
        "user_follows_edit",
        "user_read"
    ],
  "client_id": "kfst7tyjg0jf3qx8hvc1y29ccf89kp",
  "grant_type": "authorization_code",
  "redirect_uri": "https://bkjjipopfjknbeabnlelfhplklgjfcaf.chromiumapp.org",
  "type": "twitch"
},
    function(data){
        console.log(data);
        authWindow.destroy()
    });
  }
 
*/
/* */
    }

    registration.onclick = () => {
        shell.openExternal('https://money.yandex.ru/new')
    }

    exit.onclick = () => {
        remote.app.quit()
    }
}