import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { User, Bell, Shield, Palette, Key, Globe, HelpCircle, LogOut } from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';

export const Settings: React.FC = () => {
  const { theme, toggleTheme, logout } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <h3 className="text-gray-900 dark:text-white">Profile Settings</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-gray-900 dark:text-white mb-1">John Doe</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">john.doe@example.com</p>
            </div>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <h3 className="text-gray-900 dark:text-white">Appearance</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-gray-900 dark:text-white mb-1">Dark Mode</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Switch between light and dark theme
              </p>
            </div>
            <Switch.Root
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
              className={`w-12 h-6 rounded-full transition-all ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 transform translate-x-0.5 data-[state=checked]:translate-x-6 shadow-lg" />
            </Switch.Root>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <h3 className="text-gray-900 dark:text-white">Notifications</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-gray-900 dark:text-white mb-1">Device Status Changes</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get notified when devices go online or offline
              </p>
            </div>
            <Switch.Root
              defaultChecked
              className="w-12 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 transform translate-x-0.5 data-[state=checked]:translate-x-6 shadow-lg" />
            </Switch.Root>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-gray-900 dark:text-white mb-1">Automation Triggers</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Notifications when automations are triggered
              </p>
            </div>
            <Switch.Root
              defaultChecked
              className="w-12 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 transform translate-x-0.5 data-[state=checked]:translate-x-6 shadow-lg" />
            </Switch.Root>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-gray-900 dark:text-white mb-1">Security Alerts</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Important security notifications
              </p>
            </div>
            <Switch.Root
              defaultChecked
              className="w-12 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 transform translate-x-0.5 data-[state=checked]:translate-x-6 shadow-lg" />
            </Switch.Root>
          </div>
        </div>
      </div>

      {/* API & Integrations */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Key className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <h3 className="text-gray-900 dark:text-white">API & Integrations</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">API Key</label>
            <div className="flex gap-3">
              <input
                type="text"
                value="sk_live_••••••••••••••••••••"
                readOnly
                className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-lg transition-all">
                Regenerate
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Globe className="w-8 h-8 text-indigo-600 mb-2" />
              <h4 className="text-gray-900 dark:text-white mb-1">Google Home</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Connected</p>
              <button className="text-sm text-red-600 dark:text-red-400">Disconnect</button>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Globe className="w-8 h-8 text-blue-600 mb-2" />
              <h4 className="text-gray-900 dark:text-white mb-1">Amazon Alexa</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Connected</p>
              <button className="text-sm text-red-600 dark:text-red-400">Disconnect</button>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Globe className="w-8 h-8 text-gray-400 mb-2" />
              <h4 className="text-gray-900 dark:text-white mb-1">Apple HomeKit</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Not connected</p>
              <button className="text-sm text-indigo-600 dark:text-indigo-400">Connect</button>
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <h3 className="text-gray-900 dark:text-white">Security</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
            <h4 className="text-gray-900 dark:text-white mb-1">Change Password</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
          </button>
          <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
            <h4 className="text-gray-900 dark:text-white mb-1">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</p>
          </button>
        </div>
      </div>

      {/* Help & Support */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <h3 className="text-gray-900 dark:text-white">Help & Support</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
            Documentation
          </button>
          <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
            Contact Support
          </button>
          <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
            Privacy Policy
          </button>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
};
