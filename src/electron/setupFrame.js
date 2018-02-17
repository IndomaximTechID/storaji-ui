const { app, BrowserWindow, Tray, Menu, shell, dialog } = require('electron');
const log = require('electron-log');
const isDev = require('electron-is-dev');
const { autoUpdater } = require('electron-updater');

function Frame() {
  // Logging
  autoUpdater.logger = log;
  autoUpdater.logger.transports.file.level = 'info';
  autoUpdater.autoDownload = false;
  autoUpdater.allowDowngrade = true;
  autoUpdater.allowPrerelease = true;
  log.info('App starting...');

  win = null;
  showNoUpdate = false;
  tray = null;
  quitting = false;
}

Frame.prototype.createMenu = function () {
  const _parent = this;
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
      label: 'Dashboard',
      submenu: [
        {
          label: 'Home',
          click: () => {
            _parent.win.loadURL(`file://${__dirname}/www/index.html`);
          }
        },
        {
          role: 'quit',
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          role: 'reload',
        },
        {
          role: 'forcereload',
        },
        {
          role: 'toggledevtools',
        },
        {
          type: 'separator',
        },
        {
          role: 'resetzoom',
        },
        {
          role: 'zoomin',
        },
        {
          role: 'zoomout',
        },
        {
          type: 'separator',
        },
        {
          role: 'togglefullscreen',
        }
      ]
    },
    {
      role: 'windowMenu',
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: () => {
            shell.openExternal('https://github.com/IndomaximTechID/storaji-ui')
          }
        }
      ],
    },
    {
      label: 'About',
      submenu: [
        {
          label: require('./www/package.json').name,
          click: () => {
            _parent.win.loadURL(`file://${__dirname}/www/index.html#/about`)
          }
        },
        {
          label: 'Check for updates...',
          click: () => {
            (isDev)
              ? false
              : () => {
                _parent.showNoUpdate = true;
                autoUpdater.checkForUpdates()
              };
          }
        }
      ],
    },
  ]));
}

Frame.prototype.createTray = function () {
  const _parent = this;
  _parent.tray = new Tray(`${__dirname}/www/assets/storaji.png`);
  _parent.tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Open',
      click: () => {
        _parent.win.show();
      }
    },
    {
      label: 'Check for updates...',
      click: () => {
        (isDev)
          ? false
          : () => {
            _parent.showNoUpdate = true;
            autoUpdater.checkForUpdates()
          };
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Exit',
      click: () => {
        app.quit();
      }
    }
  ]))
  _parent.tray.setToolTip('Storaji')
  _parent.tray.on('click', () => {
    _parent.win.isVisible()
      ? _parent.win.hide()
      : _parent.win.show();
  })
}

Frame.prototype.createWindow = function () {
  const _parent = this;

  _parent.win = new BrowserWindow({
    title: 'Storaji',
    icon: `${__dirname}/www/assets/storaji.ico`,
    width: 900,
    height: 700,
    backgroundColor: '#ffffff',
    webPreferences: {
      nodeIntegration: false,
    },
  });
  _parent.win.loadURL(`file://${__dirname}/www/index.html`);
  // win.loadURL(`http://localhost:4200`)
  _parent.win.maximize();
  _parent.win.on('close', function (evt) {
    if (_parent.quitting) {
      return;
    }

    evt.preventDefault()
    _parent.win.hide();
  })

  _parent.win.on('show', () => {
    _parent.tray.setHighlightMode('always');
  })
  _parent.win.on('hide', () => {
    _parent.tray.setHighlightMode('never');
  })

  _parent.win.on('closed', () => {
    _parent.tray = null;
    _parent.win = null;
  })
}

Frame.prototype.updater = function () {
  const _parent = this;

  autoUpdater.on('error', (event, error) => {
    log.error(error === null
      ? 'unknown'
      : (error.stack || error).toString()
    );
    // dialog.showErrorBox('Error: ',
    //     error == null
    //         ? "unknown"
    //         : (error.stack || error).toString()
    // );
  });

  autoUpdater.on('update-not-available', (info) => {
    (_parent.showNoUpdate)
      ? dialog.showMessageBox({
        type: 'none',
        title: 'No Update',
        message: 'Current version is up-to-date.'
      })
      : false
  });

  autoUpdater.on('download-progress', ({ bytesPerSecond, percent, transferred, total }) => {
    let log_message = "Download speed: " + bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + percent + '%';
    log_message = log_message + ' (' + transferred + "/" + total + ')';

    _parent.win.setProgressBar(Math.floor(percent) / 100);
    log.info(log_message);
  });

  autoUpdater.on('update-available', ({ releaseNotes, releaseName }) => {
    let message = app.getName() + ' version ' + releaseName + ' is available. Do you want to download now?';
    if (releaseNotes) {
      const splitNotes = releaseNotes.split(/[^\r]\n/);
      message += '\n\nRelease notes:\n';
      splitNotes.forEach(notes => {
        message += notes + '\n\n';
      });
    }
    // Ask user to update the app
    dialog.showMessageBox({
      type: 'none',
      title: 'Update Available',
      buttons: ['Download Now', 'Later'],
      defaultId: 0,
      cancelId: 1,
      message: 'A new version of ' + app.getName() + ' is available',
      detail: message
    }, response => {
      if (response === 0) {
        setImmediate(() => autoUpdater.downloadUpdate());
      }
    });
  });

  autoUpdater.on('update-downloaded', ({ releaseName }) => {
    _parent.win.setProgressBar(0);
    dialog.showMessageBox({
      type: 'none',
      title: 'Install Update',
      defaultId: 0,
      cancelId: 1,
      message: 'A new version of ' + app.getName() + ' has been downloaded. Do you want to update now?',
      buttons: ['Update and Relaunch', 'Later']
    }, (response) => {
      if (response === 0) {
        setImmediate(() => autoUpdater.quitAndInstall());
      }
    });
  });
}

Frame.prototype.init = function () {
  const _parent = this;

  const shouldQuit = app.makeSingleInstance(function (commandLine, workingDirectory) {
    // Someone tried to run a second instance, we should focus our window
    if (_parent.win) {
      if (_parent.win.isMinimized()) _parent.win.restore();
      _parent.win.focus();
    }
    return true;
  });

  if (shouldQuit) {
    app.quit();
    return;
  }

  app.on('before-quit', () => {
    _parent.quitting = true
  });

  app.on('window-all-closed', () => {
    app.quit()
  });

  app.on('ready', () => {
    _parent.createMenu();
    _parent.createTray();
    _parent.createWindow();
    _parent.updater();
    (isDev)
      ? false
      : autoUpdater.checkForUpdates();
  });
}

module.exports = {
  Frame: new Frame(),
};