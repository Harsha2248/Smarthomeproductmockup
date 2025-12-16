import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Zap, TrendingDown, DollarSign, Calendar } from 'lucide-react';

const data = [
  { time: '00:00', usage: 2.4 },
  { time: '04:00', usage: 1.8 },
  { time: '08:00', usage: 4.2 },
  { time: '12:00', usage: 5.8 },
  { time: '16:00', usage: 6.5 },
  { time: '20:00', usage: 7.2 },
  { time: '23:59', usage: 3.5 },
];

const weeklyData = [
  { day: 'Mon', usage: 45 },
  { day: 'Tue', usage: 52 },
  { day: 'Wed', usage: 38 },
  { day: 'Thu', usage: 48 },
  { day: 'Fri', usage: 55 },
  { day: 'Sat', usage: 42 },
  { day: 'Sun', usage: 40 },
];

export function EnergyChart() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl mb-1">Energy Consumption</h2>
        <p className="text-slate-400">Monitor your power usage and savings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-slate-400">Current Usage</span>
          </div>
          <p className="text-white text-3xl">4.2 kW</p>
          <p className="text-green-400 text-sm mt-1">↓ 12% from yesterday</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-slate-400">This Month</span>
          </div>
          <p className="text-white text-3xl">$124</p>
          <p className="text-green-400 text-sm mt-1">↓ $18 saved</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-white" />
            </div>
            <span className="text-slate-400">Efficiency</span>
          </div>
          <p className="text-white text-3xl">94%</p>
          <p className="text-green-400 text-sm mt-1">↑ 3% improved</p>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white">Today's Usage</h3>
          <div className="flex items-center gap-2 bg-slate-700/50 rounded-lg px-3 py-1.5">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-slate-300 text-sm">24 Hours</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Area type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={2} fill="url(#colorUsage)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
        <h3 className="text-white mb-6">Weekly Overview</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={weeklyData}>
            <defs>
              <linearGradient id="colorWeekly" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Area type="monotone" dataKey="usage" stroke="#8b5cf6" strokeWidth={2} fill="url(#colorWeekly)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
