import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Lightbulb, 
  Home as HomeIcon, 
  Wand2, 
  Zap, 
  Mic, 
  ScrollText, 
  Settings 
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/devices', icon: Lightbulb, label: 'Devices' },
  { path: '/rooms', icon: HomeIcon, label: 'Rooms' },
  { path: '/scenes', icon: Wand2, label: 'Scenes' },
  { path: '/automations', icon: Zap, label: 'Automations' },
  { path: '/voice', icon: Mic, label: 'Voice Assistants' },
  { path: '/logs', icon: ScrollText, label: 'Logs' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen fixed left-0 top-0 pt-20 z-10">
      <nav className="px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
