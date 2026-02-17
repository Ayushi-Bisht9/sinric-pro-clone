import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Home, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate(); // ✅ INSIDE component

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 space-y-8">
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl mb-4">
              <Home className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-gray-900 dark:text-white mb-2">
              Smart Home Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Sign in to manage your devices
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white placeholder-gray-400"
                placeholder="Enter your email" required/>
              </div>
            </div>

            <div>
              <label>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white placeholder-gray-400"
                placeholder="Enter your password" required/>
              </div>
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl">
              Sign In
            </button>
          </form>

          <div className="flex justify-between text-sm">
            <button className="text-indigo-600 hover:underline">
              Forgot password?
            </button>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-indigo-600 hover:underline"
            >
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
