import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  api: {
    send: (channel, data) => {
      ipcRenderer.send(channel, data)
    },
    receive: (channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => func(...args))
    },
  },
})