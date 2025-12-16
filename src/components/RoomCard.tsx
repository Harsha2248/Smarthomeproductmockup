import { Lightbulb, Thermometer, ChevronUp, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import type { Room } from './RoomGrid';

interface RoomCardProps {
  room: Room;
  onToggleLights: (roomId: string) => void;
  onTemperatureChange: (roomId: string, delta: number) => void;
}

export function RoomCard({ room, onToggleLights, onTemperatureChange }: RoomCardProps) {
  const Icon = room.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            room.lightsOn ? 'bg-blue-600' : 'bg-slate-700'
          }`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white">{room.name}</h3>
            <p className="text-slate-400 text-sm">{room.activeDevices} of {room.devices} active</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Lightbulb className={`w-4 h-4 ${room.lightsOn ? 'text-yellow-400' : 'text-slate-500'}`} />
            <span className="text-slate-300 text-sm">Lights</span>
          </div>
          <button
            onClick={() => onToggleLights(room.id)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              room.lightsOn ? 'bg-blue-600' : 'bg-slate-600'
            }`}
          >
            <motion.div
              className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg"
              animate={{ left: room.lightsOn ? '26px' : '2px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
        </div>

        <div className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-orange-400" />
            <span className="text-slate-300 text-sm">Temperature</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white">{room.temperature}°F</span>
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => onTemperatureChange(room.id, 1)}
                className="w-6 h-4 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center transition-colors"
              >
                <ChevronUp className="w-3 h-3 text-white" />
              </button>
              <button
                onClick={() => onTemperatureChange(room.id, -1)}
                className="w-6 h-4 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center transition-colors"
              >
                <ChevronDown className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
