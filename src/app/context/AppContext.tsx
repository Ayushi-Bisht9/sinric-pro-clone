import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Device {
  id: string;
  name: string;
  type: 'light' | 'fan' | 'ac' | 'tv' | 'switch' | 'thermostat';
  room: string;
  status: 'online' | 'offline';
  isOn: boolean;
  brightness?: number;
  speed?: number;
  temperature?: number;
}

export interface Room {
  id: string;
  name: string;
  icon: string;
  deviceCount: number;
}

export interface Scene {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Automation {
  id: string;
  name: string;
  condition: string;
  action: string;
  enabled: boolean;
}

export interface ActivityLog {
  id: string;
  timestamp: Date;
  deviceName: string;
  action: string;
  type: 'device' | 'scene' | 'automation';
}

interface AppContextType {
  devices: Device[];
  rooms: Room[];
  scenes: Scene[];
  automations: Automation[];
  activityLogs: ActivityLog[];
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  toggleDevice: (deviceId: string) => void;
  updateDeviceBrightness: (deviceId: string, brightness: number) => void;
  updateDeviceSpeed: (deviceId: string, speed: number) => void;
  updateDeviceTemperature: (deviceId: string, temperature: number) => void;
  activateScene: (sceneId: string) => void;
  toggleAutomation: (automationId: string) => void;
  toggleAllDevicesInRoom: (roomId: string) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [devices, setDevices] = useState<Device[]>([
    { id: '1', name: 'Living Room Light', type: 'light', room: 'Living Room', status: 'online', isOn: true, brightness: 75 },
    { id: '2', name: 'Bedroom Light', type: 'light', room: 'Bedroom', status: 'online', isOn: false, brightness: 50 },
    { id: '3', name: 'Kitchen Light', type: 'light', room: 'Kitchen', status: 'online', isOn: true, brightness: 100 },
    { id: '4', name: 'Ceiling Fan', type: 'fan', room: 'Living Room', status: 'online', isOn: true, speed: 60 },
    { id: '5', name: 'Bedroom Fan', type: 'fan', room: 'Bedroom', status: 'online', isOn: false, speed: 40 },
    { id: '6', name: 'Living Room AC', type: 'ac', room: 'Living Room', status: 'online', isOn: true, temperature: 22 },
    { id: '7', name: 'Bedroom AC', type: 'ac', room: 'Bedroom', status: 'offline', isOn: false, temperature: 24 },
    { id: '8', name: 'Smart TV', type: 'tv', room: 'Living Room', status: 'online', isOn: false },
    { id: '9', name: 'Garage Light', type: 'light', room: 'Garage', status: 'online', isOn: false, brightness: 80 },
    { id: '10', name: 'Outdoor Light', type: 'light', room: 'Outdoor', status: 'online', isOn: true, brightness: 90 },
    { id: '11', name: 'Kitchen Fan', type: 'fan', room: 'Kitchen', status: 'online', isOn: false, speed: 30 },
    { id: '12', name: 'Smart Switch', type: 'switch', room: 'Hallway', status: 'online', isOn: true },
  ]);

  const [rooms] = useState<Room[]>([
    { id: '1', name: 'Living Room', icon: 'sofa', deviceCount: 4 },
    { id: '2', name: 'Bedroom', icon: 'bed', deviceCount: 3 },
    { id: '3', name: 'Kitchen', icon: 'utensils', deviceCount: 2 },
    { id: '4', name: 'Garage', icon: 'car', deviceCount: 1 },
    { id: '5', name: 'Outdoor', icon: 'trees', deviceCount: 1 },
    { id: '6', name: 'Hallway', icon: 'door-open', deviceCount: 1 },
  ]);

  const [scenes] = useState<Scene[]>([
    { id: '1', name: 'Good Morning', icon: 'sunrise', description: 'Turn on lights and set temperature' },
    { id: '2', name: 'Movie Time', icon: 'tv', description: 'Dim lights and turn on TV' },
    { id: '3', name: 'Good Night', icon: 'moon', description: 'Turn off all lights and devices' },
    { id: '4', name: 'Away Mode', icon: 'lock', description: 'Secure home when away' },
    { id: '5', name: 'Party Mode', icon: 'music', description: 'Colorful lighting for parties' },
    { id: '6', name: 'Reading Mode', icon: 'book-open', description: 'Warm lighting for reading' },
  ]);

  const [automations, setAutomations] = useState<Automation[]>([
    { id: '1', name: 'Turn on lights at sunset', condition: 'Time is 6:00 PM', action: 'Turn on Outdoor Light', enabled: true },
    { id: '2', name: 'Turn off AC when away', condition: 'No one is home', action: 'Turn off all AC', enabled: true },
    { id: '3', name: 'Morning routine', condition: 'Time is 7:00 AM', action: 'Activate Good Morning scene', enabled: false },
    { id: '4', name: 'Energy saver', condition: 'Temperature > 30°C', action: 'Set AC to 24°C', enabled: true },
  ]);

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    { id: '1', timestamp: new Date('2026-01-31T14:30:00'), deviceName: 'Living Room Light', action: 'Turned ON', type: 'device' },
    { id: '2', timestamp: new Date('2026-01-31T14:25:00'), deviceName: 'Living Room AC', action: 'Turned ON', type: 'device' },
    { id: '3', timestamp: new Date('2026-01-31T14:20:00'), deviceName: 'Good Morning', action: 'Scene activated', type: 'scene' },
    { id: '4', timestamp: new Date('2026-01-31T14:15:00'), deviceName: 'Ceiling Fan', action: 'Speed changed to 60%', type: 'device' },
    { id: '5', timestamp: new Date('2026-01-31T14:10:00'), deviceName: 'Energy saver', action: 'Automation triggered', type: 'automation' },
    { id: '6', timestamp: new Date('2026-01-31T14:05:00'), deviceName: 'Kitchen Light', action: 'Turned ON', type: 'device' },
    { id: '7', timestamp: new Date('2026-01-31T14:00:00'), deviceName: 'Smart TV', action: 'Turned OFF', type: 'device' },
    { id: '8', timestamp: new Date('2026-01-31T13:55:00'), deviceName: 'Outdoor Light', action: 'Turned ON', type: 'device' },
  ]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const addActivityLog = (deviceName: string, action: string, type: 'device' | 'scene' | 'automation') => {
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      timestamp: new Date(),
      deviceName,
      action,
      type,
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const toggleDevice = (deviceId: string) => {
    setDevices(prev => prev.map(device => {
      if (device.id === deviceId) {
        const newState = !device.isOn;
        addActivityLog(device.name, newState ? 'Turned ON' : 'Turned OFF', 'device');
        return { ...device, isOn: newState };
      }
      return device;
    }));
  };

  const updateDeviceBrightness = (deviceId: string, brightness: number) => {
    setDevices(prev => prev.map(device => {
      if (device.id === deviceId) {
        addActivityLog(device.name, `Brightness changed to ${brightness}%`, 'device');
        return { ...device, brightness };
      }
      return device;
    }));
  };

  const updateDeviceSpeed = (deviceId: string, speed: number) => {
    setDevices(prev => prev.map(device => {
      if (device.id === deviceId) {
        addActivityLog(device.name, `Speed changed to ${speed}%`, 'device');
        return { ...device, speed };
      }
      return device;
    }));
  };

  const updateDeviceTemperature = (deviceId: string, temperature: number) => {
    setDevices(prev => prev.map(device => {
      if (device.id === deviceId) {
        addActivityLog(device.name, `Temperature set to ${temperature}°C`, 'device');
        return { ...device, temperature };
      }
      return device;
    }));
  };

  const activateScene = (sceneId: string) => {
    const scene = scenes.find(s => s.id === sceneId);
    if (scene) {
      addActivityLog(scene.name, 'Scene activated', 'scene');
    }
  };

  const toggleAutomation = (automationId: string) => {
    setAutomations(prev => prev.map(automation => {
      if (automation.id === automationId) {
        const newState = !automation.enabled;
        addActivityLog(automation.name, newState ? 'Automation enabled' : 'Automation disabled', 'automation');
        return { ...automation, enabled: newState };
      }
      return automation;
    }));
  };

  const toggleAllDevicesInRoom = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;

    const roomDevices = devices.filter(d => d.room === room.name);
    const anyDeviceOn = roomDevices.some(d => d.isOn);
    const newState = !anyDeviceOn;

    setDevices(prev => prev.map(device => {
      if (device.room === room.name) {
        return { ...device, isOn: newState };
      }
      return device;
    }));

    addActivityLog(room.name, newState ? 'All devices turned ON' : 'All devices turned OFF', 'device');
  };

  const login = (email: string, password: string) => {
    // Mock authentication
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AppContext.Provider
      value={{
        devices,
        rooms,
        scenes,
        automations,
        activityLogs,
        theme,
        toggleTheme,
        toggleDevice,
        updateDeviceBrightness,
        updateDeviceSpeed,
        updateDeviceTemperature,
        activateScene,
        toggleAutomation,
        toggleAllDevicesInRoom,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
