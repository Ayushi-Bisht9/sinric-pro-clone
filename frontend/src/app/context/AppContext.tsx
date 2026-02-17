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
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  currentUser: { u_id: number; email: string } | null;
  addDevice: (name: string, type: string, room: string) => Promise<void>;
  addScene: (name: string, icon: string, description: string) => Promise<void>;
  deleteScene: (sceneId: string) => Promise<void>;
  updateScene: (sceneId: string,name: string,icon: string,description: string) => Promise<void>;

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
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme === "dark" ? "dark" : "light";
});

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [currentUser, setCurrentUser] = useState<{ u_id: number; email: string } | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);


  const [rooms] = useState<Room[]>([
    { id: '1', name: 'Living Room', icon: 'sofa', deviceCount: 4 },
    { id: '2', name: 'Bedroom', icon: 'bed', deviceCount: 3 },
    { id: '3', name: 'Kitchen', icon: 'utensils', deviceCount: 2 },
    { id: '4', name: 'Garage', icon: 'car', deviceCount: 1 },
    { id: '5', name: 'Outdoor', icon: 'trees', deviceCount: 1 },
    { id: '6', name: 'Hallway', icon: 'door-open', deviceCount: 1 },
  ]);

  const [scenes, setScenes] = useState<Scene[]>([]);

  const [automations, setAutomations] = useState<Automation[]>([
    { id: '1', name: 'Turn on lights at sunset', condition: 'Time is 6:00 PM', action: 'Turn on Outdoor Light', enabled: true },
    { id: '2', name: 'Turn off AC when away', condition: 'No one is home', action: 'Turn off all AC', enabled: true },
    { id: '3', name: 'Morning routine', condition: 'Time is 7:00 AM', action: 'Activate Good Morning scene', enabled: false },
    { id: '4', name: 'Energy saver', condition: 'Temperature > 30°C', action: 'Set AC to 24°C', enabled: true },
  ]);

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    { id: '1', timestamp: new Date('2026-01-31T14:30:00'), deviceName: 'Dinning room', action: 'Turned ON', type: 'device' },
    { id: '2', timestamp: new Date('2026-01-31T14:25:00'), deviceName: 'Living Room AC', action: 'Turned ON', type: 'device' },
    { id: '3', timestamp: new Date('2026-01-31T14:20:00'), deviceName: 'Good Morning', action: 'Scene activated', type: 'scene' },
    { id: '4', timestamp: new Date('2026-01-31T14:15:00'), deviceName: 'Ceiling Fan', action: 'Speed changed to 60%', type: 'device' },
    { id: '5', timestamp: new Date('2026-01-31T14:10:00'), deviceName: 'Energy saver', action: 'Automation triggered', type: 'automation' },
    { id: '6', timestamp: new Date('2026-01-31T14:05:00'), deviceName: 'Kitchen Light', action: 'Turned ON', type: 'device' },
    { id: '7', timestamp: new Date('2026-01-31T14:00:00'), deviceName: 'Smart TV', action: 'Turned OFF', type: 'device' },
    { id: '8', timestamp: new Date('2026-01-31T13:55:00'), deviceName: 'Outdoor Light', action: 'Turned ON', type: 'device' },
    { id: '9', timestamp: new Date('2026-01-31T13:55:00'), deviceName: 'Outdoor Light', action: 'Turned ON', type: 'device' },
  ]);

  useEffect(() => {
  // Apply class to HTML
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // Save to localStorage
  localStorage.setItem("theme", theme);
}, [theme]);



  useEffect(() => {
  const checkSession = async () => {
    try {
      const res = await fetch("http://localhost:5000/me", {
        credentials: "include", // 🔥 IMPORTANT
      });

      if (res.ok) {
        const user = await res.json();
        setCurrentUser(user);
        setIsAuthenticated(true);
        await fetchDevices(user.u_id);
        await fetchScenes(user.u_id);
      }
    } catch (err) {
      console.log("Session check failed");
    }
  };

  checkSession();
}, []);



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

  const toggleDevice = async (deviceId: string) => {
  const device = devices.find(d => d.id === deviceId);
  if (!device || !currentUser) return;

  const newState = !device.isOn;

  try {
    const res = await fetch(`http://localhost:5000/devices/${deviceId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isOn: newState,
        brightness: device.brightness ?? null,
        speed: device.speed ?? null,
        temperature: device.temperature ?? null
      }),
    });

    if (!res.ok) {
      alert("Update failed");
      return;
    }

    // Update UI instantly
    setDevices(prev =>
      prev.map(d =>
        d.id === deviceId ? { ...d, isOn: newState } : d
      )
    );

  } catch (err) {
    console.error("Toggle update error:", err);
  }
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

  const activateScene = async (sceneId: string) => {
  if (!currentUser) return;

  try {
    const res = await fetch(
      `http://localhost:5000/scenes/${sceneId}/activate`,
      {
        method: "POST",
        credentials: "include"
      }
    );

    if (!res.ok) {
      alert("Scene activation failed");
      return;
    }

    // Refresh devices after activation
    await fetchDevices(currentUser.u_id);

    addActivityLog("Scene", "Scene activated", "scene");

  } catch (err) {
    console.error("Scene activation error:", err);
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

    const roomDevices = devices.filter(
  d => d.room?.trim().toLowerCase() === room.name.trim().toLowerCase()
);
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


  const fetchDevices = async (userId: number) => {
  try {
    const res = await fetch(`http://localhost:5000/devices/${userId}`, {
      credentials: "include",
    });

    const data = await res.json();

    const formatted = data.map((d: any) => ({
      id: String(d.d_id),
      name: d.name,
      type: d.type,
      room: d.room?.trim(),
      status: d.status,
      isOn: Boolean(d.isOn),
      brightness: d.brightness ?? undefined,
      speed: d.speed ?? undefined,
      temperature: d.temperature ?? undefined,
    }));

    setDevices(formatted);

  } catch (err) {
    console.error("Device fetch error:", err);
  }
};

const fetchScenes = async (userId: number) => {
  try {
    const res = await fetch(`http://localhost:5000/scenes/${userId}`, {
      credentials: "include",
    });

    const data = await res.json();

    const formatted = data.map((s: any) => ({
      id: String(s.s_id),
      name: s.name,
      icon: s.icon,
      description: s.description,
    }));

    setScenes(formatted);
  } catch (err) {
    console.error("Scene fetch error:", err);
  }
};

  const login = async (email: string, password: string) => {
  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 🔥 VERY IMPORTANT
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    setCurrentUser(data.user);
    setIsAuthenticated(true);

    await fetchDevices(data.user.u_id);
    await fetchScenes(data.user.u_id);

  } catch (error) {
    alert("Backend not reachable");
  }
};

const register = async (email: string, password: string) => {
  try {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Account created successfully!");
  } catch (error) {
    console.error("Register error:", error);
    alert("Backend not reachable");
  }
};


const addDevice = async (name: string, type: string, room: string) => {
  if (!currentUser) return;

  try {
    const res = await fetch("http://localhost:5000/devices", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: currentUser.u_id,
        name,
        type,
        room,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    // 🔥 reload devices
    await fetchDevices(currentUser.u_id);

  } catch (err) {
    console.error("Add device error:", err);
  }
};

const addScene = async (name: string, icon: string, description: string) => {
  if (!currentUser) return null;

  try {
    const res = await fetch("http://localhost:5000/scenes", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: currentUser.u_id,
        name,
        icon,
        description,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Scene creation failed");
      return null;
    }

    return data.s_id;   // 🔥 RETURN SCENE ID

  } catch (err) {
    console.error("Add scene error:", err);
    return null;
  }
};


const deleteScene = async (sceneId: string) => {
  if (!currentUser) return;

  try {
    const res = await fetch(
      `http://localhost:5000/scenes/${sceneId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!res.ok) {
      alert("Failed to delete scene");
      return;
    }

    await fetchScenes(currentUser.u_id);

  } catch (err) {
    console.error("Delete scene error:", err);
  }
};

const updateScene = async (
  id: string,
  name: string,
  icon: string,
  description: string
) => {
  try {
    const res = await fetch(`http://localhost:5000/scenes/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, icon, description }),
    });

    if (!res.ok) {
      alert("Update failed");
      return;
    }

    if (currentUser) {
      await fetchScenes(currentUser.u_id);
    }
  } catch (err) {
    console.error("Update error:", err);
  }
};



  const logout = async () => {
  try {
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });

    setCurrentUser(null);
    setIsAuthenticated(false);
    setDevices([]);

  } catch (error) {
    console.error("Logout error:", error);
  }
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
        register,
        currentUser,
        addDevice,
        addScene,
        updateScene,
        deleteScene
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
