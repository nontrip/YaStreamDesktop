var yandexAPI = (function() {
    var tokenName = 'yandex_token';
    var clientId = '880A4ADB0EEA4DABAA6B65ECCB91B71A47EBBFD54F129B7A47CC65D0322FD7B6';
    var scope = ['account-info', 'operation-history', 'operation-details'];
    var authUrl = 'https://money.yandex.ru/oauth';
    var apiUrl = 'https://money.yandex.ru/api';

    const { ipcRenderer } = require('electron')
    const remote = require('electron').remote
    const BrowserWindow = remote.BrowserWindow
    const { shell } = require('electron')
    const path = require('path')
    const url = require('url')
    const storage = require('electron-json-storage');

    var api = {
        apiRequests: function() {}
    };

    /* api.apiRequests.prototype.getToken = function(callback) {
        tokenFetcher.getToken(tokenName, clientId, clientSecret, scope, authUrl, authUrl, callback);
    }
*/
    api.apiRequests.prototype.revokeToken = function(async) {
        xhrWithAuth('POST',
            apiUrl + '/revoke',
            null,
            async,
            (data, error) => { console.log(data) });
    }
    /*
        api.apiRequests.prototype.checkauth = function(callback) {
            chrome.storage.sync.get(tokenName, function(items) {
                if (!items[tokenName]) {
                    console.log(items, items[tokenName]);
                    callback(false);
                } else {
                    callback(true);
                }
            });
        }

        api.apiRequests.prototype.getUserInfo = function(callback) {
            xhrWithAuth('POST',
                apiUrl + '/account-info',
                null,
                callback);
        };

        api.apiRequests.prototype.getUserOperations = function(lastRequestTime, callback) {
            xhrWithAuth('POST',
                apiUrl + '/operation-history',
                'type=deposition&from=' + lastRequestTime,
                callback);
        };

        api.apiRequests.prototype.getOperationDetails = function(operation_id, callback) {
            xhrWithAuth('POST',
                apiUrl + '/operation-details',
                'operation_id=' + operation_id,
                callback);
        };
    */
    return api;

    function onInfoFetched(error, status, response, callback) {
        if (!error && status == 200) {
            console.log(response);
            var data= null;
            if (response) {
                data = JSON.parse(response);
            }
            callback(data);
        } else {
            console.log('infoFetch failed', error, status);
            callback(null, new error('infoFetch failed'));
        }
    }

    function xhrWithAuth(method, url, async, params, callback) {
        var retry = true;
        getToken();

        function getToken() {
            if (!localStorage.access_token) {
                //auth
            } else {
                requestStart();
            }
        }

        function requestStart() {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, async);
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.access_token);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = requestComplete;
            xhr.send(params);
        }

        function requestComplete() {
            if ((this.status < 200 || this.status >= 300) && retry) {
                retry = false;
                console.log('request failed');
            } else {
                console.log('request complete');
                onInfoFetched(null, this.status, this.response, callback);
            }
        }
    }
})();