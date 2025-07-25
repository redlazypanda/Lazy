import { Tray, Menu, app } from 'electron'
import path from 'path'

export function createTray(mainWindow) {
const tray = new Tray(path.join(__dirname, '../../resources/lazylogo.ico'))

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open Window', click: () => mainWindow.show() },
    { label: 'Quit', click: () => app.quit() }
  ])

  tray.setToolTip('Lazy Optimizer')
  tray.setTitle('Lazy Optimizer')
  tray.setContextMenu(contextMenu)
  tray.on('click', () => ToggleWindowState(mainWindow))
}

function ToggleWindowState(mainWindow) {
  mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
}
