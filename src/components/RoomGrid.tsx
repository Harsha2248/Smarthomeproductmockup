import { useState } from 'react';
import { RoomCard } from './RoomCard';
import { Sofa, Bed, Utensils, Bath, Car, Flower } from 'lucide-react';

export interface Room {
  id: string;
  name: string;
  icon: any;
  temperature: number;
  devices: number;
  activeDevices: number;
  lightsOn: boolean;
}

export function RoomGrid() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: '1', name: 'Living Room', icon: Sofa, temperature: 72, devices: 8, activeDevices: 5, lightsOn: true },
    { id: '2', name: 'Bedroom', icon: Bed, temperature: 68, devices: 6, activeDevices: 2, lightsOn: false },
    { id: '3', name: 'Kitchen', icon: Utensils, temperature: 70, devices: 10, activeDevices: 7, lightsOn: true },
    { id: '4', name: 'Bathroom', icon: Bath, temperature: 74, devices: 4, activeDevices: 3, lightsOn: true },
    { id: '5', name: 'Garage', icon: Car, temperature: 65, devices: 5, activeDevices: 1, lightsOn: false },
    { id: '6', name: 'Garden', icon: Flower, temperature: 82, devices: 3, activeDevices: 2, lightsOn: false },
  ]);

  const handleToggleLights = (roomId: string) => {
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        const lightsOn = !room.lightsOn;
        return {
          ...room,
          lightsOn,
          activeDevices: lightsOn ? room.activeDevices + 1 : Math.max(0, room.activeDevices - 1)
        };
      }
      return room;
    }));
  };

  const handleTemperatureChange = (roomId: string, delta: number) => {
    setRooms(rooms.map(room =>
      room.id === roomId
        ? { ...room, temperature: Math.max(60, Math.min(85, room.temperature + delta)) }
        : room
    ));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-2xl">Your Rooms</h2>
          <p className="text-slate-400">Manage devices in each room</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg px-4 py-2 border border-slate-700/50">
          <p className="text-slate-400 text-sm">Total Devices</p>
          <p className="text-white text-2xl">{rooms.reduce((sum, room) => sum + room.devices, 0)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map(room => (
          <RoomCard
            key={room.id}
            room={room}
            onToggleLights={handleToggleLights}
            onTemperatureChange={handleTemperatureChange}
          />
        ))}
      </div>
    </div>
  );
}
