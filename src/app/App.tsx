import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from '@/app/context/AppContext';
import { Login } from '@/app/components/Login';
import { Navbar } from '@/app/components/Navbar';
import { Sidebar } from '@/app/components/Sidebar';
import { Dashboard } from '@/app/pages/Dashboard';
import { Devices } from '@/app/pages/Devices';
import { Rooms } from '@/app/pages/Rooms';
import { Scenes } from '@/app/pages/Scenes';
import { Automations } from '@/app/pages/Automations';
import { VoiceAssistants } from '@/app/pages/VoiceAssistants';
import { Logs } from '@/app/pages/Logs';
import { Settings } from '@/app/pages/Settings';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Sidebar />
      <main className="ml-64 pt-20 p-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/scenes" element={<Scenes />} />
          <Route path="/automations" element={<Automations />} />
          <Route path="/voice" element={<VoiceAssistants />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
