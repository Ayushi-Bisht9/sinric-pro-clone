import React, { useState } from 'react';
import { useApp } from '@/app/context/AppContext';
import { format } from 'date-fns';
import { Lightbulb, Wand2, Zap, Search, Filter } from 'lucide-react';

const typeIcons = {
  device: Lightbulb,
  scene: Wand2,
  automation: Zap,
};

const typeColors = {
  device: 'from-blue-500 to-cyan-500',
  scene: 'from-purple-500 to-pink-500',
  automation: 'from-orange-500 to-red-500',
};

export const Logs: React.FC = () => {
  const { activityLogs } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = log.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || log.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 dark:text-white mb-2">Activity Logs</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track all activities and events in your smart home
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
            />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-11 pr-8 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white appearance-none cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="device">Devices</option>
              <option value="scene">Scenes</option>
              <option value="automation">Automations</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-400">
          Showing {filteredLogs.length} of {activityLogs.length} activities
        </p>
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {filteredLogs.map((log, index) => {
            const Icon = typeIcons[log.type];
            const colorClass = typeColors[log.type];

            return (
              <div
                key={log.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 bg-gradient-to-br ${colorClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-gray-900 dark:text-white mb-1">
                          {log.deviceName}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {log.action}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {format(log.timestamp, 'MMM d, yyyy')}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {format(log.timestamp, 'h:mm a')}
                        </p>
                      </div>
                    </div>
                    <span className="inline-block mt-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded-full capitalize">
                      {log.type}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredLogs.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400">No activities found</p>
        </div>
      )}
    </div>
  );
};
