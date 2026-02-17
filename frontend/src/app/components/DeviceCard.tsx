import React from 'react';
import { useApp, Device } from '@/app/context/AppContext';
import { Lightbulb, Fan, Wind, Tv, ToggleLeft, Thermometer } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import * as Switch from '@radix-ui/react-switch';

interface DeviceCardProps {
  device: Device;
}

const deviceIcons = {
  light: Lightbulb,
  fan: Fan,
  ac: Wind,
  tv: Tv,
  switch: ToggleLeft,
  thermostat: Thermometer,
};

export const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {
  const { 
    toggleDevice, 
    updateDeviceBrightness, 
    updateDeviceSpeed, 
    updateDeviceTemperature 
  } = useApp();

  const Icon = deviceIcons[device.type];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
            device.isOn
              ? 'bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/30'
              : 'bg-gray-100 dark:bg-gray-700'
          }`}>
            <Icon className={`w-6 h-6 ${device.isOn ? 'text-white' : 'text-gray-400'}`} />
          </div>
          <div>
            <h3 className="text-gray-900 dark:text-white">{device.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{device.room}</p>
          </div>
        </div>
        <Switch.Root
          checked={device.isOn}
          onCheckedChange={() => toggleDevice(device.id)}
          className={`w-12 h-6 rounded-full transition-all ${
            device.isOn 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
              : 'bg-gray-300 dark:bg-gray-600'
          }`}
        >
          <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 transform translate-x-0.5 data-[state=checked]:translate-x-6 shadow-lg" />
        </Switch.Root>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`w-2 h-2 rounded-full ${
          device.status === 'online' 
            ? 'bg-green-500 animate-pulse' 
            : 'bg-red-500'
        }`}></span>
        <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
          {device.status}
        </span>
      </div>

      {/* Controls */}
      {device.brightness !== undefined && device.isOn && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Brightness</span>
            <span className="text-gray-900 dark:text-white">{device.brightness}%</span>
          </div>
          <Slider.Root
            value={[device.brightness]}
            onValueChange={(values) => updateDeviceBrightness(device.id, values[0])}
            max={100}
            step={1}
            className="relative flex items-center w-full h-5 cursor-pointer"
          >
            <Slider.Track className="relative bg-gray-200 dark:bg-gray-700 rounded-full h-2 flex-grow">
              <Slider.Range className="absolute bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-white shadow-lg rounded-full border-2 border-indigo-500 hover:scale-110 transition-transform" />
          </Slider.Root>
        </div>
      )}

      {device.speed !== undefined && device.isOn && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Speed</span>
            <span className="text-gray-900 dark:text-white">{device.speed}%</span>
          </div>
          <Slider.Root
            value={[device.speed]}
            onValueChange={(values) => updateDeviceSpeed(device.id, values[0])}
            max={100}
            step={1}
            className="relative flex items-center w-full h-5 cursor-pointer"
          >
            <Slider.Track className="relative bg-gray-200 dark:bg-gray-700 rounded-full h-2 flex-grow">
              <Slider.Range className="absolute bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-white shadow-lg rounded-full border-2 border-indigo-500 hover:scale-110 transition-transform" />
          </Slider.Root>
        </div>
      )}

      {device.temperature !== undefined && device.isOn && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Temperature</span>
            <span className="text-gray-900 dark:text-white">{device.temperature}°C</span>
          </div>
          <Slider.Root
            value={[device.temperature]}
            onValueChange={(values) => updateDeviceTemperature(device.id, values[0])}
            min={16}
            max={30}
            step={1}
            className="relative flex items-center w-full h-5 cursor-pointer"
          >
            <Slider.Track className="relative bg-gray-200 dark:bg-gray-700 rounded-full h-2 flex-grow">
              <Slider.Range className="absolute bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-white shadow-lg rounded-full border-2 border-blue-500 hover:scale-110 transition-transform" />
          </Slider.Root>
        </div>
      )}
    </div>
  );
};
