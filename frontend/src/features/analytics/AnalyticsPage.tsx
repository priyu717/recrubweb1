import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Bot,
  Zap,
  Target,
  DollarSign,
  ShieldCheck,
  Award
} from 'lucide-react';

const funnelData = [
  { stage: 'Leads Uploaded', count: 500, fill: '#6366f1' },
  { stage: 'AI Calls Placed', count: 460, fill: '#4f46e5' },
  { stage: 'Connected', count: 380, fill: '#38bdf8' },
  { stage: 'AI Screened', count: 310, fill: '#0ea5e9' },
  { stage: 'Qualified (80%+)', count: 185, fill: '#10b981' },
  { stage: 'Interview Set', count: 112, fill: '#059669' },
  { stage: 'Offers Accepted', count: 28, fill: '#f59e0b' },
];

const dispositionData = [
  { name: 'High Fit & Interested', value: 45, color: '#10b981' },
  { name: 'Callback Scheduled', value: 24, color: '#f59e0b' },
  { name: 'Left Voicemail', value: 16, color: '#6366f1' },
  { name: 'Not Interested', value: 15, color: '#ef4444' },
];

const agentEfficiencyData = [
  { hour: '9 AM', calls: 34, answerRate: 72 },
  { hour: '11 AM', calls: 68, answerRate: 85 },
  { hour: '1 PM', calls: 42, answerRate: 64 },
  { hour: '3 PM', calls: 88, answerRate: 91 },
  { hour: '5 PM', calls: 52, answerRate: 78 },
  { hour: '7 PM', calls: 24, answerRate: 58 },
];

const AnalyticsPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <BarChart3 className="w-6 h-6 text-brand-400" />
          AI Recruitment Intelligence & ROI
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Deep analysis of autonomous voice agent performance, candidate conversion velocity, and cost savings
        </p>
      </div>

      {/* ROI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
              +38% vs Manual
            </span>
          </div>
          <p className="text-xs font-medium text-slate-400 uppercase">Recruiter Hours Saved</p>
          <h3 className="text-2xl font-bold text-white mt-1">164.5 hrs</h3>
          <p className="text-[11px] text-slate-400 mt-1">Equivalent to 1.1 full-time recruiter FTE</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-brand-500/20 text-brand-400">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-500/15 text-brand-300">
              240ms Avg
            </span>
          </div>
          <p className="text-xs font-medium text-slate-400 uppercase">Voice Latency SLA</p>
          <h3 className="text-2xl font-bold text-white mt-1">99.8%</h3>
          <p className="text-[11px] text-slate-400 mt-1">Real-time human-like turn-taking</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300">
              $18.4k Est.
            </span>
          </div>
          <p className="text-xs font-medium text-slate-400 uppercase">Monthly Hiring Savings</p>
          <h3 className="text-2xl font-bold text-white mt-1">$18,450</h3>
          <p className="text-[11px] text-slate-400 mt-1">Compared to outsourced SDR agencies</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300">
              96.2%
            </span>
          </div>
          <p className="text-xs font-medium text-slate-400 uppercase">AI Screening Accuracy</p>
          <h3 className="text-2xl font-bold text-white mt-1">96.2%</h3>
          <p className="text-[11px] text-slate-400 mt-1">Verified with hiring manager match</p>
        </div>
      </div>

      {/* Main Conversion Funnel & Hourly Heatmap Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Full Funnel */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-card space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Full-Cycle Recruitment Funnel</h3>
            <p className="text-xs text-slate-400 mt-0.5">Stage progression from lead import to signed offer</p>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ left: 30, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis dataKey="stage" type="category" stroke="#64748b" tick={{ fontSize: 11 }} width={120} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dispositions Donut */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-card flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Call Dispositions</h3>
            <p className="text-xs text-slate-400 mt-0.5">Candidate response categorization</p>
          </div>

          <div className="w-full h-56 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dispositionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={84}
                  paddingAngle={5}
                >
                  {dispositionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
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
              <span className="text-xl font-black text-emerald-400">45%</span>
              <span className="text-[10px] uppercase font-semibold text-slate-400">Qualified Fit</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-slate-800">
            {dispositionData.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></span>
                  <span className="text-slate-300">{d.name}</span>
                </div>
                <span className="font-semibold text-white">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hourly Answer Rate Chart */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Optimal Outbound Calling Windows</h3>
            <p className="text-xs text-slate-400 mt-0.5">Connection rate and answer pickup probability by time of day</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            Peak Window: 2 PM – 4 PM EST
          </span>
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={agentEfficiencyData}>
              <defs>
                <linearGradient id="rateGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit="%" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Area type="monotone" dataKey="answerRate" name="Answer Rate (%)" stroke="#38bdf8" strokeWidth={3} fill="url(#rateGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
