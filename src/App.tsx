import { useState } from 'react';
import { Header } from './components/Header';
import { RoomGrid } from './components/RoomGrid';
import { DevicePanel } from './components/DevicePanel';
import { EnergyChart } from './components/EnergyChart';
import { SecurityPanel } from './components/SecurityPanel';
import { LivingRoomView } from './components/LivingRoomView';
import { ControlMachine } from './components/ControlMachine';
import type { Device } from './components/DevicePanel';

export default function App() {
  const [activeTab, setActiveTab] = useState<'machine' | 'live' | 'rooms' | 'devices' | 'energy' | 'security'>('machine');
  
  const [devices, setDevices] = useState<Device[]>([
    { id: '1', name: 'Main Light', room: 'Living Room', icon: null, type: 'light', isOn: true, brightness: 75 },
    { id: '2', name: 'Smart TV', room: 'Living Room', icon: null, type: 'tv', isOn: true },
    { id: '3', name: 'Sound System', room: 'Living Room', icon: null, type: 'speaker', isOn: false, volume: 50 },
    { id: '4', name: 'Ceiling Fan', room: 'Bedroom', icon: null, type: 'fan', isOn: false },
    { id: '5', name: 'Coffee Maker', room: 'Kitchen', icon: null, type: 'appliance', isOn: false },
    { id: '6', name: 'Accent Lights', room: 'Bedroom', icon: null, type: 'light', isOn: false, brightness: 60 },
    { id: '7', name: 'Kitchen Speaker', room: 'Kitchen', icon: null, type: 'speaker', isOn: true, volume: 30 },
    { id: '8', name: 'WiFi Router', room: 'Living Room', icon: null, type: 'network', isOn: true },
    { id: '9', name: 'Floor Lamp', room: 'Living Room', icon: null, type: 'light', isOn: false, brightness: 50 },
  ]);

  const [temperature, setTemperature] = useState(72);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {activeTab === 'machine' && (
          <ControlMachine 
            devices={devices} 
            onDevicesChange={setDevices}
            temperature={temperature}
            onTemperatureChange={setTemperature}
          />
        )}
        {activeTab === 'live' && (
          <LivingRoomView 
            devices={devices} 
            onDevicesChange={setDevices}
            temperature={temperature}
            onTemperatureChange={setTemperature}
          />
        )}
        {activeTab === 'rooms' && <RoomGrid />}
        {activeTab === 'devices' && (
          <DevicePanel 
            devices={devices} 
            onDevicesChange={setDevices}
          />
        )}
        {activeTab === 'energy' && <EnergyChart />}
        {activeTab === 'security' && <SecurityPanel />}
      </main>
    </div>
  );
}