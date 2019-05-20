const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const protocol = electron.protocol;
const path = require("path");
// const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  let screenSize = electron.screen.getPrimaryDisplay().size;
    // Create the browser window.
  mainWindow = new BrowserWindow({width: screenSize.width, height:  screenSize.height});
  mainWindow.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);
  mainWindow.on("closed", () => (mainWindow = null));

}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
