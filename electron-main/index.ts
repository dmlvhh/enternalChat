// electron-main/index.ts
import { app, BrowserWindow,ipcMain } from "electron"
import { onLoginOrRegister, onLoginSuccess } from "./ipc";
const path = require("path");

const login_width = 350
const login_height = 370
const register_height = 490
const NODE_ENV = process.env.NODE_ENV
const createWindow = () => {
  const win = new BrowserWindow({
    width: login_width,
    height: login_height,
    show: true,
    autoHideMenuBar: true,
    resizable: true,
    // titleBarStyle:'hidden',
    frame:true,
    title:"倾心IM",
    transparent:true,
    webPreferences: {
      contextIsolation: false, // 是否开启隔离上下文
      nodeIntegration: true, // 渲染进程使用Node API
      preload: path.join(__dirname, "./preload.js"), // 需要引用js文件
      sandbox:false,     
    },
  })



  // 如果打包了，渲染index.html
  if (process.env.NODE_ENV !== 'development') {
    win.loadFile(path.join(__dirname, "./index.html"))
    win.webContents.openDevTools()
  } else {
    let url = "http://localhost:7766" // 本地启动的vue项目路径。注意：vite版本3以上使用的端口5173；版本2用的是3000
    win.loadURL(url)
    // win.loadURL(process.env['ELECTRON_RENDERER_URL'])
    win.webContents.openDevTools()
  }

  win.on('ready-to-show', () => {
    win.show()
    win.setTitle('倾心IM')
  })

  onLoginOrRegister((isLogin)=>{
    win.setResizable(true)
    if(isLogin){
      win.setSize(login_width,login_height)
    }else{
      win.setSize(login_width,register_height)
    }
    win.setResizable(false)
  })


  onLoginSuccess((config)=>{
    win.setResizable(true)
    win.setSize(850,800)
    win.center()
     //可最大化
     win.setMaximizable(true)
     //设置最小的窗口大小
     win.setMinimumSize(800, 600)

     if(config.admin) {

     }
  })
}

app.whenReady().then(() => {
  createWindow() // 创建窗口
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 关闭窗口
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
