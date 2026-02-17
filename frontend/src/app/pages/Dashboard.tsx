import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { DeviceCard } from '@/app/components/DeviceCard';
import { StatCard } from '@/app/components/StatCard';
import { Lightbulb, Power, Zap, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { devices, automations } = useApp();

  const totalDevices = devices.length;
  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const activeAutomations = automations.filter(a => a.enabled).length;
  const activeDevices = devices.filter(d => d.isOn).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's an overview of your smart home
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Devices"
          value={totalDevices}
          icon={Lightbulb}
          color="blue"
        />
        <StatCard
          title="Online Devices"
          value={onlineDevices}
          icon={Power}
          color="green"
        />
        <StatCard
          title="Active Devices"
          value={activeDevices}
          icon={TrendingUp}
          color="purple"
        />
        <StatCard
          title="Active Automations"
          value={activeAutomations}
          icon={Zap}
          color="orange"
        />
      </div>

      {/* Devices Grid */}
      <div>
        <h2 className="text-gray-900 dark:text-white mb-4">Your Devices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {devices.map(device => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      </div>
    </div>
  );
};
