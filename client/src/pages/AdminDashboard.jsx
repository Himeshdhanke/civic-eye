import React, { useState } from 'react';
import {
    LayoutDashboard,
    Map as MapIcon,
    Users,
    AlertTriangle,
    FileSpreadsheet,
    Settings,
    ShieldAlert,
    LogOut,
    Menu,
    X,
    TrendingUp,
    Clock,
    CheckCircle2,
    Search
} from 'lucide-react';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user_session');
        window.location.reload();
    };

    const navItems = [
        { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'escalations', label: 'Escalations', icon: <AlertTriangle size={20} /> },
        { id: 'map', label: 'City Heatmap', icon: <MapIcon size={20} /> },
        { id: 'reports', label: 'Data Reports', icon: <FileSpreadsheet size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-[#0a0c10] overflow-hidden text-slate-300 font-sans">
            {/* Mobile Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-md transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Dark Ultra Professional */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-[#0d1117] border-r border-slate-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="h-full flex flex-col">
                    <div className="p-8 border-b border-slate-800/50">
                        <h1 className="text-xl font-black text-white flex items-center gap-3 tracking-tighter">
                            <div className="p-2 bg-primary-600 rounded-lg shadow-lg shadow-primary-900/40">
                                <ShieldAlert size={24} className="text-white" />
                            </div>
                            <div>
                                <span className="block text-primary-500 text-[10px] leading-none mb-1 font-bold tracking-widest uppercase">Municipal Authority</span>
                                <span className="block">ADMIN <span className="text-primary-500">RESOLVE</span></span>
                            </div>
                        </h1>
                    </div>

                    <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setIsSidebarOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-black transition-all duration-200 ${activeTab === item.id
                                        ? 'bg-primary-600 text-white shadow-2xl shadow-primary-900/40 translate-x-1'
                                        : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-100'
                                    }`}
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="p-6 border-t border-slate-800/50 bg-[#0d1117]">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-4 text-slate-500 hover:text-white hover:bg-red-950/20 hover:border-red-900/30 border border-transparent rounded-xl transition-all text-sm font-bold"
                        >
                            <LogOut size={20} /> Logout System
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0c10]">
                {/* Header */}
                <header className="h-20 border-b border-slate-800/50 flex items-center justify-between px-4 lg:px-10 bg-[#0d1117]/50 backdrop-blur-xl sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-3 bg-slate-800/50 text-slate-300 rounded-xl lg:hidden hover:bg-slate-700 transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <div className="hidden sm:flex items-center bg-slate-800/30 border border-slate-700/50 rounded-xl px-4 py-2 text-slate-500 focus-within:border-primary-500/50 transition-all">
                            <Search size={18} />
                            <input type="text" placeholder="Search complaints..." className="bg-transparent border-none outline-none ml-3 text-sm w-48 text-slate-100" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 lg:gap-8">
                        <div className="hidden md:flex flex-col items-end">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Session Active</p>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <p className="text-sm font-bold text-slate-100">Ward Commissioner</p>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-primary-500 shadow-xl relative group">
                            <ShieldAlert size={24} />
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#0a0c10] flex items-center justify-center text-[10px] font-black text-white">
                                4
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Viewport */}
                <div className="flex-1 overflow-y-auto p-4 lg:p-10 space-y-10 custom-scrollbar">
                    <div className="max-w-7xl mx-auto space-y-10">
                        {/* Tab Title */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <h2 className="text-2xl lg:text-4xl font-black text-white tracking-tighter capitalize">{navItems.find(i => i.id === activeTab)?.label}</h2>
                                <p className="text-slate-500 font-bold text-sm tracking-wide mt-1">Real-time Intelligence & Resolution Metrics</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-xs font-black text-slate-300 hover:bg-slate-700 transition-all">Export Report</button>
                                <button className="px-4 py-2 bg-primary-600 rounded-lg text-xs font-black text-white hover:bg-primary-500 transition-all shadow-lg shadow-primary-900/20">Generate Insights</button>
                            </div>
                        </div>

                        {activeTab === 'overview' && (
                            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                {/* Dashboard Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                                    <AdminStatCard label="Critical" value="12" icon={<AlertTriangle size={18} />} color="text-red-500" bg="bg-red-500/10" border="border-red-500/20" />
                                    <AdminStatCard label="Pending" value="142" icon={<Clock size={18} />} color="text-amber-500" bg="bg-amber-500/10" border="border-amber-500/20" />
                                    <AdminStatCard label="Resolved" value="38" icon={<CheckCircle2 size={18} />} color="text-green-500" bg="bg-green-500/10" border="border-green-500/20" />
                                    <AdminStatCard label="SLA Performance" value="94%" icon={<TrendingUp size={18} />} color="text-blue-500" bg="bg-blue-500/10" border="border-blue-500/20" />
                                </div>

                                {/* Main Visualization */}
                                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                    <div className="xl:col-span-2 h-[500px] bg-[#0d1117] rounded-3xl border border-slate-800/50 p-8 flex flex-col relative overflow-hidden group shadow-2xl">
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-lg font-black text-white flex items-center gap-2">
                                                <MapIcon size={20} className="text-primary-500" />
                                                Live Incident Clusters
                                            </h3>
                                            <div className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div> High</span>
                                                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> Mid</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 rounded-2xl bg-slate-900/80 border border-slate-800/50 flex flex-col items-center justify-center text-center p-10 border-dashed border-2">
                                            <div className="p-6 bg-[#0d1117] rounded-full border border-slate-800 mb-6 text-slate-700 group-hover:scale-110 transition-transform duration-500">
                                                <MapIcon size={48} />
                                            </div>
                                            <h4 className="text-xl font-black text-slate-100 mb-2 whitespace-nowrap">Leaflet Geo-Server Ready</h4>
                                            <p className="text-sm text-slate-500 max-w-xs font-bold leading-relaxed">Integrated PostGIS coordinate system detected. Waiting for incident markers payload.</p>
                                        </div>
                                    </div>

                                    <div className="bg-[#0d1117] rounded-3xl border border-slate-800/50 p-8 flex flex-col shadow-2xl">
                                        <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2">
                                            <AlertTriangle size={20} className="text-amber-500" />
                                            Priority Escalations
                                        </h3>
                                        <div className="flex-1 space-y-4">
                                            <EscalationItem id="R-2004" de="Water Tech" time="2h left" level="H" />
                                            <EscalationItem id="L-1092" de="Road Works" time="4h left" level="M" />
                                            <EscalationItem id="S-0432" de="Sanitation" time="OVERDUE" level="CR" />
                                            <EscalationItem id="G-9844" de="Garbage Disposal" time="12h left" level="L" />
                                        </div>
                                        <button className="w-full py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl mt-8 text-xs font-black text-slate-300 hover:text-white transition-all uppercase tracking-widest">View All Incidents</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'map' && (
                            <div className="h-[calc(100vh-280px)] min-h-[600px] bg-slate-900 rounded-3xl border-2 border-slate-800 overflow-hidden relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 to-transparent"></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center pointer-events-none">
                                    <div className="p-8 bg-[#0a0c10]/80 backdrop-blur-md rounded-full border border-slate-800 mb-8 animate-pulse text-primary-500">
                                        <MapIcon size={64} />
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-4">PostGIS Heatmap Engine</h3>
                                    <p className="text-slate-400 max-w-md font-bold text-lg leading-relaxed italic">"Simulating high-density complaint clusters in Mumbai Metropolitan Region..."</p>
                                    <div className="mt-10 px-8 py-3 bg-primary-600/20 border border-primary-500/30 rounded-full text-xs font-black uppercase tracking-widest text-primary-400">
                                        Initializing WebGL Layers
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'escalations' && <div className="text-slate-500 text-center py-40 font-black text-2xl animate-pulse">Scanning Dept. SLA Performance...</div>}
                    </div>
                </div>
            </main>
        </div>
    );
}

const AdminStatCard = ({ label, value, icon, color, bg, border }) => (
    <div className={`p-6 rounded-3xl border ${border} ${bg} transition-all duration-300 hover:scale-[1.02] cursor-default relative overflow-hidden group shadow-lg`}>
        <div className="absolute -right-4 -bottom-4 text-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {React.cloneElement(icon, { size: 100 })}
        </div>
        <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${bg} border border-white/5 ${color}`}>
                {icon}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">+12% vs LY</span>
        </div>
        <p className="text-3xl lg:text-4xl font-black text-white mb-1">{value}</p>
        <p className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-slate-500">{label}</p>
    </div>
);

const EscalationItem = ({ id, de, time, level }) => (
    <div className="p-4 bg-slate-900/50 border border-slate-800/50 rounded-2xl flex items-center justify-between transition-all hover:bg-slate-800/80 hover:border-slate-700 cursor-pointer group">
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${level === 'CR' ? 'bg-red-500 text-white' :
                    level === 'H' ? 'bg-amber-500 text-[#0d1117]' :
                        'bg-slate-800 text-slate-400'
                }`}>
                {level}
            </div>
            <div>
                <p className="text-sm font-black text-slate-200 group-hover:text-primary-400 transition-colors uppercase tracking-widest">{id}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase leading-none mt-0.5">{de}</p>
            </div>
        </div>
        <div className="text-right">
            <p className={`text-[10px] font-black uppercase tracking-widest ${time === 'OVERDUE' ? 'text-red-500 animate-pulse' : 'text-slate-400'}`}>Time Left</p>
            <p className="text-xs font-black text-white">{time}</p>
        </div>
    </div>
);
