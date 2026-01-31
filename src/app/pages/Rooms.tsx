import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { 
  Sofa, 
  Bed, 
  UtensilsCrossed, 
  Car, 
  Trees, 
  DoorOpen,
  Power,
  Wifi,
  WifiOff
} from 'lucide-react';

const roomIcons: Record<string, any> = {
  'sofa': Sofa,
  'bed': Bed,
  'utensils': UtensilsCrossed,
  'car': Car,
  'trees': Trees,
  'door-open': DoorOpen,
};

export const Rooms: React.FC = () => {
  const { rooms, devices, toggleAllDevicesInRoom } = useApp();

  const getRoomDevices = (roomName: string) => {
    return devices.filter(d => d.room === roomName);
  };

  const getRoomStats = (roomName: string) => {
    const roomDevices = getRoomDevices(roomName);
    const onlineCount = roomDevices.filter(d => d.status === 'online').length;
    const activeCount = roomDevices.filter(d => d.isOn).length;
    return { total: roomDevices.length, online: onlineCount, active: activeCount };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 dark:text-white mb-2">Rooms</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage devices by room
        </p>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => {
          const Icon = roomIcons[room.icon];
          const stats = getRoomStats(room.name);
          const allDevicesOn = stats.active === stats.total && stats.total > 0;

          return (
            <div
              key={room.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white">{room.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {stats.total} devices
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Wifi className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Online</span>
                  </div>
                  <p className="text-gray-900 dark:text-white">
                    {stats.online}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Power className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Active</span>
                  </div>
                  <p className="text-gray-900 dark:text-white">
                    {stats.active}
                  </p>
                </div>
              </div>

              {/* Devices List */}
              <div className="space-y-2 mb-6">
                {getRoomDevices(room.name).slice(0, 3).map(device => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-700 dark:text-gray-300">{device.name}</span>
                    <div className="flex items-center gap-2">
                      {device.status === 'online' ? (
                        <Wifi className="w-3 h-3 text-green-500" />
                      ) : (
                        <WifiOff className="w-3 h-3 text-red-500" />
                      )}
                      <span className={`w-2 h-2 rounded-full ${device.isOn ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></span>
                    </div>
                  </div>
                ))}
                {stats.total > 3 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    +{stats.total - 3} more devices
                  </p>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={() => toggleAllDevicesInRoom(room.id)}
                className={`w-full py-3 rounded-xl transition-all duration-300 shadow-lg ${
                  allDevicesOn
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                }`}
              >
                Turn {allDevicesOn ? 'Off' : 'On'} All Devices
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
