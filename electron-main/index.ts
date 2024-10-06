// electron-main/index.ts
import { app, BrowserWindow, Menu, Tray } from "electron"
import { onLoginOrRegister, onLoginSuccess, winTitleOp } from "./ipc";
import icon from '../resources/chat.png'

const path = require("path");

const login_width = 350
const login_height = 370
const register_height = 490

const createWindow = () => {

  const win = new BrowserWindow({
    title:"enternal",
    icon:icon,
    width: login_width,
    height: login_height,
    show: false,
    autoHideMenuBar: true,
    resizable: true,
    titleBarStyle:'hidden',
    frame:false,
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
    win.setTitle('enternal')
  })

  onLoginOrRegister((isLogin)=>{
    win.setResizable(true)
    win.setSize(login_width, isLogin ? login_height : register_height)
    win.setResizable(false)
  })

  onLoginSuccess((config)=>{
    win.setResizable(true)
    win.setSize(926,636)
    win.center()
     //可最大化
    win.setMaximizable(true)
     //设置最小的窗口大小
    win.setMinimumSize(800, 600)

    if(config.admin) {
    }

    contextMenu.unshift({
      label: '用户：' + config.nickName,
      click: () => {}
    })
    tray.setContextMenu(Menu.buildFromTemplate(contextMenu))
  })

  winTitleOp((e, {action,data}) => {
    const webContents = e.sender
    const w = BrowserWindow.fromWebContents(webContents)
    switch (action) {
      case 'close': {
        if (data.closeType == 0) {
          w.close() //关闭窗口
        } else if (data.closeType == 1) {
          w.setSkipTaskbar(true) //隐藏任务栏
          w.hide() //隐藏窗口
        }
        break
      }
      case 'minimize': {
        w.minimize()
        break
      }
      case 'maximize': {
        w.maximize()
        break
      }
      case 'unmaximize': {
        w.unmaximize()
        break
      }
      case 'top': {
        w.setAlwaysOnTop(data.top)
        break
      }
    }
  })

    //托盘

  const contextMenu = [
      {
        label: '退出EasyChat',
        click: () => {
          app.quit()
        }
      }
    ]
  const menu = Menu.buildFromTemplate(contextMenu)
  const tray = new Tray(icon)
  tray.setToolTip('EasyChat')
  tray.setContextMenu(menu)
  tray.on('click', () => {
    win.setSkipTaskbar(false)
    win.show()
  })

  tray.on('double-click', function () {
    win.show()
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

app.disableHardwareAcceleration();
