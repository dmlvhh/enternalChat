import { app, BrowserWindow,ipcMain } from "electron"

export const onLoginOrRegister = (callback) => {
    ipcMain.on("loginOrRegister",(e,isLogin)=>{
        callback()
      })
}

export const onLoginSuccess = (callback) => {
    ipcMain.on('openChat', (e, config) => {
      callback(config)
    })
  }