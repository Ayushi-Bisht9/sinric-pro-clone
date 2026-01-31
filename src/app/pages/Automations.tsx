import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { Plus, Edit, Trash2, Zap } from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';

export const Automations: React.FC = () => {
  const { automations, toggleAutomation } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-white mb-2">Automations</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create smart rules to automate your home
          </p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create Automation
        </button>
      </div>

      {/* Automations List */}
      <div className="space-y-4">
        {automations.map(automation => (
          <div
            key={automation.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  automation.enabled
                    ? 'bg-gradient-to-br from-indigo-600 to-blue-600 shadow-lg shadow-indigo-500/30'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <Zap className={`w-6 h-6 ${automation.enabled ? 'text-white' : 'text-gray-400'}`} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-gray-900 dark:text-white mb-3">{automation.name}</h3>
                  
                  {/* Rule Builder */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm">
                      IF
                    </span>
                    <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">
                      {automation.condition}
                    </span>
                    <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm">
                      THEN
                    </span>
                    <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">
                      {automation.action}
                    </span>
                  </div>

                  {/* Status */}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Status: {automation.enabled ? (
                      <span className="text-green-500">Active</span>
                    ) : (
                      <span className="text-gray-500">Disabled</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 ml-4">
                <Switch.Root
                  checked={automation.enabled}
                  onCheckedChange={() => toggleAutomation(automation.id)}
                  className={`w-12 h-6 rounded-full transition-all ${
                    automation.enabled 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 transform translate-x-0.5 data-[state=checked]:translate-x-6 shadow-lg" />
                </Switch.Root>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Edit className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
                <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors group">
                  <Trash2 className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-indigo-100 dark:border-gray-600">
          <h3 className="text-gray-900 dark:text-white mb-2">Getting Started</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Automations help you create smart rules based on conditions like time, temperature, or device status to trigger specific actions automatically.
          </p>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-purple-100 dark:border-gray-600">
          <h3 className="text-gray-900 dark:text-white mb-2">Example Use Cases</h3>
          <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
            <li>• Turn lights on at sunset</li>
            <li>• Adjust temperature when you leave</li>
            <li>• Morning wake-up routines</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
