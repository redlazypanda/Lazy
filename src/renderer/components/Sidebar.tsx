import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Trash2,
  Package,
  Settings,
  Zap,
  Shield,
  Wifi,
  Lazys,
  Battery,
  Server,
  HardDrive,
  PlayCircle,
  Cpu,
  Monitor,
  BarChart3
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<any>;
  description: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/', icon: Home, description: 'System overview' },
  { name: 'System Cleaner', path: '/system-cleaner', icon: Trash2, description: 'Clean system files' },
  { name: 'Windows Debloat', path: '/debloat', icon: Package, description: 'Remove bloatware' },
  { name: 'General Tweaks', path: '/general-tweaks', icon: Settings, description: 'System customization' },
  { name: 'Performance Tweaks', path: '/performance-tweaks', icon: Zap, description: 'Optimize performance' },
  { name: 'Privacy Tweaks', path: '/privacy-tweaks', icon: Shield, description: 'Enhance privacy' },
  { name: 'Network Optimizer', path: '/network-optimizer', icon: Wifi, description: 'Network optimization' },
  { name: 'QoL Tweaks', path: '/qol-tweaks', icon: Lazys, description: 'Quality of life' },
  { name: 'Power Tweaks', path: '/power-tweaks', icon: Battery, description: 'Power management' },
  { name: 'Service Manager', path: '/service-manager', icon: Server, description: 'Windows services' },
  { name: 'Device Manager', path: '/device-manager', icon: HardDrive, description: 'Hardware management' },
  { name: 'Startup Manager', path: '/startup-manager', icon: PlayCircle, description: 'Startup optimization' },
  { name: 'BIOS Optimizations', path: '/bios-optimizations', icon: Cpu, description: 'BIOS settings' },
  { name: 'GPU Tweaks', path: '/gpu-tweaks', icon: Monitor, description: 'Graphics optimization' },
  { name: 'System Benchmark', path: '/benchmark', icon: BarChart3, description: 'Performance benchmark' },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-80 bg-dark-card glass border-r border-white/10 flex flex-col">
      <div className="p-6 border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-pink to-neon-blue flex items-center justify-center">
            <Zap size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">Lazy</h1>
            <p className="text-xs text-gray-400">System Optimizer</p>
          </div>
        </motion.div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-neon-pink/20 to-neon-blue/20 border border-neon-pink/30 neon-glow'
                        : 'hover:bg-white/5 hover:border-white/10 border border-transparent'
                    }`
                  }
                >
                  <Icon 
                    size={18} 
                    className={`transition-colors duration-200 group-hover:text-neon-pink`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white group-hover:text-white">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-400 group-hover:text-gray-300">
                      {item.description}
                    </div>
                  </div>
                </NavLink>
              </motion.div>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="glass-card rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">System Status</div>
              <div className="text-xs text-green-400">Optimized</div>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '85%' }}
              transition={{ duration: 2, delay: 1 }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
