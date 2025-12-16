import { motion } from 'motion/react';
import type { Device } from './DevicePanel';

interface DeviceCardProps {
  device: Device;
  onToggle: (deviceId: string) => void;
  onBrightnessChange?: (deviceId: string, brightness: number) => void;
  onVolumeChange?: (deviceId: string, volume: number) => void;
}

export function DeviceCard({ device, onToggle, onBrightnessChange, onVolumeChange }: DeviceCardProps) {
  const Icon = device.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-2xl p-5 border transition-all cursor-pointer ${
        device.isOn
          ? 'bg-gradient-to-br from-blue-600 to-blue-700 border-blue-500 shadow-lg shadow-blue-600/30'
          : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50'
      }`}
      onClick={() => onToggle(device.id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          device.isOn ? 'bg-white/20' : 'bg-slate-700'
        }`}>
          <Icon className={`w-6 h-6 ${device.isOn ? 'text-white' : 'text-slate-400'}`} />
        </div>
        <div className={`text-xs px-2 py-1 rounded-full ${
          device.isOn ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-400'
        }`}>
          {device.isOn ? 'ON' : 'OFF'}
        </div>
      </div>

      <div>
        <h3 className={device.isOn ? 'text-white' : 'text-slate-300'}>{device.name}</h3>
        <p className={`text-sm ${device.isOn ? 'text-blue-100' : 'text-slate-500'}`}>{device.room}</p>
      </div>

      {device.isOn && device.brightness !== undefined && onBrightnessChange && (
        <div className="mt-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-blue-100">Brightness</span>
            <span className="text-xs text-white">{device.brightness}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={device.brightness}
            onChange={(e) => onBrightnessChange(device.id, parseInt(e.target.value))}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>
      )}

      {device.isOn && device.volume !== undefined && onVolumeChange && (
        <div className="mt-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-blue-100">Volume</span>
            <span className="text-xs text-white">{device.volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={device.volume}
            onChange={(e) => onVolumeChange(device.id, parseInt(e.target.value))}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>
      )}
    </motion.div>
  );
}
