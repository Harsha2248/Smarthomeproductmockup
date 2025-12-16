import { useState } from 'react';
import { Shield, Lock, Camera, AlertTriangle, CheckCircle, Bell } from 'lucide-react';
import { motion } from 'motion/react';

interface Camera {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'offline';
}

export function SecurityPanel() {
  const [systemArmed, setSystemArmed] = useState(false);
  const [doorLocked, setDoorLocked] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const cameras: Camera[] = [
    { id: '1', name: 'Front Door', location: 'Entrance', status: 'active' },
    { id: '2', name: 'Backyard', location: 'Garden', status: 'active' },
    { id: '3', name: 'Garage', location: 'Garage', status: 'active' },
    { id: '4', name: 'Driveway', location: 'Outside', status: 'offline' },
  ];

  const recentEvents = [
    { id: '1', event: 'Front door unlocked', time: '2 minutes ago', type: 'info' },
    { id: '2', event: 'Motion detected - Backyard', time: '15 minutes ago', type: 'warning' },
    { id: '3', event: 'System armed', time: '2 hours ago', type: 'success' },
    { id: '4', event: 'Garage door opened', time: '3 hours ago', type: 'info' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl mb-1">Security Center</h2>
        <p className="text-slate-400">Monitor and control your home security</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => setSystemArmed(!systemArmed)}
          className={`rounded-2xl p-6 border cursor-pointer transition-all ${
            systemArmed
              ? 'bg-gradient-to-br from-red-600 to-red-700 border-red-500 shadow-lg shadow-red-600/30'
              : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              systemArmed ? 'bg-white/20' : 'bg-slate-700'
            }`}>
              <Shield className={`w-6 h-6 ${systemArmed ? 'text-white' : 'text-slate-400'}`} />
            </div>
            <div className={`text-xs px-3 py-1.5 rounded-full ${
              systemArmed ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-400'
            }`}>
              {systemArmed ? 'ARMED' : 'DISARMED'}
            </div>
          </div>
          <h3 className={systemArmed ? 'text-white' : 'text-slate-300'}>Security System</h3>
          <p className={`text-sm ${systemArmed ? 'text-red-100' : 'text-slate-500'}`}>
            {systemArmed ? 'Home protected' : 'Tap to arm'}
          </p>
        </motion.div>

        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => setDoorLocked(!doorLocked)}
          className={`rounded-2xl p-6 border cursor-pointer transition-all ${
            doorLocked
              ? 'bg-gradient-to-br from-green-600 to-green-700 border-green-500 shadow-lg shadow-green-600/30'
              : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              doorLocked ? 'bg-white/20' : 'bg-slate-700'
            }`}>
              <Lock className={`w-6 h-6 ${doorLocked ? 'text-white' : 'text-slate-400'}`} />
            </div>
            <div className={`text-xs px-3 py-1.5 rounded-full ${
              doorLocked ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-400'
            }`}>
              {doorLocked ? 'LOCKED' : 'UNLOCKED'}
            </div>
          </div>
          <h3 className={doorLocked ? 'text-white' : 'text-slate-300'}>Smart Lock</h3>
          <p className={`text-sm ${doorLocked ? 'text-green-100' : 'text-slate-500'}`}>
            {doorLocked ? 'All doors secured' : 'Tap to lock'}
          </p>
        </motion.div>

        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => setNotifications(!notifications)}
          className={`rounded-2xl p-6 border cursor-pointer transition-all ${
            notifications
              ? 'bg-gradient-to-br from-blue-600 to-blue-700 border-blue-500 shadow-lg shadow-blue-600/30'
              : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              notifications ? 'bg-white/20' : 'bg-slate-700'
            }`}>
              <Bell className={`w-6 h-6 ${notifications ? 'text-white' : 'text-slate-400'}`} />
            </div>
            <div className={`text-xs px-3 py-1.5 rounded-full ${
              notifications ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-400'
            }`}>
              {notifications ? 'ON' : 'OFF'}
            </div>
          </div>
          <h3 className={notifications ? 'text-white' : 'text-slate-300'}>Notifications</h3>
          <p className={`text-sm ${notifications ? 'text-blue-100' : 'text-slate-500'}`}>
            {notifications ? 'Alerts enabled' : 'Tap to enable'}
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-6">
            <Camera className="w-5 h-5 text-blue-400" />
            <h3 className="text-white">Security Cameras</h3>
          </div>
          <div className="space-y-3">
            {cameras.map((camera) => (
              <div key={camera.id} className="flex items-center justify-between bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    camera.status === 'active' ? 'bg-green-600' : 'bg-slate-600'
                  }`}>
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white">{camera.name}</p>
                    <p className="text-slate-400 text-sm">{camera.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    camera.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-slate-500'
                  }`}></div>
                  <span className={`text-sm ${
                    camera.status === 'active' ? 'text-green-400' : 'text-slate-500'
                  }`}>
                    {camera.status === 'active' ? 'Active' : 'Offline'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <h3 className="text-white">Recent Events</h3>
          </div>
          <div className="space-y-3">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 bg-slate-700/30 rounded-lg p-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  event.type === 'success' ? 'bg-green-600' :
                  event.type === 'warning' ? 'bg-orange-600' :
                  'bg-blue-600'
                }`}>
                  {event.type === 'success' ? <CheckCircle className="w-4 h-4 text-white" /> :
                   event.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-white" /> :
                   <Bell className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white">{event.event}</p>
                  <p className="text-slate-400 text-sm">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
