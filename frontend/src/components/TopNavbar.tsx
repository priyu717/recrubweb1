import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sparkles,
  PhoneCall,
  Activity,
  Plus,
  Wifi,
  SlidersHorizontal,
  Layers,
  ChevronDown
} from 'lucide-react';
import { useCallingStore } from '../store/useCallingStore';

interface TopNavbarProps {
  onOpenQuickCall?: () => void;
  onOpenCampaignModal?: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ onOpenQuickCall, onOpenCampaignModal }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { status: callStatus, startCall } = useCallingStore();

  const notifications = [
    {
      id: 1,
      title: 'AI Screened: Alexander Wright',
      desc: 'Overall Match: 94% • High intent for Senior React Lead',
      time: '2m ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Campaign Complete: Q3 DevOps Blast',
      desc: '48 calls placed, 31 answered, 14 qualified candidates',
      time: '18m ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Client Requisition Added',
      desc: 'TechCorp expanded contract: +4 Fullstack Openings',
      time: '1h ago',
      unread: false,
    },
  ];

  return (
    <header className="h-16 px-6 bg-[#090e1a]/80 backdrop-blur-xl border-b border-slate-800/70 flex items-center justify-between sticky top-0 z-20">
      {/* Search & Breadcrumb */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidates, skills, clients, audio logs... (Press ⌘K)"
            className="w-full bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder-slate-400 rounded-xl pl-9 pr-14 py-2 focus:outline-none focus:border-brand-500/80 focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-medium text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Actions & Status Badges */}
      <div className="flex items-center gap-3.5">
        {/* Real-time System Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-medium text-slate-400">Twilio & Voice Pipeline:</span>
          <span className="text-[11px] font-semibold text-emerald-400">Live (US-East)</span>
        </div>

        {/* Quick AI Call Button */}
        <button
          onClick={() => startCall('quick-dial')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-glow-sm transition-all active:scale-[0.98]"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Instant AI Call</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-slate-950"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider">AI Event Stream</span>
                <span className="text-[10px] text-brand-400 font-semibold cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="mt-3 space-y-2.5">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 transition-colors cursor-pointer border border-slate-800/60"
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-semibold text-slate-200">{item.title}</p>
                      <span className="text-[10px] text-slate-400">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
