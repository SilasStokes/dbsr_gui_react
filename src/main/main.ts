/* eslint-disable no-unused-vars */
/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { PythonShell } from 'python-shell';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
// const { lstatSync } = require('fs')

// const { PythonShell } = require('python-shell');

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    // icon: getAssetPath('icon.png'),
    icon: getAssetPath('dbsr-icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

ipcMain.handle('captureDroppedFiles', async (event, paths) => {
  const pyArgs: {
    mode?: 'text' | 'json' | 'binary';
    formatter?: string | ((param: string) => any);
    parser?: string | ((param: string) => any);
    pythonPath?: string;
    pythonOptions?: string[];
    scriptPath?: string;
  } = {
    mode: 'json',
    pythonPath: path.join(
      __dirname,
      'python_scripts\\.venv\\Scripts\\python.exe'
    ),
    pythonOptions: ['-u'],
    scriptPath: path.join(__dirname, 'python_scripts'),
  };
  const pyshell = new PythonShell('copy_files_and_parse_data.py', pyArgs);
  pyshell.send(paths);
  let promiseResolve: any;
  let promiseReject: any;
  let results: any = [];
  const onMessagePromise = new Promise((resolve, reject) => {
    promiseResolve = resolve;
    promiseReject = reject;
    pyshell.on('message', (message) => {
      results = results.concat(message.results);
    });
  });
  const stderrCount = 0;
  pyshell.on('stderr', (stderr) => {
    // console.log(stderrCount ++, ' stderr = ', stderr)
  });
  pyshell.end((err, code, signal) => {
    if (err) {
      promiseReject(err);
      throw err;
    }
    promiseResolve();
  });
  await onMessagePromise;
  console.log('results %j', results);

  return results;
});

// ipcMain.handle('resolveAfter2Seconds', async (event, arg) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve('resolved');
//     }, 2000);
//   });
// });
