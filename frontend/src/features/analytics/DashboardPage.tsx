import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import {
  UserCheck,
  Building2,
  PhoneCall,
  TrendingUp,
  Sparkles,
  Zap,
  Bot,
  Play,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ChevronRight,
  Flame,
  Volume2
} from 'lucide-react';
import { useCallingStore } from '../../store/useCallingStore';

const PIE_COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

const mockCallsOverTime = [
  { date: 'Mon', total: 42, completed: 35, qualified: 18 },
  { date: 'Tue', total: 68, completed: 54, qualified: 29 },
  { date: 'Wed', total: 95, completed: 81, qualified: 44 },
  { date: 'Thu', total: 112, completed: 96, qualified: 52 },
  { date: 'Fri', total: 130, completed: 110, qualified: 63 },
  { date: 'Sat', total: 45, completed: 38, qualified: 21 },
  { date: 'Sun', total: 30, completed: 26, qualified: 14 },
];

const mockPipeline = [
  { status: 'AI Screened', count: 142 },
  { status: 'Interested', count: 88 },
  { status: 'Interview Set', count: 54 },
  { status: 'Offer Stage', count: 21 },
  { status: 'Hired', count: 15 },
];

const mockRecentScreenings = [
  {
    id: 'call-101',
    candidateName: 'Alexander Wright',
    role: 'Senior React / Node Architect',
    duration: '4m 12s',
    sentiment: 'High Interest',
    sentimentColor: 'emerald',
    score: 96,
    summary: 'Candidate demonstrated deep knowledge of distributed state and SSR. Ready to start in 2 weeks.',
    time: '4 mins ago',
    phone: '+1 (555) 234-8901'
  },
  {
    id: 'call-102',
    candidateName: 'Elena Rostova',
    role: 'Lead ML / AI Engineer',
    duration: '6m 45s',
    sentiment: 'Positive',
    sentimentColor: 'emerald',
    score: 91,
    summary: 'Strong PyTorch and LLM fine-tuning background. Salary expectations aligned with client budget.',
    time: '22 mins ago',
    phone: '+1 (555) 394-1122'
  },
  {
    id: 'call-103',
    candidateName: 'Marcus Chen',
    role: 'Product Manager - Fintech',
    duration: '3m 10s',
    sentiment: 'Hesitant / Callback',
    sentimentColor: 'amber',
    score: 78,
    summary: 'Currently evaluating multiple offers. Requested follow-up call next Tuesday at 3 PM.',
    time: '1 hour ago',
    phone: '+1 (555) 883-9021'
  },
  {
    id: 'call-104',
    candidateName: 'Sophia Taylor',
    role: 'DevOps / Kubernetes Specialist',
    duration: '5m 02s',
    sentiment: 'High Interest',
    sentimentColor: 'emerald',
    score: 94,
    summary: 'Passed all technical screening questions on Terraform and AWS multi-region setups.',
    time: '2 hours ago',
    phone: '+1 (555) 431-7765'
  }
];

const aiAgents = [
  { name: 'Sarah AI', role: 'Technical Screener', activeCalls: 3, voice: 'ElevenLabs - Bella', status: 'Calling', avatar: 'bg-indigo-600' },
  { name: 'Alex AI', role: 'Executive Outreach', activeCalls: 2, voice: 'OpenAI - Onyx', status: 'Calling', avatar: 'bg-emerald-600' },
  { name: 'Maya AI', role: 'Follow-up & Scheduler', activeCalls: 0, voice: 'ElevenLabs - Rachel', status: 'Idle', avatar: 'bg-amber-600' },
];

const StatCard = ({ title, value, change, icon: Icon, trendUp, gradient, subtitle }: any) => (
  <div className="relative group overflow-hidden p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-brand-500/40 shadow-card transition-all duration-300">
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`} />
    
    <div className="flex justify-between items-start mb-3">
      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-sm`}>
        <Icon className="w-5 h-5" />
      </div>
      {change && (
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
          trendUp ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/15 text-rose-400'
        }`}>
          <TrendingUp className="w-3 h-3" />
          {change}
        </span>
      )}
    </div>

    <div>
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
        {subtitle && <span className="text-xs text-slate-400">{subtitle}</span>}
      </div>
    </div>
  </div>
);

const DashboardPage = () => {
  const { startCall } = useCallingStore();
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const { data: metrics } = useQuery({
    queryKey: ['analytics-dashboard'],
    queryFn: async () => {
      try {
        const res = await api.get('/analytics/dashboard');
        return res.data.data;
      } catch {
        return null;
      }
    }
  });

  const totalCandidates = metrics?.totalCandidates ?? 348;
  const totalClients = metrics?.totalClients ?? 42;
  const todayCalls = metrics?.todayCalls ?? 130;
  const conversionRate = metrics?.conversionRate ?? 68.4;

  const toggleAudio = (id: string) => {
    if (playingAudio === id) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-950 via-slate-900 to-slate-900 border border-brand-500/20 p-6 md:p-8 shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-brand-600/15 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              Autonomous AI Voice Screening Engine Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Recruitment Operations Command Center
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your autonomous AI voice agents placed <span className="text-white font-semibold">{todayCalls} calls</span> today with a <span className="text-emerald-400 font-semibold">{conversionRate}% conversion rate</span> to next interview stage.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => startCall('cand_demo_alex')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-glow flex items-center gap-2 transition-all active:scale-[0.98]"
            >
              <Zap className="w-4 h-4" />
              <span>Launch Autonomous Call</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Candidate Talent Pool"
          value={totalCandidates}
          change="+18.4% this wk"
          trendUp={true}
          icon={UserCheck}
          gradient="from-blue-600 to-indigo-600"
          subtitle="48 AI Screened"
        />
        <StatCard
          title="Active Corporate Clients"
          value={totalClients}
          change="+6 new deals"
          trendUp={true}
          icon={Building2}
          gradient="from-indigo-600 to-purple-600"
          subtitle="124 Open Roles"
        />
        <StatCard
          title="Calls Handled Today"
          value={todayCalls}
          change="+32 vs yesterday"
          trendUp={true}
          icon={PhoneCall}
          gradient="from-emerald-600 to-teal-600"
          subtitle="Avg Duration: 4m 32s"
        />
        <StatCard
          title="AI Candidate Qualification"
          value={`${conversionRate}%`}
          change="+5.2% vs target"
          trendUp={true}
          icon={Flame}
          gradient="from-amber-600 to-rose-600"
          subtitle="Top Tier Candidates"
        />
      </div>

      {/* Interactive Charts & AI Fleet Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Call Volume & Qualification Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Autonomous Call Velocity & Output</h3>
              <p className="text-xs text-slate-400 mt-0.5">Calls placed, completed, and qualified by AI agents</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-500"></span> Total Placed
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> AI Qualified
              </span>
            </div>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockCallsOverTime}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorQual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
                  }}
                />
                <Area type="monotone" dataKey="total" name="Total Placed" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorTotal)" />
                <Area type="monotone" dataKey="qualified" name="AI Qualified" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorQual)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Candidate Pipeline Donut */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-card flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-base font-bold text-white">Pipeline Distribution</h3>
            <p className="text-xs text-slate-400 mt-0.5">Real-time candidate qualification funnel</p>
          </div>

          <div className="w-full h-56 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockPipeline}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={86}
                  paddingAngle={4}
                >
                  {mockPipeline.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center pointer-events-none">
              <span className="text-2xl font-extrabold text-white">320</span>
              <span className="text-[10px] uppercase font-semibold text-slate-400">Total in flow</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80">
            {mockPipeline.slice(0, 4).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[idx] }}></span>
                <span className="text-slate-400 truncate">{item.status}:</span>
                <span className="font-semibold text-white ml-auto">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Voice Agent Fleet & Recent Screenings Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active AI Voice Agents Fleet */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400">
                <Bot className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">AI Calling Fleet</h3>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              5 Calls Active
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {aiAgents.map((agent, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${agent.avatar} flex items-center justify-center text-xs font-bold text-white`}>
                    {agent.name.slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-white">{agent.name}</p>
                      <span className="text-[10px] text-slate-400 font-mono">({agent.voice.split('-')[1]?.trim() || agent.voice})</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{agent.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                    agent.status === 'Calling'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 animate-pulse'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {agent.status === 'Calling' ? `${agent.activeCalls} Live Calls` : 'Standby'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => startCall('cand_demo_alex')}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-700"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            Configure AI Voice Persona & Prompts
          </button>
        </div>

        {/* Recent AI Screenings Audio Logs */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Recent AI Candidate Screenings</h3>
              <p className="text-xs text-slate-400 mt-0.5">Live transcripts, sentiment scoring, and audio playback</p>
            </div>
            <span className="text-xs text-brand-400 font-semibold cursor-pointer hover:underline">
              View All Logs →
            </span>
          </div>

          <div className="space-y-3">
            {mockRecentScreenings.map((call) => {
              const isPlaying = playingAudio === call.id;
              return (
                <div
                  key={call.id}
                  className="p-4 rounded-xl bg-slate-850 hover:bg-slate-800/80 border border-slate-800/80 transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleAudio(call.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          isPlaying ? 'bg-brand-500 text-white shadow-glow' : 'bg-slate-800 text-slate-300 hover:bg-brand-600 hover:text-white'
                        }`}
                        title="Listen to call recording"
                      >
                        {isPlaying ? <Volume2 className="w-4 h-4 animate-bounce" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{call.candidateName}</span>
                          <span className="text-xs text-slate-400 font-mono">({call.phone})</span>
                        </div>
                        <p className="text-xs text-slate-400">{call.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {call.sentiment}
                      </span>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-brand-500/20 text-brand-300 border border-brand-500/30">
                        {call.score}% AI Match
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {call.duration}
                      </span>
                    </div>
                  </div>

                  {/* AI Summary Quote */}
                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-brand-400 flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed"><strong className="text-brand-300">AI Summary:</strong> {call.summary}</p>
                  </div>

                  {/* Simulated Audio Visualizer Bar when playing */}
                  {isPlaying && (
                    <div className="mt-3 pt-2 border-t border-slate-800 flex items-center gap-3">
                      <span className="text-[10px] font-mono text-brand-400">01:14 / {call.duration}</span>
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-brand-500 to-indigo-400 w-1/3 animate-pulse"></div>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-semibold">Playing AI Audio Call</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

