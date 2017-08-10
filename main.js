const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow


const { ipcMain } = require('electron')
const storage = require('electron-json-storage');

let alertWindow = null
let alertSettingsWindow = null
let autorizationWindow = null
let chooseAuthWindow = null
let chooseSrcWindow = null
let donationGoalWindow = null
let donationGoalsWindow = null
let donationSettingsWindow = null
let goalInfoWindow = null
let historyWindow = null
let mainWindow = null
let newGoalWindow = null
let newStreamWindow = null
let playerWindow = null
let settingsWindow = null

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', () => {

    storage.has('auth', function(error, hasKey) {
        if (error) throw console.log(error);
        if (hasKey) {
            mainWindow = new BrowserWindow({
                width: 360,
                height: 480,
                resizable: false,
                titleBarStyle: 'hidden',
                fullscreenable: false,
                show: false,
                frame: false
            });
            mainWindow.loadURL('file://' + __dirname + '/HTMLs/main.html');
            mainWindow.once('ready-to-show', () => {
                mainWindow.show()
            })
            mainWindow.on('closed', () => {
                mainWindow = null;
            })
        } else {
            autorizationWindow = new BrowserWindow({
                width: 360,
                height: 380,
                titleBarStyle: 'hidden',
                resizable: false,
                fullscreenable: false,
                show: false,
                frame: false
            })
            autorizationWindow.loadURL('file://' + __dirname + '/HTMLs/autorization.html');
            autorizationWindow.on('closed', () => {
                autorizationWindow = null;
            })
            autorizationWindow.once('ready-to-show', () => {
                autorizationWindow.show()
            })
        }
    });
});

ipcMain.on('show-auto-from-settings', () => {
    mainWindow.close()
    settingsWindow.close()
    autorizationWindow = new BrowserWindow({
        width: 360,
        height: 380,
        titleBarStyle: 'hidden',
        resizable: false,
        fullscreenable: false,
        show: false,
        frame: false
    })
    autorizationWindow.loadURL('file://' + __dirname + '/HTMLs/autorization.html');
    autorizationWindow.on('closed', () => {
        autorizationWindow = null;
    })
    autorizationWindow.once('ready-to-show', () => {
        autorizationWindow.show()
    })
})

ipcMain.on('show-main-from-auto', () => {
    autorizationWindow.close()
    openMain()
})

ipcMain.on('show-settings', (event) => {
    event.returnValue = false
    settingsWindow = new BrowserWindow({
        width: 500,
        height: 220,
        titleBarStyle: 'hidden',
        fullscreenable: false,
        show: false,
        frame: false,
        useContentSize: true
    });
    settingsWindow.loadURL('file://' + __dirname + '/HTMLs/settings.html');
    settingsWindow.on('closed', () => {
        settingsWindow = null
        if (mainWindow) {
            event.sender.send('settings-closed', true)
            mainWindow.show()
        }
    });
    settingsWindow.once('ready-to-show', () => {
        settingsWindow.show()
    })
})

ipcMain.on('show-history', () => {
    mainWindow.hide()
    historyWindow = new BrowserWindow({
        width: 360,
        height: 640,
        titleBarStyle: 'hidden',
        resizable: false,
        fullscreenable: false,
        show: false
    })
    historyWindow.loadURL('file://' + __dirname + '/HTMLs/history.html')
    historyWindow.on('closed', () => {
        historyWindow = null;
        mainWindow.show()
    })
    historyWindow.once('ready-to-show', () => {
        historyWindow.show()
    })
})

ipcMain.on('show-goals', () => {
    mainWindow.hide()
    donationGoalsWindow = new BrowserWindow({
        width: 533,
        height: 338,
        titleBarStyle: 'hidden',
        resizable: false,
        fullscreenable: false,
        show: false,
        frame: false
    })
    donationGoalsWindow.loadURL('file://' + __dirname + '/HTMLs/donationGoals.html')
    donationGoalsWindow.on('closed', () => {
        donationGoalsWindow = null;
        mainWindow.show()
    })
    donationGoalsWindow.once('ready-to-show', () => {
        donationGoalsWindow.show()
    })
})

ipcMain.on('show-chooseSrc', () => {
    mainWindow.hide()
    chooseSrcWindow = new BrowserWindow({
        width: 408,
        height: 257,
        titleBarStyle: 'hidden',
        resizable: false,
        fullscreenable: false,
        show: false,
        frame: false
    })
    chooseSrcWindow.loadURL('file://' + __dirname + '/HTMLs/chooseSrc.html');
    chooseSrcWindow.on('closed', () => {
        chooseSrcWindow = null;
        mainWindow.show()
    })
    chooseSrcWindow.once('ready-to-show', () => {
        chooseSrcWindow.show()
    })
})

ipcMain.on('show-newStream', () => {
    chooseSrcWindow.hide()
    newStreamWindow = new BrowserWindow({
        width: 659,
        height: 675,
        titleBarStyle: 'hidden',
        resizable: false,
        fullscreenable: false,
        show: false,
        frame: false
    })
    newStreamWindow.loadURL('file://' + __dirname + '/HTMLs/newStream.html');

    newStreamWindow.on('closed', () => {
        newStreamWindow = null
        if (playerWindow) {
            playerWindow.close();
        }
        if (donationGoalWindow) {
            donationGoalWindow.close()
        }
        if (alertWindow) {
            alertWindow.close()
        }
        mainWindow.show()
    })
    newStreamWindow.once('ready-to-show', () => {
        newStreamWindow.show()
    })
})

ipcMain.on('show-donationSettings', () => {
    settingsWindow.hide()
    donationSettingsWindow = new BrowserWindow({
        width: 659,
        height: 570,
        titleBarStyle: 'hidden',
        resizable: false,
        fullscreenable: false,
        show: false
    })
    donationSettingsWindow.loadURL('file://' + __dirname + '/HTMLs/donationSettings.html');
    donationSettingsWindow.on('closed', () => {
        donationSettingsWindow = null;
        settingsWindow.show()
    })
    donationSettingsWindow.once('ready-to-show', () => {
        donationSettingsWindow.show()
    })
})

ipcMain.on('show-alertSettings', () => {
    settingsWindow.hide()
    alertSettingsWindow = new BrowserWindow({
        width: 659,
        height: 580,

        titleBarStyle: 'hidden',
        resizable: false,
        fullscreenable: false,
        show: false
    })
    alertSettingsWindow.loadURL('file://' + __dirname + '/HTMLs/alertSettings.html');
    alertSettingsWindow.on('closed', () => {
        alertSettingsWindow = null;
        settingsWindow.show()
    })
    alertSettingsWindow.once('ready-to-show', () => {
        alertSettingsWindow.show()
    })
})

ipcMain.on('show-newGoal', () => {
    donationGoalsWindow.hide()
    newGoalWindow = new BrowserWindow({
        width: 408,
        height: 313,
        titleBarStyle: 'hidden',
        resizable: false,
        fullscreenable: false,
        show: false,
        frame: false
    })
    newGoalWindow.loadURL('file://' + __dirname + '/HTMLs/newGoal.html');
    newGoalWindow.on('closed', () => {
        newGoalWindow = null;
        donationGoalsWindow.reload()
        donationGoalsWindow.show()
    })
    newGoalWindow.once('ready-to-show', () => {
        newGoalWindow.show()
    })
})

ipcMain.on('return-to-goals', () => {
    newGoalWindow.close()
})

ipcMain.on('listen-for-goals', (event, arg) => {
    listenerForGoals = event.sender
})

ipcMain.on('donationSettings-closed', () => {
    donationSettingsWindow.close()
})

ipcMain.on('start-stream', (event, arg) => {

    if (chooseAuthWindow) {
        chooseSrcWindow.close()
    }
    if (alertWindow) {
        alertWindow.close()
    }
    playerWindow = new BrowserWindow({
        width: 360,
        height: 435,
        titleBarStyle: 'hidden',
        resizable: false,
        fullscreenable: false,
        show: false,
        useContentSize: true,
        autoHideMenuBar: true
    })
    playerWindow.loadURL('file://' + __dirname + '/HTMLs/player.html');
    playerWindow.on('closed', () => {
        if (newStreamWindow) {
            newStreamWindow.show()
        }
        playerWindow = null;
    })
    playerWindow.once('ready-to-show', () => {
        playerWindow.show()
    })
    storage.has('goalToOpen', function(error, hasKey) {
        if (error) throw error;

        if (hasKey) {
            donationGoalWindow = new BrowserWindow({
                width: 560,
                height: 150,
                frame: false,
                resizable: false,
                fullscreenable: false,
                transparent: true,
                show: false
            })
            donationGoalWindow.loadURL('file://' + __dirname + '/HTMLs/donationGoal.html');
            donationGoalWindow.on('closed', () => {
                donationGoalWindow = null;
            })
            donationGoalWindow.once('ready-to-show', () => {
                donationGoalWindow.show()
            })
        }
    });

    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize

    alertWindow = new BrowserWindow({
        width: 400,
        height: 130,
        x: Math.round(width / 2) - 200,
        y: 10,
        frame: false,
        resizable: false,
        fullscreenable: false,
        transparent: true,
        show: true,
        alwaysOnTop: true
    })

    alertWindow.loadURL('file://' + __dirname + '/HTMLs/alert.html');

    alertWindow.on('closed', () => {
        alertWindow = null;
    })
    alertWindow.once('ready-to-show', () => {
        alertWindow.show()
    })
})

ipcMain.on('update-goal', (event, arg) => {
    if (donationGoalWindow) {
        donationGoalWindow.webContents.send('update-goal', arg);
    }
})
ipcMain.on('show-donation', (event, arg) => {
    if (alertWindow) {
        alertWindow.webContents.send('show-donation', arg);
    }
})
ipcMain.on('settings-window', (event, arg) => {
    if (arg) {
        newStreamWindow.show()
    } else {
        newStreamWindow.hide()
    }
})
/*

ipcMain.on('show-newStreamSettings', () => {
    chooseWindow = new BrowserWindow({
      width: 659,
      height: 675, 
      titleBarStyle: 'hidden', 
      resizable: false,
      fullscreenable: false,
      show: false
    })
    chooseWindow.loadURL('file://' + __dirname + '/HTMLs/newStream.html');
    chooseWindow.on('closed', () => {
      chooseWindow = null;
    })
    chooseWindow.once('ready-to-show', () => {
      chooseWindow.show()
    })
})

ipcMain.on('show-newStreamSettings', () => {
    alertWindow = new BrowserWindow({
      width: 659,
      height: 675, 
      titleBarStyle: 'hidden', 
      resizable: false,
      fullscreenable: false,
      show: false
    })
    alertWindow.loadURL('file://' + __dirname + '/HTMLs/newStream.html');
    alertWindow.on('closed', () => {
      alertWindow = null;
    })
    alertWindow.once('ready-to-show', () => {
      alertWindow.show()
    })
})*/

let openMain = () => {
    mainWindow = new BrowserWindow({
        width: 360,
        height: 480,
        titleBarStyle: 'hidden',
        resizable: false,
        fullscreenable: false,
        show: false,
        frame: false
    });
    mainWindow.loadURL('file://' + __dirname + '/HTMLs/main.html');
    mainWindow.on('closed', () => {
        mainWindow = null
    });
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
}

ipcMain.on('show-newStreamFromMain', () => {
    mainWindow.hide()
    newStreamWindow = new BrowserWindow({
        width: 659,
        height: 675,
        titleBarStyle: 'hidden',
        resizable: false,
        fullscreenable: false,
        show: false,
        frame: false
    })
    newStreamWindow.loadURL('file://' + __dirname + '/HTMLs/newStream.html');
    newStreamWindow.on('closed', () => {
        newStreamWindow = null
        if (playerWindow) {
            playerWindow.close();
        }
        if (donationGoalWindow) {
            donationGoalWindow.close()
        }
        if (alertWindow) {
            alertWindow.close()
        }
        mainWindow.show()
    })
    newStreamWindow.once('ready-to-show', () => {
        newStreamWindow.show()
    })
})