import React, { useState } from 'react';
import {
  BarChart3,
  Map as MapIcon,
  PlusCircle,
  FileText,
  Settings,
  Bell,
  User,
  ShieldAlert
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary-600 flex items-center gap-2">
            <ShieldAlert size={28} />
            SmartResolve
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavItem
            icon={<BarChart3 size={20} />}
            label="Dashboard"
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <NavItem
            icon={<MapIcon size={20} />}
            label="Map View"
            active={activeTab === 'map'}
            onClick={() => setActiveTab('map')}
          />
          <NavItem
            icon={<PlusCircle size={20} />}
            label="File Complaint"
            active={activeTab === 'file'}
            onClick={() => setActiveTab('file')}
          />
          <NavItem
            icon={<FileText size={20} />}
            label="My Complaints"
            active={activeTab === 'complaints'}
            onClick={() => setActiveTab('complaints')}
          />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-slate-800 capitalize">{activeTab}</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                T
              </div>
              <span className="text-sm font-medium text-slate-700">Tarun</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'dashboard' && <DashboardPlaceholder />}
            {activeTab === 'map' && <div className="h-[600px] w-full bg-slate-200 rounded-xl flex items-center justify-center border-dashed border-2 border-slate-300 text-slate-500">Map Integration Skeleton (Leaflet)</div>}
            {activeTab === 'file' && <div className="max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-slate-200">Complaint Form Skeleton</div>}
          </div>
        </div>
      </main>
    </div>
  );
}

const NavItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active
        ? 'bg-primary-50 text-primary-600'
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
      }`}
  >
    {icon}
    {label}
  </button>
);

const DashboardPlaceholder = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[
        { label: 'Total Issues', value: '128' },
        { label: 'Pending', value: '43' },
        { label: 'Resolved', value: '85' },
        { label: 'Avg SLA', value: '18h' },
      ].map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500">{stat.label}</p>
          <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="h-64 bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400">Chart: Volume by Category</div>
      <div className="h-64 bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400">Chart: Recent Trends</div>
    </div>
  </div>
);

export default App;
