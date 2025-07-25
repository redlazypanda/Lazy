import { contextBridge, ipcRenderer } from 'electron';

export interface SystemInfo {
  platform: string;
  arch: string;
  release: string;
  totalMemory: number;
  freeMemory: number;
  cpus: any[];
  uptime: number;
}

export interface LazyAPI {
  // Window controls
  window: {
    minimize: () => Promise<void>;
    maximize: () => Promise<void>;
    close: () => Promise<void>;
  };

  // System operations
  system: {
    getInfo: () => Promise<SystemInfo>;
    cleanup: (options: any) => Promise<any>;
    debloat: (apps: string[]) => Promise<any>;
    applyTweaks: (tweaks: any[]) => Promise<any>;
    manageServices: (services: any[]) => Promise<any>;
    optimizeNetwork: (settings: any) => Promise<any>;
    optimizeGPU: (settings: any) => Promise<any>;
    benchmark: () => Promise<any>;
  };

  // Event listeners
  on: (channel: string, callback: Function) => void;
  removeAllListeners: (channel: string) => void;
}

const api: LazyAPI = {
  window: {
    minimize: () => ipcRenderer.invoke('window:minimize'),
    maximize: () => ipcRenderer.invoke('window:maximize'),
    close: () => ipcRenderer.invoke('window:close'),
  },

  system: {
    getInfo: () => ipcRenderer.invoke('system:info'),
    cleanup: (options) => ipcRenderer.invoke('system:cleanup', options),
    debloat: (apps) => ipcRenderer.invoke('system:debloat', apps),
    applyTweaks: (tweaks) => ipcRenderer.invoke('system:applyTweaks', tweaks),
    manageServices: (services) => ipcRenderer.invoke('system:manageServices', services),
    optimizeNetwork: (settings) => ipcRenderer.invoke('system:optimizeNetwork', settings),
    optimizeGPU: (settings) => ipcRenderer.invoke('system:optimizeGPU', settings),
    benchmark: () => ipcRenderer.invoke('system:benchmark'),
  },

  on: (channel, callback) => {
    ipcRenderer.on(channel, callback);
  },

  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  },
};

contextBridge.exposeInMainWorld('lazyAPI', api);
