import { app, ipcMain, BrowserWindow } from 'electron';
import { configBuilder } from './config';
import open from 'opn';
import path from 'path';
import windowStateKeeper from 'electron-window-state';
import yargs from 'yargs';

const DEFAULT_WINDOW_WIDTH = 800;
const DEFAULT_WINDOW_HEIGHT = 800;

import { Menus } from './menus';

let menus;

function createWindow(iconPath) {
  // Load the previous state with fallback to defaults
  let windowState = windowStateKeeper({
    defaultWidth: DEFAULT_WINDOW_WIDTH,
    defaultHeight: DEFAULT_WINDOW_HEIGHT
  });

  // Create the window
  const window = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,

    width: windowState.width,
    height: windowState.height,

    autoHideMenuBar: true,
    frame: false,

    webPreferences: {
      partition: 'persist:teams',
      preload: path.join(__dirname, 'browser', 'index.js'),
      nodeIntegration: false
    }
  });

  windowState.manage(window);

  return window;
}

let config: yargs.Arguments;

app.on('ready', () => {
  const iconPath = path.join(__dirname, './assets/icons/icon-96x96.png');
  const window = createWindow(iconPath);
  config = configBuilder(app.getPath('userData'));

  menus = new Menus(config, iconPath);
  menus.register(window);

  window.on('page-title-updated', (event, title) =>
    window.webContents.send('page-title', title)
  );

  ipcMain.on('nativeNotificationClick', event => {
    window.show();
    window.focus();
  });

  window.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    try {
      open(url);
    } catch (e) {
      console.error(`exec error: ${e.message}`);
    }
  });

  if (config.userAgent === 'edge') {
    window.webContents.setUserAgent(config.edgeUserAgent);
  } else {
    window.webContents.setUserAgent(config.chromeUserAgent);
  }

  window.loadURL(config.url);

  if (config.webDebug) {
    window.webContents.openDevTools();
  }
});

app.on('login', function(event, webContents, request, authInfo, callback) {
  event.preventDefault();
  if (typeof config.firewallUsername !== 'undefined') {
    callback(config.firewallUsername, config.firewallPassword);
  }
});
