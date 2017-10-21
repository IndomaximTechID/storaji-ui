const { app, BrowserWindow, Tray, Menu, shell } = require('electron');

function Frame() {
    win = null
    tray = null
    quitting = false
}

Frame.prototype.createMenu = function() {
    const _parent = this;
    Menu.setApplicationMenu(Menu.buildFromTemplate([
        {
            label: 'Dashboard',
            submenu: [
                {
                    label: 'Home',
                    click: function() {
                        _parent.win.loadURL(`file://${__dirname}/index.html`)
                    }
                },
                {
                    role: 'quit'
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    role: 'reload'
                },
                {
                    role: 'forcereload'
                },
                {
                    role: 'toggledevtools'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'resetzoom'
                },
                {
                    role: 'zoomin'
                },
                {
                    role: 'zoomout'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'togglefullscreen'
                }
            ]
        },
        {
            role: 'windowMenu'
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click: function() {
                        shell.openExternal('https://github.com/IndomaximTechID/storaji-ui')
                    }
                }
            ]
        },
        {
            label: 'About',
            submenu: [
                {
                    label: require('./package.json').name,
                    click: function() {
                        _parent.win.loadURL(`file://${__dirname}/index.html#/about`)
                    }
                }
            ]
        }
    ]))
}

Frame.prototype.createTray = function() {
    const _parent = this;
    _parent.tray = new Tray(`${__dirname}/assets/storaji.png`)
    _parent.tray.setContextMenu(Menu.buildFromTemplate([
        {
            label: 'Open',
            click: function() {
                _parent.win.show()
            }
        },
        {
            type: 'separator'
        },
        {
            label: 'Exit',
            click: function() {
                app.quit()
            }
        }
    ]))
    _parent.tray.setToolTip('Storaji')
    _parent.tray.on('click', () => {
        _parent.win.isVisible() ? _parent.win.hide() : _parent.win.show()
    })
}

Frame.prototype.createWindow = function() {
    const _parent = this;
    _parent.win = new BrowserWindow({
        title: 'Storaji',
        icon: `${__dirname}/assets/storaji.ico`,
        width: 900,
        height: 700,
        backgroundColor: '#ffffff',
        webPreferences: {
            nodeIntegration: false
        },
    })
    _parent.win.loadURL(`file://${__dirname}/index.html`)
    // win.loadURL(`http://localhost:4200`)
    _parent.win.maximize()
    _parent.win.on('close', function(evt) {
      if (_parent.quitting) {
        return
      }

      evt.preventDefault()
      _parent.win.hide()
    })
    
    _parent.win.on('show', () => {
        _parent.tray.setHighlightMode('always')
    })
    _parent.win.on('hide', () => {
        _parent.tray.setHighlightMode('never')
    })

    _parent.win.on('closed', function() {
        _parent.tray = null
        _parent.win = null
    })
}

Frame.prototype.init = function() {
    const _parent = this;
    app.on('before-quit', function() {
        _parent.quitting = true
    })

    app.on('window-all-closed', function() {
        app.quit()
    })

    app.on('ready', function() {
        _parent.createMenu()
        _parent.createTray()
        _parent.createWindow()
    })
}

module.exports = {
    Frame: new Frame()
};