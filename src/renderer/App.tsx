import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import TitleBar from './components/TitleBar';
import Dashboard from './pages/Dashboard';
import SystemCleaner from './pages/SystemCleaner';
import WindowsDebloat from './pages/WindowsDebloat';
import GeneralTweaks from './pages/GeneralTweaks';
import PerformanceTweaks from './pages/PerformanceTweaks';
import PrivacyTweaks from './pages/PrivacyTweaks';
import NetworkOptimizer from './pages/NetworkOptimizer';
import QoLTweaks from './pages/QoLTweaks';
import PowerTweaks from './pages/PowerTweaks';
import ServiceManager from './pages/ServiceManager';
import DeviceManager from './pages/DeviceManager';
import StartupManager from './pages/StartupManager';
import BIOSOptimizations from './pages/BIOSOptimizations';
import GPUTweaks from './pages/GPUTweaks';
import SystemBenchmark from './pages/SystemBenchmark';
import BackgroundOrbs from './components/BackgroundOrbs';

declare global {
  interface Window {
    lazyAPI: any;
  }
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [systemInfo, setSystemInfo] = useState<any>(null);

  useEffect(() => {
    const loadSystemInfo = async () => {
      try {
        if (window.lazyAPI) {
          const info = await window.lazyAPI.system.getInfo();
          setSystemInfo(info);
        }
      } catch (error) {
        console.error('Failed to load system info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSystemInfo();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen animated-bg">
        <BackgroundOrbs />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-neon-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold gradient-text">Loading Lazy Optimizer...</h2>
          <p className="text-gray-400 mt-2">Initializing system optimization</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen animated-bg overflow-hidden">
      <BackgroundOrbs />
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard systemInfo={systemInfo} />} />
              <Route path="/system-cleaner" element={<SystemCleaner />} />
              <Route path="/debloat" element={<WindowsDebloat />} />
              <Route path="/general-tweaks" element={<GeneralTweaks />} />
              <Route path="/performance-tweaks" element={<PerformanceTweaks />} />
              <Route path="/privacy-tweaks" element={<PrivacyTweaks />} />
              <Route path="/network-optimizer" element={<NetworkOptimizer />} />
              <Route path="/qol-tweaks" element={<QoLTweaks />} />
              <Route path="/power-tweaks" element={<PowerTweaks />} />
              <Route path="/service-manager" element={<ServiceManager />} />
              <Route path="/device-manager" element={<DeviceManager />} />
              <Route path="/startup-manager" element={<StartupManager />} />
              <Route path="/bios-optimizations" element={<BIOSOptimizations />} />
              <Route path="/gpu-tweaks" element={<GPUTweaks />} />
              <Route path="/benchmark" element={<SystemBenchmark />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default App;
