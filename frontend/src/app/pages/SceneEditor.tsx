import React, { useEffect, useState } from "react";
import { useApp } from "@/app/context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

export const SceneEditor: React.FC = () => {
  const { devices, rooms, addScene, fetchScenes, currentUser } = useApp();
  const navigate = useNavigate();
  const { id } = useParams(); // for edit mode

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDevices, setSelectedDevices] = useState<
    Record<string, { isOn: boolean }>
  >({});

  // Group devices by room
  const devicesByRoom = rooms.map((room) => ({
    roomName: room.name,
    devices: devices.filter((d) => d.room === room.name),
  }));

  const toggleDeviceSelection = (deviceId: string) => {
    setSelectedDevices((prev) => {
      if (prev[deviceId]) {
        const updated = { ...prev };
        delete updated[deviceId];
        return updated;
      } else {
        return {
          ...prev,
          [deviceId]: { isOn: true },
        };
      }
    });
  };

  const toggleDeviceState = (deviceId: string) => {
    setSelectedDevices((prev) => ({
      ...prev,
      [deviceId]: {
        isOn: !prev[deviceId].isOn,
      },
    }));
  };

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Scene name required");
      return;
    }

    if (!currentUser) return;

    // 1️⃣ Create scene
    const sceneId = await addScene(name, "sunrise", description);

    if (!sceneId) {
      alert("Scene creation failed");
      return;
    }

    // 2️⃣ Add selected devices
    for (const deviceId in selectedDevices) {
      await fetch("http://localhost:5000/scene_devices", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scene_id: sceneId,
          device_id: deviceId,
          isOn: selectedDevices[deviceId].isOn ? 1 : 0,
          brightness: null,
          speed: null,
          temperature: null,
        }),
      });
    }

    await fetchScenes(currentUser.u_id);

    navigate("/scenes");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 dark:text-white mb-2">
          {id ? "Edit Scene" : "Create Scene"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configure devices and actions for this scene
        </p>
      </div>

      {/* Scene Details */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Scene Name"
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Scene Description"
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
        />
      </div>

      {/* Device Selection */}
      <div className="space-y-6">
        {devicesByRoom.map((room) =>
          room.devices.length > 0 ? (
            <div
              key={room.roomName}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-gray-900 dark:text-white mb-4">
                {room.roomName}
              </h3>

              <div className="space-y-3">
                {room.devices.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!selectedDevices[device.id]}
                        onChange={() => toggleDeviceSelection(device.id)}
                      />
                      <span className="text-gray-900 dark:text-white">
                        {device.name}
                      </span>
                    </div>

                    {selectedDevices[device.id] && (
                      <button
                        onClick={() => toggleDeviceState(device.id)}
                        className={`px-4 py-2 rounded-lg text-white ${
                          selectedDevices[device.id].isOn
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {selectedDevices[device.id].isOn ? "ON" : "OFF"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>

      {/* Save Button */}
      <div>
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          Save Scene
        </button>
      </div>
    </div>
  );
};
