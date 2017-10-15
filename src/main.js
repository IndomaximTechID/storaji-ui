 //handle setupevents as quickly as possible
const setupEvents = require('./setupEvents')
if (setupEvents.handleSquirrelEvent()) {
   // squirrel event handled and app will exit in 1000ms, so don't do anything else
   return;
}

const { app, BrowserWindow } = require('electron')

let win;

function createWindow () {
    win = new BrowserWindow({
        title: 'Storaji',
        icon: `${__dirname}/assets/storaji.ico`,
        width: 900,
        height: 700,
        backgroundColor: '#ffffff',
        webPreferences: {
            nodeIntegration: false
        },
    })

    win.loadURL(`file://${__dirname}/index.html`)
    // win.loadURL(`http://localhost:4200`)
    win.maximize();
    win.on('closed', function () {
        win = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (win === null) {
        createWindow()
    }
})