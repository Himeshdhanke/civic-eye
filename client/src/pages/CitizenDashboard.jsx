import React, { useState } from 'react';
import {
    Map as MapIcon,
    PlusCircle,
    FileText,
    Settings,
    Bell,
    User,
    ShieldAlert,
    LogOut,
    Menu,
    X,
    ChevronRight,
    Clock
} from 'lucide-react';

export default function CitizenDashboard() {
    const [activeTab, setActiveTab] = useState('new');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user_session');
        window.location.reload();
    };

    const navItems = [
        { id: 'new', label: 'File an Issue', icon: <PlusCircle size={20} /> },
        { id: 'my', label: 'My History', icon: <FileText size={20} /> },
        { id: 'map', label: 'Local Map', icon: <MapIcon size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            {/* Mobile Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="h-full flex flex-col shadow-xl lg:shadow-none">
                    <div className="p-6 border-b border-slate-50">
                        <h1 className="text-2xl font-black text-primary-600 flex items-center gap-2 tracking-tight">
                            <ShieldAlert size={32} className="fill-primary-50" />
                            CitizenCare
                        </h1>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto font-medium">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setIsSidebarOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${activeTab === item.id
                                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                                        : 'text-slate-500 hover:bg-primary-50 hover:text-primary-600'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    {item.icon}
                                    {item.label}
                                </div>
                                {activeTab === item.id && <ChevronRight size={16} />}
                            </button>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 text-sm font-bold"
                        >
                            <LogOut size={20} /> Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 lg:px-10 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2.5 bg-slate-100 text-slate-600 rounded-xl lg:hidden hover:bg-slate-200 transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <div>
                            <h2 className="text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">
                                {navItems.find(i => i.id === activeTab)?.label}
                            </h2>
                            <p className="text-xs lg:text-sm text-slate-500 font-medium hidden sm:block">
                                SmartResolve AI Platform • Geo-Enabled Civic Intelligence
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 lg:gap-4">
                        <button className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all hidden sm:flex">
                            <Bell size={22} />
                        </button>
                        <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Citizen</p>
                                <p className="text-sm font-black text-slate-800">C. User</p>
                            </div>
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary-200 ring-4 ring-primary-50">
                                C
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 lg:p-10 space-y-8 bg-slate-50/50">
                    <div className="max-w-5xl mx-auto space-y-8">
                        {activeTab === 'new' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="bg-white p-6 lg:p-10 rounded-3xl shadow-sm border border-slate-200 ring-1 ring-slate-100 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                                        <div>
                                            <h3 className="text-xl lg:text-2xl font-black text-slate-800 mb-1">New Complaint</h3>
                                            <p className="text-slate-500 text-sm font-medium">Describe the issue and our AI will categorize it automatically.</p>
                                        </div>
                                        <div className="px-4 py-2 bg-amber-50 rounded-full border border-amber-100 flex items-center gap-2 text-amber-700 text-xs font-bold w-fit">
                                            <Clock size={14} /> AI Processing Enabled
                                        </div>
                                    </div>

                                    <textarea
                                        className="w-full p-5 lg:p-8 h-48 lg:h-64 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-50 outline-none mb-6 transition-all text-slate-700 font-medium text-lg leading-relaxed placeholder:text-slate-400"
                                        placeholder="e.g. There is a huge pothole at the intersection of MG Road and 5th Cross. It's causing heavy traffic and water logging..."
                                    />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                        <button className="px-6 py-4 rounded-2xl border-2 border-slate-100 font-bold text-slate-600 hover:border-primary-200 hover:bg-primary-50 transition-all flex items-center justify-center gap-2">
                                            <MapIcon size={20} /> Detect My Location
                                        </button>
                                        <div className="px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 text-slate-400 text-sm font-medium flex items-center justify-center italic">
                                            GPS Coord: --, --
                                        </div>
                                    </div>

                                    <button className="w-full py-5 bg-primary-600 text-white rounded-2xl font-black text-xl hover:bg-primary-700 active:scale-[0.98] transition-all shadow-xl shadow-primary-200">
                                        Analyze & Submit with AI
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'my' && (
                            <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-black text-slate-800">My Reports</h3>
                                    <p className="text-sm font-bold text-slate-400">Total: 0</p>
                                </div>
                                <div className="bg-white p-12 lg:p-20 rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center space-y-4 ring-1 ring-slate-100">
                                    <div className="p-6 bg-slate-50 rounded-full text-slate-300">
                                        <FileText size={64} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-slate-800">No active complaints</p>
                                        <p className="text-slate-400 max-w-xs mt-2 font-medium">Any issues you file will appear here. Track their progress and SLA status in real-time.</p>
                                    </div>
                                    <button onClick={() => setActiveTab('new')} className="mt-4 px-8 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors">
                                        Report an Issue
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'map' && (
                            <div className="h-[calc(100vh-280px)] min-h-[500px] bg-slate-200 rounded-3xl overflow-hidden relative shadow-inner border border-slate-300 animate-in zoom-in-95 duration-500 ring-1 ring-slate-200">
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-slate-100/50 backdrop-blur-sm z-10">
                                    <MapIcon size={80} className="text-slate-300 mb-6 drop-shadow-sm" />
                                    <h3 className="text-2xl font-black text-slate-800 mb-2">Geo-Intelligence Map</h3>
                                    <p className="text-slate-500 max-w-md font-medium">Displaying reported issues across your city. Markers color-coded by department and status.</p>
                                    <div className="mt-8 px-6 py-2 bg-white rounded-full text-xs font-black uppercase tracking-widest text-slate-400 border border-slate-200">
                                        Ready for Leaflet Integration
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
