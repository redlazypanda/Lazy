import { ipcMain } from 'electron'
import discordRPC from 'discord-rpc'
import jsonData from '../../package.json'
import log from 'electron-log'
console.log = log.log
console.error = log.error
console.warn = log.warn
const clientId = '1188686354490609754'
let rpcClient

function startDiscordRPC() {
  try {
    rpcClient = new discordRPC.Client({ transport: 'ipc' })

    rpcClient.on('ready', () => {
      console.log('(rpc.js)  Discord RPC connected')

      rpcClient.setActivity({
        details: 'Optimizing your PC',
        state: `Running Lazy v${jsonData.version || '2'}`,
        buttons: [
          { label: 'Download Lazy', url: 'https://RedLazyPanda.com/lazy' },
          { label: 'Join Discord', url: 'https://discord.com/invite/En5YJYWj3Z' }
        ],
        largeImageKey: 'lazylogo',
        largeImageText: 'Lazy Optimizer',
        instance: false
      })
    })

    rpcClient.login({ clientId }).catch(console.error)
    return true
  } catch (error) {
    console.error('(rpc.js) ', 'Failed to start Discord RPC:', error)
    return false
  }
}

function stopDiscordRPC() {
  if (rpcClient) {
    rpcClient.destroy()
    rpcClient = null
    console.log('(rpc.js) ', 'Discord RPC disconnected')
    return true
  }
  return false
}

ipcMain.handle('start-discord-rpc', () => {
  return startDiscordRPC()
})

ipcMain.handle('stop-discord-rpc', () => {
  return stopDiscordRPC()
})

export { startDiscordRPC, stopDiscordRPC }
