import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    titleBarAction(message) {
      ipcRenderer.send('titleBarAction', message)
    },
    sendNotification(message) {
      ipcRenderer.send('notify', message)
    },
  },
})
