// electron-preload/preload.ts

import { ipcRenderer } from "electron";

// import os from "os";
const os = require("os");
// console.log("platform", os.platform());
window.ipcRenderer = ipcRenderer