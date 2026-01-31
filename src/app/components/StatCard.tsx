import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const colorClasses = {
  blue: {
    bg: 'from-blue-500 to-cyan-500',
    shadow: 'shadow-blue-500/30',
  },
  green: {
    bg: 'from-green-500 to-emerald-500',
    shadow: 'shadow-green-500/30',
  },
  purple: {
    bg: 'from-purple-500 to-pink-500',
    shadow: 'shadow-purple-500/30',
  },
  orange: {
    bg: 'from-orange-500 to-red-500',
    shadow: 'shadow-orange-500/30',
  },
};

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => {
  const colors = colorClasses[color];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`w-14 h-14 bg-gradient-to-br ${colors.bg} rounded-xl flex items-center justify-center shadow-lg ${colors.shadow}`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );
};
