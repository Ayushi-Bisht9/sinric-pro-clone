import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "@/app/context/AppContext";

import { Login } from "@/app/components/Login";
import { Register } from "@/app/components/Register";
import { Navbar } from "@/app/components/Navbar";
import { Sidebar } from "@/app/components/Sidebar";

import { Dashboard } from "@/app/pages/Dashboard";
import { Devices } from "@/app/pages/Devices";
import { Rooms } from "@/app/pages/Rooms";
import { Scenes } from "@/app/pages/Scenes";
import { SceneEditor } from "@/app/pages/SceneEditor";   // ✅ NEW
import { Automations } from "@/app/pages/Automations";
import { VoiceAssistants } from "@/app/pages/VoiceAssistants";
import { Logs } from "@/app/pages/Logs";
import { Settings } from "@/app/pages/Settings";

const AppContent: React.FC = () => {
  const { isAuthenticated } = useApp();

  // ==========================
  // PUBLIC ROUTES (Not Logged In)
  // ==========================
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // ==========================
  // PRIVATE ROUTES (Logged In)
  // ==========================
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

          {/* ✅ NEW ROUTES FOR SCENE EDITOR */}
          <Route path="/scenes/new" element={<SceneEditor />} />
          <Route path="/scenes/edit/:id" element={<SceneEditor />} />

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
