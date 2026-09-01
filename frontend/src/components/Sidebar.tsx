import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck,
  Building2,
  Megaphone,
  PhoneCall,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Sparkles,
  Bot,
  Zap
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCallingStore } from '../store/useCallingStore';

const Sidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuthStore();
  const { status: callStatus, startCall } = useCallingStore();

  const navSections = [
    {
      title: 'PLATFORM',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Talent Pool', path: '/candidates', icon: UserCheck, badge: 'AI Match' },
        { name: 'Clients & Leads', path: '/clients', icon: Building2 },
        { name: 'Campaigns', path: '/campaigns', icon: Megaphone, count: '3 Active' },
        { name: 'Live Calls & Audio', path: '/calls', icon: PhoneCall, isLive: callStatus === 'CONNECTED' },
        { name: 'AI Intelligence', path: '/analytics', icon: BarChart3 },
      ]
    },
    {
      title: 'ORGANIZATION',
      items: [
        { name: 'Team & Access', path: '/team', icon: Users, role: 'COMPANY_ADMIN' },
        { name: 'AI Agents & Settings', path: '/settings', icon: Settings, role: 'COMPANY_ADMIN' },
      ]
    }
  ];

  return (
    <aside className="w-72 h-screen bg-[#090e1a]/90 backdrop-blur-xl border-r border-slate-800/70 flex flex-col justify-between select-none z-30 transition-all duration-300">
      {/* Brand Header */}
      <div>
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800/60 bg-gradient-to-r from-slate-900/50 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-primary-400 p-[1px] shadow-glow-sm flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-brand-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white font-sans">
                  Recruit<span className="text-brand-400">Voice</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  AI v2
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Autonomous Calling CRM</p>
            </div>
          </div>
        </div>

        {/* Live AI Status Widget */}
        <div className="px-4 pt-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-slate-900/90 to-indigo-950/30 border border-slate-800/80 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">AI Voice Engine</p>
                <p className="text-[10px] text-emerald-400 font-medium">Ultra-low 240ms latency</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="sound-bar" style={{ animationDuration: '0.8s' }}></div>
              <div className="sound-bar" style={{ animationDuration: '1.1s' }}></div>
              <div className="sound-bar" style={{ animationDuration: '0.9s' }}></div>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="py-4 px-3 space-y-6 overflow-y-auto max-h-[calc(100vh-270px)]">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                {section.title}
              </p>
              {section.items.map((item) => {
                if (item.role && user?.role !== item.role && user?.role !== 'SUPER_ADMIN') {
                  return null;
                }
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path);

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive: active }) => `
                      group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                      ${active 
                        ? 'bg-gradient-to-r from-brand-600/90 to-indigo-600/90 text-white shadow-glow-sm border border-brand-400/30' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/80 border border-transparent'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-brand-400'
                      }`} />
                      <span className="tracking-tight">{item.name}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-brand-500/15 text-brand-300 border border-brand-500/20'
                      }`}>
                        {item.badge}
                      </span>
                    )}

                    {item.count && (
                      <span className="text-[10px] font-medium text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/50">
                        {item.count}
                      </span>
                    )}

                    {item.isLive && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer / User Profile & Quick Action */}
      <div className="p-3.5 border-t border-slate-800/70 bg-slate-950/70 space-y-3">
        {/* Quick Test Call trigger */}
        <button
          onClick={() => startCall('cand_demo_alex')}
          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-glow-emerald transition-all active:scale-[0.98]"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Launch AI Test Call</span>
        </button>

        {/* User Card */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-slate-800/70">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-brand-700 flex items-center justify-center text-xs font-bold text-white shadow-inner flex-shrink-0">
              {user?.firstName ? user.firstName[0] : 'S'}{user?.lastName ? user.lastName[0] : 'J'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-200 truncate">
                {user ? `${user.firstName} ${user.lastName}` : 'Sarah Jenkins'}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {user?.company || 'Apex Talent Global'}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            title="Sign out"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

