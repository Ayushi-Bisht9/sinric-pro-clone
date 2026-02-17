import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Mail, Lock } from "lucide-react";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Account created successfully!");
      navigate("/");
    } catch (err) {
      alert("Backend not reachable");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 space-y-8">
          
          {/* Logo */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl mb-4">
              <Home className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-gray-900 dark:text-white mb-2">
              Create Account
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Register to access Smart Home Dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-6">
            
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white transition-all"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Register
            </button>
          </form>

          {/* Back */}
          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Back to Login
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
