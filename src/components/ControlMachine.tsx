import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Power, Lightbulb, Tv, Speaker, Thermometer, Shield, 
  Zap, ChevronUp, ChevronDown, Volume2, Sun, Moon,
  Activity, Wifi, Settings, Lock, Camera, Fan
} from 'lucide-react';
import type { Device } from './DevicePanel';

interface ControlMachineProps {
  devices: Device[];
  onDevicesChange: (devices: Device[]) => void;
  temperature: number;
  onTemperatureChange: (temp: number) => void;
}

export function ControlMachine({ devices, onDevicesChange, temperature, onTemperatureChange }: ControlMachineProps) {
  const [systemPower, setSystemPower] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [securityArmed, setSecurityArmed] = useState(false);

  const mainLight = devices.find(d => d.name === 'Main Light');
  const floorLamp = devices.find(d => d.name === 'Floor Lamp');
  const tv = devices.find(d => d.name === 'Smart TV');
  const speaker = devices.find(d => d.name === 'Sound System');

  const toggleDevice = (deviceId: string) => {
    const newDevices = devices.map(d =>
      d.id === deviceId ? { ...d, isOn: !d.isOn } : d
    );
    onDevicesChange(newDevices);
  };

  const updateDevice = (deviceId: string, updates: Partial<Device>) => {
    const newDevices = devices.map(d =>
      d.id === deviceId ? { ...d, ...updates } : d
    );
    onDevicesChange(newDevices);
  };

  const ambientBrightness = Math.max(
    mainLight?.isOn ? (mainLight.brightness || 0) : 0,
    floorLamp?.isOn ? (floorLamp.brightness || 0) : 0
  );

  const activeDevices = devices.filter(d => d.isOn).length;
  const totalPower = devices.reduce((sum, d) => sum + (d.isOn ? 1 : 0), 0) * 12.5;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Machine Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
          >
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1 rounded-2xl mb-4">
              <div className="bg-slate-900 px-8 py-4 rounded-2xl">
                <h1 className="text-white text-4xl">SMART HOME CONTROL MACHINE</h1>
                <p className="text-slate-400 mt-2">Central Command & Monitoring System</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Machine Body */}
        <div className="bg-slate-900 rounded-3xl border-4 border-slate-700 shadow-2xl shadow-blue-600/20 overflow-hidden">
          
          {/* Top Status Bar */}
          <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-b-4 border-slate-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSystemPower(!systemPower)}
                  className={`relative w-20 h-20 rounded-xl flex items-center justify-center border-4 transition-all ${
                    systemPower 
                      ? 'bg-green-600 border-green-400 shadow-lg shadow-green-600/50' 
                      : 'bg-red-600 border-red-400 shadow-lg shadow-red-600/50'
                  }`}
                >
                  <Power className="w-10 h-10 text-white" />
                  {systemPower && (
                    <motion.div
                      className="absolute inset-0 bg-green-400 rounded-xl opacity-30"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
                
                <div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${systemPower ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                    <span className="text-white">System Status: {systemPower ? 'ONLINE' : 'OFFLINE'}</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">
                    {activeDevices} Devices Active • {totalPower.toFixed(1)}W Power Draw
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-slate-800 rounded-lg px-4 py-2 border-2 border-slate-600">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-400" />
                    <span className="text-green-400">All Systems Operational</span>
                  </div>
                </div>
                
                <div className="bg-slate-800 rounded-lg px-4 py-2 border-2 border-slate-600">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-400">Connected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Control Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            
            {/* Left Panel - Live View */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Room Visualization */}
              <div className="bg-slate-800 rounded-2xl border-2 border-slate-600 overflow-hidden">
                <div className="bg-slate-700 px-4 py-2 border-b-2 border-slate-600 flex items-center justify-between">
                  <h3 className="text-white">LIVE ROOM VIEW</h3>
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-blue-400">Recording</span>
                  </div>
                </div>
                
                <div className="relative bg-slate-800" style={{ height: '400px' }}>
                  {/* Ambient Lighting */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-yellow-400/20 via-orange-400/10 to-transparent pointer-events-none"
                    animate={{ opacity: systemPower ? ambientBrightness / 100 : 0 }}
                    transition={{ duration: 0.5 }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-slate-700/30 to-slate-800/50" />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-900/80 to-transparent" />

                  <div className="relative h-full p-6 flex flex-col justify-between">
                    
                    {/* Ceiling Light */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2">
                      <motion.div className="relative w-16 h-16">
                        <div className="absolute inset-0 bg-slate-600 rounded-full border-2 border-slate-500" />
                        {mainLight?.isOn && systemPower && (
                          <>
                            <motion.div
                              className="absolute inset-0 bg-yellow-400 rounded-full blur-xl"
                              animate={{ opacity: (mainLight.brightness || 0) / 150 }}
                            />
                            <motion.div
                              className="absolute -inset-16 bg-yellow-400/30 rounded-full blur-3xl"
                              animate={{ opacity: (mainLight.brightness || 0) / 200 }}
                            />
                          </>
                        )}
                      </motion.div>
                    </div>

                    <div className="flex justify-between items-center relative z-10">
                      {/* Floor Lamp */}
                      <div className="relative">
                        <div className="w-3 h-32 bg-slate-600 rounded-t-full border-2 border-slate-500" />
                        {floorLamp?.isOn && systemPower && (
                          <>
                            <motion.div
                              className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-400 rounded-full"
                              animate={{ opacity: (floorLamp.brightness || 0) / 100 }}
                            />
                            <motion.div
                              className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-yellow-400/40 rounded-full blur-2xl"
                              animate={{ opacity: (floorLamp.brightness || 0) / 150 }}
                            />
                          </>
                        )}
                      </div>

                      {/* TV */}
                      <div className="relative">
                        <div className={`w-64 h-40 rounded-lg border-4 transition-all ${
                          tv?.isOn && systemPower ? 'border-slate-600 bg-slate-900' : 'border-slate-700 bg-black'
                        }`}>
                          {tv?.isOn && systemPower ? (
                            <motion.div 
                              className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center"
                              animate={{ 
                                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                              }}
                              transition={{ duration: 10, repeat: Infinity }}
                            >
                              <Tv className="w-12 h-12 text-white/50" />
                            </motion.div>
                          ) : (
                            <div className="w-full h-full bg-black flex items-center justify-center">
                              <Tv className="w-10 h-10 text-slate-800" />
                            </div>
                          )}
                        </div>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-6 bg-slate-700 rounded border-2 border-slate-600" />
                      </div>

                      {/* Speaker */}
                      <div className="relative">
                        <div className={`w-16 h-28 rounded-lg transition-all border-2 ${
                          speaker?.isOn && systemPower 
                            ? 'bg-slate-700 border-slate-500' 
                            : 'bg-slate-800 border-slate-700'
                        } flex flex-col items-center justify-center gap-2`}>
                          <div className={`w-10 h-10 rounded-full border-4 ${
                            speaker?.isOn && systemPower ? 'border-blue-500 bg-blue-500/20' : 'border-slate-600'
                          }`} />
                          <div className={`w-6 h-6 rounded-full border-4 ${
                            speaker?.isOn && systemPower ? 'border-blue-500 bg-blue-500/20' : 'border-slate-600'
                          }`} />
                          {speaker?.isOn && systemPower && (
                            <>
                              <motion.div
                                className="absolute inset-0 bg-blue-500/20 rounded-lg blur-lg"
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 1 + (speaker.volume || 50) / 100, repeat: Infinity }}
                              />
                              {/* Sound waves */}
                              <motion.div
                                className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-1 bg-blue-400 rounded"
                                animate={{ 
                                  scaleX: [1, 1.5, 1],
                                  opacity: [0.5, 1, 0.5]
                                }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                              />
                              <motion.div
                                className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-1 bg-blue-400 rounded"
                                animate={{ 
                                  scaleX: [1, 1.5, 1],
                                  opacity: [0.5, 1, 0.5]
                                }}
                                transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Couch */}
                    <div className="relative z-10 flex justify-center">
                      <div className="w-80 h-24 bg-slate-700 rounded-t-3xl relative border-2 border-slate-600">
                        <div className="absolute top-0 left-0 right-0 h-12 flex gap-2 p-2">
                          <div className="flex-1 bg-slate-600 rounded-lg border border-slate-500" />
                          <div className="flex-1 bg-slate-600 rounded-lg border border-slate-500" />
                          <div className="flex-1 bg-slate-600 rounded-lg border border-slate-500" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-slate-800 rounded-t-lg border-t-2 border-slate-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-slate-800 rounded-xl border-2 border-slate-600 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-slate-400 text-sm">Power</span>
                  </div>
                  <p className="text-white text-2xl">{totalPower.toFixed(0)}W</p>
                </div>
                
                <div className="bg-slate-800 rounded-xl border-2 border-slate-600 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-green-400" />
                    <span className="text-slate-400 text-sm">Active</span>
                  </div>
                  <p className="text-white text-2xl">{activeDevices}</p>
                </div>
                
                <div className="bg-slate-800 rounded-xl border-2 border-slate-600 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="w-5 h-5 text-orange-400" />
                    <span className="text-slate-400 text-sm">Temp</span>
                  </div>
                  <p className="text-white text-2xl">{temperature}°F</p>
                </div>
                
                <div className="bg-slate-800 rounded-xl border-2 border-slate-600 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <span className="text-slate-400 text-sm">Security</span>
                  </div>
                  <p className="text-white text-2xl">{securityArmed ? 'ON' : 'OFF'}</p>
                </div>
              </div>
            </div>

            {/* Right Panel - Controls */}
            <div className="space-y-4">
              
              {/* Temperature Control */}
              <div className="bg-slate-800 rounded-2xl border-2 border-slate-600 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Thermometer className="w-5 h-5 text-orange-400" />
                  <h3 className="text-white">CLIMATE</h3>
                </div>
                
                <div className="text-center mb-4">
                  <p className="text-6xl text-white mb-2">{temperature}°</p>
                  <div className="flex justify-center gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onTemperatureChange(Math.max(60, temperature - 1))}
                      className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center"
                    >
                      <ChevronDown className="w-6 h-6 text-white" />
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onTemperatureChange(Math.min(85, temperature + 1))}
                      className="w-12 h-12 bg-orange-600 hover:bg-orange-700 rounded-lg flex items-center justify-center"
                    >
                      <ChevronUp className="w-6 h-6 text-white" />
                    </motion.button>
                  </div>
                </div>

                <div className="bg-slate-700 rounded-lg p-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Min: 60°F</span>
                    <span className="text-slate-400">Max: 85°F</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="85"
                    value={temperature}
                    onChange={(e) => onTemperatureChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:rounded-full"
                  />
                </div>
              </div>

              {/* Main Light Control */}
              {mainLight && (
                <div className="bg-slate-800 rounded-2xl border-2 border-slate-600 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Lightbulb className={`w-5 h-5 ${mainLight.isOn && systemPower ? 'text-yellow-400' : 'text-slate-500'}`} />
                      <h3 className="text-white">CEILING LIGHT</h3>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleDevice(mainLight.id)}
                      className={`w-16 h-8 rounded-full relative transition-colors ${
                        mainLight.isOn && systemPower ? 'bg-yellow-500' : 'bg-slate-600'
                      }`}
                    >
                      <motion.div
                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                        animate={{ left: mainLight.isOn && systemPower ? '36px' : '4px' }}
                      />
                    </motion.button>
                  </div>
                  
                  {mainLight.isOn && systemPower && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300 text-sm">Brightness</span>
                          <span className="text-white">{mainLight.brightness}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Moon className="w-4 h-4 text-slate-400" />
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={mainLight.brightness || 0}
                            onChange={(e) => updateDevice(mainLight.id, { brightness: parseInt(e.target.value) })}
                            className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-yellow-500 [&::-webkit-slider-thumb]:rounded-full"
                          />
                          <Sun className="w-4 h-4 text-yellow-400" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Floor Lamp Control */}
              {floorLamp && (
                <div className="bg-slate-800 rounded-2xl border-2 border-slate-600 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Lightbulb className={`w-5 h-5 ${floorLamp.isOn && systemPower ? 'text-yellow-400' : 'text-slate-500'}`} />
                      <h3 className="text-white">FLOOR LAMP</h3>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleDevice(floorLamp.id)}
                      className={`w-16 h-8 rounded-full relative transition-colors ${
                        floorLamp.isOn && systemPower ? 'bg-yellow-500' : 'bg-slate-600'
                      }`}
                    >
                      <motion.div
                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                        animate={{ left: floorLamp.isOn && systemPower ? '36px' : '4px' }}
                      />
                    </motion.button>
                  </div>
                  
                  {floorLamp.isOn && systemPower && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300 text-sm">Brightness</span>
                          <span className="text-white">{floorLamp.brightness}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={floorLamp.brightness || 0}
                          onChange={(e) => updateDevice(floorLamp.id, { brightness: parseInt(e.target.value) })}
                          className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-yellow-500 [&::-webkit-slider-thumb]:rounded-full"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* TV Control */}
              {tv && (
                <div className="bg-slate-800 rounded-2xl border-2 border-slate-600 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tv className={`w-5 h-5 ${tv.isOn && systemPower ? 'text-purple-400' : 'text-slate-500'}`} />
                      <h3 className="text-white">SMART TV</h3>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleDevice(tv.id)}
                      className={`w-16 h-8 rounded-full relative transition-colors ${
                        tv.isOn && systemPower ? 'bg-purple-500' : 'bg-slate-600'
                      }`}
                    >
                      <motion.div
                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                        animate={{ left: tv.isOn && systemPower ? '36px' : '4px' }}
                      />
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Speaker Control */}
              {speaker && (
                <div className="bg-slate-800 rounded-2xl border-2 border-slate-600 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Speaker className={`w-5 h-5 ${speaker.isOn && systemPower ? 'text-blue-400' : 'text-slate-500'}`} />
                      <h3 className="text-white">SPEAKER</h3>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleDevice(speaker.id)}
                      className={`w-16 h-8 rounded-full relative transition-colors ${
                        speaker.isOn && systemPower ? 'bg-blue-500' : 'bg-slate-600'
                      }`}
                    >
                      <motion.div
                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                        animate={{ left: speaker.isOn && systemPower ? '36px' : '4px' }}
                      />
                    </motion.button>
                  </div>
                  
                  {speaker.isOn && systemPower && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300 text-sm">Volume</span>
                          <span className="text-white">{speaker.volume}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Volume2 className="w-4 h-4 text-slate-400" />
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={speaker.volume || 0}
                            onChange={(e) => updateDevice(speaker.id, { volume: parseInt(e.target.value) })}
                            className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full"
                          />
                          <Volume2 className="w-4 h-4 text-blue-400" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Security Control */}
              <div className="bg-slate-800 rounded-2xl border-2 border-slate-600 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className={`w-5 h-5 ${securityArmed ? 'text-red-400' : 'text-slate-500'}`} />
                    <h3 className="text-white">SECURITY</h3>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSecurityArmed(!securityArmed)}
                    className={`w-16 h-8 rounded-full relative transition-colors ${
                      securityArmed ? 'bg-red-500' : 'bg-slate-600'
                    }`}
                  >
                    <motion.div
                      className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                      animate={{ left: securityArmed ? '36px' : '4px' }}
                    />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Control Bar */}
          <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-t-4 border-slate-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center gap-2"
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </motion.button>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white flex items-center gap-2"
                >
                  <Fan className="w-5 h-5" />
                  All Devices
                </motion.button>
              </div>

              <div className="bg-slate-800 rounded-lg px-6 py-3 border-2 border-slate-600">
                <p className="text-slate-400 text-sm">System Uptime</p>
                <p className="text-white">24h 35m 12s</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
