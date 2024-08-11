"use strict";
const electron = require("electron");
const path = require("path");
const login_width = 300;
const login_height = 370;
const register_height = 490;
const createWindow = () => {
  const win = new electron.BrowserWindow({
    width: login_width,
    height: login_height,
    // show: false,
    autoHideMenuBar: true,
    resizable: false,
    titleBarStyle: "hidden",
    frame: true,
    transparent: true,
    webPreferences: {
      contextIsolation: false,
      // 是否开启隔离上下文
      nodeIntegration: true,
      // 渲染进程使用Node API
      preload: path.join(__dirname, "./preload.js"),
      // 需要引用js文件
      sandbox: false
    }
  });
  electron.ipcMain.on("loginOrRegister", (e, isLogin) => {
    win.setResizable(true);
    if (isLogin) {
      win.setSize(login_width, login_height);
    } else {
      win.setSize(login_width, register_height);
    }
    win.setResizable(false);
  });
  if (process.env.NODE_ENV !== "development") {
    win.loadFile(path.join(__dirname, "./index.html"));
    win.webContents.openDevTools();
  } else {
    let url = "http://localhost:5173";
    win.loadURL(url);
    win.webContents.openDevTools();
  }
};
electron.app.whenReady().then(() => {
  createWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
