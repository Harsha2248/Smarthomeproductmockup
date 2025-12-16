import { Home, Lightbulb, Zap, Shield, Menu, Eye, Monitor } from 'lucide-react';

interface HeaderProps {
  activeTab: 'machine' | 'live' | 'rooms' | 'devices' | 'energy' | 'security';
  onTabChange: (tab: 'machine' | 'live' | 'rooms' | 'devices' | 'energy' | 'security') => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const tabs = [
    { id: 'machine' as const, label: 'Control Machine', icon: Monitor },
    { id: 'live' as const, label: 'Live View', icon: Eye },
    { id: 'rooms' as const, label: 'Rooms', icon: Home },
    { id: 'devices' as const, label: 'Devices', icon: Lightbulb },
    { id: 'energy' as const, label: 'Energy', icon: Zap },
    { id: 'security' as const, label: 'Security', icon: Shield },
  ];

  return (
    <header className="bg-slate-800/50 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white">Smart Home</h1>
              <p className="text-slate-400 text-sm">Welcome back, Alex</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-slate-700/50 rounded-lg px-3 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-300">All systems online</span>
            </div>
            <button className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <nav className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}