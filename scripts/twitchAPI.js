    var twitchAPI = (function() {
        var tokenName = 'twitch_token';
        var clientId = 'kfst7tyjg0jf3qx8hvc1y29ccf89kp';
        var scope = ['user_read', 'channel_read'];
        var apiUrl = 'https://api.twitch.tv/kraken';
        var authUrl = 'https://api.twitch.tv/kraken/oauth2/authorize?';
        var redirect_url = 'https://bkjjipopfjknbeabnlelfhplklgjfcaf.chromiumapp.org';

        let alertWindow = null
        
        const { ipcRenderer } = require('electron')
        const remote = require('electron').remote
        const BrowserWindow = remote.BrowserWindow
        const { shell } = require('electron')
        const path = require('path')
        const url = require('url')
        const storage = require('electron-json-storage');

        var querystring = require('querystring');
        var https = require("https");

        var api = {
            apiRequests: function() {}
        };

        api.apiRequests.prototype.getToken = function(callback) {
            var Url = authUrl + 'client_id=' + clientId +
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
                callback();
            });
            authWindow.webContents.on('will-navigate', function(event, url) {
                if (url.indexOf(redirect_url) !== -1) {
                    var url = new URL(url);
                    var code = url.searchParams.get("code");
                    exchangeCodeForToken(code)
                }

            });

            authWindow.webContents.on('did-get-redirect-request', function(event, oldUrl, newUrl) {
                if (newUrl.indexOf(redirect_url) !== -1) {
                    var url = new URL(newUrl);
                    var code = url.searchParams.get("code");
                    exchangeCodeForToken(code)
                }
            });

            authWindow.loadURL(Url);
        }



        api.apiRequests.prototype.getChannelInfo = function() {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://api.twitch.tv/kraken/channel', false)
            xhr.setRequestHeader('Client-ID', clientId);
            xhr.setRequestHeader('Authorization', 'OAuth ' + localStorage.twitch_access_token);

            xhr.onload = function() {
                if (this.status === 200) {
                    var response = JSON.parse(this.responseText);
                    console.log(response);
                    storage.set('liveStream_data', {
                            name: response.status,
                            channel: response.name,
                            link: response.url,
                            preview: response.video_banner,
                            logo: response.logo
                        },
                        function(error) {
                            if (error) throw error;
                        });

                } else {
                    console.log('code exchange status:', this.status);
                }
            }
            xhr.send()
        };

        api.apiRequests.prototype.revokeToken = function() {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.twitch.tv/kraken/oauth2/revoke?client_id=' + clientId + '&token=' + localStorage.twitch_access_token, false)
            xhr.onload = function() {
                if (this.status === 200) {
                    console.log('revoke success')
                } else {
                    console.log('code exchange status:', this.status);
                }
            }
            xhr.send()
        }

        return api;

        function exchangeCodeForToken(code) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://yastream.win/api/oauth', false)
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function() {
                if (this.status === 200) {
                    var response = JSON.parse(this.responseText);
                    if (response.hasOwnProperty('access_token')) {
                        localStorage.setItem('twitch_access_token', data.access_token)
                        authWindow.close()
                    } else {}
                } else {
                    console.log('code exchange status:', this.status);
                }
            };
            data = {
                code: code,
                client_id: clientId,
                grant_type: 'authorization_code',
                redirect_uri: redirect_url,
                scope: scope,
                type: 'twitch'
            }
            console.log(data)
            xhr.send(JSON.stringify(data));
        }

    })();