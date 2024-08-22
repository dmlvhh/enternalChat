import { ipcMain } from "electron"
import {initUserId, setUserData} from './store'

export const onLoginOrRegister = (callback) => {
    ipcMain.on("loginOrRegister",(e,isLogin)=>{
        callback()
      })
}

export const onLoginSuccess = (callback) => {
    ipcMain.on('openChat', (e, config) => {
        console.log(config);
        
        initUserId(config.userId)
        setUserData('token', config.token)
        callback(config)
    })
}

export const winTitleOp = (callback) => {
    ipcMain.on('winTitleOp', (e, data) => {
      callback(e, data)
    })
}