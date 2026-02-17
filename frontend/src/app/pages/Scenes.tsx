import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/app/context/AppContext';
import {
  Sunrise,
  Tv,
  Moon,
  Lock,
  Music,
  BookOpen,
  Play,
  Edit,
  Trash2
} from 'lucide-react';

const sceneIcons: Record<string, any> = {
  sunrise: Sunrise,
  tv: Tv,
  moon: Moon,
  lock: Lock,
  music: Music,
  'book-open': BookOpen,
};

export const Scenes: React.FC = () => {
  const { scenes, activateScene, deleteScene } = useApp();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-white mb-2">Scenes</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage automation scenes
          </p>
        </div>

        {/* ✅ Professional Create Button */}
        <button
  onClick={() => navigate("/scenes/new")}
  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
>
  Create Scene
</button>

      </div>

      {/* Scenes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenes.map(scene => {
          const Icon = sceneIcons[scene.icon] || Sunrise;

          return (
            <div
              key={scene.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white">
                      {scene.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 min-h-[40px]">
                {scene.description}
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                {/* Activate */}
                <button
                  onClick={() => activateScene(scene.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  <Play className="w-4 h-4" />
                  <span>Activate</span>
                </button>

                {/* Edit */}
                <button
                  onClick={() => navigate(`/scenes/edit/${scene.id}`)}
                  className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors"
                >
                  <Edit className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </button>

                {/* Delete */}
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this scene?")) {
                      deleteScene(scene.id);
                    }
                  }}
                  className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-gray-700 dark:text-gray-300 hover:text-red-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-indigo-100 dark:border-gray-600">
        <h3 className="text-gray-900 dark:text-white mb-2">
          What are Scenes?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Scenes allow you to control multiple devices with a single action.
          Create custom scenes for different occasions like "Movie Time" or
          "Good Night" to automate your daily routines.
        </p>
      </div>
    </div>
  );
};
