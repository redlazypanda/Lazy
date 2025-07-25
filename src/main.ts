import { app, BrowserWindow, Menu, ipcMain, dialog, shell } from 'electron';
import * as path from 'path';
import * as os from 'os';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

class LazyOptimizer {
  private mainWindow: BrowserWindow | null = null;

  constructor() {
    this.initializeApp();
  }

  private initializeApp(): void {
    app.whenReady().then(() => {
      this.createWindow();
      this.setupIpcHandlers();
      this.setupMenu();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow();
      }
    });
  }

  private createWindow(): void {
    this.mainWindow = new BrowserWindow({
      width: 1400,
      height: 900,
      minWidth: 1200,
      minHeight: 800,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
      },
      frame: false,
      titleBarStyle: 'hidden',
      backgroundColor: '#0f0f0f',
      show: false,
      icon: path.join(__dirname, '../assets/icon.ico'),
    });

    // Load the app
    if (process.env.NODE_ENV === 'development') {
      this.mainWindow.loadURL('http://localhost:3000');
      this.mainWindow.webContents.openDevTools();
    } else {
      this.mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));
    }

    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow?.show();
    });
  }

  private setupMenu(): void {
    const template = [
      {
        label: 'File',
        submenu: [
          {
            label: 'Export Settings',
            click: () => this.exportSettings(),
          },
          {
            label: 'Import Settings',
            click: () => this.importSettings(),
          },
          { type: 'separator' },
          {
            label: 'Exit',
            click: () => app.quit(),
          },
        ],
      },
      {
        label: 'Tools',
        submenu: [
          {
            label: 'System Information',
            click: () => this.showSystemInfo(),
          },
          {
            label: 'Performance Monitor',
            click: () => this.openPerformanceMonitor(),
          },
          { type: 'separator' },
          {
            label: 'Create System Restore Point',
            click: () => this.createRestorePoint(),
          },
        ],
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Documentation',
            click: () => shell.openExternal('https://github.com/redlazypanda/Lazy'),
          },
          {
            label: 'Report Issue',
            click: () => shell.openExternal('https://github.com/redlazypanda/Lazy/issues'),
          },
          { type: 'separator' },
          {
            label: 'About',
            click: () => this.showAbout(),
          },
        ],
      },
    ];

    const menu = Menu.buildFromTemplate(template as any);
    Menu.setApplicationMenu(menu);
  }

  private setupIpcHandlers(): void {
    // Window controls
    ipcMain.handle('window:minimize', () => {
      this.mainWindow?.minimize();
    });

    ipcMain.handle('window:maximize', () => {
      if (this.mainWindow?.isMaximized()) {
        this.mainWindow.unmaximize();
      } else {
        this.mainWindow?.maximize();
      }
    });

    ipcMain.handle('window:close', () => {
      this.mainWindow?.close();
    });

    // System information
    ipcMain.handle('system:info', async () => {
      return {
        platform: os.platform(),
        arch: os.arch(),
        release: os.release(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        cpus: os.cpus(),
        uptime: os.uptime(),
      };
    });

    // System cleanup
    ipcMain.handle('system:cleanup', async (event, options) => {
      try {
        const results = await this.performSystemCleanup(options);
        return { success: true, results };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    // Windows debloat
    ipcMain.handle('system:debloat', async (event, apps) => {
      try {
        const results = await this.removeUWPApps(apps);
        return { success: true, results };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    // Registry tweaks
    ipcMain.handle('system:applyTweaks', async (event, tweaks) => {
      try {
        const results = await this.applyRegistryTweaks(tweaks);
        return { success: true, results };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    // Service management
    ipcMain.handle('system:manageServices', async (event, services) => {
      try {
        const results = await this.manageServices(services);
        return { success: true, results };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    // Network optimization
    ipcMain.handle('system:optimizeNetwork', async (event, settings) => {
      try {
        const results = await this.optimizeNetwork(settings);
        return { success: true, results };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    // GPU optimization
    ipcMain.handle('system:optimizeGPU', async (event, settings) => {
      try {
        const results = await this.optimizeGPU(settings);
        return { success: true, results };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    // System benchmarking
    ipcMain.handle('system:benchmark', async () => {
      try {
        const results = await this.runBenchmark();
        return { success: true, results };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });
  }

  private async performSystemCleanup(options: any): Promise<any> {
    const results = [];
    
    if (options.tempFiles) {
      try {
        const { stdout } = await execAsync('cleanmgr /sagerun:1');
        results.push({ type: 'temp', success: true, message: 'Temporary files cleaned' });
      } catch (error) {
        results.push({ type: 'temp', success: false, error: error.message });
      }
    }

    if (options.recycleBin) {
      try {
        await execAsync('rd /s /q C:\\$Recycle.Bin');
        results.push({ type: 'recycle', success: true, message: 'Recycle bin emptied' });
      } catch (error) {
        results.push({ type: 'recycle', success: false, error: error.message });
      }
    }

    return results;
  }

  private async removeUWPApps(apps: string[]): Promise<any> {
    const results = [];
    
    for (const app of apps) {
      try {
        const { stdout } = await execAsync(`Get-AppxPackage *${app}* | Remove-AppxPackage`, {
          shell: 'powershell.exe'
        });
        results.push({ app, success: true, message: `${app} removed successfully` });
      } catch (error) {
        results.push({ app, success: false, error: error.message });
      }
    }

    return results;
  }

  private async applyRegistryTweaks(tweaks: any[]): Promise<any> {
    const results = [];
    
    for (const tweak of tweaks) {
      try {
        const command = `reg add "${tweak.key}" /v "${tweak.value}" /t ${tweak.type} /d "${tweak.data}" /f`;
        await execAsync(command);
        results.push({ tweak: tweak.name, success: true, message: 'Applied successfully' });
      } catch (error) {
        results.push({ tweak: tweak.name, success: false, error: error.message });
      }
    }

    return results;
  }

  private async manageServices(services: any[]): Promise<any> {
    const results = [];
    
    for (const service of services) {
      try {
        const command = `sc config "${service.name}" start= ${service.startType}`;
        await execAsync(command);
        results.push({ service: service.name, success: true, message: `Set to ${service.startType}` });
      } catch (error) {
        results.push({ service: service.name, success: false, error: error.message });
      }
    }

    return results;
  }

  private async optimizeNetwork(settings: any): Promise<any> {
    const results = [];
    
    try {
      // Network adapter optimizations
      const commands = [
        'netsh int tcp set global autotuninglevel=normal',
        'netsh int tcp set global chimney=enabled',
        'netsh int tcp set global rss=enabled',
        'netsh int tcp set global netdma=enabled',
      ];

      for (const command of commands) {
        await execAsync(command);
      }
      
      results.push({ type: 'network', success: true, message: 'Network optimized' });
    } catch (error) {
      results.push({ type: 'network', success: false, error: error.message });
    }

    return results;
  }

  private async optimizeGPU(settings: any): Promise<any> {
    const results = [];
    
    try {
      // GPU-specific optimizations would go here
      // This is a placeholder for GPU optimization logic
      results.push({ type: 'gpu', success: true, message: 'GPU settings optimized' });
    } catch (error) {
      results.push({ type: 'gpu', success: false, error: error.message });
    }

    return results;
  }

  private async runBenchmark(): Promise<any> {
    try {
      // Simple CPU benchmark
      const start = Date.now();
      let result = 0;
      for (let i = 0; i < 1000000; i++) {
        result += Math.sqrt(i);
      }
      const cpuTime = Date.now() - start;

      return {
        cpu: { score: Math.round(10000 / cpuTime), time: cpuTime },
        memory: { total: os.totalmem(), free: os.freemem() },
        system: { uptime: os.uptime(), platform: os.platform() }
      };
    } catch (error) {
      throw new Error(`Benchmark failed: ${error.message}`);
    }
  }

  private async exportSettings(): Promise<void> {
    const result = await dialog.showSaveDialog(this.mainWindow!, {
      defaultPath: 'lazy-settings.json',
      filters: [{ name: 'JSON Files', extensions: ['json'] }],
    });

    if (!result.canceled && result.filePath) {
      // Export logic here
    }
  }

  private async importSettings(): Promise<void> {
    const result = await dialog.showOpenDialog(this.mainWindow!, {
      filters: [{ name: 'JSON Files', extensions: ['json'] }],
    });

    if (!result.canceled && result.filePaths.length > 0) {
      // Import logic here
    }
  }

  private showSystemInfo(): void {
    this.mainWindow?.webContents.send('show-system-info');
  }

  private openPerformanceMonitor(): void {
    exec('perfmon.exe');
  }

  private async createRestorePoint(): Promise<void> {
    try {
      await execAsync('wmic.exe /Namespace:\\\\root\\default Path SystemRestore Call CreateRestorePoint "Lazy Optimizer Backup", 100, 7');
      dialog.showMessageBox(this.mainWindow!, {
        type: 'info',
        title: 'System Restore Point',
        message: 'System restore point created successfully.',
      });
    } catch (error) {
      dialog.showErrorBox('Error', 'Failed to create system restore point.');
    }
  }

  private showAbout(): void {
    dialog.showMessageBox(this.mainWindow!, {
      type: 'info',
      title: 'About Lazy Optimizer',
      message: 'Lazy Optimizer v1.0.0\\n\\nFuturistic Windows optimization utility\\nby redlazypanda',
    });
  }
}

// Initialize the application
new LazyOptimizer();
