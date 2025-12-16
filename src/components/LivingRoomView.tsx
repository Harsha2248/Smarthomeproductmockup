import { motion } from 'motion/react';
import { Lightbulb, Tv, Speaker, Thermometer, ChevronUp, ChevronDown, Sun, Moon, Volume2 } from 'lucide-react';
import type { Device } from './DevicePanel';

interface LivingRoomViewProps {
  devices: Device[];
  onDevicesChange: (devices: Device[]) => void;
  temperature: number;
  onTemperatureChange: (temp: number) => void;
}

export function LivingRoomView({ devices, onDevicesChange, temperature, onTemperatureChange }: LivingRoomViewProps) {
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

  const changeBrightness = (deviceId: string, delta: number) => {
    const newDevices = devices.map(d => {
      if (d.id === deviceId && d.brightness !== undefined) {
        return { ...d, brightness: Math.max(0, Math.min(100, d.brightness + delta)) };
      }
      return d;
    });
    onDevicesChange(newDevices);
  };

  const changeVolume = (deviceId: string, delta: number) => {
    const newDevices = devices.map(d => {
      if (d.id === deviceId && d.volume !== undefined) {
        return { ...d, volume: Math.max(0, Math.min(100, d.volume + delta)) };
      }
      return d;
    });
    onDevicesChange(newDevices);
  };

  const ambientBrightness = Math.max(
    mainLight?.isOn ? (mainLight.brightness || 0) : 0,
    floorLamp?.isOn ? (floorLamp.brightness || 0) : 0
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl mb-1">Living Room - Live View</h2>
        <p className="text-slate-400">See your changes in real-time</p>
      </div>

      {/* Living Room Visual */}
      <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden" 
           style={{ minHeight: '500px' }}>
        
        {/* Ambient Lighting Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-yellow-400/20 via-orange-400/10 to-transparent pointer-events-none"
          animate={{ opacity: ambientBrightness / 100 }}
          transition={{ duration: 0.5 }}
        />

        {/* Room Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-700/30 to-slate-800/50" />

        {/* Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-900/80 to-transparent" />

        {/* Back Wall */}
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-slate-800/60 to-transparent" />

        {/* Content Container */}
        <div className="relative h-full p-8 flex flex-col justify-between" style={{ minHeight: '500px' }}>
          
          {/* Ceiling Light */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2">
            <motion.div
              className="relative w-20 h-20"
              animate={{ scale: mainLight?.isOn ? 1 : 0.9 }}
            >
              {/* Light fixture */}
              <div className="absolute inset-0 bg-slate-600 rounded-full" />
              {mainLight?.isOn && (
                <>
                  <motion.div
                    className="absolute inset-0 bg-yellow-400 rounded-full blur-xl"
                    animate={{ opacity: (mainLight.brightness || 0) / 150 }}
                  />
                  <motion.div
                    className="absolute -inset-20 bg-yellow-400/30 rounded-full blur-3xl"
                    animate={{ opacity: (mainLight.brightness || 0) / 200 }}
                  />
                </>
              )}
            </motion.div>
          </div>

          {/* Top Row - Window & Time */}
          <div className="flex justify-between items-start relative z-10">
            {/* Window */}
            <div className="w-48 h-32 bg-gradient-to-b from-sky-900 to-sky-700 rounded-lg border-4 border-slate-600 relative overflow-hidden">
              <div className="absolute top-4 right-6 w-8 h-8 bg-yellow-200 rounded-full blur-sm opacity-60" />
              <div className="absolute top-6 right-12 w-6 h-6 bg-yellow-100 rounded-full blur-sm opacity-40" />
              <div className="w-full h-full grid grid-cols-2 gap-1 p-1">
                <div className="border-r-2 border-b-2 border-slate-600" />
                <div className="border-b-2 border-slate-600" />
                <div className="border-r-2 border-slate-600" />
                <div />
              </div>
            </div>

            {/* Time Display */}
            <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl px-6 py-3 border border-slate-600/50">
              <p className="text-slate-400 text-sm">Current Time</p>
              <p className="text-white text-2xl">7:42 PM</p>
            </div>
          </div>

          {/* Middle Row - TV and Devices */}
          <div className="flex justify-between items-center relative z-10">
            
            {/* Floor Lamp */}
            <div className="relative">
              <motion.div
                className="w-4 h-40 bg-slate-600 rounded-t-full"
                animate={{ opacity: floorLamp?.isOn ? 1 : 0.5 }}
              />
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-yellow-400 rounded-full"
                animate={{ 
                  opacity: floorLamp?.isOn ? (floorLamp.brightness || 0) / 100 : 0,
                  scale: floorLamp?.isOn ? 1 : 0.8
                }}
              />
              {floorLamp?.isOn && (
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-yellow-400/40 rounded-full blur-2xl"
                  animate={{ opacity: (floorLamp.brightness || 0) / 150 }}
                />
              )}
            </div>

            {/* TV */}
            <div className="relative">
              <div className={`w-80 h-48 rounded-lg border-8 transition-colors duration-300 ${
                tv?.isOn ? 'border-slate-700 bg-slate-900' : 'border-slate-700 bg-black'
              }`}>
                {tv?.isOn ? (
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 animate-pulse flex items-center justify-center">
                    <Tv className="w-16 h-16 text-white/50" />
                  </div>
                ) : (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <Tv className="w-12 h-12 text-slate-800" />
                  </div>
                )}
              </div>
              {/* TV Stand */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-8 bg-slate-700 rounded" />
            </div>

            {/* Speaker */}
            <div className="relative">
              <div className={`w-20 h-32 rounded-lg transition-colors duration-300 ${
                speaker?.isOn ? 'bg-slate-700' : 'bg-slate-800'
              } border-2 border-slate-600 flex flex-col items-center justify-center gap-2`}>
                <div className={`w-12 h-12 rounded-full border-4 ${
                  speaker?.isOn ? 'border-blue-500 bg-blue-500/20' : 'border-slate-600'
                }`} />
                <div className={`w-8 h-8 rounded-full border-4 ${
                  speaker?.isOn ? 'border-blue-500 bg-blue-500/20' : 'border-slate-600'
                }`} />
                {speaker?.isOn && (
                  <motion.div
                    className="absolute inset-0 bg-blue-500/20 rounded-lg blur-lg"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Bottom Row - Couch */}
          <div className="relative z-10 flex justify-center">
            <div className="w-96 h-32 bg-slate-700 rounded-t-3xl relative">
              {/* Couch cushions */}
              <div className="absolute top-0 left-0 right-0 h-16 flex gap-2 p-2">
                <div className="flex-1 bg-slate-600 rounded-lg" />
                <div className="flex-1 bg-slate-600 rounded-lg" />
                <div className="flex-1 bg-slate-600 rounded-lg" />
              </div>
              {/* Couch base */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-slate-800 rounded-t-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Control Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Ceiling Light Control */}
        {mainLight && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                mainLight.isOn ? 'bg-yellow-500' : 'bg-slate-700'
              }`}>
                <Lightbulb className={`w-6 h-6 ${mainLight.isOn ? 'text-white' : 'text-slate-400'}`} />
              </div>
              <div>
                <h3 className="text-white">{mainLight.name}</h3>
                <p className="text-slate-400 text-sm">Ceiling</p>
              </div>
            </div>
            <button
              onClick={() => toggleDevice(mainLight.id)}
              className={`w-full py-2 rounded-lg mb-3 transition-colors ${
                mainLight.isOn 
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              {mainLight.isOn ? 'Turn Off' : 'Turn On'}
            </button>
            {mainLight.isOn && mainLight.brightness !== undefined && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Brightness</span>
                  <span className="text-white">{mainLight.brightness}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => changeBrightness(mainLight.id, -10)}
                    className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center"
                  >
                    <Moon className="w-4 h-4 text-slate-300" />
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={mainLight.brightness}
                    onChange={(e) => {
                      const newDevices = devices.map(d =>
                        d.id === mainLight.id ? { ...d, brightness: parseInt(e.target.value) } : d
                      );
                      onDevicesChange(newDevices);
                    }}
                    className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-yellow-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <button
                    onClick={() => changeBrightness(mainLight.id, 10)}
                    className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center"
                  >
                    <Sun className="w-4 h-4 text-slate-300" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Floor Lamp Control */}
        {floorLamp && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                floorLamp.isOn ? 'bg-yellow-500' : 'bg-slate-700'
              }`}>
                <Lightbulb className={`w-6 h-6 ${floorLamp.isOn ? 'text-white' : 'text-slate-400'}`} />
              </div>
              <div>
                <h3 className="text-white">{floorLamp.name}</h3>
                <p className="text-slate-400 text-sm">Corner</p>
              </div>
            </div>
            <button
              onClick={() => toggleDevice(floorLamp.id)}
              className={`w-full py-2 rounded-lg mb-3 transition-colors ${
                floorLamp.isOn 
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              {floorLamp.isOn ? 'Turn Off' : 'Turn On'}
            </button>
            {floorLamp.isOn && floorLamp.brightness !== undefined && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Brightness</span>
                  <span className="text-white">{floorLamp.brightness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={floorLamp.brightness}
                  onChange={(e) => {
                    const newDevices = devices.map(d =>
                      d.id === floorLamp.id ? { ...d, brightness: parseInt(e.target.value) } : d
                    );
                    onDevicesChange(newDevices);
                  }}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-yellow-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>
            )}
          </div>
        )}

        {/* TV Control */}
        {tv && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                tv.isOn ? 'bg-purple-600' : 'bg-slate-700'
              }`}>
                <Tv className={`w-6 h-6 ${tv.isOn ? 'text-white' : 'text-slate-400'}`} />
              </div>
              <div>
                <h3 className="text-white">{tv.name}</h3>
                <p className="text-slate-400 text-sm">Entertainment</p>
              </div>
            </div>
            <button
              onClick={() => toggleDevice(tv.id)}
              className={`w-full py-2 rounded-lg transition-colors ${
                tv.isOn 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              {tv.isOn ? 'Turn Off' : 'Turn On'}
            </button>
          </div>
        )}

        {/* Speaker Control */}
        {speaker && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                speaker.isOn ? 'bg-blue-600' : 'bg-slate-700'
              }`}>
                <Speaker className={`w-6 h-6 ${speaker.isOn ? 'text-white' : 'text-slate-400'}`} />
              </div>
              <div>
                <h3 className="text-white">{speaker.name}</h3>
                <p className="text-slate-400 text-sm">Audio</p>
              </div>
            </div>
            <button
              onClick={() => toggleDevice(speaker.id)}
              className={`w-full py-2 rounded-lg mb-3 transition-colors ${
                speaker.isOn 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              {speaker.isOn ? 'Turn Off' : 'Turn On'}
            </button>
            {speaker.isOn && speaker.volume !== undefined && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Volume</span>
                  <span className="text-white">{speaker.volume}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => changeVolume(speaker.id, -10)}
                    className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center"
                  >
                    <Volume2 className="w-3 h-3 text-slate-300" />
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={speaker.volume}
                    onChange={(e) => {
                      const newDevices = devices.map(d =>
                        d.id === speaker.id ? { ...d, volume: parseInt(e.target.value) } : d
                      );
                      onDevicesChange(newDevices);
                    }}
                    className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <button
                    onClick={() => changeVolume(speaker.id, 10)}
                    className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center"
                  >
                    <Volume2 className="w-4 h-4 text-slate-300" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Temperature Control */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center">
              <Thermometer className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-white text-xl">Room Temperature</h3>
              <p className="text-slate-400">Climate Control</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onTemperatureChange(Math.max(60, temperature - 1))}
              className="w-12 h-12 bg-slate-700 hover:bg-slate-600 rounded-xl flex items-center justify-center transition-colors"
            >
              <ChevronDown className="w-6 h-6 text-white" />
            </button>
            <div className="text-center">
              <p className="text-white text-4xl">{temperature}°F</p>
              <p className="text-slate-400 text-sm">Target</p>
            </div>
            <button
              onClick={() => onTemperatureChange(Math.min(85, temperature + 1))}
              className="w-12 h-12 bg-slate-700 hover:bg-slate-600 rounded-xl flex items-center justify-center transition-colors"
            >
              <ChevronUp className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
