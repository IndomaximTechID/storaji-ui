/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */

const { app } = require('electron')
const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')

// Install `electron-debug` with `devtron`
require('electron-debug')()

// Install `vue-devtools`
app.on('ready', () => {
  installExtension(VUEJS_DEVTOOLS)
  .then((name) => console.log(`Added Extension:  ${name}`))
  .catch((err) => console.log('An error occurred: ', err));
})

// Require `main` process to boot app
require('./index')
