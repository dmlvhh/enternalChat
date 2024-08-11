"use strict";
const electron = require("electron");
const os = require("os");
console.log("platform", os.platform());
window.ipcRenderer = electron.ipcRenderer;
