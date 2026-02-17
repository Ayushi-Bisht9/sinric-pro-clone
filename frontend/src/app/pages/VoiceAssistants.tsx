import React from 'react';
import { Mic, CheckCircle, Circle } from 'lucide-react';

const assistants = [
  {
    id: '1',
    name: 'Amazon Alexa',
    description: 'Control your devices with Alexa voice commands',
    connected: true,
    icon: '🔵',
  },
  {
    id: '2',
    name: 'Google Assistant',
    description: 'Use "Hey Google" to manage your smart home',
    connected: true,
    icon: '🔴',
  },
  {
    id: '3',
    name: 'Apple Siri',
    description: 'Control devices using Siri on your Apple devices',
    connected: false,
    icon: '⚪',
  },
];

export const VoiceAssistants: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 dark:text-white mb-2">Voice Assistants</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Connect and manage voice assistant integrations
        </p>
      </div>

      {/* Assistants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assistants.map(assistant => (
          <div
            key={assistant.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
          >
            {/* Icon */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center text-3xl">
                {assistant.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-white mb-1">{assistant.name}</h3>
                <div className="flex items-center gap-2">
                  {assistant.connected ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500">Connected</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Not Connected</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {assistant.description}
            </p>

            {/* Action Button */}
            {assistant.connected ? (
              <button className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors">
                Disconnect
              </button>
            ) : (
              <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl transition-all shadow-lg hover:shadow-xl">
                Connect
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Voice Commands Info */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-indigo-100 dark:border-gray-600">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Mic className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-gray-900 dark:text-white mb-2">Example Voice Commands</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• "Turn on the living room lights"</li>
              <li>• "Set bedroom temperature to 22 degrees"</li>
              <li>• "Activate movie time scene"</li>
              <li>• "Turn off all devices"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
