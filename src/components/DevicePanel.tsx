import { useState } from 'react';
import { DeviceCard } from './DeviceCard';
import { Lightbulb, Tv, Speaker, Fan, Coffee, Wifi } from 'lucide-react';

export interface Device {
  id: string;
  name: string;
  room: string;
  icon: any;
  type: string;
  isOn: boolean;
  brightness?: number;
  volume?: number;
}

interface DevicePanelProps {
  devices: Device[];
  onDevicesChange: (devices: Device[]) => void;
}

export function DevicePanel({ devices: initialDevices, onDevicesChange }: DevicePanelProps) {
  const [devices, setDevices] = useState<Device[]>(
    initialDevices.map(d => ({
      ...d,
      icon: d.type === 'light' ? Lightbulb :
            d.type === 'tv' ? Tv :
            d.type === 'speaker' ? Speaker :
            d.type === 'fan' ? Fan :
            d.type === 'appliance' ? Coffee :
            Wifi
    }))
  );

  const handleToggle = (deviceId: string) => {
    const newDevices = devices.map(device =>
      device.id === deviceId ? { ...device, isOn: !device.isOn } : device
    );
    setDevices(newDevices);
    onDevicesChange(newDevices);
  };

  const handleBrightnessChange = (deviceId: string, brightness: number) => {
    const newDevices = devices.map(device =>
      device.id === deviceId ? { ...device, brightness } : device
    );
    setDevices(newDevices);
    onDevicesChange(newDevices);
  };

  const handleVolumeChange = (deviceId: string, volume: number) => {
    const newDevices = devices.map(device =>
      device.id === deviceId ? { ...device, volume } : device
    );
    setDevices(newDevices);
    onDevicesChange(newDevices);
  };

  const activeDevices = devices.filter(d => d.isOn).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-2xl">All Devices</h2>
          <p className="text-slate-400">{activeDevices} of {devices.length} devices active</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {devices.map(device => (
          <DeviceCard
            key={device.id}
            device={device}
            onToggle={handleToggle}
            onBrightnessChange={handleBrightnessChange}
            onVolumeChange={handleVolumeChange}
          />
        ))}
      </div>
    </div>
  );
}