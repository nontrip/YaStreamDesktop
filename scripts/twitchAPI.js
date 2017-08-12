var twitchAPI = (function() {
    var tokenName = 'twitch_token';
    var clientId = 'kfst7tyjg0jf3qx8hvc1y29ccf89kp';
    var scope = ['user_follows_edit', 'user_subscriptions', 'user_read'];
    var apiUrl = 'https://api.twitch.tv/kraken';
    var authUrl = 'https://api.twitch.tv/kraken/oauth2';

    var api = {
        apiRequests: function() {}
    };

    api.apiRequests.prototype.getToken = function(callback) {
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
        authWindow.webContents.on('will-navigate', function(event, url) {
            console.log(url)
            let code = url.split('=')[1]

            $.post("https://yastream.win/api/oauth", {
                    "code": code,
                    "client_id": clientId,
                    "grant_type": "authorization_code",
                    "redirect_uri": "https://bkjjipopfjknbeabnlelfhplklgjfcaf.chromiumapp.org",
                    "type": "yandex_money",
                    "streamer": "yes"
                },
                function(data) {
                    localStorage.setItem('Token', data.pass)
                    localStorage.setItem('access_token', data.access_token)
                    $.ajax({
                        url: 'https://money.yandex.ru/api/account-info',
                        type: 'POST',
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('Authorization', 'Bearer ' + encodeURIComponent(data.access_token));
                            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        },
                        success: function(response) {
                            authWindow.destroy()
                            localStorage.setItem('ya_account', response.account)
                            localStorage.setItem('balance', response.balance)
                            storage.set('auth', true, function(error) {
                                if (error) console.log(error);
                            });
                            ipcRenderer.send('show-main-from-auto')
                        },
                        error: function(error) {
                            console.log(JSON.parse(error.responseText));
                        }
                    });

                });

        });

        authWindow.webContents.on('did-get-redirect-request', function(event, oldUrl, newUrl) {
            let code = newUrl.split('=')[1]
            console.log(code)
            $.post("https://yastream.win/api/oauth", {
                    "code": code,
                    "client_id": clientId,
                    "grant_type": "authorization_code",
                    "redirect_uri": "https://bkjjipopfjknbeabnlelfhplklgjfcaf.chromiumapp.org",
                    "type": "yandex_money",
                    "streamer": "yes"
                },
                function(data) {
                    localStorage.setItem('Token', data.pass)
                    localStorage.setItem('access_token', data.access_token)
                    $.ajax({
                        url: 'https://money.yandex.ru/api/account-info',
                        type: 'POST',
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('Authorization', 'Bearer ' + encodeURIComponent(data.access_token));
                            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        },
                        success: function(response) {
                            authWindow.destroy()
                            localStorage.setItem('ya_account', response.account)
                            localStorage.setItem('balance', response.balance)
                            storage.set('auth', true, function(error) {
                                if (error) console.log(error);
                            });
                            ipcRenderer.send('show-main-from-auto')
                        },
                        error: function(error) {
                            console.log(JSON.parse(error.responseText));
                        }
                    });

                });
        });

        authWindow.loadURL(authUrl);
    }

   

    api.apiRequests.prototype.getChannelInfo = function(callback) {
        
    };

    return api;

   
})();
