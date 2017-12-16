//handle setupevents as quickly as possible
// const setupEvents = require('./setupEvents')
// if (process.platform === 'win32' && setupEvents.handleSquirrelEvent()) {
//    // squirrel event handled and app will exit in 1000ms, so don't do anything else
//    return;
// }

const { Frame } = require('./setupFrame');
Frame.init();